import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_request: NextRequest) => {
  try {
    const payload = await getPayload({ config: configPromise });
    const now = new Date();

    const posts = await payload.find({
      collection: 'posts',
      where: {
        publishedAt: {
          less_than_equal: now,
        },
      },
      sort: '-publishedAt',
    });

    return NextResponse.json({
      success: true,
      data: posts.docs,
      totalDocs: posts.totalDocs,
      page: posts.page,
      totalPages: posts.totalPages,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
