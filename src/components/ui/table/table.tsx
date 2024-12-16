import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto border rounded-md">
      <table ref={ref} className={cn('w-full text-sm', className)} {...props} />
    </div>
  )
);
Table.displayName = 'Table';

export default Table;
