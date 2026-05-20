import profileModel from "../models/profile.model.js"
import users from "../models/user.models.js"

/**
 * @Create Profile Controller
 */

const addProfileDetailController = async (req, res) => {
    try {
        const { user, cart, address, wishList } = req.body
        const { userid } = req.params

        const User = await users.findById(userid)
        
        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        
        if ([user, cart, address].some(f => !f)) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        const newProfile = await profileModel.create({
            user, 
            cart,
            address,
            wishList
        })

        return res.status(201).json({
            success: true,
            message: "Profile created successfully",
            newProfile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @get all profile details
 */

const getProfileDetailController = async (req, res) => {
    try {
        const user = req.user
        const profile = await profileModel.findOne({ user: user._id }).populate("user", "fullName email contact")
        return res.status(200).json({
            success: true,
            profile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export {
    addProfileDetailController,
    getProfileDetailController
}