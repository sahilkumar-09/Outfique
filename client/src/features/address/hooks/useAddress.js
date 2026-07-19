import { useDispatch } from "react-redux";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAddressById,
  setAsDefault,
  updateAddress,
} from "../service/address.service";
import {
  clearAddress,
  setAddress,
  setDeleteAddress,
  setError,
  setLoading,
  setSelectedAddress,
  setUpdateAddress,
} from "../state/address.slice";

export const useAddress = () => {
  const dispatch = useDispatch();

  const handleCreateAddress = async (formdata) => {
    try {
      dispatch(setLoading(true));
      const res = await createAddress(formdata);
      dispatch(setAddress(res.address));
      return res.address;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetAddress = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getAddress();
      dispatch(clearAddress());
      res.address.forEach((address) => {
        dispatch(setAddress(address));
      });
      return res;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetAddressById = async (addressId) => {
    try {
      dispatch(setLoading(true));
      const res = await getAddressById(addressId);
      dispatch(setSelectedAddress(res.address));
      return res;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      dispatch(setLoading(true));
      await deleteAddress(addressId);
      dispatch(setDeleteAddress(addressId));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateAddress = async (addressId, formdata) => {
    try {
      dispatch(setLoading(true));
      await updateAddress(addressId, formdata);
      dispatch(setUpdateAddress(addressId));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSetAsDefaultAddress = async (addressId) => {
    try {
      dispatch(setLoading(true));
      const res = await setAsDefault(addressId);
      dispatch(setSelectedAddress(res));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
    };
    
  return {
    handleCreateAddress,
    handleDeleteAddress,
    handleGetAddress,
    handleSetAsDefaultAddress,
    handleGetAddressById,
    handleUpdateAddress,
  };
};
