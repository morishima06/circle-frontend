import {
  LayoutDashboard,
  type LucideIcon,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useOrderCounts } from "@/features/admin/order/hooks/useOrderCounts";

type Menu = {
  label: string;
  href: string;
  icon: LucideIcon;
  count?: number;
};

export const AdminSideBar = () => {
  const router = useRouter();
  const { counts } = useOrderCounts();

  const menus: Menu[] = [
    {
      label: "ダッシュボード",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "注文管理",
      href: "/admin/orders",
      icon: ShoppingCart,
      count: counts?.orderTasksCount,
    },
    // {
    //   label: '配送管理',
    //   href: '/admin/shipments',
    //   icon: Truck,
    // },
    {
      label: "商品管理",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "顧客管理",
      href: "/admin/customers",
      icon: Users,
    },
    // {
    //   label: '設定',
    //   href: '/admin/settings',
    //   icon: Settings,
    // },
  ];

  return (
    <aside className="bg-background hidden w-60 shrink-0 border-r md:flex md:flex-col">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/admin" className="text-lg font-bold">
          CIRCLE
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const isActive =
            menu.href === "/admin"
              ? router.pathname === "/admin"
              : router.pathname === menu.href ||
                router.pathname.startsWith(`${menu.href}/`);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{menu.label}</span>

              {menu.count !== undefined && menu.count > 0 && (
                <span className="ml-auto flex h-5 min-w-7 items-center justify-center rounded-lg bg-slate-600 px-2 text-xs text-white">
                  {menu.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSideBar;
