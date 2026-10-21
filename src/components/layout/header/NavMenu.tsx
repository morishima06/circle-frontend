// src/components/layout/Header/NavMenu.tsx
import Link from "next/link";

const links = [
  { href: "/men/new-arrivals", label: "Newarrivals" },
  { href: "/men/clothing", label: "Clothing" },
  { href: "/men/footwear", label: "Footwear" },
  { href: "/men/accessories", label: "Accessories" },
  { href: "/designers", label: "Designers" },
  { href: "/men/sale", label: "Sale" },
];

type NavMenuProps = {
  className?: string;
};

const NavMenu = ({ className = "" }: NavMenuProps) => (
  <nav
    className={`flex justify-center gap-6 text-[13px] font-light ${className}`}
  >
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-slate-700 underline-offset-4 hover:text-black hover:underline"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

export default NavMenu;
