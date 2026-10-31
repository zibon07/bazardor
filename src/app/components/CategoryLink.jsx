"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLink({ category, variant = "desktop" }) {
  const pathname = usePathname();
  const active = pathname === `/category/${category.slug}`;

  const cls =
    variant === "mobile"
      ? active ? "menu-active" : ""
      : `btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`;

  return (
    <Link href={`/category/${category.slug}`} className={cls}>
      {category.icon} {category.nameBn}
    </Link>
  );
}