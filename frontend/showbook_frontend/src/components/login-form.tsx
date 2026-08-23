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
          <Button type="submit" className={'bg-[#E50914] hover:bg-[#FF1E25] cursor-pointer'}>Login</Button>
        </Field>
        {data && (
          <p className="text-center text-sm text-white">
            {data}
          </p>
        )}
        <FieldSeparator className="text-[#2d2e31]">Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4 text-[#FF1E25]">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
