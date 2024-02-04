import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Custom Gradient Blobs | Dynamic Gradient Blob Creator",
  description: "Create custom gradient blobs with border-radius, background-blend-mode, and blur values using ReactJS. Learn how to generate dynamic and interactive gradient designs with this hands-on guide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
