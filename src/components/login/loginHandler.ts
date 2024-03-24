import axios from "axios";
import { SERVER_URL } from "../apiURL";

interface Data {
    username: string;
    password: string;
}

export const LoginHandler = async (data: Data) => {
    try {
        const response = await axios.post(`${SERVER_URL}/login`, data);
        return {companyId: response.data.companyId, userId: response.data.userId}
    } catch (error) {
        console.error(error);
        return {companyId: "", userId: ""}
    }
};
