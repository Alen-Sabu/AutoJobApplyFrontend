"use client";

import React from "react";
import { Download } from "lucide-react";

export interface ResumePreviewProps {
  /** Object URL from URL.createObjectURL(blob) */
  blobUrl: string;
  /** Display filename (used for download) */
  fileName: string;
  /** Optional title above the viewer */
  title?: string;
  /** Min height for the PDF container (default 70vh) */
  minHeight?: string;
  /** Optional class for the wrapper */
  className?: string;
  /** Show the header row (filename + Download). Default true. Set false when parent provides its own. */
  showHeader?: boolean;
}

export default function ResumePreview({
  blobUrl,
  fileName,
  title,
  minHeight = "70vh",
  className = "",
  showHeader = true,
}: ResumePreviewProps) {
  const isPdf = (fileName || "").toLowerCase().endsWith(".pdf");

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || "resume.pdf";
    a.click();
  };

  return (
    <div className={className}>
      {showHeader && (title || fileName) && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {title && <p className="text-sm font-medium text-muted">{title}</p>}
          <span className="text-sm text-muted truncate max-w-[200px]" title={fileName}>
            {fileName}
          </span>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 shrink-0"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      )}
      <div className="rounded-xl border border-dark_border bg-dark_grey/50 overflow-hidden">
        {isPdf ? (
          <div className="w-full bg-white" style={{ minHeight }}>
            <object
              data={blobUrl}
              type="application/pdf"
              className="w-full"
              style={{ minHeight }}
              aria-label="Resume PDF"
            >
              <div className="flex flex-col items-center justify-center p-8 text-muted" style={{ minHeight }}>
                <p className="mb-4">Your browser may not support inline PDF viewing.</p>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20"
                >
                  <Download className="h-4 w-4" />
                  Download resume instead
                </button>
              </div>
            </object>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted mb-4">
              Preview is available for PDF files. Your file is <strong className="text-white">{fileName}</strong>.
            </p>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20"
            >
              <Download className="h-4 w-4" />
              Download resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
