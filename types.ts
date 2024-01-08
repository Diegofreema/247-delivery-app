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
  Latitude?: string;
  Longitude?: string;
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
  qty: string;
  salesreference: string;
};

export type Params = {
  address: string;
  date: string;
  id: string;
  info: string;
  name: string;
  price: string;
  product: string;
  productId: string;
  quantity: string;
  salesreference: string;
};
