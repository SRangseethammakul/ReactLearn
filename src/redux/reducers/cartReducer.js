import { ADD_TO_CART, CLEAR_ALL_CART } from "../actions/cartAction";

const initState = {
  // init cart
  cart: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  // return state;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    case CLEAR_ALL_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default cartReducer;
