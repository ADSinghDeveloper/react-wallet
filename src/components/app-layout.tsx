import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToggleThemeMode } from "./toggle-theme-mode";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background text-foreground">
          {/* Collapsible Left Sidebar */}
          <AppSidebar />

          {/* Dynamic Page Inset to push layout when sidebar opens */}
          <SidebarInset className="flex flex-col flex-1 min-w-0">
            {/* Sticky Shared Top Navigation Header */}
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-[px] bg-border mx-2" />
                <h1 className="text-sm font-semibold tracking-tight">
                  Dashboard
                </h1>
              </div>

              {/* User Profile Action Menu */}
              <div className="flex items-center gap-4">
                <ToggleThemeMode />
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative h-8 w-8 rounded-full" render={<Button variant="outline" />}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://github.com"
                          alt="User Avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          shadcn
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          m@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      Log out
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Main Scrollable View Area */}
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="mx-auto max-w-7xl space-y-6">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
