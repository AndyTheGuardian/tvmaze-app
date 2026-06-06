import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  active: boolean;
}

export function SearchBar({ value, onChange, placeholder, active }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div
      className={`
        transition-all duration-300
        grid ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
      `}
    >
      <input
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full rounded-lg border border-gray-400 
        bg-gray-200/60 backdrop-blur-sm p-2 
        text-gray-950
        selection:bg-gray-700/60 selection:text-gray-200
          focus:outline-none focus:border-gray-600
          overflow-hidden transition-all duration-300
          ${active ? "block opacity-100 mb-3" : "hidden opacity-0 mb-0"}
        `}
      />
    </div>
  );
}
