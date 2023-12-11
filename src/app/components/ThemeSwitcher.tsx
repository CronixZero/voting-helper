"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import {SwitchProps, useSwitch, VisuallyHidden} from "@nextui-org/react";

export function ThemeSwitcher(props: Readonly<SwitchProps>) {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme()
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch({...props, onChange: toggleTheme});
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  function toggleTheme(): boolean {
    setTheme(theme === 'light' ? 'dark' : 'light')
    return theme === 'light';
  }

  return (
      <div>
        <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
              {...getWrapperProps()}
              className={slots.wrapper({
                class: [
                  "w-10 h-10",
                  "flex items-center justify-center",
                  "rounded-lg bg-default-100 hover:bg-default-200",
                ],
              })}
          >
            {isSelected ? <LightModeRoundedIcon/> : <DarkModeRoundedIcon/>}
          </div>
        </Component>
      </div>
  )
}