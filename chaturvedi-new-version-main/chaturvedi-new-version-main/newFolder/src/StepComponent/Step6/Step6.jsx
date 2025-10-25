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
    // Require paymentModessix only if paymentStatus is NOT Full/Partial Payment Received
    const status = (stepData?.paymentStatus || '').toLowerCase();
    if (status !== "total amount due") {
      if (stepData.paymentModessix.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Missing Field",
          html: `Please select at least one <span style=\"color:#f00\"> payment mode </span>`,
        });
        return false;
      }
    }


    // Map payment modes to their required amount fields
    const chequeFields = [
      "drawnBank",
      "chequeClearanceDate",
      "chequestatus",
      "chequeAmountsix"
    ];
    const modeToField = {
      "Cash": "cashAmountsix",
      "NEFT/RTGS": "neftAmountsix",
      "Google Pay": "googlePayAmountsix",
      "Debit Card": "debitAmountsix",
      "Credit Card": "creditAmountsix",
      "Netbanking": "netbankingAmountsix",
      "Cheque": chequeFields,
      "PhonePe": "phonepeAmountsix"
    };

    // For each selected payment mode, its amount field(s) must be filled
    for (const mode of stepData.paymentModessix) {
      const field = modeToField[mode];
      if (Array.isArray(field)) {
        for (const f of field) {
          if (!stepData[f] || String(stepData[f]).trim() === "") {
            Swal.fire({
              icon: "warning",
              title: "Missing Field",
              html: `Please fill the required field: <span style='color:#e74c3c; font-weight:600; text-transform: capitalize;'>${f}</span>`,
            });
            return false;
          }
        }
      } else if (field && (!stepData[field] || String(stepData[field]).trim() === "")) {
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
    setStep((prev) => prev - 1);
  };
  const next = () => {
    console.warn(`Step 6`, stepData);
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
        requiredFields={requiredFields}
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
