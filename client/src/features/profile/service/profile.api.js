import axios from "axios";

const profileInstance = axios.create({
  baseURL: "/api/profile",
});

export const createProfileDetails = async ({
  userid,
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
  const response = await profileInstance.post(`/add/details/${userid}`, {
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

  return response.data;
};