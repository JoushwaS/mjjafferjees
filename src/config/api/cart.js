import Axios from ".";

export const getCoupons = (data) => {
  console.log("data 2", data);

  return Axios.post("/api/coupons", { data });
};

export const verifyCart = (cart, couponId) => {
  console.log("cart, placement, couponId", cart, couponId);

  let data = {
    cart: cart,
  };
  if (couponId) {
    data["coupon_id"] = couponId;
  }
  return Axios.post("/api/verify_cart", {
    data,
  });
};

export const placeOrder = (data) => {
  console.log("datadata", data?.cartDetails);
  return Axios.post("/api/checkout", data);
};

export const cartCheckout = (data) => {
  console.log("dataaa cart", data);
  return Axios.post("/api/cartCheckout", data);
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
