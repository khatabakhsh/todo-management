import { ComponentProps } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import PaginationButton from './paginationButton';

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton className={cn(className)} {...props}>
    <ChevronRight className="w-4 h-4" />
  </PaginationButton>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export default PaginationPrevious;
