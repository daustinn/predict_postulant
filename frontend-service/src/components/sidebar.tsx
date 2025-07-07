"use client";

import {
  IconBrandGoogleHome,
  IconCirclePlus,
  IconCirclePlusFilled,
  IconDashboard,
  IconDashboardFilled,
  IconDiabolo,
  IconHelp,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const items = {
  "": {
    "/": {
      label: "Predecir",
      icon: [IconCirclePlus, IconCirclePlusFilled],
    },
    "/dashboard": {
      label: "Dashboard",
      icon: [IconDashboard, IconDashboardFilled],
    },
    "/models": {
      label: "Modelos",
      icon: [IconDiabolo, IconDiabolo],
    },
  },
  footer: {
    "/help": {
      label: "Ayuda",
      icon: [IconHelp, IconHelp],
    },
  },
};

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex flex-col">
      <header className="p-4 pb-2 px-6">
        <h2 className="flex items-center text-base gap-2 font-medium tracking-tight">
          <IconBrandGoogleHome size={20} />
          Pontificia inc.
        </h2>
      </header>
      <nav className="p-4 grow flex flex-col gap-0.5">
        {Object.entries(items).map(([key1, value], i) => {
          return (
            <React.Fragment key={i}>
              {key1 && (
                <h3
                  data-foo={key1 === "footer" ? "" : undefined}
                  className="mt-2 data-[foo]:mt-auto px-2 text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400"
                >
                  {key1 !== "footer" && key1}
                </h3>
              )}
              <ul className="space-y-1">
                {Object.entries(value).map(([path, { label, icon: Icon }]) => {
                  const isActive =
                    path === "/"
                      ? pathname === path
                      : pathname.startsWith(path);

                  const IconComponent = isActive ? Icon[1] : Icon[0];
                  return (
                    <li key={path}>
                      <Link
                        data-active={isActive ? "" : undefined}
                        href={path}
                        className="data-[active]:font-medium data-[active]:dark:bg-neutral-200 data-[active]:dark:text-neutral-800 flex items-center gap-2 p-2 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <IconComponent size={17} />
                        <span>{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
