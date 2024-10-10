"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IndianRupee, ReceiptIndianRupee } from "lucide-react";


interface SecondaryLink {
  label: string;
  href: string;
  icon: JSX.Element; // Assuming this is a React component
  secondaryLinks?: SecondaryLink[];// Optional nested secondary links
}

// Interface for a primary link
interface Link {
  label: string;
  href: string;
  icon: JSX.Element; // Assuming this is a React component
  secondaryLinks?: SecondaryLink[]; // Optional secondary links for primary link
}

// The main array type for links
type LinksArray = Link[];

export function SideBarMenu() {
  const links: LinksArray = [
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
      secondaryLinks: [
        {
          label: "Adjustment 1", href: "/adjustments/1", icon: (
            <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
          )
        },
        {
          label: "Adjustment 2", href: "/adjustments/2", icon: (
            <ReceiptIndianRupee className="text-neutral-200 h-5 w-5 flex-shrink-0" />
          )
        },
      ],
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
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to toggle the dropdown for the specified link

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 mx-auto border border-neutral-200 overflow-hidden",
        "h-full" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-[#9a4207c3]">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden "
          // style={{
          //   scrollbarWidth: open ? 'thin' : 'none', // For Firefox
          //   msOverflowStyle: open ? 'scrollbar' : 'none', // For IE and Edge
          // }}
          >
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx}>
                  <SidebarLink key={idx} link={link} />
                  {link.label === "Adjustments" && (
                    <div className="dropdown ml-10">
                      {link?.secondaryLinks?.map((secondaryLink, sIdx) => (
                        <SidebarLink key={sIdx} link={secondaryLink} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

<style jsx>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`}</style>

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-base text-yellow-400 py-1 relative z-20"
    >
      <IndianRupee className="h-5 w-6 flex-shrink-0" />
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
      <IndianRupee className="h-5 w-6  flex-shrink-0" />
    </Link>
  );
};



export default SideBarMenu