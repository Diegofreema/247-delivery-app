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

export type ReturnType = {
  product: string;
  datex: string;
  price: string;
  qty: string;
  id: string;
  salesreference: string;
  sellerinfo: string;
};
export type ReturnT = {
  product: string;
  datex: string;
  price: string;
  qty: string;
  id: string;
  salesreference: string;
  BuyerInfo: string;
};

// {"product":"Molfix Size 4 MAXI - 8pcs","datex":"Fri 02 Feb 04:55 AM","price":"1,500","qty":"1","id":"10109","salesreference":"M5463F5693K1994T1754O6752D3381L6270N4102W5669K4630","BuyerInfo":"Ibe Levio Udoezuo
// 07034982490
// Total Care Medical Center uratta
// URATTA - OWERRI NORTH"}
