"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";

export const NavigationMenuContainer = () => {
  const { data: session } = useSession();

  const onClickHandler = () => {
    if (!session?.user) {
      toast("Please sign in to continue.");
    }
  };

  return (
    <div className="sticky top-0 z-10 -mt-11 flex place-content-center pt-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <Button variant={"link"}>
                  <Image
                    src="/favicon.ico"
                    alt="favicon"
                    width={20}
                    height={20}
                  />
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {session?.user ? (
              <Link href="/logger" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Logger
                </NavigationMenuLink>
              </Link>
            ) : (
              <Button
                variant={"ghost"}
                onClick={onClickHandler}
                className={navigationMenuTriggerStyle()}
              >
                Logger
              </Button>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              className="self-center"
              variant={"secondary"}
              onClick={async () => {
                if (session) {
                  await signOut({ callbackUrl: "/" });
                } else {
                  await signIn("google", { callbackUrl: "/logger" });
                }
              }}
            >
              {session ? `Sign out` : "Sign in"}
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
