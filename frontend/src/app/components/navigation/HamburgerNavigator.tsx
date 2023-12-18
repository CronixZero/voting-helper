"use client"

import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {Archive, Megaphone, UsersRound} from "lucide-react";

export function HamburgerNavigator() {
  return (
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
                isIconOnly className="w-10 h-10 flex items-center justify-center rounded-lg bg-default-100 hover:bg-default-200">
              <MenuRoundedIcon/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
                key="/candidates"
                aria-label="Candidates"
                href="/candidates"
                startContent={<UsersRound/>}>
              Kandidaten
            </DropdownItem>
            <DropdownItem
                key="/votes"
                aria-label="Votes"
                href="/votes"
                startContent={<Archive/>}>
              Stimmen
            </DropdownItem>
            <DropdownItem
                key="/count"
                aria-label="Count"
                href="/count"
                startContent={<Megaphone/>}>
              Auszählung
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  )
}