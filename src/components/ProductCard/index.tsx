import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useTheme } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";

import { ActionsColumn } from "components/Views/ActionsColumn";
import { useProducts } from "lib/hooks/useProduct";
import { IProduct } from "lib/utils/commons/interfaces";

declare interface IProductCardProps {
  product: IProduct;
  onSelectedProduct: () => void;
}

export default function ProductCard({
  product,
  onSelectedProduct,
}: IProductCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();
  const modal = useRef();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        p: 1,
        cursor: "pointer",
      }}
      onClick={() => navigate(`product/${product.id}`)}
    >
      <CardMedia
        component="img"
        height="140"
        image={`https://picsum.photos/id/${product?.id}/200`}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product?.reference}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <CardHeader
          title={product?.label}
          subheader={"quantity: " + product.quantity}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        <CardActions>
          <ActionsColumn
            row={product}
            onEditRow={(row) => {
              onSelectedProduct(row);
            }}
            onDeleteRow={(row) => {
              deleteProduct(row.id);
            }}
          />
        </CardActions>
        <Typography variant="label">
          expire in: {product.expiration_date}
        </Typography>
      </Box>
    </Card>
  );
}
