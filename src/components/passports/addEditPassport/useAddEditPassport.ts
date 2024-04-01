import { SERVER_URL } from "@/components/apiURL";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useAddEditPassport = (companyId: string, passportId: string, setLinkedArr: Dispatch<SetStateAction<string[]>>) => {
    const [loading, setLoading] = useState(true);
    const [defaultValues, setDefaultValues] = useState({
        passportName: '',
        locked: false,
    });

    useEffect(() => {
        if (passportId !== "") {
            setLoading(true);
            getPassport();
        } else {
            setLoading(false);
        }
    }, []);

    const getPassport = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/passports/${companyId}/${passportId}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setDefaultValues({
                passportName: response.data.passport.passportName,
                locked: response.data.passport.locked,
            });
            setLinkedArr(response.data.passport.linkedArr);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return { defaultValues, loading };
};