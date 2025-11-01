import React, { useEffect } from "react";
import Select from "react-select";

export const RenderSeven = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const callExecutivesOptions = [
    { label: "Select Option", value: "" },
    { label: "Archana", value: "Archana" },
    { label: "Reena", value: "Reena" },
    { label: "Varsha Singhal", value: "Varsha Singhal" },
    { label: "Sarita Kumari", value: "Sarita Kumari" },
    { label: "Shilpi Shukla", value: "Shilpi Shukla" },
  ];

  const fieldExecutivesOptions = [
    { value: "Yashpal Chaudhary", label: "Yashpal Chaudhary" },
    { value: "Self Office", label: "Self Office" },
  ];

  const underwriterOptions = [
    { value: "", label: "Select" },
    { label: "Hardik Kulshrestha", value: "Hardik Kulshrestha" },
    { label: "Bhupendra", value: "Bhupendra" },
    { label: "Nitesh Chaudhary", value: "Nitesh Chaudhary" },
    { label: "Manjit", value: "Manjit" },
    { label: "Varsha Singhal", value: "Varsha Singhal" },
    { label: "Sarita Kumari", value: "Sarita Kumari" },
    { label: "Gaurav Yadav", value: "Gaurav Yadav" },
  ];

  const pucOptions = [
    { value: "", label: "Select" },
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  // for react-select
  const handleSelectChange = (selected, { name }) => {
    // if nothing selected, fallback to empty array
    const valuesOnly = (selected || []).map((opt) => opt.value);

    const updated = { ...stepData, [name]: valuesOnly };
    setStepData(updated);
  };
  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step7`;
  }, []);

  useEffect(() => {
    const fields = [];
    if (stepData.pucAvailable.toLowerCase() === "yes") {
      fields.push("pucCertificateNumber", "pucStartDate", "pucEndDate");
    }
    fields.push(
      "callExecutiveRefs",
      "fieldExecutiveRefs",
      "policyUnderwriter",
      "pucAvailable"
    );
    setRequiredFields(fields);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize p-4 rounded-xl space-y-4">
        {/* Top multi selects */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Call Executive Reference <span className="text-[#f00]">*</span>
            </label>
            <Select
              isMulti
              name="callExecutiveRefs"
              options={callExecutivesOptions}
              value={callExecutivesOptions.filter((opt) =>
                stepData.callExecutiveRefs?.includes(opt.value)
              )}
              onChange={handleSelectChange}
              classNamePrefix="react-select"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Field Executive Reference <span className="text-[#f00]">*</span>
            </label>
            <Select
              isMulti
              name="fieldExecutiveRefs"
              options={fieldExecutivesOptions}
              value={fieldExecutivesOptions.filter(
                (opt) => stepData.fieldExecutiveRefs?.includes(opt.value) // ✅ matches state key
              )}
              onChange={handleSelectChange}
              classNamePrefix="react-select"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </div>

        {/* Underwriter + PUC Available */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Policy Underwriter Executive Reference{" "}
              <span className="text-[#f00]">*</span>
            </label>
            <select
              name="policyUnderwriter"
              value={stepData.policyUnderwriter}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              {underwriterOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              PUC Available <span className="text-[#f00]">*</span>
            </label>
            <select
              name="pucAvailable"
              value={stepData.pucAvailable}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              {pucOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PUC certificate number */}
        {stepData.pucAvailable === "yes" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  PUC Certificate Number
                </label>
                <input
                  type="text"
                  name="pucCertificateNumber"
                  placeholder="Enter PUC Certificate Number"
                  value={stepData.pucCertificateNumber}
                  onChange={handleChangeStep}
                  className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">PUC Start Date</label>
                <input
                  type="date"
                  name="pucStartDate"
                  value={stepData.pucStartDate}
                  onChange={handleChangeStep}
                  className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                />
              </div>
            </div>

            {/* PUC End Date */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">PUC End Date</label>
                <input
                  type="date"
                  name="pucEndDate"
                  value={stepData.pucEndDate}
                  onChange={handleChangeStep}
                  className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                />
              </div>
            </div>
          </>
        )}
        {/* Remarks */}
        <div>
          <label className="block font-medium mb-1">Remarks</label>
          <textarea
            type="text"
            name="remarks"
            height="350px"
            placeholder="Enter remarks here"
            value={stepData.remarks}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
      </div>
    </>
  );
};
