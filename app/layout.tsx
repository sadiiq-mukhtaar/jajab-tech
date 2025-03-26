import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Grid, Theme } from "@radix-ui/themes";
import NavBar from "./NavBarLargeScreen";
import NavBarSmallScreen from "./NavBarSmallScreen";
import AuthProvider from "./auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Customer Manager",
    template: "%s | Customer Manager",
  },
  description:
    "Comprehensive customer relationship management platform for businesses of all sizes.",
  keywords: [
    "CRM",
    "customer management",
    "client tracker",
    "business dashboard",
  ],
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#211C84]`}
      >
        <AuthProvider>
          <Theme accentColor="indigo">
            <div className="bg-[#211C84] min-h-screen text-white">
              <div className="block md:hidden fixed top-0 w-full z-50">
                <NavBarSmallScreen />
              </div>

              <Grid columns={{ initial: "auto 1fr" }} gap="4">
                <nav className="sticky top-0 h-screen hidden md:block">
                  <NavBar />
                </nav>
                <main className="mt-16 md:mt-0">{children}</main>
              </Grid>
            </div>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
