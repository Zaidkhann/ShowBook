import { cookies } from "next/headers"

export const getSession = async () => {
  const cookieStore = await cookies()

  console.log("COOKIES:", cookieStore.toString())

  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  })

  console.log("ME STATUS:", res.status)

  if (!res.ok) {
    console.log("ME RESPONSE:", await res.text())
    return null
  }

  return await res.json()
}