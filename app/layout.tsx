import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Light Stream Loans — Loan Application",
  description:
    "Lending simplified. Low fixed rates. No hidden fees. Loans for practically anything from a lender you can trust.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
