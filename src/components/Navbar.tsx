"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Product", href: "/products" },
  { title: "About Us", href: "/about" },
  // { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b-[0.5px] border-[rgba(0,0,0,0.1)]">
      <div className="max-w-310 w-full m-[0px_auto] h-17.5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex gap-1.5 p-[8.5px] cursor-pointer">
            <AiOutlineMenu />
            <p className='font-["Lato"] font-normal not-italic text-[16px] leading-none tracking-normal'>
              Menu
            </p>
          </div>
          <div className=" h-4 m-[10px_12px] border border-[rgba(0,0,0,0.6)]"></div>
          <div className="flex gap-3">
            <p className="p-2 cursor-pointer">Explore</p>
            <p className="p-2 cursor-pointer">Deals</p>
            <p className="p-2 cursor-pointer">Saved</p>
          </div>
        </div>
        <div>
          <div className="flex gap-3">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center cursor-pointer font-['Lato'] font-normal text-base p-[10px_20px] rounded-2xl transition-all ${
                    isActive
                      ? "text-[#4EA674]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.title}</span>

                  {/* Aktiv bo'lganda pastki chiziq */}
                  {isActive && (
                    <span className="absolute bottom-1 w-8 h-1 bg-[#4EA674] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
