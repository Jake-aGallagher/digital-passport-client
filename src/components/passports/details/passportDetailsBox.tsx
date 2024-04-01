import LoadingSpinner from '@/components/loadingSpinner/loadingSpinner';
import { usePassportDetails } from './usePassportDetails';
import { useState } from 'react';

interface Props {
    passportId: string;
}

const PassportDetailsBox = (props: Props) => {
    const { passport, linked, loading } = usePassportDetails(props.passportId);
    const [openLinks, setOpenLinks] = useState<string[]>([]);

    const passportValues = [
        { key: 'ID', value: props.passportId },
        { key: 'Name', value: passport.passportName },
        { key: 'Created', value: new Date(passport.created).toLocaleDateString() },
        { key: 'Locked', value: passport.locked ? 'Yes' : 'No' },
        { key: 'Company ID', value: passport.companyId },
        { key: 'Use Code', value: passport.locked ? passport.useCode : ' - Lock to generate Use Code - ' },
    ];

    const passportDetailsInfo = passportValues.map((item) => (
        <div key={item.key} className="flex flex-row w-full">
            <div className="w-1/3">{item.key}:</div>
            <div className="w-2/3">{item.value}</div>
        </div>
    ));

    const filesList = passport.files.map((file) => (
        <div key={file}>
            <div>{file}</div>
        </div>
    ));

    const linkedKeys = Object.keys(linked);
    const linkedList = linkedKeys.map((linkedKey) => (
        <div key={linkedKey} className="w-full">
            <div
                onClick={() => toggleLinkedPassport(linkedKey)}
                className="hover:cursor-pointer hover:text-blue-300 hover:bg-slate-900 transition-all mb-2 border border-slate-800 rounded-md w-max p-2 flex flex-row items-center"
            >
                <div className={`text-xl h-8 w-8 flex flex-row justify-center items-cente transition-all ${openLinks.includes(linkedKey) && 'rotate-90'}`}>&#62;</div>
                {linked[linkedKey]}
            </div>
            {openLinks.includes(linkedKey) && <PassportDetailsBox passportId={linkedKey} />}
        </div>
    ));

    const toggleLinkedPassport = (passportId: string) => {
        if (openLinks.includes(passportId)) {
            setOpenLinks(openLinks.filter((link) => link !== passportId));
        } else {
            setOpenLinks([...openLinks, passportId]);
        }
    };

    return (
        <>
            {loading ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="w-full mb-8">
                    <div className="p-2 rounded-lg flex flex-col gap-2 bg-slate-900">
                        {passportDetailsInfo}
                        <div className="pt-8 flex flex-row bg-slate-900">
                            <div className="w-1/3">Files:</div>
                            <div>{filesList}</div>
                        </div>
                    </div>
                    {linkedList.length > 0 && (
                        <>
                            <h2 className="mt-8 mb-4">Linked Passports:</h2>
                            <div className="flex flex-col items-start">{linkedList}</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default PassportDetailsBox;
