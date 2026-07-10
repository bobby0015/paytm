import API from "./axiosInstance";

export const userSignin = async (formData) => {
    const response = await API.post('/user/signin',formData)
    return response.data
}