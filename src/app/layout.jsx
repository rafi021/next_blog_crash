
import Link from "next/link";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['200', '400', '700']
});

export const metadata = {
  title: 'Next Project',
  description: 'Page Description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className={`antialiased`}>
        <header>
          <nav>
            <ul>
              <li>
                <Link className="nav-link" href="/">Home</Link>
              </li>
              <div className="flex">
                <li>
                  <Link className="nav-link" href="/register">Register</Link>
                </li>
                <li>
                  <Link className="nav-link" href="/login">Login</Link>
                </li>
                <li>
                  <Link className="nav-link" href="/dashboard">Dashboard</Link>
                </li>
              </div>
            </ul>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
