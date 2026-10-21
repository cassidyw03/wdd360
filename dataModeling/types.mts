// TypeScript interfaces for the SleepOutside collections:
// products, users, orders, reviews, alerts
// LineItem and Address are shared sub-documents used inside other interfaces.

// ---------- Shared sub-documents ----------

export interface LineItem {
  productId: string;
  name: string;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// ---------- Product ----------

export interface ProductReviewSummary {
  ReviewsUrl: string;
  ReviewCount: number;
  AverageRating: number;
}

export interface ExtraImage {
  Title: string;
  Src: string;
}

export interface ProductImages {
  PrimarySmall: string;
  PrimaryMedium: string;
  PrimaryLarge: string;
  PrimaryExtraLarge: string;
  ExtraImages?: ExtraImage[] | null;
}

export interface ProductColor {
  ColorCode: string;
  ColorName: string;
  ColorChipImageSrc: string;
  ColorPreviewImageSrc: string;
}

export interface ProductBrand {
  Id: string;
  Url: string;
  ProductsUrl: string;
  LogoSrc?: string;
  Name: string;
}

export interface Product {
  _id: string;
  Id: string;
  Category: "backpacks" | "sleeping-bags" | "tents";
  IsClearance: boolean;
  IsNew: boolean;
  Url: string;
  Reviews: ProductReviewSummary;
  NameWithoutBrand: string;
  Name: string;
  IsFamousBrand: boolean;
  Images: ProductImages;
  SizesAvailable: Record<string, unknown>;
  Colors: ProductColor[];
  DescriptionHtmlSimple: string;
  SuggestedRetailPrice: number;
  Brand: ProductBrand;
  ListPrice: number;
  FinalPrice: number;
}

// ---------- User ----------

export interface User {
  _id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  address?: Address;
  cart: LineItem[];
  createdAt: Date;
  modifiedAt: Date;
}

// ---------- Order ----------

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: LineItem[];
  shippingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  orderTotal: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  modifiedAt: Date;
}

// ---------- Review ----------

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: Date;
  modifiedAt: Date;
}

// ---------- Alert ----------

export interface Alert {
  _id: string;
  title: string;
  type: "warning" | "info" | "promotion";
  status: "active" | "inactive";
  createdAt: Date;
  modifiedAt: Date;
}
