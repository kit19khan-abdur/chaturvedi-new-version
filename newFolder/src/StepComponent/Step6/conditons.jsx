import React, { useEffect } from "react";
import StepSixCheckBox from "./StepSixCheckBox";
export const DefaultFields = ({ stepData, handleChangeStep, setRequiredFields }) => {

  return (
    <>
      
    </>
  )
}

export const RenderSix = ({ stepData, setStepData, requiredFields, setRequiredFields }) => {
  const handleChangeStep = (e) => {
    const { name, type, checked, value } = e.target;
    const updated = { ...stepData };

    if (type === "checkbox") {
      if (checked) {
        updated[name] = value;
      } else {
        delete updated[name]; // remove when unchecked
      }
    } else {
      updated[name] = value;
    }
    setStepData(updated);
    // handleChange()
  };

  useEffect(() => {
    const fields = requiredFields
    if (stepData.paymentStatus.toLowerCase() === 'partial payment received') {
      fields.push("paymentDate", "dueAmount", "expectedClearDate")
    }
    if (stepData.paymentStatus.toLowerCase() === 'total amount due') {
      fields.push("dueAmount", "expectedClearDate")
    }
    setRequiredFields(fields)
  }, [setRequiredFields, stepData])

  return (
    <>
      <div className="capitalize p-4 rounded-xl ">
        <div className="mb-4">
          <label className="block font-medium">Payment Received Status</label>
          <select
            name="paymentStatus" 
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            value={stepData.paymentStatus}
            onChange={(e) => handleChangeStep(e)}
          >
            <option value="">Select Payment Status</option>
            <option value="Full Payment Received">Full Payment Received</option>
            <option value="Partial Payment Received">Partial Payment Received</option>
            <option value="Total Amount Due">Total Amount Due</option>
          </select>
        </div>

        {(stepData.paymentStatus === 'Full Payment Received') && (
          <StepSixCheckBox requiredFields={requiredFields} setRequiredFields={setRequiredFields} title={"Payment by Customer"} stepData={stepData} setStepData={setStepData} paymentStatus={stepData.paymentStatus} />
        )}

        {(stepData.paymentStatus === 'Partial Payment Received') && (
          <>
            <StepSixCheckBox requiredFields={requiredFields} setRequiredFields={setRequiredFields} title={"Payment by Customer"} stepData={stepData} setStepData={setStepData} paymentStatus={stepData.paymentStatus} />

            <div className="mb-4">
              <label className="block font-medium">Date of Payment By Customer</label>
              <input
                type="date"
                name="paymentDate"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.paymentDate}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>
          </>
        )}

        {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Due Amount Left By Customer <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="dueAmount"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                placeholder="Enter Due Amount"
                value={stepData.dueAmount}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>

            <div>
              <label className="block font-medium">Expected Pending Payment Clear Date <span className="text-[#f00]">*</span></label>
              <input
                type="date"
                name="expectedClearDate"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.expectedClearDate}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>
          </div>
        )}
        <div>
        <label className="block font-medium">Remarks</label>
        <textarea
          rows={3}
          placeholder="Enter Remarks"
          name="paymentRecievedRemarks"
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          value={stepData.paymentRecievedRemarks}
          onChange={(e) => handleChangeStep(e)}
        />
      </div>

        {(stepData.paymentStatus === 'Partial Payment Received' || stepData.paymentStatus === 'Total Amount Due') && (
          <>
            <div className="mb-4">
              <label className="block font-medium">Pending Payment Comments</label>
              <textarea
                name="comments"
                className={`w-full border custom-select px-4 py-2StepSixCheckBox rounded`}
                rows="3"
                placeholder="Enter Comment"
                value={stepData.comments}
                onChange={(e) => handleChangeStep(e)}
              />
            </div>
          </>
        )}
        <DefaultFields
          stepData={stepData}
          setStepData={setStepData}
          handleChangeStep={handleChangeStep}
          setRequiredFields={setRequiredFields}
        />
      </div>
    </>
  );
};


