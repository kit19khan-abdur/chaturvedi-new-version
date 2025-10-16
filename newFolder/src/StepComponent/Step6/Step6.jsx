import React, { useEffect, useState } from "react";
import { RenderSix } from "./conditons";

const Step6 = ({ stepData, setStepData, step, setStep }) => {
  const prev = () => {
    setStep((prev) => prev - 1);
  };
  const next = () => {
    setStep((prev) => prev + 1);
  };
     useEffect(() => {
            document.title = `Chaturvedi Motors Form || on Step6`;
        }, []);

  return (
    <div>
      <RenderSix
        stepData={stepData}
        setStepData={setStepData}
      />
      <div className={` ${step === 1 ? "" : "flex justify-between"} mt-6`}>
        <button
          type="button"
          onClick={prev}
          className="bg-gray-500 cursor-pointer font-[700] text-[#fff] px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={next}
          className="bg-[#1a8656] cursor-pointer font-[700] text-[#fff] px-4 py-2 rounded ml-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step6;