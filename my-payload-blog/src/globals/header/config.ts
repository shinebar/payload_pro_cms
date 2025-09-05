import { GlobalConfig } from 'payload'
import { onlyAdmin } from '../../utils/util'
export const Header: GlobalConfig = {
    slug: 'header',
    access: {
        update: onlyAdmin,
        read: (): boolean => true,
    },
    admin: {
        group: 'Navigation',
    },
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
export default Header
