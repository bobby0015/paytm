import API from "./axiosInstance";

export const userSignin = async (formData) => {
    const response = await API.post('/user/signin',formData)
    return response.data
}

export const userSignup = async (formData) => {
    const response = await API.post('/user/signup',formData)
    return response.data
}