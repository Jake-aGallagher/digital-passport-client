'use client';
import { setToken } from "@/components/authToken";
import { LoginHandler } from "@/components/login/loginHandler";
import { yupResolverLogin } from "@/components/login/loginValidation";
import { loginUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverLogin,
    });

    const handleRegistration = async (data: any) => {
        console.log('submitted: ', data);
        const {companyId, userId, token} = await LoginHandler(data);
        if (companyId && userId) {
            dispatch(loginUser({userId, companyId}));
            setToken(token);
            router.push('/passports');
        } else {
            alert('Error creating company, please try again');
        }
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="h-10 w-72 rounded-lg pl-2" {...register('username')} />
                <input type="password" placeholder="Password" className="h-10 w-72 rounded-lg pl-2" {...register('password')} />
                <button type="submit" className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-500 transition-all">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
