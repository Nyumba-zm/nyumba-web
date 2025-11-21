import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nyumba - Find Your Dream Home in Zambia",
  description:
    "Find your dream home in Zambia. Browse thousands of properties for sale and rent in Lusaka and across Zambia.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
