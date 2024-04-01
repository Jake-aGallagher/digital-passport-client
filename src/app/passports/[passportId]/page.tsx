'use client';
import PassportDetailsBox from '@/components/passports/details/passportDetailsBox';
import { usePathname } from 'next/navigation';

const PassportDetails = () => {
    const passportId = usePathname().split('/')[2];

    return (
        <main className="h-screen text-white pt-12 flex flex-col items-center w-10/12 mx-auto">
            <PassportDetailsBox passportId={passportId} />
        </main>
    );
};

export default PassportDetails;
