import type { UserPublic } from "@/shared/api/types";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

type SidebarFooterProps = {
  user: UserPublic;
  sidebarExpandet: boolean;
  onLogout: () => void;
};

export const AppSidebarFooter = ({
  user,
  sidebarExpandet,
  onLogout,
}: SidebarFooterProps) => {
  return (
    <SidebarMenu className="gap-2 px-1">
      {sidebarExpandet ? (
        <SidebarMenuItem>
          <div className="flex items-center gap-2 rounded-md px-2 py-1 ">
            <Avatar className="size-8 rounded-lg">
              <AvatarFallback className="rounded-lg text-xs">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="trunkate text-sm font-medium">{user.name}</p>
              <p className="trunkate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </SidebarMenuItem>
      ) : null}

      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => onLogout()} tooltip="Выйти">
          <LogOutIcon />
          <span>Выйти</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
