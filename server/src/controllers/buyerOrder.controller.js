import orders from "../models/order.model.js";

const orderCreateController = async (req, res) => {
  try {
    

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrderController = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const {
      page = 1,
      limit = 10,
      status,
      paymentStatus,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = {
      buyer: buyerId,
    };

    if (status) {
      query.orderStatus = paymentStatus;
    }
    if (paymentStatus) {
      query.$or = [
        { orderNumber: { $regex: search, $option: "i" } },
        {
          "shippingAddress.fullName": {
            $regex: search,
            $option: "i",
          },
        },
      ];
    }

    const order = await orders
      .find(query)
      .populate("items.product", "name slug images")
      .sort(sort)
      .skip(Number(page - 1 * Number(limit)))
      .limit(Number(limit));

    const totalOrder = await orders.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "The total order is fetched successfully",
      totalOrder: totalOrder,
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDetailOrderController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrderController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const requestOrderController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const reviewOrderController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
    orderCreateController,
    getAllOrderController,
    getDetailOrderController,
    deleteOrderController,
    requestOrderController,
    reviewOrderController,
}