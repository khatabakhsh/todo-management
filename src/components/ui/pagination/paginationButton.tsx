import { Button, ButtonProps, buttonVariants } from '../button';
import { cn } from '@/lib/utils';

type PaginationButtonProps = {
  isActive?: boolean;
} & ButtonProps;

const PaginationButton = ({
  className,
  isActive,
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: 'outline',
        size: 'icon',
      }),

      isActive && 'border-neutral-900 bg-neutral-100',
      className
    )}
    {...props}
  />
);
PaginationButton.displayName = 'PaginationButton';

export default PaginationButton;
