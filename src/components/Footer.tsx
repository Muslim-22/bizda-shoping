
"use client";

import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import type { FormEvent } from "react";

export default function Footer() {
  const emailPush = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[rgba(234,248,231,1)]">
      <div className="max-w-310 w-full m-[0px_auto] flex gap-12.5 p-[70px_0px_0px] justify-between">
        <div className="flex gap-12.5 justify-between">
          <div>
            <p className="font-medium text-[18px] p-[0px_0px_24px]">
              Company Info
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">About Us</p>
            <p className="p-[0px_0px_20px] cursor-pointer">Careers</p>
            <p className="p-[0px_0px_20px] cursor-pointer">Press Releases</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Sustainability Practices
            </p>
          </div>

          <div>
            <p className="font-medium text-[18px] p-[0px_0px_24px]">
              Customer Support
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">Contact Us</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Help Center (FAQs)
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">Track My Order</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Return & Refund Policy
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Shipping Information
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4.5 m-[auto_0px]">
          <Image
            src="/svg/logo.svg"
            alt="Logo"
            width={240}
            height={35}
          />

          <div className="flex flex-col items-center gap-4.5">
            <p className="text-[rgba(78,166,116,1)] font-medium">
              Newsletter Signup
            </p>

            <form
              onSubmit={emailPush}
              className="bg-[rgba(193,230,186,1)] flex items-center justify-center rounded-[200px] focus-within:bg-[#c2f4b9] transition-all duration-300 p-[6px_auto] cursor-pointer"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="outline-none w-62.5 p-[2px_8px]"
              />

              <button
                type="submit"
                className="bg-white rounded-[200px] p-[8px_25px] cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex gap-12.5 justify-between">
          <div>
            <p className="font-medium text-[18px] p-[0px_0px_24px]">
              Company Info
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">About Us</p>
            <p className="p-[0px_0px_20px] cursor-pointer">Careers</p>
            <p className="p-[0px_0px_20px] cursor-pointer">Press Releases</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Sustainability Practices
            </p>
          </div>

          <div>
            <p className="font-medium text-[18px] p-[0px_0px_24px]">
              Customer Support
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">Contact Us</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Help Center (FAQs)
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">Track My Order</p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Return & Refund Policy
            </p>
            <p className="p-[0px_0px_20px] cursor-pointer">
              Shipping Information
            </p>

            <div className="m-[50px_0px]">
              <p className="font-medium text-[18px]">Connect with us</p>

              <div className="flex gap-3 p-[12px_0px]">
                <FaFacebook className="text-blue-700 w-6.25 h-6.25 z-10 cursor-pointer" />
                <FaSquareInstagram className="text-orange-500 w-6.25 h-6.25 z-10 cursor-pointer" />
                <BsTwitterX className="text-black w-6.25 h-6.25 z-10 cursor-pointer" />
                <FaLinkedin className="text-blue-700 w-6.25 h-6.25 z-10 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t p-[16px_0px] border-[rgba(78,166,117,1)]">
        <div className="max-w-310 w-full m-[0px_auto] flex justify-between">
          <p className="text-[rgba(0,0,0,0.5)]">
            © 2025 Dealport. All rights reserved
          </p>
          <p className="text-[rgba(0,0,0,0.5)]">
            Trusted Seller Certifications by SSL Secure
          </p>
        </div>
      </div>
    </div>
  );
}
