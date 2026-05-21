import products from "../models/product.models.js";
import wishLists from "../models/wishlist.models.js";

const addToWishListController = async (req, res) => {
    const { productId, variantId } = req.params;
    const product = await products.findOne({
      _id: productId,
      "variants._id": variantId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await wishLists.findOne({ user: req.user._id });

      if (!wishlist) {
          wishlist = await wishLists.create({user: req.user._id, items: []})
      }

      const isProductAlreadyInWishList = wishlist.items.find((item) => item.product?.toString() === productId
      && item.variant?.toString() === variantId)


      
      if(isProductAlreadyInWishList){
          return res.status(400).json({
              success: false,
              message: "Product already in wishlist"
          })
      }

      wishlist.items.push({
          productId: productId,
          variantId: variantId,
      })

      await wishlist.save()

      return res.status(200).json({
          success: true,
          message: "Product added to wishlist",
          wishlist
      })

};

const getAllWishlistController = async (req, res) => {
    try {
        const user = req.user
        const wishlist = await wishLists.findOne({user: user._id}).populate("items.productId")

        if (!wishlist) {
            return res.status(400).json({
                success: false,
                message: "Wishlist is empty"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            wishlist
        })
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Error while getting wishlist",
        error: error.message,
      })
    }
}

const deleteWishlistController = async (req, res) => {

    try {
        const { productId, variantId } = req.params;

        const wishlist = await wishLists.findOne({
          user: req.user._id,
          "items.productId": productId,
          "items.variantId": variantId,
        });

        if (!wishlist) {
          return res.statue(400).json({
            success: false,
            message: "Items not found in wishlist",
          });
        }

        await wishLists.findByIdAndUpdate(
          { user: req.user._id },
          {
            $pull: {
              items: {
                productId,
                variantId,
              },
            },
          },
        );
        
        return res.status(200).json({
            success: true,
            message: "Items removed from wishlist successfully"
        })
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Error while deleting wishlist",
        error: error.message,
      })
    }

}

export { addToWishListController, getAllWishlistController, deleteWishlistController };
