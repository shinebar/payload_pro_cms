import type { CollectionConfig } from 'payload'

import { onlyAdmin } from '@/utils/util'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // 已登录即可进入 Admin 查看该集合
    admin: ({ req }) => Boolean(req.user),
    // 仅 admin 可创建 / 更新 / 删除
    create: onlyAdmin,
    update: onlyAdmin,
    delete: onlyAdmin,
    // 已登录用户可读取
    read: ({ req }) => Boolean(req.user),
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
    },
  ],
}
