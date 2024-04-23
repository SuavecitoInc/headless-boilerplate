import React from 'react';
import clsx from 'clsx';
import type { MoneyV2 } from '@/types/storefront';
import { formatMoney } from '@/utils/helpers';

type MoneyProps = {
  data: MoneyV2;
  className?: string;
  isNegative?: boolean;
  strikethrough?: boolean;
};

const Money: React.FC<MoneyProps> = ({
  data,
  isNegative = false,
  className = '',
  strikethrough = false,
}) => (
  <span className={clsx(strikethrough && 'line-through', className)}>
    {isNegative && '-'}${formatMoney(data.amount)}
  </span>
);

export default Money;
