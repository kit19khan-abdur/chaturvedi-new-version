import React, { useEffect, useState } from "react";
import { RenderSeven } from "./conditons";
import handleSubmit from "../../handleSubmit";

const Step7 = ({ stepData, setStepData, step, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    const updated = { ...stepData, [name]: value };
    setStepData(updated);
  };


  const prev = () => {
    setStep((prev) => prev - 1);
  };
  const submit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      await handleSubmit(stepData);
    } catch (error) {
      console.error("Error in submission:", error);
    }finally{
      setIsLoading(false);
    }
  };

   useEffect(() => {
          document.title = `Chaturvedi Motors Form || on Step7`;
      }, []);
  return (
    <div>
      <RenderSeven
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
          type="submit"
          onClick={(e) => submit(e)}
          className="bg-green-600 cursor-pointer font-[700] text-[#fff] px-6 py-2 rounded ml-auto"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step7;
