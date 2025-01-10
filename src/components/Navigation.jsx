import React from 'react'
import NavLink from '@/components/NavLink';
import getAuthUser from '@/lib/getAuthUser';
import { logout } from '@/actions/auth';
const Navigation = async () => {
    const authUser = await getAuthUser();
    return (
        <nav>
            <ul>
                <NavLink label="Home" href="/" />
                {authUser ? (
                    <div className="flex items-center">
                        <NavLink label="New Post" href="/posts/create" />
                        <NavLink label="Dashboard" href="/dashboard" />
                        <form action={logout}>
                            <button className='nav-link'>Logout</button>
                        </form>
                    </div>
                ) : (
                    <div className="">
                        <NavLink label="Register" href="/register" />
                        <NavLink label="Login" href="/login" />
                    </div>
                )}
            </ul>
        </nav>
    )
}

export default Navigation