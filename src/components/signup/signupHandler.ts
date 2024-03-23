import axios from "axios";
import { SERVER_URL } from "../apiURL";

interface Data {
    companyName: string;
    email: string;
    password: string;
    retryPassord: string;
    username: string;
}

export const signupHandler = async (data: Data) => {
    try {
        await axios.post(`${SERVER_URL}/signup-company`, data);
    } catch (error) {
        console.error(error);
    }
};
