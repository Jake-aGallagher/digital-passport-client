'use client';
import LoadingSpinner from '@/components/loadingSpinner/loadingSpinner';
import AddEditPassport from '@/components/passports/addEditPassport/addEditPassport';
import { usePassports } from '@/components/passports/usePassports';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Passport = () => {
    const userId = useSelector((state: RootState) => state.userReducer.value.userId);
    const companyId = useSelector((state: RootState) => state.userReducer.value.companyId);
    if (userId === '') {
        redirect('/login');
    }
    const { passports, loading, reload } = usePassports(companyId);
    const [modal, setModal] = useState({view: false, passportId: ''});

    const PassportList = passports.map((passport) => (
        <tr key={passport.passportId} className="mt-2">
            <td className="w-1/4 text-center">
                <Link href={`/passports/${passport.passportId}`} className="group border-b-2 hover:border-blue-300 transition-all">
                    <span className="group-hover:text-blue-300 transition-all">{passport.passportId}</span>
                </Link>
            </td>
            <td className="text-center">{new Date(passport.created).toLocaleDateString()}</td>
            <td className="text-center">{passport.passportName}</td>
            <td className="text-center">{passport.locked ? 'Locked' : 'Editable'}</td>
            <td className='text-center'>{passport.locked ? "" : (
                <button onClick={() => setModal({view: true, passportId: passport.passportId})} className='text-xl h-8 w-8 rotate-90 hover:text-blue-300 transition-all'>&#9998;</button>
            )}</td>
        </tr>
    ));

    const table = () => {
        return (
            <table className="table-auto border-separate w-full bg-slate-800 py-2 px-4 rounded-md">
                <thead className="w-full border-separate">
                    <tr>
                        <th className="w-3/12">Passport ID</th>
                        <th className="w-2/12">Created</th>
                        <th className="w-4/12">Passport Name</th>
                        <th className="w-2/12">Status</th>
                        <th className="w-1/12">Edit</th>
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
            ) : (
                <div className="w-10/12 mt-8">
                    {modal.view && <AddEditPassport passportId={modal.passportId} companyId={companyId} close={() => [setModal({view: false, passportId: ""}), reload()]} />}
                    <div className="w-full h-8 mb-4 flex flex-row justify-end">
                        <button onClick={() => setModal({view: true, passportId: ""})} className="border border-slate-800 hover:bg-slate-800 transition-all p-2 flex flex-row justify-center items-center rounded-md">
                            + Passport
                        </button>
                    </div>
                    {table()}
                </div>
            )}
        </main>
    );
};

export default Passport;
