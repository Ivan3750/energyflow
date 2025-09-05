import { cookies } from "next/headers"
export default async function useCookies(type, item, value, params = {httpOnly: true, maxAge: 60 * 60 * 24 * 7}) {
    if (type === "get") {
        return (await cookies()).get(item)
    } else {
        (await cookies()).set(item, value, params)
    }
}