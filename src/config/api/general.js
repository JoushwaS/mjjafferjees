import Axios from ".";

export const getPrivacyPolicy = () => {
  return Axios.get("/api/privacy_policy");
};

export const getTermsConditions = () => {
  return Axios.get("/api/terms_conditions");
};

export const getFAQs = () => {
  return Axios.get("/api/faqs");
};

export const contactUs = (data) => {
  return Axios.post("/api/contactUs", data);
};

export const getCitiesList = () => {
  return Axios.get("/api/storeBasedCities");
};

export const getAllCitiesList = (country_id) => {
  return Axios.get("/api/getCity?country_id=" + country_id);
};

export const getAllCountriesList = () => {
  return Axios.get("/api/getCountries");
};
export const getStoresList = (city_id) => {
  return Axios.get("/api/stores?city_id=" + city_id);
};
export const getStore = (store_id) => {
  return Axios.get("/api/store?store_id=" + store_id);
};
