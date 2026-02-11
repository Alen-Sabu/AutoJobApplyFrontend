import { ArrowRight } from "lucide-react"; 
import React from "react";

interface PortfolioCardProps {
  title: string;
  subheading: string;
  price: number | string;
  percentage: number | string;
  icon: React.ReactNode;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({title, subheading, price, percentage, icon}) => {
  return (
    <div className="bg-slateGray rounded-2xl p-6 w-[250px] relative">
       <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-midnight_text rounded-full flex items-center justify-center border-4 border-[#0f1116]">
        <span className="text-xl font-bold">{icon}</span>
      </div>
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{subheading}</p>
      </div>
       <div className="text-center my-4">
        <p className="text-3xl font-bold">${price}</p>
        <p className="text-green-500 text-sm">+{percentage}% (Last Week)</p>
      </div>

      {/* Arrow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-14 h-14">
        <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard
