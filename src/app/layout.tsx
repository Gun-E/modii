import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import AuthLayout from "@/components/AuthLayout";

export const metadata: Metadata = {
    title: "MODII",
    description: "LG DX School",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <AuthLayout>{children}</AuthLayout>
        </body>
        </html>
    );
}
