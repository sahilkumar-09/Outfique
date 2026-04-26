import { useDispatch } from "react-redux";
import {
  createProducts,
  getAllProducts,
  getProductById,
  getSellerAllProducts,
  addProductVariant,
  searchProducts
} from "../service/product.api";
import { setAllProducts, setSearchResult, setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProducts = async (formData) => {
    try {
      const data = await createProducts(formData);
      return data.products;
    } catch (error) {
      throw error.message;
    }
  };

  const handleGetSellerProduct = async () => {
    try {
      const data = await getSellerAllProducts();
      dispatch(setSellerProducts(data.products));
      return data.products;
    } catch (error) {
      throw error.message;
    }
  };

  const handleGetAllProducts = async () => {
    try {
      const data = await getAllProducts();
      dispatch(setAllProducts(data.products));
      return data.products;
    } catch (error) {
      throw error.message;
    }
  };

  const handleGetProductById = async (productId) => {
    try {
      const data = await getProductById(productId);
      return data.product;
    } catch (error) {
      throw error.message;
    }
  };

  const handleAddProductVariants = async(productId, newProductVariant) => {
    try{
      const data = await addProductVariant(productId, newProductVariant)
      return data.product
    }catch(error){
      throw error.message
    }
  }

  const handleSearchProducts = async (search) => {
    try {
      const data = await searchProducts(search)
      console.log(data.product)
      dispatch(setSearchResult(data.product));
    } catch (error) {
      throw error.message
    }
  }

  return {
    handleCreateProducts,
    handleGetSellerProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleAddProductVariants,
    handleSearchProducts
  };
};
