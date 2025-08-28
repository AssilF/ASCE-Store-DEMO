import React from "react";

interface ModelViewerProps {
  label?: string;
}

export function ModelViewer({ label }: ModelViewerProps) {
  return (
    <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-xs text-muted-foreground">
      3D View{label ? `: ${label}` : ""}
    </div>
  );
}

export default ModelViewer;
