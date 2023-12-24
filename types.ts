export type LoggedUserType = {
  addres: string;
  communityId: string;
  customername: string;
  email: string;
  phone: string;
  productInCart: string;
  statename: string;
};

export type PickUp = {
  product: string;
  datex: string;
  price: string;
  qty: string;
  id: string;
  salesreference: string;
  sellerinfo: string;
};

export type PrintData = {
  Product: string;
  Statename: string;
  addres: string;
  community: string;
  customername: string;
  phone: string;
  qty: string;
  salesreference: string;
  total: string;
};

export type Delivered = {
  BuyerInfo: string;
  datex: string;
  id: string;
  price: string;
  product: string;
  qty: '4';
  salesreference: string;
};
