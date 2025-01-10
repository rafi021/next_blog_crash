import Navigation from "@/components/Navigation";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Footer from "@/components/Footer";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['200', '400', '700']
});


export default function RootLayout({ children }) {


  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className={`antialiased`}>
        <header>
          <Navigation />
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
