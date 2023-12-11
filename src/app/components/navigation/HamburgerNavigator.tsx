"use client"

import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';

export function HamburgerNavigator() {
  return (
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-default-100 hover:bg-default-200">
              <MenuRoundedIcon/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
                key="/candidates"
                aria-label="Candidates"
                href="/candidates"
                startContent={<GroupAddRoundedIcon/>}>
              Kandidaten
            </DropdownItem>
            <DropdownItem
                key="/votes"
                aria-label="Votes"
                href="/votes"
                startContent={<BallotRoundedIcon/>}>
              Stimmen
            </DropdownItem>
            <DropdownItem
                key="/count"
                aria-label="Count"
                href="/count"
                startContent={<CampaignRoundedIcon/>}>
              Auszählung
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  )
}