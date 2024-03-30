import { Toaster } from "@/components/ui/sonner";
import RecoilProvider from "@/providers/RecoilProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen text-base`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <RecoilProvider>{children}</RecoilProvider>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
