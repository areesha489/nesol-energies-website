"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Loader2, Plus, Trash2 } from "lucide-react";

interface ImagesFieldProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ImagesField({ label, value, onChange }: ImagesFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const images = value ?? [];

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange([...images, data.url]);
    } finally {
      setUploading(false);
    }
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...images, url]);
    setUrlInput("");
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="Image URL add karein"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <button
          type="button"
          onClick={addUrl}
          disabled={!urlInput.trim()}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          <Plus size={14} /> Add
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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

      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <div className="relative h-28 w-full">
                <Image src={url} alt={`Image ${index + 1}`} fill className="object-cover" sizes="200px" unoptimized={url.startsWith("/uploads/")} />
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
                {index + 1} / {images.length}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">Koi image nahi — URL ya upload se add karein.</p>
      )}
    </div>
  );
}
