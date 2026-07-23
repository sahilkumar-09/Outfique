import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct";
import Category from "../components/Category";
import CategoryCarousel from "../components/CategoryCarousel";
import Product from "../components/Product";
import { useAddress } from "@/features/address/hooks/useAddress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AddressBar = ({
  addressData,
  selectedAddressId,
  setSelectedAddressId,
}) => {
  const navigate = useNavigate();

  if (addressData.length === 0) {
    return (
      <button
        onClick={() => navigate("/checkout/address/new")}
        className="flex items-center gap-2 self-start px-4 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#141414] text-zinc-900 dark:text-zinc-100 hover:border-[#e63b1f] hover:text-[#e63b1f] dark:hover:border-[#e63b1f] dark:hover:text-[#e63b1f] transition-colors"
      >
        <i className="ri-map-pin-add-line text-base" />
        <span className="text-sm font-medium">Add delivery address</span>
      </button>
    );
  }

  const selectedAddress =
    addressData.find((a) => a._id === selectedAddressId) || addressData[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-start gap-2.5 self-start px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141414] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors max-w-[320px] text-left">
          <i className="ri-map-pin-line text-base text-[#e63b1f] mt-0.5 shrink-0" />
          <span className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Deliver to
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {selectedAddress?.fullName}, {selectedAddress?.city}{" "}
              {selectedAddress?.pincode}
            </span>
          </span>
          <i className="ri-arrow-down-s-line text-base text-zinc-400 mt-0.5 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[300px] bg-white dark:bg-[#141414] border-zinc-200 dark:border-zinc-800"
      >
        {addressData.map((address) => (
          <DropdownMenuItem
            key={address._id}
            onClick={() => setSelectedAddressId(address._id)}
            className={`flex flex-col items-start gap-0.5 py-2.5 cursor-pointer ${
              address._id === selectedAddressId
                ? "bg-zinc-100 dark:bg-zinc-800"
                : ""
            }`}
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {address.fullName}
              {address.isDefault && (
                <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[#e63b1f]/10 text-[#e63b1f]">
                  Default
                </span>
              )}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-full">
              {address.addressLine1}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => navigate("/checkout/address/new")}
          className="flex items-center gap-2 text-sm text-[#e63b1f] cursor-pointer border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-2.5"
        >
          <i className="ri-add-line" />
          Add new address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Home = () => {
  const { handleGetAllProducts } = useProduct();

  const [productData, setProductData] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const fetchProductData = async () => {
    const res = await handleGetAllProducts();
    setProductData(res);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const { handleGetAddress } = useAddress();
  const fetchAddressData = async () => {
    const res = await handleGetAddress();
    if (res?.success) {
      setAddressData(res.address || []);
    }
  };
  useEffect(() => {
    fetchAddressData();
  }, []);
  useEffect(() => {
    if (!selectedAddressId && addressData.length > 0) {
      const initial = addressData.find((a) => a.isDefault) || addressData[0];
      setSelectedAddressId(initial?._id || null);
    }
  }, [addressData]);
  return (
    <div className="flex flex-col gap-5">
      <div className="px-4 pt-4">
        <AddressBar
          addressData={addressData}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
        />
      </div>
      <Category />
      <CategoryCarousel />
      <Product />
    </div>
  );
};

export default Home;
