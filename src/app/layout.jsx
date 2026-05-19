import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"]
});

export const metadata = {
  title: "BMI Housing — Bengaluru Metro City Infrastructure Co-Operative Society",
  description:
    "Premium residential plots in North Bengaluru. Government-approved co-operative society offering affordable layouts in Devanahalli & Vishwanathapura. Starting ₹1,399/sqft."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-slate text-pearl font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
