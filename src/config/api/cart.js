import Axios from ".";
import { colorTrace } from "../../utils/index";
export const getCoupons = (data) => {
  return Axios.post("/api/coupons", { data });
};

export const verifyCart = (data, couponId) => {
  // let data = data;

  console.log("verifycart data >>>", { data, couponId });
  let temp = {
    cart: [
      {
        name: "Marion Gift Set",
        placementImage: undefined,
        placements: undefined,
        product_id: 483,
        product_variation_id: 6211,
        quantity: 1,
        selectedIndex: undefined,
        variation_placement: "Outside",
      },
    ],
    placements: [],
  };

  console.log("JOUSHWA FINAL", data);
  // return;
  if (couponId) {
    data.coupon_id = couponId;
    data.currency = "PKR";

    data.currencySymbol = "Rs";
    data.exchangeRates = "1";
  }
  return Axios.post("/api/verify_cart", {
    data,
  });
};

export const placeOrder = (data) => {
  return Axios.post("/api/checkout", data);
};

export const cartCheckout = (data) => {
  // console.log("dataaa cart", data);
  return Axios.post("/api/cartCheckout", data);
};
export const abandonedCart = (data) => {
  // console.log("abandonedCart ", data);
  return Axios.post("/api/saveCartDetails", data);
};

export const getOrders = (params) => {
  return Axios.get("/api/customerOrders", {
    params,
  });
};

export const getAllOrders = (params) => {
  return Axios.get("/api/customerOrdersList", {
    params,
  });
};

export const getOrderDetail = (params) => {
  return Axios.get("/api/customerOrderDetail", {
    params,
  });
};

export const getAllShippingAddress = (params) => {
  return Axios.get("/api/userAddresses", {
    params,
  });
};

export const deleteShippingAddress = (data) => {
  return Axios.post("/api/userAddressesDelete", data);
};
export const updateShippingAddress = (data) => {
  return Axios.post("/api/userAddressesUpdate", data);
};
