"use client";

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jobCards } from "@/app/api/data";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";
import { Briefcase } from "lucide-react";

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 2500,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="mt-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-3">
        Popular job categories
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
        Roles we auto-apply to
      </h2>
      <Slider {...settings}>
        {jobCards.map((item, index) => (
          <div key={index} className="pr-4 sm:pr-6 h-[200px]">
            <Link
              href="/jobs"
              className="block px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl border border-dark_border/50 hover:border-primary/40 transition-colors h-[200px] flex flex-col"
            >
              <div className="flex items-start gap-4 flex-1 min-h-0">
                <div
                  className={`${item.background} ${item.padding} rounded-full shrink-0`}
                >
                  <Image
                    src={`${getImagePrefix()}${item.icon}`}
                    alt=""
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <div className="min-w-0 flex-1 flex flex-col min-h-0">
                  <p className="text-white font-semibold text-base mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-muted text-xs mb-3 line-clamp-2 flex-1">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-primary text-xs font-medium">
                      <Briefcase className="h-3.5 w-3.5" />
                      {item.openRoles} open roles
                    </span>
                    <span className="text-muted text-xs">{item.tag}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
