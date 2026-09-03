"use client";

import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function FileuploadComponent({
  coverImage,
  setCoverImage,
  setCoverFile
}) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState([]);

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  const handleFile = (selectedFile) => {
    setErrors([]);

    if (!selectedFile) return;

    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors(["Only SVG, PNG, JPG or GIF files are allowed."]);
      return;
    }

    if (selectedFile.size > maxSize) {
      setErrors([`File size must be less than ${maxSizeMB}MB.`]);
      return;
    }

    const filePreview = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(filePreview);

    setCoverImage(filePreview);
    setCoverFile(selectedFile); 
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];

    handleFile(selectedFile);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
    setCoverImage("");
    setErrors([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat(
      (bytes / Math.pow(1024, i)).toFixed(2)
    )} ${units[i]}`;
  };

  return (
    <div className="flex flex-col gap-2">
      {!file && (
        <div
          className="
            relative flex min-h-72 flex-col items-center justify-center
            overflow-hidden rounded-xl border border-input border-dashed
            p-4 transition-colors
            has-[input:focus]:border-ring
            has-[input:focus]:ring-[3px]
            has-[input:focus]:ring-ring/50
          "
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/svg+xml,image/png,image/jpeg,image/jpg,image/gif"
            onChange={handleInputChange}
            aria-label="Upload image file"
            className="sr-only"
          />

          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              aria-hidden="true"
              className="
                mb-2 flex size-11 shrink-0 items-center justify-center
                rounded-full border bg-background
              "
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>

            <p className="mb-1.5 text-sm font-medium">
              Drop your image here
            </p>

            <p className="text-xs text-muted-foreground">
              SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
            </p>

            <Button
              type="button"
              className="mt-4 rounded bg-transparent"
              onClick={openFileDialog}
              variant="outline"
            >
              <UploadIcon
                aria-hidden="true"
                className="-ms-1 opacity-60"
              />
              Select image
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* Selected file */}
      {file && (
        <div className="space-y-4">
          <div
            className="
              flex items-center justify-between gap-2 rounded-lg
              border bg-slate-900 p-2 pe-3 text-white
            "
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="aspect-square shrink-0 rounded bg-accent">
                <img
                  alt={file.name}
                  className="size-10 rounded-[inherit] object-cover"
                  src={preview}
                />
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-[13px] font-medium">
                  {file.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>

            <Button
              type="button"
              aria-label="Remove file"
              className="
                -me-2 size-8 bg-transparent
                text-muted-foreground/80
                hover:bg-red-600 hover:text-white
              "
              onClick={removeFile}
              size="icon"
              variant="ghost"
            >
              <XIcon aria-hidden="true" />
            </Button>
          </div>

          {/* Remove all */}
          <div>
            <Button
              type="button"
              onClick={removeFile}
              className="
                cursor-pointer rounded border-slate-600
                bg-transparent
                hover:border-0 hover:bg-red-600
                hover:text-white
              "
              size="sm"
              variant="outline"
            >
              Remove file
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
