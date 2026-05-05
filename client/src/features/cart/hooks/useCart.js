import {
  addItems,
  decrementItems,
  deleteItems,
  incrementItems,
  setItems,
} from "../state/cart.slice";
import { useDispatch } from "react-redux";
import {
  addToCart,
  createCartOrder,
  decrementCartItems,
  deleteCartItems,
  getAllCartItems,
  incrementCartItems,
  verifyCartOrderPayment,
} from "../service/cart.api";

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = async ({ productId, variantId }) => {
    const data = await addToCart({ productId, variantId });
    dispatch(addItems(data.items));
    return data.items;
  };

  const handleGetAllAddToCart = async () => {
    const data = await getAllCartItems();
    dispatch(setItems(data.cart));
    return data.cart;
  };

  const handleIncrementItems = async ({ productId, variantId }) => {
    await incrementCartItems({ productId, variantId });
    dispatch(incrementItems({ productId, variantId }));
  };

  const handleDecrementItems = async ({ productId, variantId }) => {
    await decrementCartItems({ productId, variantId });
    dispatch(decrementItems({ productId, variantId }));
  };

  const handleDeleteItems = async ({ productId, variantId }) => {
    await deleteCartItems({ productId, variantId });
    dispatch(deleteItems({ productId, variantId }));
  };

  const handleAddToCartOrder = async () => {
    const order = await createCartOrder();
    return order;
  };

    const handleVerifyCartOrderPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => { 

        const data = await verifyCartOrderPayment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        return data

    }
  return {
    handleAddToCart,
    handleGetAllAddToCart,
    handleIncrementItems,
    handleDecrementItems,
    handleDeleteItems,
    handleAddToCartOrder,
    handleVerifyCartOrderPayment
  };
};
