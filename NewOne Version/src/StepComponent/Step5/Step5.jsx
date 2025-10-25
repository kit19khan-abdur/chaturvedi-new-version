import React, { useEffect, useState} from "react";
import { RenderFifth } from "./conditons";
import Swal from "sweetalert2";

const Step5 = ({ stepData, setStepData, step, setStep }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

   const validateFields = () => {
       // Always require paymentModessix to have at least one value
       if (stepData.paymentModes.length === 0) {
         Swal.fire({
           icon: "warning",
           title: "Missing Field",
           html: `Please select at least one <span style="color:#f00"> payment mode </span>`,
         });
         return false;
       }
   
       // Map payment modes to their required amount fields
       const modeToField = {
         "Cash": "cashAmount",
         "NEFT/RTGS": "neftAmount",
         "Google Pay": "googlePayAmount",
         "Debit Card": "debitAmount",
         "Credit Card": "creditAmount",
         "Netbanking": "netbankingAmount",
         "Cheque": "chequeAmount",
         "PhonePe": "phonepeAmount"
       };
   
       // For each selected payment mode, its amount field must be filled
       for (const mode of stepData.paymentModes) {
         const field = modeToField[mode];
         if (field && (!stepData[field] || String(stepData[field]).trim() === "")) {
           Swal.fire({
             icon: "warning",
             title: "Missing Field",
             html: `Please fill the required field: <span style='color:#e74c3c; font-weight:600; text-transform: capitalize;'>${field}</span>`,
           });
           return false;
         }
       }
   
       // Validate all other required fields as before
       for (let field of requiredFields) {
         // Skip payment mode amount fields, already checked above
         if (Object.values(modeToField).includes(field)) continue;
         const value = stepData[field];
         const isEmpty =
           value === undefined ||
           value === null ||
           (typeof value === "string" ? value.trim() === "" : false) ||
           (Array.isArray(value) ? value.length === 0 : false) ||
           (typeof value !== "string" && typeof value !== "object" && value === "");
         if (isEmpty) {
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
    setStep(step - 1);
  };
  const next = () => {
    console.warn(`Step 5`, stepData);
     if (validateFields()) {
      setStep(step + 1);
    }
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

export default Step5;
