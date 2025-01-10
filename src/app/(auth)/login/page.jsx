"use client"
import Link from 'next/link';
import React from 'react'
import { useActionState } from 'react';
import { login } from '@/actions/auth';
const Login = () => {
    const [state, action, isPending] = useActionState(login, undefined)
    return (
        <div className='container w-1/2'>
            <h1 className='title'>Login</h1>

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
                    {state?.errors?.email && (<p className='error'>{state?.errors.email}</p>)}
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
                    {state?.errors?.password && (<p className='error'>{state?.errors.password}</p>)}
                </div>
                <div className="flex items-end gap-4">
                    <button
                        type="submit" disabled={isPending}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isPending ? 'Loading...' : "Login"}
                    </button>
                    <Link href="/register" className='text-link'>or register here</Link>
                </div>
            </form>
        </div>
    )
}

export default Login