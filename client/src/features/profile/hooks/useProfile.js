import { useDispatch } from "react-redux"
import { createProfileDetails } from "../service/profile.api.js";
import { createProfile, setProfileLoading, clearProfile } from "../state/profile.slice.js"

export const useProfile = () => {
    const dispatch = useDispatch()

    const handleCreateUserProfileDetails = async ({
      fullName,
      contact,
      alternateContact,
      houseNo,
      street,
      landmark,
      city,
      state,
      pincode,
      country,
      addressType,
    }) => {
      try {
        dispatch(setProfileLoading(true));
          const profileData = await createProfileDetails({
            fullName,
            contact,
            alternateContact,
            houseNo,
            street,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
          });
        dispatch(createProfile(profileData));
      } catch (error) {
        dispatch(setProfileLoading(false));
        dispatch(clearProfile());
        throw error;
      }
    };
    return { handleCreateUserProfileDetails }
}