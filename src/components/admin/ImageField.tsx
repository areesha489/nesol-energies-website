"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Loader2 } from "lucide-react";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageField({ label, value, onChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
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
      {value && (
        <div className="relative h-24 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <Image src={value} alt="Preview" fill className="object-cover" sizes="400px" unoptimized />
        </div>
      )}
    </div>
  );
}
