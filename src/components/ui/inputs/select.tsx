import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Label } from '../label';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: number | string; label: string }[];
  value?: any;
  label?: string;
  errorMessage?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, errorMessage, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <Label htmlFor={props.name}>{label}</Label>}
        <div className="relative ">
          <select
            ref={ref}
            className={cn(
              'appearance-none flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400  bg-white py focus:outline-none ',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
          <p
            className={cn(
              'hidden text-xs text-red-500 dark:text-red-900 min-h-4 absolute',
              errorMessage && 'block'
            )}
          >
            {errorMessage}
          </p>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
