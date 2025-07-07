
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    include: { comment: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(notifications);
}
