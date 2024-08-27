import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const ProductDetails = React.lazy(() => import("pages/ProductDetails"));
const CGV = React.lazy(() => import("pages/CGV"));
const ProductList = React.lazy(() => import("pages/ProductList"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cgv" element={<CGV />} />
    </Routes>
  );
};
export default AppRoutes;
