"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import {
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
// Create some dummy initial files


export default function FileuploadComponent({
  coverImage,
  setCoverImage,
}: {
  coverImage: string
  setCoverImage: React.Dispatch<React.SetStateAction<string>>
}) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 1;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxFiles,
    maxSize,
    multiple: false,
  });
  useEffect(() => {
  if (files.length > 0 && files[0].preview) {
    setCoverImage(files[0].preview)
  } else {
    setCoverImage("")
  }
}, [files, setCoverImage])
  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        className="relative flex min-h-72 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            aria-hidden="true"
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium text-sm">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
          <Button type="button" className="mt-4 bg-transparent rounded " onClick={openFileDialog} variant="outline">
            <UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
            Select images
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              className="flex items-center justify-between gap-2 rounded-lg border text-white bg-slate-900 p-2 pe-3"
              key={file.id}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="aspect-square shrink-0 rounded bg-accent">
                  <img
                    alt={file.file.name}
                    className="size-10 rounded-[inherit] object-cover"
                    src={file.preview}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate font-medium text-[13px]">
                    {file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
               type="button"
                aria-label="Remove file"
                className="-me-2 size-8 text-muted-foreground/80 bg-transparent hover:text-black"
                onClick={() => removeFile(file.id)}
                size="icon"
                variant="ghost"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length >= 1 && (
            <div>
              <Button type="button" onClick={clearFiles} className={"bg-transparent rounded hover:bg-red-600 cursor-pointer hover:text-white hover:border-0 border-slate-600"} size="sm" variant="outline">
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
