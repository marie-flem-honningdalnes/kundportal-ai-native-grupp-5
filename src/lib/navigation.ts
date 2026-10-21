export type NavItem = {
  label: string;
  href: string;
};

export const navItems: readonly NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tickets", href: "/tickets" },
  { label: "Orders", href: "/orders" },
  { label: "Invoices", href: "/invoices" },
  { label: "Account", href: "/account" },
];
