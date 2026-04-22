interface FyInputProps {
  label?: string;
  placeholder: string;
  icon?: React.ReactElement;
  name: string;
  id: string;
  onChange: (value: string) => void;
  type?: 'text' | 'date' | 'password';
  error?: string;
}

export default function FyInput({
  label,
  placeholder,
  icon,
  name,
  onChange,
  id,
  error,
  type = 'text',
}: FyInputProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-y-1">
      {label && (
        <label htmlFor={id} className="text-white font-semibold">
          {label}
        </label>
      )}

      {error && (
        <span className="text-red-500 text-sm italic">{error}</span>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`
            w-full
            bg-mauve-900
            placeholder:text-gray-500
            border border-gray-600
            rounded-md
            py-2
            ${icon ? "pl-10" : "pl-3"}
            pr-3
            ${type === 'date' ? 'text-gray-500' : 'text-white'}
          ` + (error ? 'border-red-600' : '')
          }
        />
      </div>
    </div>
  );
}