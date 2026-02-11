import Button from "@/components/Common/Button";
import { ChevronDown, Repeat } from "lucide-react";

const PhoneLayout = () => {
  return (
    <div className="w-[320px] max-w-md mx-auto bg-[#0F1116] rounded-3xl p-5 text-white font-medium shadow-2xl border border-gray-800">
      {/* Header */}
      <div className="text-center text-lg mb-6">Create auto‑apply flow</div>

      {/* Target role */}
      <div className="mb-4">
        <p className="text-xs text-gray-400">Target role</p>
        <div className="flex items-center justify-between bg-[#1A1D24] p-3 rounded-xl mt-1">
          <span className="text-base font-semibold">
            Senior Frontend Engineer
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <p className="text-xs text-gray-400">Location</p>
        <div className="flex items-center justify-between bg-[#1A1D24] p-3 rounded-xl mt-1">
          <span className="text-base font-semibold">Remote · Europe</span>
        </div>
      </div>

      {/* Daily limit */}
      <div className="mb-4">
        <p className="text-xs text-gray-400">Daily applications limit</p>
        <div className="flex items-center justify-between bg-[#1A1D24] p-3 rounded-xl mt-1">
          <span className="text-base font-semibold">25 / day</span>
        </div>
      </div>

      {/* Boards */}
      <div className="bg-[#1A1D24] p-3 rounded-xl mb-4">
        <div className="flex justify-between text-sm">
          <span>Job boards</span>
          <span className="text-gray-400">LinkedIn, Indeed</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 text-center">
          CrypGo respects your limits and never applies outside this config.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#1A1D24] to-[#0F1116] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow-inner mb-6">
        <p className="text-sm text-gray-400 font-semibold mb-4 uppercase tracking-wide">
          What this flow does
        </p>

        <ul className="space-y-4">
          {[
            "Finds roles that match your title and location.",
            "Skips low‑quality or unpaid listings.",
            "Sends tailored applications within your daily limit.",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Terms */}
      <p className="text-[10px] text-gray-500 text-center mb-4">
        By starting this flow, you agree to our{" "}
        <span className="underline">Terms & Conditions</span>.
      </p>

      <Button variant="primary">Start automation</Button>
    </div>
  );
};

export default PhoneLayout;
