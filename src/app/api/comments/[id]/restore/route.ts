// PATCH /api/comments/[id]/restore
import {NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

import type { Session } from 'next-auth';

export async function PATCH(req: NextRequest) {
  /*
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
*/

const session = await getServerSession( authOptions) as Session | null;

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
 // const id = url.pathname.split('/').slice(-2, -1)[0]; // Extract ID from /comments/[id]/restore
  const id = url.pathname.split('/')[4]; // safer: extract from /api/comments/[id]/restore

  if (!id) {
    return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
  }


  const comment = await prisma.comment.findUnique({ where: { id } });

//  if (!comment || comment.authorId !== session.user.id) {
if (!comment || !session.user?.id || comment.authorId !== session.user.id) {

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const gracePeriod = 15 * 60 * 1000; // 15 minutes
  const deletedAt = comment.deletedAt?.getTime() || 0;
  if (Date.now() - deletedAt > gracePeriod) {
    return NextResponse.json({ error: 'Restore window expired' }, { status: 400 });
  }

  const restored = await prisma.comment.update({
    where: { id },
    data: { deletedAt: null },
  });

  return NextResponse.json(restored);
}
