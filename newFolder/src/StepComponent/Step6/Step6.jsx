import React, { useEffect, useState } from "react";
import { RenderSix } from "./conditons";
import Swal from "sweetalert2";

const Step6 = ({ stepData, setStepData, step, setStep }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const validateFields = () => {
    for (let field of requiredFields) {
      if (!stepData[field] || stepData[field].trim() === "") {
        let name = `<span style="color:#e74c3c; font-weight:600; text-transform: capitalize;">${field}</span>`;
        Swal.fire({
          icon: "warning",
          title: "Missing Field",
          html: `Please fill the required field: ${name}`,
        });
        return false;
      }
    }
    return true;
  };

  const prev = () => {
    setStep((prev) => prev - 1);
  };
  const next = () => {
    if (validateFields()) {
      setStep(step + 1);
    }
  };
  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step6`;
  }, []);

  return (
    <div>
      <RenderSix
        stepData={stepData}
        setStepData={setStepData}
        handleChangeStep={handleChangeStep}
        setRequiredFields={setRequiredFields}
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
