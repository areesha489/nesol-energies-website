"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent } from "react";
import { Upload, Link as LinkIcon, Loader2, Plus, Trash2, ImagePlus } from "lucide-react";

interface ImagesFieldProps {
  label: string;
  description?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

function previewUnoptimized(url: string) {
  return url.startsWith("/uploads/") || url.includes("blob.vercel-storage.com");
}

export default function ImagesField({
  label,
  description,
  value,
  onChange,
  maxImages = 5,
}: ImagesFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const images = value ?? [];
  const canAddMore = images.length < maxImages;

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!list.length) {
      setError("Sirf image files (JPG, PNG, WebP, GIF) upload ho sakti hain.");
      return;
    }

    const slots = maxImages - images.length;
    if (slots <= 0) {
      setError(`Maximum ${maxImages} images allowed. Pehle koi image remove karein.`);
      return;
    }

    const toUpload = list.slice(0, slots);
    setUploading(true);
    setError("");

    const uploaded: string[] = [];

    for (const file of toUpload) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed. Dobara try karein.");
          break;
        }
        if (data.url) uploaded.push(data.url);
      } catch {
        setError("Network error during upload.");
        break;
      }
    }

    if (uploaded.length) {
      onChange([...images, ...uploaded]);
    }

    setUploading(false);
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url) return;
    if (!canAddMore) {
      setError(`Maximum ${maxImages} images allowed.`);
      return;
    }
    onChange([...images, url]);
    setUrlInput("");
    setError("");
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
    setError("");
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (!canAddMore || uploading) return;
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (canAddMore) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-xl border-2 border-dashed p-4 transition-colors ${
          dragOver ? "border-orange-400 bg-orange-50" : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <ImagePlus size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Apni image yahan upload karein</p>
            <p className="text-xs text-gray-500">Drag & drop, ya neeche Upload button use karein</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files?.length) uploadFiles(files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || !canAddMore}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="Ya image URL paste karein"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <button
          type="button"
          onClick={addUrl}
          disabled={!urlInput.trim() || !canAddMore}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          <Plus size={14} /> Add URL
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <p className="text-[11px] text-gray-400">
        {images.length} / {maxImages} images · Save Changes dabana zaroori hai
      </p>

      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <div className="relative h-32 w-full">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                  unoptimized={previewUnoptimized(url)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                aria-label="Remove image"
              >
                <Trash2 size={12} />
              </button>
              <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                {index === 0 ? "Cover" : `Image ${index + 1}`}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Abhi koi image nahi — upar se upload karein ya URL add karein.
        </p>
      )}
    </div>
  );
}
