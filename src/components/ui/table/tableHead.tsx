import { forwardRef, ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-11 px-2 text-right align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] dark:text-neutral-400',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export default TableHead;
