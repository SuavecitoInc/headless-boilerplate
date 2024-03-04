import React from 'react';
import clsx from 'clsx';

export const styles = 'bg-slate-200 animate-pulse rounded-md';

type SkeletonProps = {
  className?: string;
};
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={clsx(className, styles)} />
);

type TextSkeletonProps = SkeletonProps & {
  length?: 'shorter' | 'short' | 'medium' | 'long';
  type?: 'text' | 'heading';
};

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  className,
  length = 'medium',
  type = 'text',
}) => {
  let sizeClasses = '';

  switch (length) {
    case 'shorter':
      sizeClasses = 'w-16 h-5';
      break;
    case 'short':
      sizeClasses = 'w-24 h-5';
      break;
    case 'medium':
      sizeClasses = 'w-48 h-5';
      break;
    case 'long':
      sizeClasses = 'w-full h-5';
      break;
    default:
      sizeClasses = 'w-48 h-5'; // Default to medium
  }

  if (type === 'heading') {
    switch (length) {
      case 'short':
        sizeClasses = 'w-24 h-7';
        break;
      case 'medium':
        sizeClasses = 'w-48 h-7';
        break;
      case 'long':
        sizeClasses = 'w-full h-7';
        break;
      default:
        sizeClasses = 'w-1/2 h-7'; // Default to medium
    }
  }

  return <div className={clsx(className, styles, sizeClasses)} />;
};
