import React, { createContext, useReducer } from "react";

import { ProductReducer } from "lib/reducers/ProductReducer";
export const ProductsContext = createContext([]);

const products = JSON.parse(localStorage.getItem("productsList"));
const initialState = products;

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const filter = (payload) => {
    dispatch({ type: "FILTER", payload });
  };
  const manageProducts = (payload) => {
    dispatch({ type: "MANAGE_PRODUCT", payload });
  };
  const deleteProduct = (payload) => {
    dispatch({ type: "REMOVE_PRODUCT", payload });
  };
  const contextValues = {
    filter,
    manageProducts,
    deleteProduct,
    list: [...state],
  };

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
