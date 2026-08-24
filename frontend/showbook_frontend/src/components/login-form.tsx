"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [data,setData] = useState("")
  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    try{

      const res = await fetch("http://localhost:5000/api/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password
          })
        });
        const result =  await res.json()
        setData(result.message)
        if (!res.ok) {
          console.error("Login failed:", result)
          return
        }
  
        console.log("Login successful:", result)
      } catch (error) {
      console.error("Login error:", error)
      setData("Unable to connect to server")
     
    }
  }

  const handleLoginWithGoogle = async()=>
  {
    window.location.href = "http://localhost:5000/api/auth/google";
  }
  
  
  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6" , className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1  text-center">
          <h1 className="text-2xl font-bold text-[#F5F5F5]">Login to your account</h1>
          <p className="text-sm text-balance text-[#9CA3AF]">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel className="text-[#D1D5DB]" htmlFor="email">Email</FieldLabel>
          <Input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="bg-[#181B21] text-white border-[#343942]" id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel className="text-[#D1D5DB]" htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-[#FF1E25]"
            >
              Forgot your password?
            </a>
          </div>
          <Input onChange={(e)=>{setPassword(e.target.value)}} value={password} className="bg-[#181B21] border-[#343942] text-white" id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" className={'bg-[#E50914] hover:bg-[#fa282f] cursor-pointer'}>Login</Button>
        </Field>
        {data && (
          <p className="text-center text-sm text-white">
            {data}
          </p>
        )}
        <FieldSeparator className="text-[#1a1b1d]">Or continue with</FieldSeparator>
        <Field>
          <Button onClick={handleLoginWithGoogle} className={"cursor-pointer hover:bg-gray-200"} variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4 text-[#FF1E25]">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
