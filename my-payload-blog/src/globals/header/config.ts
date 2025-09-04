import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            type: 'array',
            name: 'headerLinks',
            fields: [
                {
                    name: 'destination',
                    type: 'relationship',
                    relationTo: 'posts',
                },
                {
                    name: 'newTab',
                    label: 'Open in a new tab?',
                    type: 'checkbox',
                }
            ],
            minRows: 1,
            maxRows: 5
        }
    ]
}