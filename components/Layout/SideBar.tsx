"use client";

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarPostButton from "./SidebarPostButton";
import { signOut, useSession } from "next-auth/react";
import useUsers from "@hooks/useUsers";
import { useMemo } from "react";

const SideBar = () => {
  const { data: userData } = useSession();
  const { data: allUsers } = useUsers();
  const items = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icons: BsHouseFill,
        auth: false,
      },
      {
        label: "Notifications",
        href: "/notifications",
        icons: BsBellFill,
        auth: true,
      },
      {
        label: "Profile",
        href: `/users/${
          allUsers?.find((user) => user.email === userData?.user?.email)?.id
        }`,
        icons: FaUser,
        auth: true,
      },
    ],
    [userData, allUsers]
  );

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icons}
              auth={item.auth}
            />
          ))}
          {userData && (
            <SidebarItem
              href={""}
              label={"Logout"}
              icon={BiLogOut}
              onClick={() => signOut()}
              auth={false}
            />
          )}
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
