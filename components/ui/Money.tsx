import React from 'react';
import type { MoneyV2 } from '@/types/storefront';
import { formatMoney } from '@/utils/helpers';

type MoneyProps = {
  data: MoneyV2;
  className?: string;
};

const Money: React.FC<MoneyProps> = ({ data, className = '' }) => (
  <span className={className}>${formatMoney(data.amount)}</span>
);

export default Money;
