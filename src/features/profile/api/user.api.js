import client from "@/shared/api/client.js";
import Memoizer from "@/shared/libs/memoizer.js";

const cache = new Memoizer();

const getUser = () => client.get("/user");

export const verifySession = cache.memoize(getUser);

const getProfile = (id) => client.get(`/user/${id}`);

export const getUserProfile = cache.memoize(getProfile);

export const clearUserFromCache = () => cache.clear();

export const updateUser = (data) => client.put("/user/update", data);

export const changePassword = (data) => client.post("/user/password", data);

export const getNicknameArray = () => client.get("/user/nickname");

export const deleteUser = () => client.delete("/user/delete");
