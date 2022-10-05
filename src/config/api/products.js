import Axios from ".";

export const allProducts = (params) => {
  return Axios.get("/api/productsList", {
    params,
  });
};

export const productDetail = (params) => {
  return Axios.get("/api/productDetail", {
    params,
  });
};

export const giftDetail = (params) => {
  return Axios.get("/api/giftSetDetail", {
    params,
  });
};

export const searchProduct = (params) => {
  return Axios.get("/api/productSearch", {
    params,
  });
};
export const getColorsData = (params) => {
  return Axios.get("/api/colorOptions", {
    params,
  });
};

export const getProductPersonalization = (params) => {
  return Axios.get("/api/placementFontsColors", {
    params,
  });
};

export const sendProductPersonalization = (data) => {
  return Axios.post("/api/placementImage", data);
};

export const addToWishlist = (data) => {
  return Axios.post("/api/wishlistAdd", data);
};

export const removeFromWishlist = (data) => {
  return Axios.post("/api/wishlistDelete", data);
};

export const getWishlist = (params) => {
  return Axios.get("/api/wishlistList", {
    params,
  });
};
