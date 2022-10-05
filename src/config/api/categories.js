import Axios from ".";

export const HomeData = () => {
  return Axios.get("/api/main");
};

export const SubcategoriesData = (params) => {
  return Axios.get("/api/subCategory", {
    params,
  });
};

export const ChildcategoriesData = (params) => {
  return Axios.get("/api/subCategory", {
    params,
  });
};
