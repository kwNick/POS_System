export type UserDataObject = {
  userData: UserDataDTO;
};

export type UserDataDTO = {
  user: UserDTO;
  shops: ShopDTO[];
};

export type UserDTO = {
  id: number;
  username: string;
  email: string;
};

export type ShopDTO = {
  shop_info: ShopInfoDTO;
  products: ProductDTO[];
  sales: SaleDTO[];
  employees: EmployeeDTO[];
};

export type ShopInfoDTO = {
  id: number;
  name: string;
  location: string | null;
};

export type ProductDTO = {
  id: number;
  name: string;
  description: string | null;
  sku: string;
  price: number;
  stockQuantity: number;
  active: boolean;
};

export type EmployeeDTO = {
  id: number;
  username: string;
  pin: number;
  position: string;
};

export type SaleDTO = {
  sale_info: SaleInfoDTO;
  sale_items: SaleItemDTO[];
  payments: PaymentDTO[];
};

export type SaleInfoDTO = {
  id: number;
  shop_id: number;
  user_id: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  created_at: string;
};

export type SaleItemDTO = {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type PaymentDTO = {
  id: number;
  sale_id: number;
  payment_method: string;
  amount: number;
  status: string;
  transaction_reference: string | null;
  created_at: string;
};


// The difference:
// - type can describe object shapes, unions, intersections, and other types.
// - interface is useful for object contracts and can be extended or declaration-merged.
// - export default is simply a default-export style, not a special DTO feature.