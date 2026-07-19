import { useAddress } from "@/features/address/hooks/useAddress";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";

const ease = [0.22, 1, 0.36, 1];

const formatPrice = (amount, currency = "INR") => {
  const n = Number(amount);
  if (Number.isNaN(n)) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₹${amount}`;
  }
};

const AnimatedValue = ({ value, className = "" }) => {
  const reduceMotion = useReducedMotion();
  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduceMotion ? {} : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? {} : { y: -10, opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const [cartItem, setCartItem] = useState([]);
  const [addressData, setAddressData] = useState([])
  const [removingKeys, setRemovingKeys] = useState({});
  const {
    handleGetAllAddToCart,
    handleIncrementItems,
    handleDecrementItems,
    handleDeleteItems,
    handleAddToCartOrder,
    handleVerifyCartOrderPayment
  } = useCart(); 

  const {handleGetAddress} = useAddress()

  const fetchAddressData = async() => {
    const res = await handleGetAddress()
      if (res?.success) {
        setAddressData(res.address || []);
      }
  }  

useEffect(() => {
  fetchAddressData();
}, []);

console.log(addressData)

  const { error, isLoading, Razorpay } = useRazorpay();

  const navigate = useNavigate();

  useEffect(() => {
     const fetchData = async () => {
       const data = await handleGetAllAddToCart(cartItems);
       setCartItem(data.items);
     };
    fetchData();
  }, []);

  const subtotal = cartItem.reduce((total, item) => {
    return total + item.price.amount * item.quantity;
  }, 0);

  const defaultAddress =
    addressData.find((item) => item.isDefault === true) || addressData[0];

  const removeKey = (item) => `${item.productId._id}-${item.variantId}`;

  const handleRemoveItem = (item) => {
    const key = removeKey(item);
    setRemovingKeys((prev) => ({ ...prev, [key]: true }));

    setTimeout(() => {
      handleDeleteItems({
        productId: item.productId._id,
        variantId: item.variantId,
      });

      setCartItem((prev) =>
        prev.filter(
          (cart) =>
            !(
              cart.productId._id === item.productId._id &&
              cart.variantId === item.variantId
            ),
        ),
      );
    }, 220);
  };

  async function handleCheckOut() { 

    if (!addressData || addressData.length === 0) {
      navigate("/checkout/address/new", {
        state: {
          redirectTo: "/checkout/cart"
        }
      }) 
      return;
    }

      if (!defaultAddress) {
        toast.error("Please select a default address.");
        navigate("/checkout/address/new");
        return;
      }
       
    const order = await handleAddToCartOrder()
    console.log(order);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Outfique",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        const isValid = await handleVerifyCartOrderPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (isValid) {
          navigate(`/order/success?order_id=${response?.razorpay_order_id}`);
        }
      },
      prefill: {
        name: user?.fullName,
        email: user?.email,
        contact: user?.contact || "",
      },
      theme: {
        color: "#e63b1f",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

 return (
   <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-zinc-900 dark:text-white transition-colors">
     <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
       {/* Heading */}
       <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-2">
            Your Selection
          </p>
         <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
           Shopping Cart
         </h1>
         <div className="w-14 h-px bg-zinc-200 dark:bg-white/10 mt-4" />
       </div>

       <div className="grid lg:grid-cols-[1fr_360px] gap-12">
         {/* Cart Items */}
         <div className="space-y-6">
           <AnimatePresence initial={false}>
             {cartItem?.map((item) => {
               const product = item.productId;
               const selectedVariant = product.variants;
               const image =
                 product.productImages[0]?.url || "/outique_editorial_warm.png";
               const variantPrice = product.price;
               const cartPrice = item.price;
               const removing = !!removingKeys[removeKey(item)];

               return (
                 <motion.div
                   key={item._id}
                   layout
                   initial={{ opacity: 0, y: 12 }}
                   animate={
                     removing
                       ? {
                           opacity: 0,
                           scale: 0.97,
                           transition: { duration: 0.2 },
                         }
                       : { opacity: 1, y: 0 }
                   }
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.35, ease }}
                   className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-5 border-b border-zinc-200 dark:border-white/10 pb-6"
                 >
                   {/* Product Image */}
                   <div className="bg-zinc-100 dark:bg-white/[0.06] overflow-hidden rounded-xl">
                     <img
                       src={image}
                       alt={product.title}
                       className="w-full h-full object-cover"
                     />
                   </div>

                   {/* Product Info */}
                   <div className="flex flex-col justify-between">
                     <div>
                       <h2 className="text-lg md:text-xl font-medium mb-2">
                         {product.title}
                       </h2>

                       <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide">
                         {selectedVariant &&
                           Object.entries(
                             selectedVariant?.attributes || {},
                           ).map(([key, value]) => (
                             <span key={key}>
                               {key}: {key === "size" ? item.size : value}
                             </span>
                           ))}
                       </div>

                       <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                         {formatPrice(
                           variantPrice?.amount,
                           variantPrice?.currency,
                         )}
                       </p>
                       <small className="text-zinc-400 dark:text-zinc-500 tracking-[0.15em] uppercase">
                         Stocks -{" "}
                         <span className="font-semibold">
                           {selectedVariant.stock}
                         </span>
                       </small>

                       {variantPrice?.amount !== cartPrice?.amount && (
                         <div className="flex items-center gap-3 mt-1.5">
                           <div className="text-xs font-semibold tracking-wide">
                             {variantPrice.amount < cartPrice.amount ? (
                               <span className="text-rose-500 dark:text-rose-400">
                                 Price Increased to{" "}
                                 {formatPrice(
                                   cartPrice.amount,
                                   variantPrice.currency,
                                 )}
                               </span>
                             ) : (
                               <span className="text-emerald-500 dark:text-emerald-400">
                                 Price Dropped to{" "}
                                 {formatPrice(
                                   cartPrice.amount,
                                   variantPrice.currency,
                                 )}
                               </span>
                             )}
                           </div>
                         </div>
                       )}
                     </div>

                     {/* Actions */}
                     <div className="flex items-center justify-between mt-4">
                       <div className="flex items-center border border-zinc-200 dark:border-white/10 overflow-hidden rounded-full">
                         <motion.button
                           whileTap={{ scale: 0.9 }}
                           onClick={() => {
                             handleDecrementItems({
                               productId: product._id,
                               variantId: item.variantId,
                             });

                             setCartItem((prev) =>
                               prev.map((cart) =>
                                 cart.productId._id === product._id &&
                                 cart.variantId === item.variantId
                                   ? { ...cart, quantity: cart.quantity - 1 }
                                   : cart,
                               ),
                             );
                           }}
                           disabled={item.quantity <= 1}
                           aria-label="Decrease quantity"
                           className="cursor-pointer px-3 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
                         >
                           <i className="ri-subtract-line text-sm" />
                         </motion.button>
                         <span className="px-4 py-2 text-sm w-8 text-center tabular-nums">
                           <AnimatedValue value={item.quantity} />
                         </span>
                         <motion.button
                           whileTap={{ scale: 0.9 }}
                           onClick={() => {
                             handleIncrementItems({
                               productId: product._id,
                               variantId: item.variantId,
                             });

                             setCartItem((prev) =>
                               prev.map((cart) =>
                                 cart.productId._id === product._id &&
                                 cart.variantId === item.variantId
                                   ? { ...cart, quantity: cart.quantity + 1 }
                                   : cart,
                               ),
                             );
                           }}
                           disabled={selectedVariant.stock <= item.quantity}
                           aria-label="Increase quantity"
                           className="cursor-pointer px-3 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
                         >
                           <i className="ri-add-line text-sm" />
                         </motion.button>
                       </div>

                       <button
                         className="cursor-pointer h-5 w-5 flex items-center justify-center text-zinc-400 hover:text-[#e63b1f] dark:text-zinc-500 dark:hover:text-[#e63b1f] transition-colors"
                         aria-label="Remove item"
                         onClick={() => handleRemoveItem(item)}
                       >
                         <i className="ri-delete-bin-line text-base" />
                       </button>
                     </div>
                   </div>
                 </motion.div>
               );
             })}
           </AnimatePresence>
         </div>

         {/* Right column: delivery address + summary, scroll together */}
         <div className="flex flex-col gap-4 h-fit sticky top-10">
           {/* Delivering to */}
           <div className="rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 shadow-sm p-4">
             <div className="flex items-center justify-between gap-3">
               <div className="flex items-center gap-3 min-w-0">
                 <div className="w-9 h-9 rounded-full bg-[#e63b1f]/10 flex items-center justify-center shrink-0">
                   <i className="ri-truck-line text-[#e63b1f] text-base" />
                 </div>

                 <div className="min-w-0">
                   {defaultAddress ? (
                     <>
                       <p className="text-sm text-zinc-900 dark:text-white truncate">
                         Delivering to{" "}
                         <span className="font-semibold">
                           {defaultAddress.fullName}
                         </span>
                         , {defaultAddress.postalCode}
                       </p>
                       <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                         {[defaultAddress.addressLine1, defaultAddress.addressLine2]
                           .filter(Boolean)
                           .join(", ")}
                       </p>
                     </>
                   ) : (
                     <p className="text-sm text-zinc-500 dark:text-zinc-400">
                       No delivery address added yet
                     </p>
                   )}
                 </div>
               </div>

               <button
                 type="button"
                 onClick={() => navigate("/checkout/address/new")}
                 className="text-xs font-bold uppercase tracking-wide text-[#e63b1f] hover:text-[#ff4f30] transition-colors shrink-0"
               >
                 {defaultAddress ? "Change" : "Add"}
               </button>
             </div>
           </div>

           {/* Summary */}
           <div className="rounded-2xl bg-white dark:bg-[#141414] border border-zinc-200 dark:border-white/10 shadow-sm p-6">
             <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-4">
               The Total
             </p>

             <div className="w-full mb-3 h-px bg-zinc-200 dark:bg-white/10 mt-4" />

             <div className="space-y-4 border-b border-zinc-200 dark:border-white/10 pb-5">
               <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                 <span>Subtotal</span>
                 <span className="text-zinc-900 dark:text-white font-medium">
                   <AnimatedValue value={formatPrice(subtotal)} />
                 </span>
               </div>

               <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                 <span>Shipping</span>
                 <span className="text-zinc-900 dark:text-white font-medium">
                   Free
                 </span>
               </div>
             </div>

             <div className="flex justify-between mt-5 mb-6 text-lg font-semibold">
               <span>Total</span>
               <span>
                 <AnimatedValue value={formatPrice(subtotal)} />
               </span>
             </div>

             <div className="flex flex-col w-full gap-2">
               <button
                 className="w-full py-4 rounded-xl bg-[#e63b1f] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#ff4f30] active:scale-95 cursor-pointer transition-all"
                 onClick={
                   addressData.length === 0
                     ? () => navigate("/checkout/address/new")
                     : handleCheckOut
                 }
               >
                 {addressData.length === 0
                   ? "Add Address to Continue"
                   : "Proceed to Checkout"}
               </button>
               <button
                 onClick={() => navigate("/")}
                 className="flex-1 py-4 rounded-xl border border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white text-xs tracking-[0.25em] uppercase hover:bg-zinc-100 dark:hover:bg-white/5 active:scale-95 cursor-pointer transition-all"
               >
                 Continue Shopping
               </button>
             </div>
             <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 text-center leading-relaxed">
               Shipping and taxes calculated at checkout.
             </p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
  
};

export default Cart;