import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "components/Layout";
import ProductsContextProvider from "lib/contexts/ProductContext";
import Loading from "components/Loading";
import AppRoutes from "components/Routes";

export const App = React.memo(() => {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ProductsContextProvider>
  );
});
