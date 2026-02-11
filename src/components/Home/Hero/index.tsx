"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";
import learningAnim from "../../../../public/lottie/OnlineLearningBanner.json";
import Lottie from "lottie-react";
import Button from "@/components/Common/Button";
import PageHeading from "@/components/Common/PageHeading";
import CardSlider from "./slider";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
              <Image
                src={`${getImagePrefix()}images/icons/icon-bag.svg`}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-white sm:text-28 text-18 mb-0">
                Auto‑apply to better jobs while you <span className="text-primary">sleep</span>
              </p>
            </div>
            <PageHeading
              topHeading="Let CrypGo send"
              bottomHeading="the right applications"
            />

            <div className="flex items-center md:justify-start justify-center gap-8">
              <Link href="/signin">
                <Button variant="primary" className="px-6 py-3">
                  Get started
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64 w-full">
              <Lottie
                animationData={learningAnim}
                loop
                style={{ filter: "hue-rotate(-120deg) saturate(1.4)" }}
              />
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
    </section>
  );
};

export default Hero;
