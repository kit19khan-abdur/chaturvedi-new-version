import React, { useEffect, useState } from "react";
import { RenderFifth } from "./conditons";

const Step5 = ({ stepData, setStepData, step, setStep }) => {
  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const prev = () => {
    setStep((prev) => prev - 1);
  };
  const next = () => {
    setStep((prev) => prev + 1);
  };
   useEffect(() => {
          document.title = `Chaturvedi Motors Form || on Step5`;
      }, []);

  return (
    <div>
      <RenderFifth
        stepData={stepData}
        setStepData={setStepData}
        handleChangeStep={handleChangeStep}
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

export default Step5;

