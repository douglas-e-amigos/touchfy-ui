interface FySwitchProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function FySwitch({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
}: Readonly<FySwitchProps>): React.ReactElement {
  return (
    <div className="flex items-center gap-x-3">
      <button
        type="button" id={id} name={name}
        role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-300 border
          ${checked ? 'bg-primary border-primary' : 'bg-mauve-900 border-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full
            bg-white transition-transform duration-300
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>

      {label && (
        <label
          htmlFor={id}
          className={`font-semibold ${disabled ? 'text-gray-500' : 'text-white'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
