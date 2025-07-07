

import {NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
//import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { Session } from "next-auth";

// POST a new comment (with optional parentId and notification trigger)
export async function POST(req: NextRequest) {
  

const session = await getServerSession(authOptions) as Session | null;

if (!session || !session.user?.id) {
  console.error("⛔ No session or user ID found!");
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

  const { content, parentId } = await req.json();

  try {
    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        parentId: parentId || null,
        authorId: session.user.id,
      },
      include: {
        author: true,
      },
    });

    // 🔔 Create a notification if it's a reply to another user's comment
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (parentComment && parentComment.authorId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: parentComment.authorId,
            commentId: comment.id,
          },
        });
      }
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("🔥 Failed to create comment:", error);
    return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 });
  }
}

// GET: Retrieve all comments
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      where: { parentId: null },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("🔥 Failed to fetch comments:", error);
    return NextResponse.json({ message: 'Failed to fetch comments' }, { status: 500 });
  }
}
