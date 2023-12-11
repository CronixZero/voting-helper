"use client"

import {usePathname} from "next/navigation";
import {Tabs, Tab} from "@nextui-org/react";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';

export function TabNavigator() {
  const pathname = usePathname();

  return (
      <div>
        <Tabs className="hidden lg:flex" aria-label="Sites" color="primary" variant="bordered"
              selectedKey={pathname}>
          <Tab
              key="/candidates"
              href={"/candidates"}
              title={
                <div className="flex items-center space-x-2">
                  <GroupAddRoundedIcon/>
                  <span>Kandidaten</span>
                </div>
              }
          />
          <Tab
              key="/votes"
              href={"/votes"}
              title={
                <div className="flex items-center space-x-2">
                  <BallotRoundedIcon/>
                  <span>Stimmen</span>
                </div>
              }
          />
          <Tab
              key="/count"
              href={"/count"}
              title={
                <div className="flex items-center space-x-2">
                  <CampaignRoundedIcon/>
                  <span>Auszählung</span>
                </div>
              }
          />
        </Tabs>
      </div>
  )
}