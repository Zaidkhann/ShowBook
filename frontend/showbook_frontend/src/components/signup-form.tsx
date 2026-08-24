"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react";
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState("")
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const result = await res.json();

      if (res.status == 409) {
        setData(result.message)
        return
      }

      if (!res.ok) {
        console.error("Signup failed:", result.message)
        return
      }

      console.log("Signup successful:", result.message)
      setData(result.message)
      router.push("/")


    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup className="gap-5">

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-[#F5F5F5]">
            Create your account
          </h1>

          <p className="text-sm text-balance text-[#9CA3AF]">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel
            className="text-[#D1D5DB]"
            htmlFor="name"
          >
            Full Name
          </FieldLabel>

          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            value={username}
            required
            className="bg-[#181B21] text-white border-[#343942]"
          />
        </Field>

        <Field>
          <FieldLabel
            className="text-[#D1D5DB]"
            htmlFor="email"
          >
            Email
          </FieldLabel>

          <Input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-[#181B21] text-white border-[#343942]"
          />

          <FieldDescription className="text-[#9CA3AF]">
            We'll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel
            className="text-[#D1D5DB]"
            htmlFor="password"
          >
            Password
          </FieldLabel>

          <Input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            required
            className="bg-[#181B21] border-[#343942] text-white"
          />

          <FieldDescription className="text-[#9CA3AF]">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel
            className="text-[#D1D5DB]"
            htmlFor="confirm-password"
          >
            Confirm Password
          </FieldLabel>

          <Input
            id="confirm-password"
            type="password"
            required
            className="bg-[#181B21] border-[#343942] text-white"
          />

          <FieldDescription className="text-[#9CA3AF]">
            Please confirm your password.
          </FieldDescription>
        </Field>

        <Field>
          <Button
            type="submit"
            className="bg-[#E50914] hover:bg-[#fa282f] cursor-pointer"
          >
            Create Account
          </Button>
        </Field>

        {data && (
          <p className="text-center text-sm text-white">
            {data}
          </p>
        )}

        <FieldSeparator className="text-[#1a1b1d]">
          Or continue with
        </FieldSeparator>

        <Field>
          <Button
          onClick={handleLoginWithGoogle}
          className="cursor-pointer border-[#343942] bg-[#181B21] text-white hover:bg-[#22262E] hover:text-white"
          variant="outline"
          type="button"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>

            Sign up with Google
          </Button>

          <FieldDescription className="text-center text-[#9CA3AF]">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 text-[#FF1E25]"
            >
              Sign in
            </a>
          </FieldDescription>
        </Field>

      </FieldGroup>
    </form>
  )
}