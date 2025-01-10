"use client";
import Link from 'next/link'
import { usePathname } from "next/navigation";

const NavLink = ({ label, href }) => {
    const pathname = usePathname();
    return (
        <li>
            <Link className={
                `nav-link ${pathname === href ? 'nav-link-active' : ''}`}
                href={href}>
                {label}
            </Link>
        </li>
    )
}

export default NavLink