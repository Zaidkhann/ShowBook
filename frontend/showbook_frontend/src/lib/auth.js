import { cookies } from "next/headers"

export async function getSession() {
  try {
    const cookieStore = await cookies()

    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    return await res.json()
  } catch (error) {
    console.error("GET SESSION ERROR:", error)
    return null
  }
}