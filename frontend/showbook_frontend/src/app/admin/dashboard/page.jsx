"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Film, Building2, CalendarDays, ArrowRight } from "lucide-react"

import { Button } from "../../../components/ui/button"

function Dashboard() {
  const router = useRouter()

  const options = [
    {
      title: "Upload Movie",
      description: "Add a new movie to ShowBook",
      icon: Film,
      route: "/admin/dashboard/upload-movie",
    },
    {
      title: "Post Theatre",
      description: "Add a theatre and its seating layout",
      icon: Building2,
      route: "/admin/dashboard/post-theatre",
    },
    {
      title: "Upload Show",
      description: "Create a new movie show",
      icon: CalendarDays,
      route: "/admin/dashboard/upload-show",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0b0c0f] px-5 py-10 text-white sm:px-10">

      {/* Header */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-500">
            ShowBook Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your movies, theatres and shows.
          </p>
        </div>

        {/* Three Options */}
        <div className="grid gap-5 md:grid-cols-3">

          {options.map((option) => {
            const Icon = option.icon

            return (
              <div
                key={option.title}
                onClick={() => router.push(option.route)}
                className="group cursor-pointer rounded-2xl border border-white/[0.08] bg-[#111318] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-[#14161b]"
              >

                {/* Icon */}
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                  <Icon size={26} />
                </div>

                {/* Text */}
                <h2 className="text-lg font-semibold">
                  {option.title}
                </h2>

                <p className="mt-2 min-h-[40px] text-sm leading-5 text-zinc-500">
                  {option.description}
                </p>

                {/* Button */}
                <Button
                  variant="ghost"
                  className="mt-6 w-full justify-between rounded-xl bg-white/[0.04] text-zinc-300 hover:bg-red-500 hover:text-white"
                >
                  Open
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>

              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}

export default Dashboard