"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Upload, Link as LinkIcon, Loader2, Plus, Trash2, ImagePlus } from "lucide-react";
import { isUnoptimizedPreview, normalizeMediaInput, uploadImageFile } from "@/lib/admin-media";

interface ImagesFieldProps {
  label: string;
  description?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  onUploadingChange?: (uploading: boolean) => void;
}

export default function ImagesField({
  label,
  description,
  value,
  onChange,
  maxImages = 5,
  onUploadingChange,
}: ImagesFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const images = value ?? [];
  const imagesRef = useRef(images);
  imagesRef.current = images;
  const canAddMore = images.length < maxImages;

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  async function handleUpload(files: FileList | File[]) {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!list.length) {
      setError("Sirf image files upload ho sakti hain.");
      return;
    }

    const slots = maxImages - imagesRef.current.length;
    if (slots <= 0) {
      setError(`Maximum ${maxImages} images. Pehle koi remove karein.`);
      return;
    }

    setUploading(true);
    setError("");

    const results = await Promise.all(list.slice(0, slots).map((file) => uploadImageFile(file)));
    const uploaded = results.map((r) => r.url).filter(Boolean) as string[];
    const firstError = results.find((r) => r.error)?.error;

    if (uploaded.length) {
      onChange([...imagesRef.current, ...uploaded]);
    } else if (firstError) {
      setError(firstError);
    }

    setUploading(false);
  }

  function addUrl() {
    const url = normalizeMediaInput(urlInput);
    if (!url) {
      setError("Valid image URL paste karein.");
      return;
    }
    if (!canAddMore) {
      setError(`Maximum ${maxImages} images.`);
      return;
    }
    onChange([...images, url]);
    setUrlInput("");
    setError("");
  }

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="Image URL ya Upload karein"
            disabled={!canAddMore}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 disabled:opacity-50"
          />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files?.length) handleUpload(files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || !canAddMore}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Upload
        </button>
        <button
          type="button"
          onClick={addUrl}
          disabled={!urlInput.trim() || !canAddMore}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          <Plus size={14} />
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      <p className="text-[11px] text-gray-400">{images.length} / {maxImages} images</p>

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
                  unoptimized={isUnoptimizedPreview(url)}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== index))}
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
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
          <ImagePlus size={16} className="mr-1.5" /> Upload karein ya URL add karein
        </div>
      )}
    </div>
  );
}
