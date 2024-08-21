import React, { useState, useRef } from "react";

import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import { CardsView, ListView } from "components/Views";
import { ToggleViewMode } from "components/ToggleMode/ToggleViewMode";
import { useProducts } from "lib/hooks/useProduct";
import { ProductManagement } from "components/Dialogs/ProductManagement";

const ProductList = (): React.FC => {
  const [label, setLabel] = useState("");
  const [id, setId] = useState("");
  const [reference, setReference] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState({});

  const { list, filter } = useProducts();
  const modal = useRef();

  const handleViewMode = (mode) => {
    setViewMode(mode);
  };
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
        gap: { xs: 3, sm: 3 },
      }}
    >
      <Box>
        <Box
          sx={{
            width: { sm: "100%", md: "100%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            Products List
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See what our customers love about our products. Discover how we
            epxxcel in efficiency, durability, and satisfaction. Join us for
            quality, innovation, and reliable support.
          </Typography>
        </Box>
        <Box
          maxWidth="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: { sm: "100%", md: "100%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              marginTop: 2,
            }}
          >
            <TextField
              id="search-bar"
              className="text"
              onInput={(e) => {}}
              label="Enter the product label"
              variant="outlined"
              placeholder="Search..."
              size="small"
              onChange={(e) => {
                setLabel(e.target.value);
                filter({ label: e.target.value, id, reference });
              }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              marginTop: 2,
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-id">ID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id}
                label="Id"
                onChange={(e) => {
                  const { value } = e.target;
                  filter({ label, id: value, reference });
                  setId(value);
                }}
                autoWidth={true}
                sx={{ maxHeight: 40 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 12 }}>
              <InputLabel id="demo-simple-select-label">Ref</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reference}
                label="Id"
                onChange={(e) => {
                  const { value } = e.target;
                  filter({ label, id, reference: value });
                  setReference(value);
                }}
                autoWidth={true}
                sx={{ maxHeight: 40 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"ENG"}>ENG</MenuItem>
                <MenuItem value={"HERB-003"}>HERB</MenuItem>
                <MenuItem value={"PEST"}>PEST</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "80%",
        }}
      >
        <ToggleViewMode mode={viewMode} toggleViewMode={handleViewMode} />
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={() => modal.current.setShowModal()}
        >
          Add New Product
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ width: "80%", boxShadow: 1 }}>
        {viewMode == "list" ? (
          <ListView
            list={list}
            onSelectedProduct={(row) => {
              modal.current.setShowModal();
              setSelectedProduct(row);
            }}
            selectedProduct={selectedProduct}
          />
        ) : (
          <CardsView
            list={list}
            onSelectedProduct={(row) => {
              modal.current.setShowModal();
              setSelectedProduct(row);
            }}
            selectedProduct={selectedProduct}
          />
        )}
      </Grid>
      <ProductManagement ref={modal} product={selectedProduct} />
    </Container>
  );
};
export default ProductList;
