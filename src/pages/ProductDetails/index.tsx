import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Divider from "@mui/material/Divider";

import { ActionsColumn } from "components/Views/ActionsColumn";
import { ProductManagement } from "components/Dialogs/ProductManagement";
import { useProducts } from "lib/hooks/useProduct";
const ProductDetails = () => {
  let { id } = useParams();
  const modal = useRef();
  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const { list, deleteProduct } = useProducts();

  const navigate = useNavigate();
  useEffect(() => {
    const product = list.find((prd) => prd.id == id);
    setProduct(product);
  }, [id, list]);

  return (
    <Container
      id="products"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 351, height: 351 }}
          image={`https://picsum.photos/id/${product?.id}/200`}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: 351 }}>
          <CardContent>
            <Typography component="div" variant="h5">
              {product?.label}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {product?.reference}
            </Typography>
            <Divider />

            <Typography variant="subtitle1" component="h2" color="secondary">
              {product?.quantity}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              expire on: {product?.expiration_date}
            </Typography>
          </CardContent>
          {/* sx={{ flex: "1 0 auto" }} */}
          <Box sx={{ flex: "1 0 auto", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous"></IconButton>
            <IconButton aria-label="play/pause"></IconButton>
          </Box>
          <Box sx={{ display: "flex", pl: 1, pb: 1 }}>
            <CardActions>
              <ActionsColumn
                row={product}
                onEditRow={(row) => {
                  modal.current.setShowModal();
                  setSelectedProduct(row);
                }}
                onDeleteRow={(row) => {
                  deleteProduct(row.id);
                  navigate("/");
                }}
                onViewRow={(id) => navigate(`product/${id}`)}
              />
            </CardActions>
          </Box>
        </Box>
      </Card>
      <ProductManagement product={selectedProduct} ref={modal} />
    </Container>
  );
};
export default ProductDetails;
