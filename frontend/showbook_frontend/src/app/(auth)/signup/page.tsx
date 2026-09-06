"use client"

import { SignupForm } from "@/components/signup-form"
import { RowsIcon } from "@phosphor-icons/react"

export default function SignupPage() {
  


  return (
    <div className="min-h-screen bg-[#0F1115] text-white flex flex-col">

     
      <div className="absolute top-6 left-6 md:top-8 md:left-10">
        <a
          href="#"
          className="flex items-center gap-2 font-medium text-[#F5F5F5]"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-[#E50914] text-white">
            <RowsIcon className="size-4" />
          </div>

          <span className="text-lg font-semibold">
            Show Book
          </span>
        </a>
      </div>

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>

    </div>
  )
}