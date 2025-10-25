import React, { useEffect, useState } from "react";
import { RenderThird } from "./conditons";
import { validateDateRange, validateDateRangeStrict } from '../../utils/dateValidation.js';

import Swal from "sweetalert2";

const Step3 = ({ stepData, setStepData, step, setStep }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const [isNew, setIsNew] = useState(true);

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



    if (stepData.previousPolicy.toLowerCase() === "yes") {
      const _ppsDate = stepData.prevoiusPolicyStartDate;
      const _ppeDate = stepData.prevoiusPolicyEndDate;
      const result = validateDateRange(_ppsDate, _ppeDate);
      if (!result.isValid) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date Range",
          html: result.error,
        });
        return false;
      }
    }



    // prevoiusPolicyStartDate // prevoiusPolicyEndDate

    return true;
  };

  const prev = () => {
    setStep(step - 1);
  };
  const next = () => {
    console.warn(`Step 3`, stepData);
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    let data = stepData;
    if (data?.proposalType === "New") {
      setIsNew(false);
    }
  }, []);

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step3`;
  }, []);
  return (
    <div>
      {isNew && (
        <RenderThird
          setRequiredFields={setRequiredFields}
          stepData={stepData}
          setStepData={setStepData}
          handleChangeStep={handleChangeStep}
        />
      )}
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

export default Step3;
