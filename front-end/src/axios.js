import axios from "axios";

const BASE_URL = "https://moveo-server-z2xn.onrender.com"
export const getCodeTitles = async (letters) => {
    try {
        const response = await axios.get(`${BASE_URL}/codes/get-titles`);
        return response.data;

    } catch (e) {
        throw (e);
    }
}

export const getCodeByTitle = async (title) => {
    try {
        console.log(title);
        const response = await axios.get(`${BASE_URL}/codes/title/${title}`);
        return response.data;
    } catch (e) {
        throw (e);
    }
}