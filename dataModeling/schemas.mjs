// JSON Schemas (draft-07) for the SleepOutside collections:
// products, users, orders, reviews, alerts
// LineItem and Address are shared sub-schemas embedded inside other schemas,
// so they leave off $schema (only allowed at the root of a schema).

const dateTime = {
  type: "string",
  format: "date-time",
};

// ---------- Shared sub-schemas ----------

export const lineItemSchema = {
  title: "LineItem",
  description: "A product in a cart or order, with the details needed to display and charge for it",
  type: "object",
  required: ["productId", "name", "image", "quantity", "price"],
  properties: {
    productId: {
      type: "string",
      minLength: 1,
      description: "The Id of the product (matches Product.Id), must not be blank",
    },
    name: {
      type: "string",
      minLength: 1,
      description: "Product name copied at the time it was added, must not be blank",
    },
    image: {
      type: "string",
      description: "Small product image path for displaying in the cart/order",
    },
    color: {
      type: "string",
      description: "The ColorName chosen by the user, if the product has colors",
    },
    size: {
      type: "string",
      description: "The size chosen by the user, if the product has sizes",
    },
    quantity: {
      type: "integer",
      minimum: 1,
      description: "How many of this product, must be at least 1",
    },
    price: {
      type: "number",
      minimum: 0,
      description: "The price of one item (FinalPrice) at the time it was added/ordered",
    },
  },
};

export const addressSchema = {
  title: "Address",
  description: "A mailing/shipping address",
  type: "object",
  required: ["street", "city", "state", "zip", "country"],
  properties: {
    street: {
      type: "string",
      minLength: 1,
      description: "Street address, must not be blank",
    },
    city: {
      type: "string",
      minLength: 1,
      description: "City, must not be blank",
    },
    state: {
      type: "string",
      minLength: 2,
      maxLength: 2,
      description: "Two-letter state code, e.g. ID",
    },
    zip: {
      type: "string",
      pattern: "^[0-9]{5}(-[0-9]{4})?$",
      description: "ZIP code, stored as a string so leading zeros are kept",
    },
    country: {
      type: "string",
      minLength: 1,
      description: "Country, e.g. US",
    },
  },
};

// ---------- Product ----------

export const productSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Product",
  description: "Schema for Product object (based on the SleepOutside product JSON)",
  type: "object",
  required: [
    "_id",
    "Id",
    "Category",
    "IsClearance",
    "IsNew",
    "Url",
    "Reviews",
    "NameWithoutBrand",
    "Name",
    "IsFamousBrand",
    "Images",
    "SizesAvailable",
    "Colors",
    "DescriptionHtmlSimple",
    "SuggestedRetailPrice",
    "Brand",
    "ListPrice",
    "FinalPrice",
  ],
  properties: {
    _id: {
      type: "string",
      description: "MongoDB identifier, added automatically on import",
    },
    Id: {
      type: "string",
      minLength: 1,
      description: "The store's product code, e.g. 20CXG",
    },
    Category: {
      type: "string",
      enum: ["backpacks", "sleeping-bags", "tents"],
      description: "The product category used for browsing/filtering",
    },
    IsClearance: {
      type: "boolean",
      description: "True if the product is on clearance",
    },
    IsNew: {
      type: "boolean",
      description: "True if the product is new",
    },
    Url: {
      type: "string",
      description: "Relative URL of the product page",
    },
    Reviews: {
      type: "object",
      description: "Summary of the product's reviews (full reviews live in the reviews collection)",
      required: ["ReviewsUrl", "ReviewCount", "AverageRating"],
      properties: {
        ReviewsUrl: { type: "string" },
        ReviewCount: { type: "integer", minimum: 0 },
        AverageRating: { type: "number", minimum: 0, maximum: 5 },
      },
    },
    NameWithoutBrand: {
      type: "string",
      minLength: 1,
      description: "Product name without the brand, must not be blank",
    },
    Name: {
      type: "string",
      minLength: 1,
      description: "Full product name including the brand, must not be blank",
    },
    IsFamousBrand: {
      type: "boolean",
    },
    Images: {
      type: "object",
      description: "Embedded image paths for the product in several sizes",
      required: ["PrimarySmall", "PrimaryMedium", "PrimaryLarge", "PrimaryExtraLarge"],
      properties: {
        PrimarySmall: { type: "string" },
        PrimaryMedium: { type: "string" },
        PrimaryLarge: { type: "string" },
        PrimaryExtraLarge: { type: "string" },
        ExtraImages: {
          type: ["array", "null"],
          description: "Additional product images, null when there are none",
          items: {
            type: "object",
            required: ["Title", "Src"],
            properties: {
              Title: { type: "string" },
              Src: { type: "string" },
            },
          },
        },
      },
    },
    SizesAvailable: {
      type: "object",
      description: "Available sizes, may be empty {}",
    },
    Colors: {
      type: "array",
      description: "Color options for the product",
      items: {
        type: "object",
        required: ["ColorCode", "ColorName", "ColorChipImageSrc", "ColorPreviewImageSrc"],
        properties: {
          ColorCode: { type: "string" },
          ColorName: { type: "string" },
          ColorChipImageSrc: { type: "string" },
          ColorPreviewImageSrc: { type: "string" },
        },
      },
    },
    DescriptionHtmlSimple: {
      type: "string",
      description: "Product description, may contain simple HTML",
    },
    SuggestedRetailPrice: {
      type: "number",
      minimum: 0,
    },
    Brand: {
      type: "object",
      description: "Embedded brand info",
      required: ["Id", "Url", "ProductsUrl", "Name"],
      properties: {
        Id: { type: "string" },
        Url: { type: "string" },
        ProductsUrl: { type: "string" },
        LogoSrc: { type: "string" },
        Name: { type: "string" },
      },
    },
    ListPrice: {
      type: "number",
      minimum: 0,
    },
    FinalPrice: {
      type: "number",
      minimum: 0,
      description: "The price the customer actually pays",
    },
  },
};

// ---------- User ----------

export const userSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "User",
  description: "Schema for User object",
  type: "object",
  required: ["_id", "email", "passwordHash", "firstName", "lastName", "cart", "createdAt", "modifiedAt"],
  properties: {
    _id: {
      type: "string",
      description: "Unique identifier for the user",
    },
    email: {
      type: "string",
      format: "email",
      description: "Used to log in and to send order confirmations, must be a valid email (unique)",
    },
    passwordHash: {
      type: "string",
      minLength: 1,
      description: "Hashed password, never store the plain-text password",
    },
    firstName: {
      type: "string",
      minLength: 1,
      maxLength: 50,
      description: "User's first name, must not be blank",
    },
    lastName: {
      type: "string",
      minLength: 1,
      maxLength: 50,
      description: "User's last name, must not be blank",
    },
    address: {
      ...addressSchema,
      description: "Default shipping address",
    },
    cart: {
      type: "array",
      items: lineItemSchema,
      description: "The user's shopping cart, embedded so it persists across sessions. Empty array [] when the cart is empty",
    },
    createdAt: dateTime,
    modifiedAt: dateTime,
  },
};

// ---------- Order ----------

export const orderSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Order",
  description: "Schema for Order object",
  type: "object",
  required: [
    "_id",
    "orderNumber",
    "userId",
    "items",
    "shippingAddress",
    "subtotal",
    "tax",
    "shipping",
    "orderTotal",
    "status",
    "createdAt",
    "modifiedAt",
  ],
  properties: {
    _id: {
      type: "string",
      description: "Unique identifier for the order",
    },
    orderNumber: {
      type: "string",
      minLength: 1,
      description: "Human-friendly order number shown to the user (unique)",
    },
    userId: {
      type: "string",
      description: "The _id of the user who placed the order (link to users)",
    },
    items: {
      type: "array",
      minItems: 1,
      items: lineItemSchema,
      description: "Products ordered, with prices copied at the time of purchase",
    },
    shippingAddress: {
      ...addressSchema,
      description: "Copy of the address the order ships to",
    },
    subtotal: { type: "number", minimum: 0 },
    tax: { type: "number", minimum: 0 },
    shipping: { type: "number", minimum: 0 },
    orderTotal: {
      type: "number",
      minimum: 0,
      description: "subtotal + tax + shipping",
    },
    status: {
      type: "string",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      description: "The status of the order",
    },
    createdAt: dateTime,
    modifiedAt: dateTime,
  },
};

// ---------- Review ----------

export const reviewSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Review",
  description: "Schema for Review object",
  type: "object",
  required: ["_id", "productId", "userId", "userName", "rating", "comment", "createdAt", "modifiedAt"],
  properties: {
    _id: {
      type: "string",
      description: "Unique identifier for the review",
    },
    productId: {
      type: "string",
      description: "The Id of the product being reviewed (link to products)",
    },
    userId: {
      type: "string",
      description: "The _id of the user who wrote the review (link to users)",
    },
    userName: {
      type: "string",
      minLength: 1,
      description: "Display name copied from the user so it can be shown without a lookup",
    },
    rating: {
      type: "integer",
      minimum: 1,
      maximum: 5,
      description: "Star rating from 1 to 5",
    },
    title: {
      type: "string",
      maxLength: 100,
    },
    comment: {
      type: "string",
      minLength: 1,
      maxLength: 1000,
      description: "The review text, must not be blank",
    },
    createdAt: dateTime,
    modifiedAt: dateTime,
  },
};

// ---------- Alert ----------

export const alertSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Alert",
  description: "Schema for Alert object",
  type: "object",
  required: ["_id", "title", "type", "status", "createdAt", "modifiedAt"],
  properties: {
    _id: {
      type: "string",
      description: "Unique identifier for the alert",
    },
    title: {
      type: "string",
      minLength: 1,
      description: "The title of the alert, must not be blank",
    },
    type: {
      type: "string",
      enum: ["warning", "info", "promotion"],
      description: "The type of the alert, must be one of: warning, info, promotion",
    },
    status: {
      type: "string",
      enum: ["active", "inactive"],
      description: "The status of the alert, must be one of: active or inactive",
    },
    createdAt: dateTime,
    modifiedAt: dateTime,
  },
};
