import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <input
      value={value}
      ref={inputRef}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search TV shows..."
      className="w-full rounded-lg border border-gray-400 
      bg-gray-200/80 p-2 
      text-gray-950
      selection:bg-gray-700/60 selection:text-gray-200
      focus:outline-none focus:border-gray-600 "
    />
  );
}
