"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'
import TheatreLayout from '../../../../components/TheatreLayout'
function postTheatre() {
    const [theatreName,setTheatreName]=useState("")
    const[location,setLocation]=useState("")
    const [rows,setRows]=useState(1)
    const [columns,setColumns]=useState(1) 
    const [showLayout, setShowLayout] = useState(false)

const onSubmitHandler = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch(
      "http://localhost:5000/api/theatre/post-theatre",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theatreName,
          location,
          rows,
          columns,
        }),
      }
    )

    const data = await res.json()

    console.log("STATUS:", res.status)
    console.log("RESPONSE:", data)

    if (!res.ok) {
      toast.error("Failed to Post Theatre")
      return
    }

    toast.success("Theatre posted successfully.")
    setShowLayout(true)
   

  } catch (err) {
    console.error("FETCH ERROR:", err)
    toast.error("Unable to connect to server")
  }
}


  return (
    <>
    <form  className="min-h-screen bg-[#07080c] px-6 py-10 text-white">

  {/* Header */}
  <div className="mx-auto mb-10 max-w-6xl">
    <h1 className="text-center text-5xl font-bold tracking-tight text-white">
      Add New{" "}
      <span className="text-[#ff334d]">
        Theatre
      </span>
    </h1>

    <p className="mt-3 text-center font-mono text-sm text-[#7f8aa3]">
      Create a theatre and configure its seating layout.
    </p>
  </div>


  {/* Main Form */}
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">


    {/* Left - Theatre Details */}
    <div className="rounded-2xl border border-[#252936] bg-[#0d1016] p-8 shadow-[0_0_40px_rgba(255,51,77,0.05)]">

      {/* Section Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Theatre Details
        </h2>

        <p className="mt-2 font-mono text-sm text-[#7f8aa3]">
          Enter the basic information about the theatre.
        </p>
      </div>


      {/* Theatre Name */}
      <div className="mb-7">
        <label className="mb-3 block text-sm font-semibold text-white">
          Theatre Name
        </label>

        <input
          type="text"
          required
          onChange={(e)=>(setTheatreName(e.target.value))}
          placeholder="e.g. PVR Phoenix Mall"
          className="w-full rounded-xl border border-[#303541] bg-[#171a21] px-5 py-4 font-mono text-sm text-white outline-none transition duration-300 placeholder:text-[#596275] focus:border-[#ff334d] focus:shadow-[0_0_20px_rgba(255,51,77,0.15)]"
        />
      </div>


      {/* Theatre Location */}
      <div className="mb-9">
        <label className="mb-3 block text-sm font-semibold text-white">
          Theatre Location
        </label>

        <input
          type="text"
          required
          onChange={(e)=>(setLocation(e.target.value))}
          placeholder="e.g. Bhopal"
          className="w-full rounded-xl border border-[#303541] bg-[#171a21] px-5 py-4 font-mono text-sm text-white outline-none transition duration-300 placeholder:text-[#596275] focus:border-[#ff334d] focus:shadow-[0_0_20px_rgba(255,51,77,0.15)]"
        />
      </div>


      {/* Rows */}
      <div className="mb-9">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <label className="block text-sm font-semibold text-white">
              Rows
            </label>

            <p className="mt-1 font-mono text-xs text-[#687287]">
              Number of seat rows
            </p>
          </div>

          <span className="rounded-lg border border-[#7d2632] bg-[#1a1115] px-4 py-2 font-mono text-sm font-bold text-[#ff334d]">
            {rows}
          </span>

        </div>

        <input
          type="range"
          required
          onChange={(e)=>(setRows(Number(e.target.value)))}
          min="0"
          max="20"
          value={rows}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#292d36] accent-[#ff334d]"
        />

        <div className="mt-2 flex justify-between font-mono text-xs text-[#687287]">
          <span>0</span>
          <span>20</span>
        </div>

      </div>


      {/* Columns */}
      <div className="mb-10">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <label className="block text-sm font-semibold text-white">
              Columns
            </label>

            <p className="mt-1 font-mono text-xs text-[#687287]">
              Number of seats per row
            </p>
          </div>

          <span className="rounded-lg border border-[#7d2632] bg-[#1a1115] px-4 py-2 font-mono text-sm font-bold text-[#ff334d]">
            {columns}
          </span>

        </div>

        <input
          type="range"
          required
          onChange={(e)=>(setColumns(Number(e.target.value)))}
          min="0"
          max="20"
          value={columns}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#292d36] accent-[#ff334d]"
        />

        <div className="mt-2 flex justify-between font-mono text-xs text-[#687287]">
          <span>0</span>
          <span>20</span>
        </div>

      </div>


      {/* Add Theatre Button */}
      <button
         type="button"
         onClick={onSubmitHandler}
        className="w-full rounded-xl border border-[#ff334d] bg-linear-to-r from-[#7f1426] via-[#c51f3c] to-[#ff334d] px-6 py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(255,51,77,0.15)] transition duration-300 hover:shadow-[0_0_35px_rgba(255,51,77,0.3)] hover:brightness-110 active:scale-[0.99]"
      >
        + &nbsp; Add Theatre
      </button>

    </div>


    {/* Right - Preview */}
    <div className="rounded-2xl border border-[#252936] bg-[#0d1016] p-7">

      <h2 className="text-xl font-bold text-white">
        Theatre Preview
      </h2>

      <div className="mt-3 h-1 w-12 rounded-full bg-[#ff334d]" />


      {/* Screen */}
      <div className="mt-10">

        <div className="mx-auto h-2 w-48 rounded-full bg-linear-to-r from-transparent via-[#ff334d] to-transparent shadow-[0_0_20px_rgba(255,51,77,0.5)]" />

        <p className="mt-3 text-center font-mono text-xs tracking-widest text-[#687287]">
          SCREEN
        </p>

      </div>


      {/* Seat Preview */}
      <div className="mt-10 rounded-xl border border-[#242833] bg-[#10131a] p-5">

        <div className="grid grid-cols-5 gap-2">

          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#ff334d] shadow-[0_0_8px_rgba(255,51,77,0.4)]" />
          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#242933]" />

          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#ff334d]" />
          <div className="h-4 rounded bg-[#ff334d] shadow-[0_0_8px_rgba(255,51,77,0.4)]" />
          <div className="h-4 rounded bg-[#ff334d]" />
          <div className="h-4 rounded bg-[#242933]" />

          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#ff334d]" />
          <div className="h-4 rounded bg-[#ff334d] shadow-[0_0_8px_rgba(255,51,77,0.4)]" />
          <div className="h-4 rounded bg-[#ff334d]" />
          <div className="h-4 rounded bg-[#242933]" />

          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#ff334d]" />
          <div className="h-4 rounded bg-[#242933]" />
          <div className="h-4 rounded bg-[#242933]" />

        </div>

      </div>


      Information
      <div className="mt-8 border-t border-[#252936] pt-6">

        <h3 className="text-sm font-semibold text-white">
          Why configure the layout?
        </h3>

        <p className="mt-3 font-mono text-xs leading-6 text-[#7f8aa3]">
          Setting the correct rows and columns helps create an accurate
          seating layout for your theatre.
        </p>

      </div>


      {/* Tip */}
      <div className="mt-6 rounded-xl border border-[#51232c] bg-[#160e12] p-5">

        <p className="text-sm font-bold text-[#ff5267]">
          ✦ Tip
        </p>

        <p className="mt-2 font-mono text-xs leading-5 text-[#8b94a7]">
          You can change the seating layout later from the theatre
          dashboard.
        </p>

      </div>

    </div>

  </div>

</form>
{/* {showLayout && ( */}
    <div className='flex flex-col justify-center items-center'>
    <h2 className='text-2xl text-white font-mono '>Preview</h2>
  <div className="mx-auto mt-10 max-w-6xl flex justify-center items-center">
    <TheatreLayout
      rows={rows}
      columns={columns}
    />
  </div>
  </div>
{/* )} */}
</>
  )
}

export default postTheatre