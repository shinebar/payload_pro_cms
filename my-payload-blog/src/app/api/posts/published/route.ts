import { type NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { CollectionSlug } from 'payload'

// 防止响应被缓存
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        // 初始化 Payload
        const payload = await getPayload({
            config,
        })

        // 解析查询参数
        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const limit = Math.min(Number(searchParams.get('limit')) || 10, 100) // 限制最大 100
        const sort = searchParams.get('sort') || '-publishedAt' // 默认按发布日期降序

        // 查询已发布的文章
        const result = await payload.find({
            collection: 'posts' as CollectionSlug,
            depth: 1,
            page,
            limit,
            sort,
            where: {
                and: [
                    {
                        publishedAt: {
                            less_than_equal: new Date().toISOString(),
                        },
                    },
                    {
                        publishedAt: {
                            exists: true,
                        },
                    },
                ],
            },
            select: {
                slug: true,
                title: true,
                content: true,
                tags: true,
                publishedAt: true,
            },
        })

        // 返回响应
        return Response.json({
            docs: result.docs,
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            pagingCounter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
        })
    } catch (error) {
        console.error('Error fetching published posts:', error)
        return Response.json(
            { error: 'Failed to fetch published posts' },
            { status: 500 }
        )
    }
}
