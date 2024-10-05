"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CircleDollarSign, ReceiptIndianRupee } from "lucide-react";

export function SideBarMenu() {
  const links = [
    {
      label: "Admission Fee Collection",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Other Fees Collection",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Adjustments",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Excess Refund",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Payment Refund",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Optional Facility Cancellation",
      href: "#",
      icon: (
        <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-700 mx-auto border border-neutral-200 overflow-hidden",
        "h-[90vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-slate-600">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-base text-yellow-400 py-1 relative z-20"
    >
      <CircleDollarSign className="h-5 w-6 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-white whitespace-pre"
      >
        Fee Collection
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-yellow-400 py-1 relative z-20"
    >
      <CircleDollarSign className="h-5 w-6  flex-shrink-0" />
    </Link>
  );
};



export default SideBarMenu