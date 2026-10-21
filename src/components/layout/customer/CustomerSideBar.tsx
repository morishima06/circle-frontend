// src/components/layout/AccountSidebar.tsx
import Link from "next/link";

const links = [
  { href: "/customer", label: "アカウント" },
  { href: "/customer/orders", label: "ご注文履歴" },
  { href: "/customer/favorites", label: "お気に入り" },
  { href: "/customer/edit", label: "プロフィール情報" },
  { href: "/customer/addresses", label: "配送先住所" },
];

export const CustomerSidebar = () => {
  return (
    <ul className="flex flex-col space-y-3 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};
