import { onlyAdmin } from '@/utils/util';
import { CollectionConfig } from 'payload';

// 简单的 slug 生成函数
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
        .replace(/\s+/g, '-') // 将空格替换为连字符
        .replace(/-+/g, '-') // 将多个连字符替换为一个
        .trim();
};

const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: onlyAdmin,
        update: onlyAdmin,
        delete: onlyAdmin,
        read: () => true, // 允许所有人读取
    },
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
                if (operation === 'create' || operation === 'update') {
                    if (data.title && !data.slug) {
                        data.slug = generateSlug(data.title);
                    }
                }
                return data;
            },
        ],
        afterChange: [
            async ({ doc, operation, req }) => {
                if (operation === 'create' && !doc.publishedAt) {
                    await req.payload.update({
                        collection: 'posts',
                        id: doc.id,
                        data: {
                            publishedAt: new Date().toISOString(),
                        }
                    });
                }
            }
        ],
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'tags',
            type: 'array',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            },
        },
    ],
};

export default Posts;