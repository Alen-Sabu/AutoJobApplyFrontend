import { upgradeData } from "@/app/api/data";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getImagePrefix } from "@/utils/utils";
import LearningProgressCard from "./LearningProgressCard";
import LearningStatsCard from "./LearningStatsCard";
import ChartCard from "./ChartCard";

const Upgrade = () => {
  return (
    <section className="md:py-40 py-20" id="upgrade">
      <div className="container mx-auto lg:max-w-screen-xl px-4">

        <div className="grid lg:grid-cols-2 sm:gap-0 gap-10 items-center">
          <div>
            <p className="text-primary sm:text-28 text-18 mb-3">Level up</p>
            <h2 className="text-white sm:text-40 text-30  font-medium mb-5">
              Upgrade your job search workflow
            </h2>
            <p className="text-muted text-opacity-60 text-18 mb-7">
              Move from manual spreadsheets and bookmarks to a clear, automated
              pipeline that keeps sending high‑quality applications in the
              background.
            </p>
            <div className="grid sm:grid-cols-2 lg:w-70% text-nowrap sm:gap-10 gap-5">
              {upgradeData.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div>
                    <Icon
                      icon="la:check-circle-solid"
                      width="24"
                      height="24"
                      className="text-white group-hover:text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="text-18 text-muted text-opacity-60">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
       
    
            <div className="relative w-full max-w-6xl mx-auto mt-20">
              {/* 🔷 Main Chart Component */}
              <div className="relative z-0 bg-[#1c1c24] rounded-2xl p-6 shadow-xl">
              <ChartCard />
              </div>

              {/* 🟢 Top Right: Progress Card */}
              <div className="absolute top-[-40px] right-0 z-10">
                <LearningProgressCard />
              </div>

              {/* 🟣 Bottom Left: Mini Bar Chart */}
              <div className="absolute bottom-[-40px] left-0 z-10">
               <LearningStatsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upgrade;
