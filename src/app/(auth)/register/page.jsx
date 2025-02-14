"use client";
import { register } from "@/actions/auth";
import Link from "next/link"
import { useActionState } from "react";

const Register = () => {
    const [state, action, isPending] = useActionState(register, undefined);

    return (
        <div className='container w-1/2'>
            <h1 className='title'>Register</h1>

            <form action={action} className='space-y-4'>
                <div className="">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={state?.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                    {state?.errors?.email && (<p className="error">{state.errors.email}</p>)}
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
                    {state?.errors?.password && (
                        <div className="error">
                            <p>Password must:</p>
                            <ul className="list-disc list-inside ml-4">
                                {state.errors.password.map(err => (
                                    <li key={err}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                    {state?.errors?.confirmPassword && (<p className="error">{state.errors.confirmPassword}</p>)}
                </div>
                <div className="flex items-end gap-4">
                    <button className='btn-primary' disabled={isPending}>
                        {isPending ? "Loading..." : "Register"}
                    </button>
                    <Link href='/login' className="text-link">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register