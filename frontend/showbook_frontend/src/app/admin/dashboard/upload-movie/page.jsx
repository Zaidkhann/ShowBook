"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Slider } from "../../../../components/ui/slider.tsx"

import FileuploadComponent from "../../../../components/Fileupload.jsx"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UploadForm() {
  const router = useRouter()
  const [hours, setHours] = useState(2)
  const [minutes, setMinutes] = useState(15)
  const [movieName, setMovieName] = useState("")
  const [genre, setGenre] = useState("")
  const [language, setLanguage] = useState("Hindi")
  const [rating, setRating] = useState("")
  const duration = `${hours}h ${minutes}m`
  const [coverImage, setCoverImage] = useState("")
  const [coverFile, setCoverFile] = useState(null)

  const languages = [
    {
      label: "English",
      value: "eng",
    },
    {
      label: "Hindi",
      value: "hin",
    },
    {
      label: "Tamil",
      value: "tam",
    },
  ]

  const uploadMovie = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();

      formData.append("coverImage", coverFile);

      const uploadRes = await fetch(
        "http://localhost:5000/api/upload/movie-cover",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.message || "Image upload failed");
      }
      const res = await fetch("http://localhost:5000/api/movie/post-movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          movieName,
          genre,
          rating,
          language,
          coverImage: uploadData.url,
          duration
        })
      })
      const data = await res.json()
      if (!res.ok) {
        console.log("Failed to upload movie ")
        toast.error("Failed to upload movie")
        return
      }
      console.log("Movie uploaded successfully: ", data.message)
      toast.success("Movie posted successfully")
      router.push("/admin/dashboard")

    } catch (err) {
      console.log("Failed to upload movie: ", err)
    }
  }

  return (
    <form onSubmit={uploadMovie}>
      <div className="min-h-screen bg-[#090a0c] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">

          <div className="mb-8 text-center">
            <div className="mb-3 flex justify-center gap-2 text-2xl font-medium uppercase">
              <span className="text-white">
                Hello
              </span>

              <span className="text-[#ef1018]">
                Admin
              </span>
            </div>



            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Add New Movie
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Add movie information and upload its poster to ShowBook.
            </p>
          </div>



          <div className="grid lg:grid-cols-[1fr_360px]">

            <div className="p-6 sm:p-8">
              <div className="mb-7">
                <h2 className="text-lg font-semibold">
                  Movie Details
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Enter the basic information about the movie.
                </p>
              </div>

              <FieldGroup className="gap-6">

                <Field>
                  <FieldLabel className="text-sm font-medium text-zinc-200">
                    Movie Name
                  </FieldLabel>

                  <Input
                    value={movieName}
                    onChange={(e) => (setMovieName(e.target.value))}
                    type="text"
                    placeholder="Spider-Man: Brand New Day"
                    required
                    className="
                      h-8
                      border-zinc-700
                      bg-[#181b21]
                      text-white
                      placeholder:text-zinc-600
                      focus-visible:border-[#ef1018]
                      focus-visible:ring-[#ef1018]/20
                    "
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-sm font-medium text-zinc-200">
                    Genre
                  </FieldLabel>

                  <Input
                    value={genre}
                    onChange={(e) => (setGenre(e.target.value))}
                    type="text"
                    placeholder="Action / Adventure / Superhero"
                    className="
                      h-8
                      border-zinc-700
                      bg-[#181b21]
                      text-white
                      placeholder:text-zinc-600
                      focus-visible:border-[#ef1018]
                      focus-visible:ring-[#ef1018]/20
                    "
                  />

                  <FieldDescription className="text-xs text-zinc-500">
                    Separate multiple genres with a slash.
                  </FieldDescription>
                </Field>

                <Field>
                  <div className="mb-4 flex items-center justify-between">
                    <FieldLabel className="text-sm font-medium text-zinc-200">
                      Duration
                    </FieldLabel>

                    <div className="rounded-md border border-[#ef1018]/30 bg-[#ef1018]/10 px-3 py-1">
                      <span className="text-sm font-semibold text-[#ef1018]">
                        {hours}h {minutes}m

                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div
                      className="
                        rounded-xl
                        border
                        border-zinc-800
                        bg-[#181b21]
                        p-4
                        transition
                        hover:border-zinc-700
                      "
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span
                          className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-zinc-500
                          "
                        >
                          Hours
                        </span>

                        <span className="text-sm font-semibold text-white">
                          {hours}h
                        </span>
                      </div>

                      <Slider
                        value={hours}
                        onValueChange={(value) => {

                          setHours(value)

                        }}
                        min={1}
                        max={5}
                        step={1}
                        className="
                          [&_[data-slot=slider-range]]:bg-[#ef1018]
                          [&_[data-slot=slider-thumb]]:border-[#ef1018]
                          [&_[data-slot=slider-thumb]]:bg-white
                        "
                      />

                      <div className="mt-3 flex justify-between text-[11px] text-zinc-600">
                        <span>
                          1h
                        </span>

                        <span>
                          5h
                        </span>
                      </div>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        border-zinc-800
                        bg-[#181b21]
                        p-4
                        transition
                        hover:border-zinc-700
                      "
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span
                          className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-zinc-500
                          "
                        >
                          Minutes
                        </span>

                        <span className="text-sm font-semibold text-white">
                          {minutes}m
                        </span>
                      </div>

                      <Slider
                        value={minutes}
                        onValueChange={(value) => {
                          setMinutes(value)
                        }}
                        min={0}
                        max={55}
                        step={5}
                        className="
                          [&_[data-slot=slider-range]]:bg-[#ef1018]
                          [&_[data-slot=slider-thumb]]:border-[#ef1018]
                          [&_[data-slot=slider-thumb]]:bg-white
                        "
                      />

                      <div className="mt-3 flex justify-between text-[11px] text-zinc-600">
                        <span>
                          0m
                        </span>

                        <span>
                          55m
                        </span>
                      </div>
                    </div>

                  </div>

                  <FieldDescription className="mt-3 text-xs text-zinc-500">
                    Select the total running time of the movie.
                  </FieldDescription>
                </Field>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                  <Field>
                    <FieldLabel className="text-sm font-medium text-zinc-200">
                      Language
                    </FieldLabel>

                    <Select
                      items={languages}
                      defaultValue="hindi"
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger
                        className="
                          h-11
                          border-zinc-700
                          bg-[#181b21]
                          text-white
                          focus:border-[#ef1018]
                          focus:ring-[#ef1018]/20
                        "
                      >
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>

                      <SelectContent
                        className="
                          border-zinc-700
                          bg-[#181b21]
                          text-white
                        "
                      >
                        <SelectGroup>
                          {languages.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.label}
                            >
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-medium text-zinc-200">
                      Rating
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        value={rating}
                        onChange={(e) => (setRating(e.target.value))}
                        required
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        placeholder="4.3"
                        className="
                          h-8
                          border-zinc-700
                          bg-[#181b21]
                          pr-12
                          text-white
                          placeholder:text-zinc-600
                          focus-visible:border-[#ef1018]
                          focus-visible:ring-[#ef1018]/20
                        "
                      />

                      <span
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-sm
                          text-zinc-500
                        "
                      >
                        /10
                      </span>
                    </div>
                  </Field>

                </div>

              </FieldGroup>
            </div>

            <div
              className="
                border-t
                border-zinc-800
                bg-[#0d0f12]
                p-6
                sm:p-8
                lg:border-l
                lg:border-t-0
              "
            >
              <div className="mb-7">
                <h2 className="text-lg font-semibold">
                  Movie Poster
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Upload the official movie cover image.
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-zinc-700
                  bg-[#111318]
                  p-4
                  transition
                  hover:border-[#ef1018]/60
                "
              >
                <FileuploadComponent setCoverFile={setCoverFile} coverImage={coverImage} setCoverImage={setCoverImage} />
              </div>

              <p className="mt-3 text-center text-xs text-zinc-600">
                Recommended: JPG or PNG · Maximum 5MB
              </p>
            </div>

          </div>

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-zinc-800
              bg-[#0d0f12]
              px-6
              py-5
              sm:flex-row
              sm:justify-end
              sm:px-8
            "
          >
            <Button
              type="button"
              variant="outline"
              className="
                h-10
                border-zinc-700
                bg-transparent
                px-6
                text-zinc-300
                hover:border-zinc-600
                hover:bg-zinc-800
                hover:text-white
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="
                h-10
                bg-[#ef1018]
                px-7
                font-semibold
                text-white
                shadow-lg
                shadow-red-950/30
                hover:bg-[#fc252c]
                cursor-pointer
              "
            >
              Add Movie
            </Button>
          </div>


        </div>
      </div>
    </form>
  )
}