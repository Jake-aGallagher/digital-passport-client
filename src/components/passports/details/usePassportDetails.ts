import { SERVER_URL } from '@/components/apiURL';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Passport {
    companyId: string;
    passportId: string;
    created: string;
    passportName: string;
    locked: boolean;
    files: string[];
    linkedArr: string[];
    useCode: string;
}

export const usePassportDetails = (passportId: string) => {
    const [passport, setPassport] = useState<Passport>({ companyId: '', passportId: '', created: '', passportName: '', locked: false, files: [], linkedArr: [], useCode: ''});
    const [linked, setLinked] = useState<{[key:string]: string}>({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (passportId !== '') {
            setLoading(true);
            getPassport();
        } else {
            setLoading(false);
        }
    }, []);

    const getPassport = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/passports/passport/${passportId}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setPassport(response.data.passport);
            if (response.data.linked) {
                setLinked(response.data.linked);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return { passport, linked, loading };
};
