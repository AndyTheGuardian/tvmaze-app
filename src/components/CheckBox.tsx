export interface CheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  id?: string;
  label: string;
  sublabel?: string;
  boxposition?: "items-start" | "items-center" | "items-end";
}

export function Checkbox({
  label,
  sublabel,
  boxposition,
  ...inputProps
}: CheckboxProps) {
  return (
    <div
      className={`
        relative w-full 
        flex gap-2 
        mt-3 ml-0.5 mb-2 
        ${boxposition ? boxposition : "items-start"}
            `}
    >
      <input
        className="
        peer relative appearance-none shrink-0 w-5 h-5 
        rounded-sm bg-gray-200/60
        ring-offset-0 ring-1 ring-gray-300 
        dark:ring-gray-600
        focus:outline-none focus:ring-offset-0 
        focus:ring-[1px] focus:ring-gray-500 
        dark:focus:ring-gray-500
        disabled:border-steel-400 disabled:bg-steel-400 
        shadow-md
        "
        type="checkbox"
        {...inputProps}
      />
      <svg
        className="
        absolute
        w-5 h-5 
        pointer-events-none 
        hidden 
        peer-checked:block 
      stroke-gray-950 dark:stroke-gray-950 outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <div className="flex flex-col">
        <label
          className="font-semibold select-none text-gray-700 dark:text-gray-100"
          htmlFor={inputProps.id}
        >
          {label}
        </label>
        {sublabel && (
          <label
            className="-mt-px text-[8pt] font-normal select-none text-gray-600 dark:text-gray-400"
            htmlFor={inputProps.id}
          >
            {sublabel}
          </label>
        )}
      </div>
    </div>
  );
}

export default Checkbox;
