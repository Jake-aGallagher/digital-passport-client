'use client';
import { logoutUser } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const userId = useSelector((state: RootState) => state.userReducer.value.userId);
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(userId !== "");

    const logoutHandler = () => {
        dispatch(logoutUser());
        setLoggedIn(false);
    }

    useEffect(() => {
        setLoggedIn(userId !== "");
    }, [userId])

    return (
        <nav className="fixed top-0 left-0 right-0 h-12 md:text-xl text-white flex flex-row justify-start md:justify-center items-center gap-4 md:gap-12">
            <Link href="/" className="ml-2 md:ml-0">
                <span className="hover:text-blue-300 transition-all">Home</span>
            </Link>
            <Link href="/passports">
                <span className="hover:text-blue-300 transition-all">Passports</span>
            </Link>
            {loggedIn ? (
                <button onClick={logoutHandler} className="absolute right-0 md:right-12 rounded-lg h-10 w-20 flex flex-col justify-center items-center hover:text-blue-300 transition-all">Logout</button>
            ) : (
                <>
                    <Link href="/signup" className="absolute right-16 md:right-32 rounded-lg h-10 w-20 flex flex-col justify-center items-center">
                        <span className="hover:text-blue-300 transition-all">Signup</span>
                    </Link>
                    <Link href="/login" className="absolute right-0 md:right-12 rounded-lg h-10 w-20 flex flex-col justify-center items-center">
                        <span className="hover:text-blue-300 transition-all">Login</span>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
