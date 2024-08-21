import React, { useContext } from "react";
import { ProductsContext } from "../contexts/ProductContext";

export const useProducts = () => {
  const ctx = useContext(ProductsContext);

  return {
    ...ctx,
  };
};
