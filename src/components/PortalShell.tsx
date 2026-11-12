"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { navItems } from "@/lib/navigation";
import { PropellerCap } from "./PropellerCap";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3">
          <span className="group flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink">
            <PropellerCap className="h-8 w-11" />
            Kundserviceportalen
          </span>
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cap-blue ${
                        active ? "bg-cap-blue text-white" : "text-ink hover:bg-cream"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div
          aria-hidden="true"
          className="h-1.5 bg-[linear-gradient(90deg,var(--color-cap-red)_0_25%,var(--color-cap-yellow)_25%_50%,var(--color-cap-blue)_50%_75%,var(--color-cap-green)_75%)]"
        />
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
