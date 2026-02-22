"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import Button from "@/components/Common/Button";

const Companies = () => {
  return (
    <section className="md:pt-44 sm:pt-24 pt-12 relative z-1" id="companies">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="bg-section bg-opacity-10 px-16 py-14 rounded-3xl border-2 border-opacity-20 border-section grid grid-cols-12 items-center relative overflow-hidden before:content-[''] before:absolute before:w-96 before:h-64 before:bg-start before:bg-no-repeat before:-bottom-11 lg:before:right-48 before:-z-1 before:opacity-10">
          <div className="lg:col-span-8 col-span-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary bg-opacity-20">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-white sm:text-40 text-30 font-medium">
                For <span className="text-primary">Companies</span>
              </h2>
            </div>
            <p className="text-muted text-opacity-60 text-18">
              Post your jobs on CrypGo and reach candidates who auto-apply to roles that match. 
              Manage applicants in one place—no recruiting spam, just qualified interest.
            </p>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex flex-wrap lg:justify-end lg:mt-0 mt-7 justify-center gap-4">
              <Link href="/company/signin">
                <Button variant="secondary" className="px-6 py-3">
                  Company sign in
                </Button>
              </Link>
              <Link href="/company/signup">
                <Button className="px-6 py-3">
                  Post jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
