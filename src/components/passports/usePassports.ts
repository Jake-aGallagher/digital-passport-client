import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../apiURL';

interface Passport {
    companyId: string;
    passportId: string;
    created: string;
    passportName: string;
    locked: boolean;
}

export const usePassports = (companyId: string) => {
    const [passports, setPassports] = useState<Passport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reload();
    }, [companyId]);

    const reload = () => {
        setLoading(true);
        getHandler();
    }

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/passports/${companyId}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            if (response.data.passports?.length > 0) {
                setPassports(response.data.passports);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        
    }

    return { passports, loading, reload };
};
