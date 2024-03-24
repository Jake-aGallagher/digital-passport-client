"use client"
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Passport = () => {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.userReducer.value.userId);
    if (userId === "") {
        router.push('/login');
    }
    return (
        <main className="h-screen text-white pt-12 flex flex-col items-center">
            passport
        </main>
    );
};

export default Passport;