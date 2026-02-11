"use client";
import Image from "next/image";
import { timelineData } from "@/app/api/data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";
import PhoneLayout from "./PhoneLayout";

const TimeLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };
  return (
    <section className="md:pt-40 pt-9" id="development">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted sm:text-28 text-18 mb-9">
              How auto apply <span className="text-primary">works</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 font-medium lg:w-80% mx-auto mb-20">
              From profile setup to first interview, CrypGo keeps your search
              moving without spam.
            </h2>
          </motion.div>
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:block hidden relative md:w-[75%] md:mx-auto lg:w-full">
              <div className="relative w-full flex items-center justify-center overflow-hidden">
                {/* Background Circles */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="w-[100vw] h-[100vw] max-w-[800px] max-h-[600px] border border-white rounded-full absolute opacity-20"></div>
                  <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] border border-white rounded-full absolute opacity-20"></div>
                  <div className="w-[60vw] h-[60vw] max-w-[450px] max-h-[450px] border border-white rounded-full absolute opacity-10"></div>
                </div>

                {/* Phone Component */}
                <div className="relative z-10">
                  <PhoneLayout />
                </div>
              </div>
              <div className="absolute top-20 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Profile</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    Import your resume, preferences, and target roles.
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-planning.svg`}
                    alt="Planning"
                    width={44}
                    height={44}
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute top-20 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm p-6 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-refinement.svg`}
                    alt="Refinement"
                    width={44}
                    height={44}
                  />
                </div>
                <div className="text-left">
                  <h5 className="text-muted text-28 mb-3">Matching</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    CrypGo finds roles that actually match your profile.
                  </p>
                </div>
              </div>
              <div className="absolute lg:bottom-20 bottom-20 lg:left-0 -left-20 w-72 flex items-center gap-6">
                <div className="text-right">
                  <h5 className="text-muted text-28 mb-3">Auto apply</h5>
                  <p className="text-18 text-muted text-opacity-60">
                    We auto‑apply within your daily limits and guardrails.
                  </p>
                </div>
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-prototype.svg`}
                    alt="Prototype"
                    width={44}
                    height={44}
                    className="w-16 h-16 "
                  />
                </div>
              </div>
              <div className="absolute lg:bottom-20 bottom-20 lg:right-0 -right-20 w-72 flex items-center gap-6">
                <div className="bg-light_grey bg-opacity-45 backdrop-blur-sm px-6 py-2 h-fit rounded-full">
                  <Image
                    src={`${getImagePrefix()}images/timeline/icon-support.svg`}
                    alt="Scale and support"
                    width={44}
                    height={44}
                    className="w-16 h-16"
                  />
                </div>
                <div className="text-left">
                    <h5 className="text-muted text-nowrap text-28 mb-3">
                      Interviews
                    </h5>
                  <p className="text-18 text-muted text-opacity-60">
                      Track replies and interviews from one unified timeline.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 md:hidden">
              {timelineData.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="bg-light_grey bg-opacity-45 p-6 rounded-full">
                    <Image
                      src={`${getImagePrefix()}${item.icon}`}
                      alt={item.title}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="text-start">
                    <h4 className="text-28 text-muted mb-2">{item.title}</h4>
                    <p className="text-muted text-opacity-60 text-18">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
