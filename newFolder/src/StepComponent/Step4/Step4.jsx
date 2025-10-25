// Step4.jsx
import React, { useEffect, useState } from "react";
import { getConditionComponent } from "./conditionMapper";
import { validateDateRange, validateDateRangeStrict } from '../../utils/dateValidation.js';
import Swal from "sweetalert2";

const Step4 = ({ stepData, step, setStep, setStepData }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const ConditionComponent = getConditionComponent(stepData);

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

    let newODPolicyStartDate = stepData.newODPolicyStartDate;
    let newODPolicyEndDate = stepData.newODPolicyEndDate;
    if (newODPolicyStartDate && newODPolicyEndDate) {
      let _odDataResult = validateDateRange(newODPolicyStartDate, newODPolicyEndDate);
      if (!_odDataResult.isValid) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date Range",
          html: _odDataResult.error,
        })
         return false;
      }
    }

    let newTPPolicyStartDate = stepData.newTPPolicyStartDate;
    let newTPPolicyEndDate = stepData.newTPPolicyEndDate;
    if (newTPPolicyStartDate && newTPPolicyEndDate) {
      let _tpDataResult = validateDateRange(newTPPolicyStartDate, newTPPolicyEndDate);
      if (!_tpDataResult.isValid) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date Range",
          html: _tpDataResult.error,
        })
        return false;
      }
    }
    let isPaCovered = (stepData.paCover || "").toLowerCase() === "yes";
    let paStartDate = stepData.paStartDate;
    let paEndDate = stepData.paEndDate;
    if (paStartDate && paEndDate && isPaCovered) {
      let _paDataResult = validateDateRange(paStartDate, paEndDate);
      if (!_paDataResult.isValid) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date Range",
          html: _paDataResult.error,
        })
        return false;
      }
    }

    return true;
  };

  const prev = () => {
    setStep(step - 1);
  };
  const next = () => {
    if (validateFields()) {
      setStep(step + 1);
    }
  };

  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      if (!prev) return prev;

      // Create a shallow copy and apply the current change so calculations use the new value
      const updated = { ...prev, [name]: value };

      // Update netTotal/totalPremium/netPayable if amount fields change
      if (["odAmount", "tpAmount", "gstAmount", "breakingCharge", "waiverAmount", "paCoverAmount"].includes(name)) {
        const paAmount = Number(updated.paCoverAmount) || 0;
        const od = Number(updated.odAmount) || 0;
        const tp = Number(updated.tpAmount) || 0;
        const hasOd = updated.odAmount !== undefined && updated.odAmount !== null && String(updated.odAmount).trim() !== "";
        const netTotal = hasOd ? od + tp + paAmount : tp + paAmount;
        const gst = Number(updated.gstAmount) || 0;
        const totalPremium = Number(netTotal) + gst;
        const breakingCharge = Number(updated.breakingCharge) || 0;
        const waiver = Number(updated.waiverAmount) || 0;
        let netPayable = Number(totalPremium) + Number(breakingCharge) - Number(waiver);

        // ✅ Prevent negative value and alert
        if (netPayable < 0) {
          Swal.fire({
            icon: "warning",
            title: "Invalid Amount",
            text: "Net Payable cannot be less than 0. It has been reset to 0.",
          });
          netPayable = 0;
        }

        // Update calculated fields
        updated.netTotal = netTotal;
        updated.totalPremium = totalPremium;
        updated.netPayable = netPayable;
      }
      return updated;
    });
  };


  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step4`;
  }, []);

  return (
    <>
      <div className="">
        {ConditionComponent ? (
          <ConditionComponent
            stepData={stepData}
            setStepData={setStepData}
            handleChangeStep={handleChangeStep}
            setRequiredFields={setRequiredFields}
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
