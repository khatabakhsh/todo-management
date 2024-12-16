import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100 dark:hover:bg-neutral-800/50 dark:data-[state=selected]:bg-neutral-800',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export default TableRow;
