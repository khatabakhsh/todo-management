import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

export default PaginationContent;
