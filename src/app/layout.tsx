import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import {Providers} from "@/app/providers";
import {Navbar} from "@/app/components/navigation/Navbar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Wahlhelfer',
  description: 'Hilfe bei den Wahlen',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Providers>
        <Navbar/>
        <div className="pr-3 pl-3">
          {children}
        </div>
      </Providers>
      </body>
      </html>
  )
}
