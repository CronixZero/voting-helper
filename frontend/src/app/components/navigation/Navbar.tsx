"use client"

import {Divider} from "@nextui-org/react";

import {ThemeSwitcher} from "@/app/components/navigation/ThemeSwitcher";
import {TabNavigator} from "@/app/components/navigation/TabNavigator";
import {HamburgerNavigator} from "@/app/components/navigation/HamburgerNavigator";

export function Navbar() {
  return (
      <nav className="flex w-full p-3 items-center justify-between flex-wrap">
        <div className="hidden md:flex">
          <TabNavigator/>
        </div>
        <div className="md:hidden">
          <HamburgerNavigator/>
        </div>
        <ThemeSwitcher/>
        <Divider className="basis-full mt-2"/>
      </nav>
  )
}