import './globals.css'

import React from "react";
import type { Metadata } from 'next'

import { EdgeStoreProvider } from "../lib/edgestore";
import { Inter } from 'next/font/google'
import { ThemeProvider} from "../components/providers/theme-provider";
import { ConvexClientProvider} from "../components/providers/convex-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "../components/providers/modal-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Potion Notes',
  description: 'Notes app - better experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='app-theme'
            >
              <Toaster position='bottom-center' />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
