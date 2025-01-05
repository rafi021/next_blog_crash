import Link from "next/link"

const Register = () => {
    return (
        <div className='container w-1/2'>
            <h1 className='title'>Register</h1>

            <form action="" className='space-y-4'>
                <div className="">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-end gap-4">
                    <button className='btn-primary'>
                        Register
                    </button>
                    <Link href='/' className="text-link">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register