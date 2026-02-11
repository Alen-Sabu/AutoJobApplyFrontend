"use client";
import Image from "next/image";
import { portfolioData } from "@/app/api/data";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";
import PortfolioCard from "./PortfolioCard";
import { GraduationCap, Code, Laptop, Code2, BarChart2, BarChart3, BrainCircuit } from "lucide-react";

const Portfolio = () => {
  return (
    <section className="md:pt-48 sm:pt-28 pt-12" id="portfolio">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        
     
        <div className="grid lg:grid-cols-2 items-center gap-20">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
           
          >
           <div className="relative flex flex-wrap justify-center gap-5">
          <div className="relative z-10">
            <PortfolioCard
              title="React"
              subheading="Beginner to Advanced"
              price="99"
              percentage="10"
              icon={<GraduationCap />}
            />
          </div>
          <div className="relative mt-20">
            <PortfolioCard
              title="Data Science"
              subheading="Beginner to Advanced"
              price="99"
              percentage="10"
              icon={<BrainCircuit />}
            />
          </div>
          <div className="absolute -top-10 left-1/2 ml-4">
            <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center">
              <Code2 />
            </div>
          </div>
          <div className="absolute -bottom-10 right-1/2 mr-4">
            <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center">
              <BarChart3 />
            </div>
          </div>
        </div>
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="sm:text-28 text-18 text-muted mb-4">
              Your personalised{" "}
              <span className="text-primary">job search hub</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 mb-4 font-medium">
              Bring all your applications into{" "}
              <span className="text-primary">one place</span>
            </h2>
            <p className="text-muted text-opacity-60 text-18">
              CrypGo keeps track of where you applied, what you sent, and who
              replied—so you never lose a great opportunity in a messy inbox.
            </p>

            <table className="w-full sm:w-[80%]">
              <tbody>
                {portfolioData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dark_border border-opacity-10"
                  >
                    <td className="py-5">
                      <div className="bg-primary p-4 rounded-full bg-opacity-20 w-fit">
                        <Image
                          src={`${getImagePrefix()}${item.image}`}
                          alt={item.title}
                          width={35}
                          height={35}
                        />
                      </div>
                    </td>
                    <td className="py-5">
                      <h4 className="text-muted sm:text-28 text-22 ml-5">
                        {item.title}
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
