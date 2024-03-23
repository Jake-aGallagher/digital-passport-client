const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="h-10 w-72 rounded-lg pl-2" />
                <input type="password" placeholder="Password" className="h-10 w-72 rounded-lg pl-2" />
                <button type="submit" className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-500 transition-all">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
