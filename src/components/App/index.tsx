import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "components/Layout";

const ProductDetails = React.lazy(() => import("pages/ProductDetails"));
const CGV = React.lazy(() => import("pages/CGV"));
const ProductList = React.lazy(() => import("pages/ProductList"));

import ProductsContextProvider from "lib/contexts/ProductContext";
import Loading from "components/Loading";

export const App = React.memo(() => {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cgv" element={<CGV />} />
            </Routes>{" "}
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ProductsContextProvider>
  );
});
