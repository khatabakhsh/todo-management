import { ComponentProps } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import PaginationButton from './paginationButton';

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton className={cn(className)} {...props}>
    <ChevronLeft className="w-4 h-4" />
  </PaginationButton>
);
PaginationNext.displayName = 'PaginationNext';

export default PaginationNext;
