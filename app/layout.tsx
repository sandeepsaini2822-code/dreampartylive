import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dream Party",
    description: "Dream Party Café",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}