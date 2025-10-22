import React from "react";
import classNames from "classnames";

const steps = [
  "Customer Details",
  "Vehicle Details & New Policy Details",
  "Policy Details",
  "New Policy Details",
  "Payment to Insurance Company",
  "Payment Received Status",
  "Executive & PUC Details",
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex md:flex-row flex-col w-[80vw] mx-auto mt-8 items-center justify-between mb-6 overflow-x-auto">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div key={stepNumber} className="flex items-center gap-2">
            <div
              className={classNames(
                "w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold",
                {
                  "bg-[#00ac34] text-white": isCompleted,
                  "bg-[#04bbae] text-white": isCurrent,
                  "border-[0.5px] border-[#b3b3b3] text-[#b3b3b3]":
                    !isCompleted && !isCurrent,
                }
              )}
            >
              {stepNumber}
            </div>
            <div
              className={classNames("text-[10px]", {
                "text-[#00ac34] font-medium": isCompleted, // ✅ Completed text
                "text-[#04bbae] font-medium": isCurrent, // ✅ Current text
                "text-gray-600": !isCompleted && !isCurrent, // Default
              })}
            >
              {label}
            </div>
            {stepNumber !== steps.length && (
              <div className="w-6 h-px bg-gray-300 text-[10px] mx-2 hidden sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
