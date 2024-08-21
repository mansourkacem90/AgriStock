import React, { useState, useEffect, useImperativeHandle } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import moment from "moment";

import { useProducts } from "lib/hooks/useProduct";
import { IProduct } from "lib/utils/commons/interfaces";

declare interface IProductManagementProps {
  product: IProduct;
  ref: React.RefObject<HTMLInputElement>;
  create?: boolean;
}
export const ProductManagement = React.forwardRef(
  ({ product }, ref): IProductManagementProps => {
    const { manageProducts } = useProducts();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [prd, setPrd] = useState({
      label: "",
      reference: "",
      quantity: 0,
      expiration_date: moment(new Date()).format("YYYY-MM-DD"),
    });
    const [blur, setBlur] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const [productError, setProductError] = useState({
      label: false,
      reference: false,
      quantity: false,
    });

    useEffect(() => {
      if (product) {
        setPrd({
          ...product,
        });
      }
      setProductError({
        ...productError,
        label: !product?.label,
        reference: !product?.reference,
        quantity: !product?.quantity,
      });
    }, [product]);
    useImperativeHandle(ref, () => ({
      setShowModal: () => setModalVisibility(true),
      setCloseModal: () => setModalVisibility(false),
    }));
    const handleSubmit = (event) => {
      event.preventDefault();
      resetData();
      manageProducts(prd);
      setModalVisibility(false);
    };

    const handleClose = () => {
      resetData();
      setModalVisibility(false);
    };
    const resetData = () => {
      setPrd({
        label: "",
        reference: "",
        quantity: 0,
        expiration_date: moment(new Date()).format("YYYY-MM-DD"),
      });
      setBlur("");
    };

    const handleData = (e) => {
      const { name, value } = e.target;
      setPrd({
        ...prd,
        [name]:
          name == "expiration_date"
            ? moment(new Date(value)).format("YYYY-MM-DD")
            : value,
      });
      setProductError({
        ...productError,
        [name]: name == "quantity" ? value < 0 : !value,
      });
    };
    const { label, reference, quantity } = productError;

    return (
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={modalVisibility}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ background: "blue", color: "white" }}
          >
            {`${product ? "Edit product" : "Add New Product"}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Label"
                  onChange={handleData}
                  name="label"
                  required
                  variant="outlined"
                  color="secondary"
                  type="text"
                  sx={{ mb: 3, mt: 3 }}
                  fullWidth
                  value={prd?.label}
                  error={label}
                  onBlur={() => setBlur("label")}
                  helperText={
                    label && blur == "label" ? "label should not be empty" : ""
                  }
                />
                <TextField
                  label="Reference"
                  onChange={handleData}
                  required
                  variant="outlined"
                  name="reference"
                  color="secondary"
                  type="text"
                  value={prd?.reference}
                  error={reference}
                  onBlur={() => setBlur("reference")}
                  helperText={
                    reference && blur == "reference"
                      ? "reference should not be empty"
                      : ""
                  }
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  onChange={handleData}
                  required
                  variant="outlined"
                  color="secondary"
                  type="number"
                  value={prd?.quantity}
                  error={quantity}
                  onBlur={() => setBlur("quantity")}
                  helperText={
                    quantity && blur == "quantity"
                      ? "quantity should not be less than 0 value"
                      : ""
                  }
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Expiration Date"
                  onChange={handleData}
                  required
                  variant="outlined"
                  color="secondary"
                  type="date"
                  name="expiration_date"
                  value={prd?.expiration_date}
                  fullWidth
                  sx={{ mb: 3 }}
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              autoFocus
              variant="contained"
              color="primary"
              disabled={label || reference || quantity}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
);
