import { API } from "./API";

export const getAllCouriers = async () => {
  const res = await API.get("/courier/getAllCouriers");
  return res.data;
};

export const deleteCourier = async (id) => {
    const res = await API.get(
        `/courier/deleteCourier/${id}`
    )
    return res.data
}

export const getCourierById = async (id) => {
  const res = await API.get(`/courier/getCourierById/${id}`);
  return res.data;
};

export const addCourier = async (data) => {
  const res = await API.post(`/courier/addCourier`, data);
  return res.data;
};

export const editCourier = async (data) => {
    const res = await API.post(`courier/editCourier`, data)
    return res.data
}