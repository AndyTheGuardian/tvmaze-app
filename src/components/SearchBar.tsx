interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search TV shows..."
      className="w-full rounded-lg border border-gray-400 
      bg-gray-200 p-2 
      focus:outline-none focus:border-gray-600 "
    />
  );
}
