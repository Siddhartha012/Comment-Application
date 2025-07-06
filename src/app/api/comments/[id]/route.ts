/*import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = params.id;

  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment || comment.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden or Not Found' }, { status: 403 });
  }

  const deleted = await prisma.comment.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  return NextResponse.json(deleted);
}
*/

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Get the comment ID from the URL

  if (!id) {
    return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
  }

  try {
    const deleted = await prisma.comment.update({
      where: { id },
      data: {
        deletedAt: new Date(), // Soft delete
      },
    });

    return NextResponse.json({ message: 'Deleted', deleted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}