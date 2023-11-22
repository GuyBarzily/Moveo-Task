import axios from "axios";


export const getCodeTitles = async (letters) => {
    try {
        const response = await axios.get(`http://localhost:8080/codes/get-titles`);
        return response.data;

    } catch (e) {
        throw (e);
    }
}

export const getCodeByTitle = async (title) => {
    try {
        console.log(title);
        const response = await axios.get(`http://localhost:8080/codes/title/${title}`);
        return response.data;
    } catch (e) {
        throw (e);
    }
}