import React, { useEffect, useState } from "react";
import Select from 'react-select';

export const RenderSeven = ({ handleChangeStep, stepData, setStepData }) => {
      const callExecutivesOptions = [
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Sarita Kumari', label: 'Sarita Kumari' },
    { value: 'Shilpi shukla', label: 'Shilpi shukla' },
    { value: 'Radha Kumari', label: 'Radha Kumari' },
    { value: 'Garima Yadav', label: 'Garima Yadav' },
    { value: 'tanisha', label: 'Tanisha' },
    { value: 'Anamika chaudhary', label: 'Anamika chaudhary' }
  ];


  const fieldExecutivesOptions = [
    { value: 'Yashpal Chaudhary', label: 'Yashpal Chaudhary' },
    { value: 'Self Office', label: 'Self Office' },
  ];

  const underwriterOptions = [
    { value: '', label: 'Select' },
    { value: 'Prashant Kumar', label: 'Prashant Kumar' },
    { value: 'Rishik', label: 'Rishik' },
    { value: 'Sarita Kumari', label: 'Sarita Kumari' },
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Varsha Singhal', label: 'Varsha Singhal' },
    { value: 'Abhishek', label: 'Abhishek' },
  ];


  const pucOptions = [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ];

  // for react-select
  const handleSelectChange = (selected, { name }) => {
    // if nothing selected, fallback to empty array
    const valuesOnly = (selected || []).map(opt => opt.value);

    const updated = { ...stepData, [name]: valuesOnly };
    setStepData(updated);
  };
    useEffect(() => {
      document.title = `Chaturvedi Motors Form || on Step7`;
    }, []);

  return (
    <>
    <div className="capitalize p-4 rounded-xl shadow-sm bg-white space-y-4">
      {/* Top multi selects */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">
            Call Executive Reference
          </label>
          <Select
            isMulti
            name="callExecutiveRefs"
            options={callExecutivesOptions}
            value={callExecutivesOptions.filter((opt, index) =>
              stepData.callExecutiveRefs?.includes(opt.value)
            )}
            onChange={handleSelectChange}
            classNamePrefix="react-select"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Field Executive Reference
          </label>
          <Select
            isMulti
            name="fieldExecutiveRefs"
            options={fieldExecutivesOptions}
            value={fieldExecutivesOptions.filter(opt =>
              stepData.fieldExecutiveRefs?.includes(opt.value) // ✅ matches state key
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
            Policy Underwriter Executive Reference
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
          <label className="block font-medium mb-1">PUC Available</label>
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
      {stepData.pucAvailable === 'yes' && (<>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">PUC Certificate Number</label>
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
      </>)}
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
