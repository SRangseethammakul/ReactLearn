export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_ALL_CART = "CLEAR_ALL_CART";

export const addToCart = (product = {}, cart = []) => {
  let exists = false;
  if (cart.length > 0) {
    cart.map((item) => {
      if (item.id === product.id) {
        exists = true;
        item.qty++;
      }
      return item;
    });
  }
  if (!exists) {
    cart.push(product);
  }
  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0);
  return {
    type: ADD_TO_CART,
    payload: {
      cart: cart,
      total: total,
    },
  };
};

export const clearAllCart = () => {
  const cart = [];
  const total = 0;
  return {
    type: CLEAR_ALL_CART,
    payload: {
      cart: cart,
      total: total,
    },
  };
};
