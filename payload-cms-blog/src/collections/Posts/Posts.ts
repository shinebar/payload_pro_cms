import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: '文章的 URL 友好标识',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                        }
                        return value;
                    }
                ]
            }
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
                }
            ]
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
    hooks: {
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
        ]
    }
};

export default Posts;
