"use client"

import {usePathname} from "next/navigation";
import {Tab, Tabs} from "@nextui-org/react";
import {Archive, Megaphone, UsersRound} from "lucide-react";

export function TabNavigator() {
  const pathname = usePathname();

  return (
      <div className="content-center">
        <Tabs aria-label="Sites" color="primary" variant="bordered"
              selectedKey={pathname}>
          <Tab
              key="/candidates"
              href={"/candidates"}
              title={
                <div className="flex items-center space-x-2">
                  <UsersRound/>
                  <span>Kandidaten</span>
                </div>
              }
          />
          <Tab
              key="/votes"
              href={"/votes"}
              title={
                <div className="flex items-center space-x-2">
                  <Archive/>
                  <span>Stimmen</span>
                </div>
              }
          />
          <Tab
              key="/count"
              href={"/count"}
              title={
                <div className="flex items-center space-x-2">
                  <Megaphone/>
                  <span>Auszählung</span>
                </div>
              }
          />
        </Tabs>
      </div>
  )
}