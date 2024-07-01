import axios from "axios";
import Shoutout from "../model/Shoutout";
import TopFive from "../model/TopFive";

const baseUrl: string =
  import.meta.env.VITE_API_BASE_URL || "url is not imported";

// get all shoutouts
export const getAllShoutouts = (name?: string): Promise<Shoutout[]> => {
  return axios
    .get(`${baseUrl}/shoutouts`, {
      params: {
        "to-name": name,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getMyShoutouts = (myName: string): Promise<Shoutout[]> => {
  return axios
    .get(`${baseUrl}/shoutouts`, {
      params: {
        me: myName,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// get a shoutout by id
export const getShoutoutById = (id: string): Promise<Shoutout> => {
  return axios
    .get(`${baseUrl}/shoutouts/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// create a new shoutout
export const addNewShoutout = (shoutout: Shoutout) => {
  return axios
    .post(`${baseUrl}/shoutouts`, shoutout)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//delete a shoutout by id
export const deleteShoutoutById = (id: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}/shoutouts/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// update a shoutout by id
export const updateShoutoutById = (shoutout: Shoutout): Promise<Shoutout> => {
  return axios
    .put(`${baseUrl}/shoutouts/${shoutout._id}`, shoutout)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getTopFive = (): Promise<TopFive[]> => {
  return axios
    .get(`${baseUrl}/top-five`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
