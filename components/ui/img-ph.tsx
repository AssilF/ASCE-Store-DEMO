import { Image as ImageIcon } from "lucide-react";

export default function ImgPh({ label }: { label: string }) {
  return (
    <div className="bg-slate-200 dark:bg-slate-700 rounded-lg w-full aspect-[4/3] flex flex-col items-center justify-center text-[10px] text-slate-600 dark:text-slate-300">
      <ImageIcon className="w-4 h-4 mb-1" />
      {label}
    </div>
  );
}
