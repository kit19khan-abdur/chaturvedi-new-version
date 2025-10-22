import React, { useEffect, useState } from "react";
import { Corporate, Individual } from "./conditons";
import Swal from "sweetalert2";

const Step1 = ({ stepData, setStepData, step, setStep }) => {
  const [isIndividual, setIsIndividual] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [requiredFields, setRequiredFields] = useState([]);

  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step1`;
  }, []);

  useEffect(() => {
    if (stepData?.customertype.toLowerCase() === "individual") {
      setIsIndividual(true);
      setIsCorporate(false);
    } else if (stepData?.customertype.toLowerCase() === "corporate") {
      setIsCorporate(true);
      setIsIndividual(false);
      setStepData((prev) => ({
        ...prev,
        title: "M/s",
      }));
    }
  }, [stepData?.customertype]);
  
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

  const next = () => {
    if (stepData.title.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        html: `Please fill the required field: <span style="color:#e74c3c; font-weight:600; text-transform: capitalize;">Title</span>`,
      });
      return;
    } else if (validateFields()) {
      setStep(step + 1);
    }
  };

  return (
    <div>
      <div className="capitalize textColor">
        <div className="flex md:flex-row flex-col  gap-4 mb-4">
          <div className="md:w-1/2 w-full">
            <label className="block font-medium">
              Customer Type <span className="text-[#f00]">*</span>
            </label>
            <select
              name="customertype"
              value={stepData?.customertype}
              onChange={(e) => {
                handleChangeStep(e);
                setIsIndividual(e.target.value === "Individual");
              }}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
          <div className="md:w-1/2 w-full">
            <label className="block font-medium">
              Title <span className="text-[#f00]">*</span>
            </label>
            <select
              name="title"
              value={
                stepData?.customertype === "Individual"
                  ? stepData?.title
                  : "M/s"
              }
              onChange={handleChangeStep}
              disabled={stepData?.customertype !== "Individual"} //🔒 disables the select
              className={`w-full border custom-select px-4 py-2 rounded focus:outline focus:outline-[#b3b3b3] `}
            >
              {stepData?.customertype === "Individual" && (
                <>
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </>
              )}
              {stepData?.customertype === "Corporate" && (
                <option value="M/s">M/s</option>
              )}
              {stepData?.customertype === "" && (
                <option value="">Select</option>
              )}
            </select>
          </div>
        </div>
      </div>
      {isIndividual ? (
        <Individual
          setRequiredFields={setRequiredFields}
          stepData={stepData}
          setStepData={setStepData}
          handleChangeStep={handleChangeStep}
        />
      ) : null}
      {isCorporate ? (
        <Corporate
          setRequiredFields={setRequiredFields}
          stepData={stepData}
          setStepData={setStepData}
          handleChangeStep={handleChangeStep}
        />
      ) : null}
      <div className={`flex justify-end mt-6`}>
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

export default Step1;
