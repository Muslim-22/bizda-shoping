
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import Link from "next/link";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <div className="left-0 w-full z-50 bg-white border-b-[0.5px] border-[rgba(0,0,0,0.1)]">
      <div className="max-w-300 w-full mx-auto h-22.5 flex items-center justify-between">
        <div className="flex gap-5">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="cursor-pointer"
            />
          </Link>

          <div className="flex items-center justify-center gap-1 border-r border-l border-black p-[0px_12px]">
            <FaLocationDot className="w-8 h-8" />
            <div className="p-[0px_10px]">
              <p className="text-[12px]">Deliver to</p>
              <p className="text-[14px]">Your address</p>
            </div>
          </div>

          <select name="language" className="cursor-pointer">
            <option value="uz">UZB</option>
            <option value="en">ENG</option>
          </select>
        </div>

        <div className="flex items-center gap-5">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-[rgba(234,248,231,1)] flex items-center justify-center rounded-[200px] focus-within:bg-[#d2f3cc] transition-all duration-300 p-[6px_4px]"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="What you're looking for"
              className="min-w-85 w-full p-[0px_16px] outline-none bg-transparent"
            />

            <Link
              href={`/products?search=${encodeURIComponent(search)}`}
              className="bg-white flex items-center justify-center gap-2 rounded-[200px] p-[8px_32px] cursor-pointer"
            >
              <FiSearch /> Search
            </Link>
          </form>

          <div className="cursor-pointer">
            <FaUserAlt />
          </div>

          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <SlBasket /> Cart
          </div>
        </div>
      </div>
    </div>
  );
}
