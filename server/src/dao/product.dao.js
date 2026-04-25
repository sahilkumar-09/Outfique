import products from "../models/product.models.js";

export const stockVariant = async (productId, variantId) => {
    const product = await products.findOne({
        _id: productId,
        "variants._id": variantId
    })

    const stock = product.variants.find(variant => variant._id.toString() === variantId).stock

    return stock
}