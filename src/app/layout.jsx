
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
