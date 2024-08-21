import React, { useState, useEffect, useImperativeHandle } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField, FormControl, Button } from "@mui/material";
import moment from "moment";

import { useProducts } from "lib/hooks/useProduct";
import { IProduct } from "lib/utils/commons/interfaces";

declare interface IProductManagementProps {
  product: IProduct;
  ref: React.RefObject<HTMLInputElement>;
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
    const [modalVisibility, setModalVisibility] = useState(false);
    const [productError, setProductError] = useState(false);

    useEffect(() => {
      if (product?.id) {
        setPrd({
          ...product,
        });
      }
    }, [product?.id]);
    useImperativeHandle(ref, () => ({
      setShowModal: () => setModalVisibility(true),
      setCloseModal: () => setModalVisibility(false),
    }));
    const handleSubmit = (event) => {
      event.preventDefault();
      manageProducts(prd);
      setModalVisibility(false);
      // setEmailError(false);
      // setPasswordError(false);

      // if (email == "") {
      //   setEmailError(true);
      // }
      // if (password == "") {
      //   setPasswordError(true);
      // }

      // if (email && password) {
      //   console.log(email, password);
      // }
    };

    const handleClose = () => {
      setModalVisibility(false);
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
    };
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
            {`Edit product`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form autoComplete="off" onSubmit={handleSubmit}>
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
                  // error={emailError}
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
                  // error={passwordError}
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
                  // error={passwordError}
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
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
);
