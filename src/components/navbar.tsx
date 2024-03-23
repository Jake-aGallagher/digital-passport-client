import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-12 md:text-xl text-white flex flex-row justify-start md:justify-center items-center gap-4 md:gap-12">
            <Link href="/" className='ml-2 md:ml-0'>
                <span className="hover:text-blue-300 transition-all">Home</span>
            </Link>
            <Link href="/passports">
                <span className="hover:text-blue-300 transition-all">Passports</span>
            </Link>
            <button className="absolute right-16 md:right-32 rounded-lg h-10 w-20 flex flex-col justify-center items-center hover:text-blue-300 transition-all">Signup</button>
            <button className="absolute right-0 md:right-12 rounded-lg h-10 w-20 flex flex-col justify-center items-center hover:text-blue-300 transition-all">Login</button>
        </nav>
    );
};

export default Navbar;
