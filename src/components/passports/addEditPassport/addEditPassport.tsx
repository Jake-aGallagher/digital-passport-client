import { useForm } from 'react-hook-form';
import { yupResolverPassport } from './passportValidation';
import axios from 'axios';
import { SERVER_URL } from '@/components/apiURL';
import { useEffect, useMemo, useState } from 'react';
import { useAddEditPassport } from './useAddEditPassport';
import LoadingSpinner from '@/components/loadingSpinner/loadingSpinner';
import { v4 as uuid } from 'uuid';
import { AnonymousCredential, ContainerClient } from '@azure/storage-blob';

export interface DefaultValues {
    passportName: string;
}

interface Props {
    close: () => void;
    passportId: string;
}

const AddEditPassport = (props: Props) => {
    const [linkedInput, setLinkedInput] = useState<string>('');
    const [linkedPassports, setLinkedPassports] = useState<string[]>([]);
    const [fileList, setFileList] = useState<string[]>([]);
    const { defaultValues, loading } = useAddEditPassport(props.passportId, setLinkedPassports, setFileList);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverPassport,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        try {
            const fullData = { ...data, passportId: props.passportId, linkedArr: linkedPassports, files: fileList };
            const options = { headers: { Authorization: localStorage.getItem('token') } };
            if (props.passportId == '') {
                await axios.post(`${SERVER_URL}/passports`, fullData, options);
            } else {
                await axios.put(`${SERVER_URL}/passports/${props.passportId}`, fullData, options);
            }
            props.close();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddLinkedPassport = () => {
        setLinkedPassports([...linkedPassports, linkedInput]);
        setLinkedInput('');
    };

    const handleRemoveLinkedPassport = (index: number) => {
        const temp = linkedPassports;
        temp.splice(index, 1);
        setLinkedPassports([...temp]);
    };

    const addFile = async (file: File) => {
        try {
            const tokenRes = await axios.get(`${SERVER_URL}/getSASToken/write/null`, { headers: { Authorization: localStorage.getItem('token') } });
            const sasToken = tokenRes.data;
            if (!sasToken) {
                throw new Error('SAS Token not found');
            }
            const containerClient = new ContainerClient(sasToken, new AnonymousCredential());
            const blobName = uuid() + '___' + file.name;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type, blobContentDisposition: `attachment; filename="${file.name}"` } })
            setFileList((prev) => [...prev, blobName]);
        } catch (err) {
            console.error(err);
        }
    };

    const getFile = async (file: string) => {
        const tokenRes = await axios.get(`${SERVER_URL}/getSASToken/read/${file}`, { headers: { Authorization: localStorage.getItem('token') } });
        const sasToken = tokenRes.data;

        const url = sasToken
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    };

    return (
        <>
            <div className="z-10 fixed left-0 right-0 top-0 bottom-0 bg-black opacity-70" onClick={props.close}></div>
            <div className="z-20 fixed m-auto h-3/4 w-5/6 bg-slate-800 rounded-md">
                <h1 className=" w-full h-8 text-center mt-2 text-lg">Add Passport</h1>
                <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col items-center pt-8 gap-4 h-full w-full text-black">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <input type="text" placeholder="Passport Name" className="h-10 w-72 rounded-lg pl-2" {...register('passportName')} />

                            <div className="flex flex-row items-center">
                                <input
                                    type="text"
                                    value={linkedInput}
                                    onChange={(e) => setLinkedInput(e.target.value)}
                                    placeholder="Linked Passports (4 word code)"
                                    className="h-10 w-64 rounded-lg pl-2"
                                />
                                <button type="button" onClick={handleAddLinkedPassport} className="text-4xl w-8 pb-1 text-green-400 hover:text-green-600 transition-all">
                                    +
                                </button>
                            </div>

                            {linkedPassports.length > 0 && (
                                <div className="w-72 mb-4">
                                    <h2 className="text-white">Linked Passports:</h2>
                                    <ul className="text-white text-xs">
                                        {linkedPassports.map((passport, index) => (
                                            <li key={passport} className="flex flex-row items-center">
                                                <span>{passport}</span>
                                                <span className="ml-auto">
                                                    <button onClick={() => handleRemoveLinkedPassport(index)} className="text-4xl w-8 text-red-400 hover:text-red-600 transition-all">
                                                        -
                                                    </button>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <label className="text-white w-72">
                                <div className="mb-2">Upload Documents</div>
                                <input type="file" onChange={(e) => (e.target.files ? addFile(e.target.files[0]) : null)} />
                            </label>
                            {fileList.length > 0 && (
                                <div className="w-72">
                                    <h2 className="text-white">Uploaded Files:</h2>
                                    <ul className="text-white text-xs">
                                        {fileList.map((file) => (
                                            <li key={file} onClick={() => getFile(file)} className="border-b hover:border-blue-300 hover:text-blue-300 w-fit transition-all hover:cursor-pointer">
                                                {file.split('___')[1]}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <label className="text-white flex flex-col w-72 border border-slate-600 p-2 rounded-lg">
                                <div className="select-none mr-2 flex flex-row">
                                    Locked
                                    <input type="checkbox" className="ml-auto h-8 w-6" {...register('locked')} />
                                </div>
                                <span className="text-xs">(This will disable editing the passport, once locked this canot be undone)</span>
                            </label>
                            <button type="button" onClick={props.close} className="bg-red-700 text-white rounded-lg p-2 hover:bg-red-500 w-32 transition-all absolute bottom-4 right-40">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-500 w-32 transition-all absolute bottom-4 right-4">
                                Save
                            </button>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

export default AddEditPassport;
