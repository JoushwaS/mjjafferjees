import { showToast } from "../../utils";
import {
  ADDTOCART,
  REMOVEFROMCART,
  UPDATETOCART,
  VERIFYCART,
  ADDPLACEMENT,
  REMOVEPLACEMENT,
  UPDATEPLACEMENT,
  CLEARCART,
  REMOVE_GIFTSET_PLACEMENT,
  ADD_GIFTSET_PLACEMENT,
  UPDATE_GIFTSET_PLACEMENT,
} from "../types";

const initialState = {
  cartItems: [],
  cart: null,
  placement: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDTOCART:
      let newCart = [...state.cartItems];
      if (newCart.length > 0) {
        if (action?.payload?.containPlacement == true) {
          for (var i = 0; i < newCart.length; i++) {
            if (newCart[i].product_id === action.payload.product_id) {
              if (
                newCart[i].product_variation_id ==
                action.payload.product_variation_id
              ) {
                console.log(
                  "action?.payload?.placements",
                  action?.payload?.placements
                );
                let ind = state.cartItems.findIndex((val) => {
                  return val?.placements?.id == action?.payload?.placements?.id;
                });
                if (ind > -1) {
                  newCart[ind].quantity += action?.payload?.quantity;
                  return { ...state, cartItems: newCart };
                } else {
                  return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                  };
                }
              } else {
                return {
                  ...state,
                  cartItems: [...state.cartItems, action.payload],
                };
              }
            } else {
              showToast({
                text: "added to cart successfully",
                type: "success",
              });
              return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
              };
            }
          }
        } else {
          let ind = newCart.findIndex((val) => {
            return val?.product_id == action.payload.product_id;
          });
          if (ind > -1) {
            let varind = newCart.findIndex((val) => {
              return (
                val?.product_variation_id == action.payload.product_variation_id
              );
            });
            if (varind > -1) {
              newCart[varind].quantity += action?.payload?.quantity;
              return { ...state, cartItems: newCart };
            } else {
              return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
              };
            }
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, action.payload],
            };
          }
          // for (var i = 0; i < newCart.length; i++) {
          //   if (
          //     newCart[i].product_id === action.payload.product_id &&
          //     newCart[i]?.containPlacement == false
          //   ) {
          //     if (
          //       newCart[i].product_variation_id ==
          //       action.payload.product_variation_id
          //     ) {
          //       console.log(
          //         "action?.payload?.placements",
          //         action?.payload?.quantity
          //       );
          //       newCart[i].quantity += action?.payload?.quantity;
          //       return { ...state, cartItems: newCart };
          //     }
          //     // else {
          //     //   return {
          //     //     ...state,
          //     //     cartItems: [...state.cartItems, action.payload],
          //     //   };
          //     // }
          //   } else {
          //     return {
          //       ...state,
          //       cartItems: [...state.cartItems, action.payload],
          //     };
          //   }
          // }
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case CLEARCART:
      return {
        cartItems: [],
        cart: null,
        placement: [],
      };
    case REMOVEFROMCART:
      let cart = state.cartItems;
      console.log("cartcart", cart);
      let index = state.cartItems.findIndex((x) => x.product_id == action.id);
      if (index > -1) {
        let variationindex = state.cartItems.findIndex(
          (x) => x.product_variation_id == action.product_variation_id
        );
        if (variationindex > -1) {
          if (action?.hasPlacement == true) {
            let ind = state.cartItems.findIndex((val) => {
              console.log(
                "val?.placements?.id",
                val?.placements?.id,
                action?.placements?.id
              );
              return val?.placements?.id == action?.placements?.id;
            });

            // state.cartItems.splice(ind, 1);
            cart.splice(ind, 1);

            return {
              ...state,
              cartItems: [...cart],
              placement: [...state.placement],
            };
          } else {
            cart.splice(variationindex, 1);
            return {
              ...state,
              cartItems: [...cart],
              placement: [...state.placement],
            };
          }
        }
      }
    // return {
    //   ...state,
    //   cartItems: [...state.cartItems, action.payload],
    // };

    case UPDATE_GIFTSET_PLACEMENT: {
      console.log("UPDATE_GIFTSET_PLACEMENT", action.quantity);
      let newCart = [...state.cartItems];
      const found = newCart.findIndex(
        (item) => item.giftset_id === action.giftset_id
      );
      if (found > -1) {
        if (action.quantity == 0) {
          // delete newCart[found];
        } else newCart[found].quantity = action.quantity;
        return { ...state, cartItems: newCart };
      }
    }

    case UPDATETOCART: {
      let newCart = [...state.cartItems];

      if (action?.hasPlacement == true) {
        for (var i = 0; i < newCart.length; i++) {
          if (newCart[i].product_id === action.ItemId) {
            if (
              newCart[i].product_variation_id == action.product_variation_id
            ) {
              let ind = newCart.findIndex((val) => {
                // console.log(
                //   "val?.placements?.id == action?.placements?.id;",
                //   val?.placements?.id,
                //   action?.placements?.id
                // );
                return val?.placements?.id == action?.placements?.id;
              });
              if (ind > -1) {
                newCart[ind].quantity = action.ItemQuantity;
                return { ...state, cartItems: newCart };
              }
            }
          }
        }
      } else {
        for (var i = 0; i < newCart.length; i++) {
          if (
            newCart[i].product_id === action.ItemId &&
            !newCart[i]?.placements
          ) {
            if (
              newCart[i].product_variation_id == action.product_variation_id
            ) {
              // let ind = newCart.findIndex((val) => {
              //   return val?.placements?.id == action?.placements?.id;
              // });

              newCart[i].quantity = action.ItemQuantity;

              return { ...state, cartItems: newCart };
            }
          }
        }
      }

      return { ...state, cartItems: newCart };
    }

    case UPDATEPLACEMENT: {
      let newCart = [...state.cartItems];

      let index = state.cartItems.findIndex(
        (x) => x.product_id == action.productId
      );
      if (index > -1) {
        let variationindex = state.cartItems.findIndex(
          (x) => x.product_variation_id == action.product_variation_id
        );
        if (variationindex > -1) {
          let ind = state.cartItems.findIndex((val) => {
            console.log(
              "val?.placements?.id",
              val?.placements?.id,
              action?.placementId
            );
            return val?.placements?.id == action?.placementId;
          });
          if (ind > -1) {
            newCart[ind].placements = {
              ...newCart[ind].placements?.id,
              ...action.payload,
            };
          }

          // return {
          //   ...state,
          //   cartItems: [...cart],
          // };
        }
      }

      return { ...state, cartItems: newCart };
    }

    case REMOVE_GIFTSET_PLACEMENT: {
      const cartItems = [...state.cartItems];
      let index = state.cartItems.findIndex(
        (x) => x.giftset_id == action.giftset_id
      );
      if (index > -1) {
        delete cartItems[index].placements;
        return {
          ...state,
          cartItems,
        };
      }
    }

    case ADD_GIFTSET_PLACEMENT: {
      const cartItems = [...state.cartItems];
      let index = state.cartItems.findIndex(
        (x) => x.giftset_id == action.giftset_id
      );
      if (index > -1) {
        let placements = [];
        if (state?.cartItems[index]?.placement) {
          placements = [...state?.cartItems[index]?.placement];
        }
        placements.push(action?.placement);
        cartItems[index] = {
          ...state.cartItems[index],
          placements,
        };
        return {
          ...state,
          cartItems,
        };
      }
    }

    case ADDPLACEMENT: {
      // console.log("val?.ADDPLACEMENTADDPLACEMENT?.id", state.cartItems);
      let index = state.cartItems.findIndex(
        (x) => x.product_id == action.ItemId
      );
      if (index > -1) {
        let variationindex = state.cartItems.findIndex(
          (x) => x.product_variation_id == action.product_variation_id
        );
        if (variationindex > -1) {
          state.cartItems[variationindex] = {
            ...state.cartItems[variationindex],
            placements: action?.placement,
          };

          return {
            ...state,
            cartItems: [...state.cartItems],
          };
        }
      }
      // return { ...state, cartItems: newCart };
    }

    case REMOVEPLACEMENT: {
      let newCart = [...state.cartItems];

      let index = state.cartItems.findIndex(
        (x) => x.product_id == action.productId
      );
      if (index > -1) {
        let variationindex = state.cartItems.findIndex(
          (x) => x.product_variation_id == action.product_variation_id
        );
        if (variationindex > -1) {
          let ind = state.cartItems.findIndex((val) => {
            console.log(
              "val?.placements?.id",
              val?.placements?.id,
              action?.placementId
            );
            return val?.placements?.id == action?.placementId;
          });
          if (ind > -1) {
            delete newCart[ind].placements;
            newCart[ind].containPlacement = false;
            console.log("val?.planewCartnewCart", newCart);
            // return {
            //   ...state,
            //   cartItems: [...newCart],
            // };
            // newCart[ind].placements = {
            //   ...newCart[ind].placements?.id,
            //   ...action.payload,
            // };
          }

          return { ...state, cartItems: newCart };
        }
      } else {
      }

      return { ...state, cartItems: newCart };
    }

    case VERIFYCART: {
      return { ...state, cart: action.payload };
    }

    default:
      return state;
  }
};
