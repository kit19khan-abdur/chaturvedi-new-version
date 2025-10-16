// Step4.jsx
import React, { useEffect } from "react";
import { getConditionComponent } from "./conditionMapper";

const Step4 = ({ stepData, step,setStep, setStepData, }) => {
  const ConditionComponent = getConditionComponent(stepData);
    const prev = () => {
      setStep((prev) => prev - 1)
    }
    const next = () => {
      setStep((prev) => prev + 1)
    }

        const handleChangeStep = (e) => {
        const { name, value } = e.target;

        setStepData((prev) => {
            const updated = { ...prev, [name]: value };
            return updated;
        });
    };

     useEffect(() => {
            document.title = `Chaturvedi Motors Form || on Step4`;
        }, []);

  return (
    <>
    <div className="p-4">
      {ConditionComponent ? (
        <ConditionComponent
          stepData={stepData}
          setStepData={setStepData}
          handleChangeStep={handleChangeStep}
        />
      ) : (
        <p className="text-gray-500">No matching condition found</p>
      )}
    </div>
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
    </>
  );
};

export default Step4;
