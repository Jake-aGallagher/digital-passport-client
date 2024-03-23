import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-12 text-xl text-white flex flex-row justify-center items-center gap-12">
            <Link href="/">
                <span className="hover:text-blue-300 transition-all">Home</span>
            </Link>
            <Link href="/passports">
                <span className="hover:text-blue-300 transition-all">Passports</span>
            </Link>
            <button className="absolute right-12 rounded-lg h-10 pb-1 w-20 flex flex-col justify-center items-center hover:text-blue-300 transition-all">Login</button>
        </nav>
    );
};

export default Navbar;
