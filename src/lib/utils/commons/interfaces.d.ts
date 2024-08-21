declare interface INewProduct {
  label: string;
  reference: string;
  quantity: number;
  expiration_date: Date;
}
declare interface IProduct extends INewProduct {
  id: number;
}
export { INewProduct, IProduct };
