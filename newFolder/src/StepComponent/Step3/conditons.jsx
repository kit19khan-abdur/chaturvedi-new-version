import React,{ useEffect, useState } from "react";

export const RenderThird = ({ handleChangeStep, stepData, setStepData, setRequiredFields }) => {
  useEffect(() => {
    if(stepData){
      setStepData((prev)=> {
        const update = {...prev,previousPolicy: "No"}
        return update
      })}
  },[])


  const [isClaim, setIsClaim] = useState("Yes");
  const insurerOptions = [
    {
      label: "Acko General Insurance Limited",
      value: "Acko General Insurance Limited",
    },
    {
      label: "Bajaj Allianz General Insurance Company Limited",
      value: "Bajaj Allianz General Insurance Company Limited",
    },
    {
      label: "Cholamandalam MS General Insurance Company Limited",
      value: "Cholamandalam MS General Insurance Company Limited",
    },
    {
      label: "Future Generali India Insurance Company Limited",
      value: "Future Generali India Insurance Company Limited",
    },
    {
      label: "Go Digit General Insurance Limited",
      value: "Go Digit General Insurance Limited",
    },
    {
      label: "HDFC ERGO General Insurance Company Limited",
      value: "HDFC ERGO General Insurance Company Limited",
    },
    {
      label: "ICICI LOMBARD General Insurance Company Limited",
      value: "ICICI LOMBARD General Insurance Company Limited",
    },
    {
      label: "IFFCO TOKIO General Insurance Company Limited",
      value: "IFFCO TOKIO General Insurance Company Limited",
    },
    {
      label: "Zurich Kotak General Insurance Company",
      value: "Zurich Kotak General Insurance Company",
    },
    {
      label: "Liberty General Insurance Limited",
      value: "Liberty General Insurance Limited",
    },
    {
      label: "Magma General Insurance Limited",
      value: "Magma General Insurance Limited",
    },
    {
      label: "National Insurance Company Limited",
      value: "National Insurance Company Limited",
    },
    {
      label: "Raheja QBE General Insurance Co. Ltd.",
      value: "Raheja QBE General Insurance Co. Ltd.",
    },
    {
      label: "Reliance General Insurance Company Limited",
      value: "Reliance General Insurance Company Limited",
    },
    {
      label: "Royal Sundaram General Insurance Company Limited",
      value: "Royal Sundaram General Insurance Company Limited",
    },
    {
      label: "SBI General Insurance Company Limited",
      value: "SBI General Insurance Company Limited",
    },
    {
      label: "Shriram General Insurance Company Limited",
      value: "Shriram General Insurance Company Limited",
    },
    {
      label: "Tata AIG General Insurance Company Limited",
      value: "Tata AIG General Insurance Company Limited",
    },
    {
      label: "The New India Assurance Company Limited",
      value: "The New India Assurance Company Limited",
    },
    {
      label: "The Oriental Insurance Company Limited",
      value: "The Oriental Insurance Company Limited",
    },
    {
      label: "United India Insurance Company Limited",
      value: "United India Insurance Company Limited",
    },
    {
      label: "Universal Sompo General Insurance Company Limited",
      value: "Universal Sompo General Insurance Company Limited",
    },
    {
      label: "Zuno General Insurance Ltd",
      value: "Zuno General Insurance Ltd",
    },
    {
      label: "Navi General Insurance Limited",
      value: "Navi General Insurance Limited",
    },
  ];

  useEffect(() => {
    const field = []
    if(stepData.previousPolicy.toLowerCase() === "yes"){
      if(stepData.prevPolicyType.toLowerCase() === "od only policy" || stepData.prevPolicyType.toLowerCase() === "od policy"){
        field.push("policyNumber" )
      }
      if(stepData.prevPolicyType.toLowerCase() === "tp policy"){
        field.push("tpPolicyStartDate","tpPolicyEndDate")
      }
      if(stepData.prevPolicyType.toLowerCase() === "package policy" ){
        field.push("prevoiusPolicyStartDate", "prevoiusPolicyEndDate")
      }
      field.push("prevPolicyType","insurerName", "policyNumber")
    }
    setRequiredFields(field)
  },[setRequiredFields, stepData.previousPolicy])


 return( <>
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
      {" "}
      <>
        <div>
          <label className="block font-medium">
            Previous Policy Available{" "}
          </label>
          <select
            name="previousPolicy"
            id="previousPolicy"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
            value={stepData?.previousPolicy || "No"}
            onChange={(e) => {
              handleChangeStep(e);
            }}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData?.previousPolicy === "Yes" && (
          <>
            <div>
              <label className="block font-medium">
                Previous Policy Type <span className="text-[#f00]">*</span>
              </label>
              <select
                id="prevPolicyType"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
                name="prevPolicyType"
                value={stepData?.prevPolicyType}
                onChange={handleChangeStep}
              >
                {(stepData?.policyType === "TP Only Policy" ||
                  stepData?.policyType === "OD only Policy") && (
                  <>
                    <option value="">Select Policy</option>
                    <option value="OD only Policy">OD Policy</option>
                    <option value="TP only Policy">TP Policy</option>
                    <option value="Package Policy">Package Policy</option>
                  </>
                )}
                {stepData?.policyType === "Package Policy" && (
                  <>
                    <option value="">Select Policy</option>
                    <option value="OD Policy">OD Policy</option>
                    <option value="Package Policy">Package Policy</option>
                  </>
                )}
              </select>
            </div>
            {stepData?.proposalType === "Renewal" &&
              stepData?.policyType === "TP Only Policy" &&
              stepData?.prevPolicyType === "TP only Policy" && (
                <>
                  <div>
                    <label className="block font-medium">
                      Previous Policy Start Date{" "}
                      <span className="text-[#f00]">*</span>
                    </label>
                    <input
                      type="date"
                      name="prevoiusPolicyStartDate"
                      value={stepData?.prevoiusPolicyStartDate}
                      onChange={handleChangeStep}
                      className={`w-full border px-4 py-2 border-[#e6e6e6] rounded `}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">
                      Previous Policy End Date{" "}
                      <span className="text-[#f00]">*</span>
                    </label>
                    <input
                      type="date"
                      name="prevoiusPolicyEndDate"
                      value={stepData?.prevoiusPolicyEndDate}
                      onChange={handleChangeStep}
                      className={`w-full border px-4 py-2 border-[#e6e6e6] rounded `}
                    />
                  </div>
                </>
              )}

            {stepData?.prevPolicyType != "" && (
              <div>
                <label className="block font-medium">
                  Previous Insurer <span className="text-[#f00]">*</span>
                </label>
                <select
                  id="insurerName"
                  className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
                  name="insurerName"
                  value={stepData?.insurerName}
                  onChange={handleChangeStep}
                >
                  <option value="">Select Option</option>
                  {insurerOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {stepData?.prevPolicyType != "" && (
              <div>
                <label className="block font-medium">
                  Policy Number <span className="text-[#f00]">*</span>
                </label>
                <input
                  type="text"
                  name="policyNumber"
                  value={stepData?.policyNumber}
                  onChange={handleChangeStep}
                  className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
                />
              </div>
            )}
            {stepData?.prevPolicyType === "OD Policy" && (
              <>
                <div>
                  <label className="block font-medium">
                    OD Policy Start Date <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="odPolicyStartDate"
                    value={stepData?.odPolicyStartDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
                  />
                </div>
                <div>
                  <label className="block font-medium">
                    OD Policy End Date <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="odPolicyEndDate"
                    value={stepData?.odPolicyEndDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
                  />
                </div>
              </>
            )}

            {stepData?.prevPolicyType === "OD Policy" && (
              <>
                <div>
                  <label className="block font-medium">Any Claim? </label>
                  <select
                    name="anyClaim"
                    id="anyClaim"
                    value={stepData?.anyClaim || isClaim}
                    className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                    onChange={(e) => setIsClaim(e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {isClaim === "No" && (
                  <div>
                    <label className="block font-medium">
                      NCB % <span className="text-[#f00]">*</span>
                    </label>
                    <select
                      name="ncbNewPolicy"
                      id="previousPolicy"
                      className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                      value={stepData?.ncbNewPolicy || "0%"}
                      onChange={handleChangeStep}
                    >
                      <option value="0%">0%</option>
                      <option value="20%">20%</option>
                      <option value="25%">25%</option>
                      <option value="35%">35%</option>
                      <option value="45%">45%</option>
                      <option value="50%">50%</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {stepData?.prevPolicyType === "TP Policy" && (
              <>
                <div>
                  <label className="block font-medium">
                    TP Policy Start Date <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="tpPolicyStartDate"
                    value={stepData?.tpPolicyStartDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded `}
                  />
                </div>
                <div>
                  <label className="block font-medium">
                    TP Policy End Date <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="tpPolicyEndDate"
                    value={stepData?.tpPolicyEndDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
                  />
                </div>
              </>
            )}
            {(stepData?.prevPolicyType === "Package Policy" ||
              stepData?.prevPolicyType === "OD only Policy") && (
              <>
                <div>
                  <label className="block font-medium">
                    Previous Policy Start Date{" "}
                    <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="prevoiusPolicyStartDate"
                    value={stepData?.prevoiusPolicyStartDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded `}
                  />
                </div>
                <div>
                  <label className="block font-medium">
                    Previous Policy End Date{" "}
                    <span className="text-[#f00]">*</span>
                  </label>
                  <input
                    type="date"
                    name="prevoiusPolicyEndDate"
                    value={stepData?.prevoiusPolicyEndDate}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 border-[#e6e6e6] rounded `}
                  />
                </div>
              </>
            )}
            {(stepData?.prevPolicyType === "Package Policy" ||
              stepData?.prevPolicyType === "OD only Policy") && (
              <>
                <div>
                  <label className="block font-medium">Any Claim?</label>
                  <select
                    name="anyClaim"
                    id="anyClaim"
                    value={stepData?.anyClaim || isClaim}
                    className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                    onChange={(e) => setIsClaim(e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {isClaim === "No" && (
                  <div>
                    <label className="block font-medium">
                      NCB % <span className="text-[#f00]">*</span>
                    </label>
                    <select
                      name="ncbNewPolicy"
                      id="previousPolicy"
                      className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                      value={stepData?.ncbNewPolicy || "0%"}
                      onChange={handleChangeStep}
                    >
                      <option value="0%">0%</option>
                      <option value="20%">20%</option>
                      <option value="25%">25%</option>
                      <option value="35%">35%</option>
                      <option value="45%">45%</option>
                      <option value="50%">50%</option>
                    </select>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  </>
 )
};
