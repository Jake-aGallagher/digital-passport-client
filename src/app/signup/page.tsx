'use client';
import { signupHandler } from '@/components/signup/signupHandler';
import { yupResolverSignup } from '@/components/signup/signupValidation';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverSignup,
    });

    const handleRegistration = async (data: any) => {
        console.log('submitted: ', data);
        await signupHandler(data);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen max-w-fit mx-auto">
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col gap-4 mt-4">
                <h1 className="text-2xl font-bold text-center text-white">Company</h1>
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Company Name" className="border-2 border-gray-400 rounded-lg p-2" {...register('companyName')} />
                </div>
                <h1 className="text-2xl font-bold text-center mt-4 text-white">Primary User</h1>
                <p className="text-sm text-white px-4 text-wrap">You can add more users once the company has been created</p>
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Username" className="border-2 border-gray-400 rounded-lg p-2" {...register('username')} />
                    <input type="email" placeholder="Email" className="border-2 border-gray-400 rounded-lg p-2" {...register('email')} />
                    <input type="password" placeholder="Password" className="border-2 border-gray-400 rounded-lg p-2" {...register('password')} />
                    <input type="password" placeholder="Confirm Password" className="border-2 border-gray-400 rounded-lg p-2" {...register('retryPassord')} />
                </div>
                <button type="submit" className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-500 transition-all">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
