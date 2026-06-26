"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Upload, Link as LinkIcon, Loader2, ImagePlus } from "lucide-react";
import { isUnoptimizedPreview, uploadImageFile } from "@/lib/admin-media";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

export default function ImageField({ label, value, onChange, onUploadingChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    const result = await uploadImageFile(file);
    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      onChange(result.url);
    }
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setError("");
            }}
            placeholder="Image URL ya Upload karein"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Upload
        </button>
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {value ? (
        <div className="relative h-32 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="400px"
            unoptimized={isUnoptimizedPreview(value)}
          />
        </div>
      ) : (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
          <ImagePlus size={16} className="mr-1.5" /> Preview yahan dikhegi
        </div>
      )}
    </div>
  );
}
