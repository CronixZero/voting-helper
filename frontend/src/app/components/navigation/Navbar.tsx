"use client"

import {Divider} from "@nextui-org/react";

import {ThemeSwitcher} from "@/app/components/navigation/ThemeSwitcher";
import {TabNavigator} from "@/app/components/navigation/TabNavigator";
import {HamburgerNavigator} from "@/app/components/navigation/HamburgerNavigator";
import {SessionSwitcher} from "@/app/components/session/SessionSwitcher";
import {ChangeHistory} from "@/app/components/ChangeHistory";
import {SwipeNavigator} from "@/app/components/navigation/SwipeNavigator";

export function Navbar() {
  return (
      <nav className="flex w-full p-3 items-center justify-between flex-wrap">
        <div className="hidden md:flex">
          <TabNavigator/>
        </div>
        <div className="md:hidden">
          <HamburgerNavigator/>
          <SwipeNavigator/>
        </div>
        <div className="flex justify-between gap-2">
          <ChangeHistory/>
          <SessionSwitcher/>
          <ThemeSwitcher/>
        </div>
        <Divider className="basis-full mt-2"/>
      </nav>
  )
}