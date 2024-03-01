import { useContext } from 'react';
import { ProductContext } from './context';

export const useProduct = () => useContext(ProductContext);
export default useProduct;
