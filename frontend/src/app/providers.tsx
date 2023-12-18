'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Provider as ReduxProvider} from "react-redux";
import {useRouter} from "next/navigation";
import React from "react";
import {persistor, store} from "@/app/store";
import {PersistGate} from "redux-persist/integration/react";
import {Loading} from "@/app/components/Loading";

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter();

  return (
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ReduxProvider store={store}>
            <PersistGate loading={(<Loading/>)} persistor={persistor}>
            {children}
            </PersistGate>
          </ReduxProvider>
        </NextThemesProvider>
      </NextUIProvider>
  )
}