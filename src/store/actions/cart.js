import {
  ADDTOCART,
  REMOVEFROMCART,
  UPDATETOCART,
  VERIFYCART,
  ADDPLACEMENT,
  UPDATEPLACEMENT,
  REMOVEPLACEMENT,
  REMOVE_GIFTSET_PLACEMENT,
  SAVESHIPPING,
  SAVESHIPPINGADRESSS,
  CLEARCART,
  ADD_GIFTSET_PLACEMENT,
  UPDATE_GIFTSET_PLACEMENT,
} from "../types";

const addToCart = (payload) => {
  console.log("payloadpayload", payload);
  return {
    type: ADDTOCART,
    payload,
  };
};

const removeFromCart = (id, product_variation_id, hasPlacement, placements) => {
  console.log("id, product_variation_id", id, product_variation_id);
  return {
    type: REMOVEFROMCART,
    id,
    product_variation_id,
    hasPlacement,
    placements,
  };
};
const saveShipping = (payload) => {
  return {
    type: SAVESHIPPING,
    payload,
  };
};
const saveShippingAddress = (payload) => {
  return {
    type: SAVESHIPPINGADRESSS,
    payload,
  };
};
const removePlacement = (id, product_variation_id, placementId) => {
  // console.log("id, product_variation_id", product_variation_id, placementId);
  return {
    type: REMOVEPLACEMENT,
    productId: id,
    product_variation_id,
    placementId,
  };
};

const removeGiftsetPlacement = (giftset_id) => {
  return {
    type: REMOVE_GIFTSET_PLACEMENT,
    giftset_id,
  };
};

const updateToCart = (
  id,
  quantity,
  product_variation_id,
  hasPlacement,
  placements
) => {
  return {
    type: UPDATETOCART,
    ItemId: id,
    ItemQuantity: quantity,
    product_variation_id,
    hasPlacement,
    placements,
  };
};
const clearCart = () => {
  return {
    type: CLEARCART,
  };
};
const updatePlacement = (productVariantID, productId, placementId, payload) => {
  return {
    type: UPDATEPLACEMENT,
    product_variation_id: productVariantID,
    productId,
    placementId,
    payload,
  };
};

const _verifyCart = (payload) => {
  return {
    type: VERIFYCART,
    payload,
  };
};

const addPlacement = (id, product_variation_id, placement) => {
  return {
    type: ADDPLACEMENT,
    ItemId: id,
    product_variation_id,
    placement,
  };
};

const addGiftsetPlacement = (
  giftset_id,
  id,
  product_variation_id,
  placement
) => {
  return {
    type: ADD_GIFTSET_PLACEMENT,
    giftset_id,
    ItemId: id,
    product_variation_id,
    placement,
  };
};

const updateGiftsetQuantity = (giftset_id, quantity) => {
  return {
    type: UPDATE_GIFTSET_PLACEMENT,
    giftset_id,
    quantity,
  };
};

export {
  addToCart,
  removeFromCart,
  updateToCart,
  _verifyCart,
  addPlacement,
  addGiftsetPlacement,
  updatePlacement,
  removePlacement,
  saveShipping,
  saveShippingAddress,
  clearCart,
  removeGiftsetPlacement,
  updateGiftsetQuantity,
};
