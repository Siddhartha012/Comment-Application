
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content } = await req.json();

  // Extract ID from pathname like /api/comments/<id>/edit
  const idMatch = req.nextUrl.pathname.match(/\/api\/comments\/([^/]+)\/edit/);
  const id = idMatch?.[1];

  if (!id) {
    return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
  }

  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment || comment.authorId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const gracePeriod = 15 * 60 * 1000; // 15 minutes
  const createdAt = comment.createdAt.getTime();
  if (Date.now() - createdAt > gracePeriod) {
    return NextResponse.json({ error: 'Edit window expired' }, { status: 400 });
  }

  const updated = await prisma.comment.update({
    where: { id },
    data: {
      content,
      editedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}
