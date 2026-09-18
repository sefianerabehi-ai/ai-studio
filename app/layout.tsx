import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"AI Studio — Create without limits",description:"Professional AI image and video creation workspace."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}