'use client';
import LoadingSpinner from '@/components/loadingSpinner/loadingSpinner';
import { usePassports } from '@/components/passports/usePassports';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

const Passport = () => {
    const userId = useSelector((state: RootState) => state.userReducer.value.userId);
    const companyId = useSelector((state: RootState) => state.userReducer.value.companyId);
    if (userId === '') {
        redirect('/login');
    }
    const { passports, loading, noData } = usePassports(companyId);

    const PassportList = passports.map((passport) => (
        <tr key={passport.PassportId} className="mt-2">
            <td className="w-1/4 text-center">
                <Link href={`/passports/${passport.PassportId}`} className="group border-b-2 hover:border-blue-300 transition-all">
                    <span className="group-hover:text-blue-300 transition-all">{passport.PassportId}</span>
                </Link>
            </td>
            <td className="w-1/4 text-center">{passport.Created}</td>
            <td className="w-1/4 text-center">{passport.PassportName}</td>
            <td className="w-1/4 text-center">{passport.Locked ? 'Locked' : 'Editable'}</td>
        </tr>
    ));

    const table = () => {
        return (
            <table className="table-auto border-separate w-full bg-slate-800 py-2 px-4 rounded-md">
                <thead className="w-full border-separate">
                    <tr>
                        <th className="w-1/4">Passport ID</th>
                        <th className="w-1/4">Created</th>
                        <th className="w-1/4">Passport Name</th>
                        <th className="w-1/4">Status</th>
                    </tr>
                </thead>
                <tbody className="border-separate">{PassportList}</tbody>
            </table>
        );
    };

    return (
        <main className="h-screen text-white pt-12 flex flex-col items-center">
            {loading ? (
                <div className="h-full flex flex-col justify-center">
                    <LoadingSpinner />
                </div>
            ) : noData ? (
                <div>No data</div>
            ) : (
                <div className="w-10/12 mt-8">{table()}</div>
            )}
        </main>
    );
};

export default Passport;
