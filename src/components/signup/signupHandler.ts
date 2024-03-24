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
        const response = await axios.post(`${SERVER_URL}/signup-company`, data);
        return {companyId: response.data.companyId, userId: response.data.userId}
    } catch (error) {
        console.error(error);
        return {companyId: "", userId: ""}
    }
};
