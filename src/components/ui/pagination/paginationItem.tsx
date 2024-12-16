import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

export default PaginationItem;
