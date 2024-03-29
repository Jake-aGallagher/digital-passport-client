import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../apiURL';

interface Passport {
    CompanyId: string;
    PassportId: string;
    Created: string;
    PassportName: string;
    Locked: boolean;
}

export const usePassports = (companyId: string) => {
    const [passports, setPassports] = useState<Passport[]>([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        getHandler();
    }, [companyId]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/passports/${companyId}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            if (response.data.passports?.length > 0) {
                setPassports(response.data.passports);
            } else {
                setNoData(true);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        
    }

    return { passports, loading, noData };
};
