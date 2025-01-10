import React from 'react'
import NavLink from '@/components/NavLink';
const Navigation = () => {
    return (
        <nav>
            <ul>
                <NavLink label="Home" href="/" />
                <div className="flex justify-between">
                    <NavLink label="Register" href="/register" />
                    <NavLink label="Login" href="/login" />
                    <NavLink label="Dashboard" href="/dashboard" />

                </div>
            </ul>
        </nav>
    )
}

export default Navigation