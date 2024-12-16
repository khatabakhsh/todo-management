import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../label';

export interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string;
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, errorMessage, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <Label htmlFor={props.name}>{label}</Label>}
        <textarea
          id={props.name}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
            className
          )}
          ref={ref}
          {...props}
        />
        <p
          className={cn(
            'hidden text-xs text-red-500 dark:text-red-900 min-h-4 absolute',
            errorMessage && 'block'
          )}
        >
          {errorMessage}
        </p>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
