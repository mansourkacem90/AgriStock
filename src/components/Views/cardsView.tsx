import React from "react";

import Grid from "@mui/material/Grid";

import ProductCard from "components/ProductCard";
import { IProduct } from "lib/utils/commons/interfaces";

declare interface ICardsViewProps {
  list: Array<IProduct>;
  onSelectedProduct: () => void;
}
export const CardsView = ({
  list,
  onSelectedProduct,
}: ICardsViewProps): React.FC => {
  return list.map((product) => (
    <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }} key={product.id}>
      <ProductCard product={product} onSelectedProduct={onSelectedProduct} />
    </Grid>
  ));
};
