"use client"

import {Divider} from "@nextui-org/react";

import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
import {TabNavigator} from "@/app/components/navigation/TabNavigator";
import {HamburgerNavigator} from "@/app/components/navigation/HamburgerNavigator";

export function Navbar() {
  return (
      <nav className="flex w-full p-3 items-center justify-between flex-wrap">
        <div className="pb-2">
          <div className="hidden lg:flex">
          <TabNavigator/>
          </div>
          <div className="lg:hidden">
          <HamburgerNavigator/>
          </div>
        </div>
        <div className="pb-2">
          <ThemeSwitcher/>
        </div>
        <Divider className="basis-full"/>
      </nav>
  )
}