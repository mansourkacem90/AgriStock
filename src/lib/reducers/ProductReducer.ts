import { isInclude } from "lib/utils/commons/helpers";
const products = JSON.parse(localStorage.getItem("productsList")) || [];
export const ProductReducer = (state = [...products], action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS_LIST":
      const initialList = [...action.payload];
      localStorage.setItem("productsList", JSON.stringify(initialList));
      return initialList;
    case "FILTER":
      console.log(
        'localStorage.getItem("productsList")',
        localStorage.getItem("productsList"),
        products
      );

      const filtredList = JSON.parse(
        localStorage.getItem("productsList")
      ).filter(({ label, id, reference }) => {
        return (
          isInclude(label, action.payload.label) &&
          isInclude(String(id), String(action.payload.id)) &&
          isInclude(reference, action.payload.reference)
        );
      });
      return filtredList;
    case "MANAGE_PRODUCT":
      const list = [...state];
      if (action.payload.id) {
        const updatedProduct = action.payload;

        const updatedProducts = state.map((Product) => {
          if (Product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return Product;
        });
        localStorage.setItem("productsList", JSON.stringify(updatedProducts));
        return updatedProducts;
      } else {
        const listOfPrd = [
          ...list,
          {
            ...action.payload,
            id: list[list.length - 1].id + 1,
          },
        ];
        localStorage.setItem("productsList", JSON.stringify(listOfPrd));

        return listOfPrd;
      }
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);
    default:
      return products;
  }
};
