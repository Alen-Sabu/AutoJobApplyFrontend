"use client";

import React, { FC } from "react";
import Link from "next/link";
import { companyNavData } from "../Header/Navigation/companyNavData";
import { footerlabels } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const CompanyFooter: FC = () => {
  return (
    <footer className="pt-16 bg-darkmode border-t border-dark_border">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 lg:gap-20 md:gap-6 sm:gap-12 gap-6 pb-16">
          <div className="lg:col-span-4 md:col-span-6 col-span-6">
            <Logo />
            <h3 className="text-white text-24 font-medium sm:mt-20 mt-12">
              2025 Copyright | CrypGo Auto Job Apply
            </h3>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Company</h4>
            <ul>
              {companyNavData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Information</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.herf}
                    className="text-white hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CompanyFooter;
