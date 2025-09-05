import type { AccessArgs } from "payload"

export const onlyAdmin = ({ req }: AccessArgs) => {
    return req.user?.role === 'admin'
}