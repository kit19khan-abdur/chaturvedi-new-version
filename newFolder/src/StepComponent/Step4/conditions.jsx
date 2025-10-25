import { useEffect } from "react";
// Generic handler for any start/end date pair
function handleDatePairChange({ e, stepData, setStepData, startField, endField }) {
  const { name, value } = e.target;
  let newStepData = { ...stepData, [name]: value };
  if (name === startField && stepData[endField]) {
    if (new Date(value) > new Date(stepData[endField])) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Start date cannot be after end date!",
      });
      return;
    }
  }
  if (name === endField && stepData[startField]) {
    if (new Date(value) < new Date(stepData[startField])) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "End date cannot be before start date!",
      });
      return;
    }
  }
  setStepData(newStepData);
}

// Helper to compute and update amounts
function computeAndUpdateAmounts(stepData, setStepData) {
  const od = Number(stepData.odAmount) || 0;
  const tp = Number(stepData.tpAmount) || 0;
  const gst = Number(stepData.gstAmount) || 0;
  const breaking = Number(stepData.breakingCharge) || 0;
  const waiver = Number(stepData.waiverAmount) || 0;

  const netTotal = od ? od + tp : tp;
  const totalPremium = netTotal + gst;
  const netPayable = totalPremium + breaking - waiver;

  // Only update if values have changed
  if (
    stepData.netTotal !== netTotal ||
    stepData.totalPremium !== totalPremium ||
    stepData.netPayable !== netPayable
  ) {
    setStepData({
      ...stepData,
      netTotal,
      totalPremium,
      netPayable,
    });
  }
}
import Select, { components } from "react-select";
import Swal from "sweetalert2";




const Alloption = (stepData, setStepData) => {
  const addonOptions = [
    {
      value: "select_all",
      label: "Select All",
    },
    {
      value: "Normal Policy",
      label: "Normal Policy",
    },
    {
      value: "Zero Depreciation/Nil Depreciation Cover",
      label: "Zero Depreciation/Nil Depreciation Cover",
    },
    {
      value: "Engine Protection Cover",
      label: "Engine Protection Cover",
    },
    {
      value: "No Claim Bonus (NCB) Protection Cover",
      label: "No Claim Bonus (NCB) Protection Cover",
    },
    {
      value: "Roadside Assistance Cover",
      label: "Roadside Assistance Cover",
    },
    {
      value: "Return to Invoice Cover",
      label: "Return to Invoice Cover",
    },
    {
      value: "Daily Allowance Cover",
      label: "Daily Allowance Cover",
    },
    {
      value: "Passenger Cover",
      label: "Passenger Cover",
    },
    {
      value: "Consumables Cover",
      label: "Consumables Cover",
    },
    {
      value: "Tyre Protection Cover",
      label: "Tyre Protection Cover",
    },
    {
      value: "Key Loss Protection Cover",
      label: "Key Loss Protection Cover",
    },
    {
      value: "Personal Belongings Cover",
      label: "Personal Belongings Cover",
    },
    {
      value: "Personal Accident Cover",
      label: "Personal Accident Cover",
    },
    {
      value: "Legal Aid",
      label: "Legal Aid",
    },
    {
      value: "Outstation Emergency Cover",
      label: "Outstation Emergency Cover",
    },
  ];
  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 8 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };
  const handleAddonsChange = (selected) => {
    const allRealOptions = addonOptions.filter((o) => o.value !== "select_all");
    // selected can be null if everything is deselected
    if (!selected || selected?.length === 0) {
      const updated = { ...stepData, addons: [] };
      setStepData(updated);
      localStorage.setItem("stepData", JSON.stringify(updated));
      return;
    }

    const selectedValues = selected.map((s) => s.value);

    // if user clicked "Select All" we decide what to do
    if (selectedValues?.includes("select_all")) {
      // if we don't already have all, then select all
      if (stepData.addons?.length !== allRealOptions?.length) {
        const allValues = allRealOptions.map((o) => o.value);
        const updated = { ...stepData, addons: allValues };
        setStepData(updated);
        return;
      } else {
        // deselect all
        const updated = { ...stepData, addons: [] };
        setStepData(updated);
        return;
      }
    }

    // normal multi-select (no select_all clicked)
    const valuesWithoutSelectAll = selectedValues.filter(
      (v) => v !== "select_all"
    );
    const updated = { ...stepData, addons: valuesWithoutSelectAll };
    setStepData(updated);
  };

  const allRealOptions = addonOptions.filter((o) => o.value !== "select_all");

  const selectedValues = [
    ...(stepData?.addons?.length === allRealOptions?.length
      ? [{ value: "select_all", label: "Select All" }]
      : []),
    ...addonOptions.filter((opt) => stepData?.addons?.includes(opt.value)),
  ];

  const insurerOptions = [
    {
      label: "Select Option",
      value: "",
    },
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

  return {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  };
};

export const condition1 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
 }) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

   useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
    // compute derived amount fields and persist
    computeAndUpdateAmounts(stepData, setStepData);
   }, [setRequiredFields, stepData, setStepData]);
  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name=""
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={e => {
              // Example: you can add similar logic for policyIssueDate if needed
              handleChangeStep(e);
            }}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={Number(stepData.netTotal) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={Number(stepData.totalPremium) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 1------------------------------

export const condition2 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
    // compute derived amount fields and persist
    computeAndUpdateAmounts(stepData, setStepData);
  }, [setRequiredFields, stepData, setStepData]);
  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={Number(stepData.netTotal) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={Number(stepData.totalPremium) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
          value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 2------------------------------

export const condition3 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
    // compute derived amount fields and persist
    computeAndUpdateAmounts(stepData, setStepData);
  }, [setRequiredFields, stepData, setStepData]);
  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newPolicyStartDate"
              value={stepData.newPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newPolicyStartDate', endField: 'newPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newPolicyEndDate"
              value={stepData.newPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newPolicyStartDate', endField: 'newPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={Number(stepData.netTotal) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={Number(stepData.totalPremium) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 3------------------------------

export const condition4 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
    // compute derived amount fields and persist
    computeAndUpdateAmounts(stepData, setStepData);
  }, [setRequiredFields, stepData, setStepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newPolicyStartDate"
              value={stepData.newPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newPolicyStartDate', endField: 'newPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newPolicyEndDate"
              value={stepData.newPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newPolicyStartDate', endField: 'newPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={Number(stepData.netTotal) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={Number(stepData.totalPremium) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 4------------------------------

export const condition5 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
    // compute derived amount fields and persist
    computeAndUpdateAmounts(stepData, setStepData);
  }, [setRequiredFields, stepData, setStepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 5------------------------------

export const condition6 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 6------------------------------

export const condition7 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 7------------------------------

export const condition8 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const { insurerOptions } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 8------------------------------

export const condition9 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const { insurerOptions } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>

        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(Number(stepData.paCoverAmount) || 0) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 9------------------------------

export const condition10 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            New OD Policy Start Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyStartDate"
            value={stepData.newODPolicyStartDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label>
            New OD Policy End Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyEndDate"
            value={stepData.newODPolicyEndDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>

        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>

        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 10------------------------------

export const condition11 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <>
            <div className="">
              <label>
                New TP Policy Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyStartDate"
                value={stepData.newTPPolicyStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                New TP Policy End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyEndDate"
                value={stepData.newTPPolicyEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
          </>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 11------------------------------

export const condition12 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newODPolicyStartDate', endField: 'newODPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <>
            <div className="">
              <label>
                New TP Policy Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyStartDate"
                value={stepData.newTPPolicyStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                New TP Policy End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyEndDate"
                value={stepData.newTPPolicyEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
          </>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'paStartDate', endField: 'paEndDate' })}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 12------------------------------

export const condition13 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <>
            <div className="">
              <label>
                New TP Policy Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyStartDate"
                value={stepData.newTPPolicyStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                New TP Policy End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyEndDate"
                value={stepData.newTPPolicyEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
          </>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 13------------------------------

export const condition14 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 14------------------------------

export const condition15 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <>
            <div className="">
              <label>
                New TP Policy Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyStartDate"
                value={stepData.newTPPolicyStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                New TP Policy End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyEndDate"
                value={stepData.newTPPolicyEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
          </>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 15------------------------------

export const condition16 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <>
            <div className="">
              <label>
                New TP Policy Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyStartDate"
                value={stepData.newTPPolicyStartDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                New TP Policy End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                type="date"
                name="newTPPolicyEndDate"
                value={stepData.newTPPolicyEndDate}
                onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
                className={`w-full border px-4 py-2 rounded`}
              />
            </div>
          </>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 16------------------------------

export const condition17 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}

        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 17------------------------------

export const condition18 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            New OD Policy Start Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyStartDate"
            value={stepData.newODPolicyStartDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label>
            New OD Policy End Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyEndDate"
            value={stepData.newODPolicyEndDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 18------------------------------

export const condition19 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            New OD Policy Start Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyStartDate"
            value={stepData.newODPolicyStartDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label>
            New OD Policy End Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyEndDate"
            value={stepData.newODPolicyEndDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 19------------------------------

export const condition20 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            New OD Policy Start Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyStartDate"
            value={stepData.newODPolicyStartDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label>
            New OD Policy End Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyEndDate"
            value={stepData.newODPolicyEndDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 20------------------------------

export const condition21 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>
            New OD Policy Start Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyStartDate"
            value={stepData.newODPolicyStartDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label>
            New OD Policy End Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="newODPolicyEndDate"
            value={stepData.newODPolicyEndDate}
            onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 21------------------------------

export const condition22 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newODPolicyStartDate",
      "newODPolicyEndDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div>
            <label>
              New OD Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyStartDate"
              value={stepData.newODPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
          <div>
            <label>
              New OD Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newODPolicyEndDate"
              value={stepData.newODPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newOdPolicyStartDate', endField: 'newOdPolicyEndDate' })}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            NCB For New Policy <span className="text-[#f00]">*</span>
          </label>
          <select
            name="ncbNewPolicy"
            value={stepData.ncbNewPolicy}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="0">0%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="35">35%</option>
            <option value="45">45%</option>
            <option value="50">50%</option>
          </select>
        </div>
        <div>
          <label>
            Addon Covers <span className="text-[#f00]">*</span>
          </label>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option: CheckboxOption }}
            options={addonOptions}
            value={selectedValues}
            onChange={handleAddonsChange}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e6e6e6", // default border
                boxShadow: "none", // remove react-select’s blue shadow
                "&:hover": {
                  borderColor: "#ccc",
                },
                borderWidth: "1px",
              }),
              option: (base, state) => ({
                ...base,
                padding: "8px 12px", // inside
                marginBottom: "4px", // gap
              }),
              multiValue: (base) => ({
                ...base,
                margin: "2px", // spacing between selected chips
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            OD Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="odAmount"
            value={Number(stepData.odAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (OD + TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 22------------------------------

export const condition23 = ({
  handleChangeStep,
  stepData,
  setStepData,
  setRequiredFields,
}) => {
  const data = Alloption(stepData, setStepData);
  const {
    addonOptions,
    CheckboxOption,
    handleAddonsChange,
    allRealOptions,
    selectedValues,
    insurerOptions,
  } = data;

  useEffect(() => {
    const field = [];
    if (stepData.paCover.toLowerCase() === "yes") {
      field.push(
        "pacertificateNumber",
        "paStartDate",
        "paEndDate",
        "paCoverAmount"
      );
    }
    field.push(
      "newTPPolicyStartDate",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "paCover"
    );
    setRequiredFields(field);
  }, [setRequiredFields, stepData]);

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <div className="">
            <label>
              New TP Policy Start Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyStartDate"
              value={stepData.newTPPolicyStartDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
          <div>
            <label>
              New TP Policy End Date <span className="text-[#f00]">*</span>
            </label>
            <input
              type="date"
              name="newTPPolicyEndDate"
              value={stepData.newTPPolicyEndDate}
              onChange={e => handleDatePairChange({ e, stepData, setStepData, startField: 'newTPPolicyStartDate', endField: 'newTPPolicyEndDate' })}
              className={`w-full border px-4 py-2 rounded`}
            />
          </div>
        </>
        <div>
          <label>
            Broker or Agency Name <span className="text-[#f00]">*</span>
          </label>
          <select
            name="brokerAgencyName"
            value={stepData.brokerAgencyName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            <option value="">Select</option>
            <option value="PROBUS - Chitra Chaturvedi">
              PROBUS - Chitra Chaturvedi
            </option>
            <option value="UNITED INDIA - Satya Prakash">
              UNITED INDIA - Satya Prakash
            </option>
            <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
            <option value="HOPE BOX - Satya Prakash">
              HOPE BOX - Satya Prakash
            </option>
            <option value="TURTLE MINT - Yatendra Kumar">
              TURTLE MINT - Yatendra Kumar
            </option>
            <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">
              UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar
            </option>
            <option value="RELIANCE GENERAL INSURANCE - Khem Chand">
              RELIANCE GENERAL INSURANCE - Khem Chand
            </option>
            <option value="PB PARTNER - Ravi Shankar">
              PB PARTNER - Ravi Shankar
            </option>
            <option value="PB PARTNER - Shiv Kumar">
              PB PARTNER - Shiv Kumar
            </option>
            <option value="PB PARTNER - Pavan Chaturvedi">
              PB PARTNER - Pavan Chaturvedi
            </option>
            <option value="PB PARTNER - Dheeraj Kumar">
              PB PARTNER - Dheeraj Kumar
            </option>
            <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
            <option value="GIRNAR - Satya Prakash">
              GIRNAR - Satya Prakash
            </option>
            <option value="GOODS INSURANCE BROKRAGE">
              GOODS INSURANCE BROKRAGE
            </option>
            <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">
              TATA INSURANCE BROKRAGE - Chitra Chaturvedi
            </option>
          </select>
        </div>
        <div>
          <label>
            Policy Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="policyNumber"
            value={stepData.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>
            Insurer Name <span className="text-[#f00]">*</span>{" "}
          </label>
          <select
            name="insurerName"
            value={stepData.insurerName}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 rounded`}
          >
            {/* <option value="">Select</option> */}
            {insurerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {/* Add more insurers as needed */}
          </select>
        </div>
        <div>
          <label>
            Policy Issue Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="policyIssueDate"
            value={stepData.policyIssueDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        {/* -----PA Covers--- */}

        <div>
          <label>PA Cover</label>
          <select
            name="paCover"
            value={stepData.paCover}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {stepData.paCover === "Yes" && (
          <>
            <div>
              <label>
                PA Certificate Number <span className="text-[#f00]">*</span>
              </label>
              <input
                name="pacertificateNumber"
                value={stepData.pacertificateNumber}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Start Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paStartDate"
                type="date"
                value={stepData.paStartDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
            <div>
              <label>
                PA End Date <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paEndDate"
                type="date"
                value={stepData.paEndDate}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 rounded`}
              />
            </div>
            <div>
              <label>
                PA Cover Amount <span className="text-[#f00]">*</span>
              </label>
              <input
                name="paCoverAmount"
                type="text"
                value={Number(stepData.paCoverAmount) || 0}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2  rounded`}
              />
            </div>
          </>
        )}
        {/* ----End PA Covers------- */}
        <div>
          <label>
            TP Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="tpAmount"
            value={Number(stepData.tpAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Net Total Amount (TP) <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netTotal"
            value={
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || Number(0)) || 0
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            GST Amount <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="gstAmount"
            value={Number(stepData.gstAmount) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 rounded`}
          />
        </div>
        <div>
          <label>
            Total Premium with GST <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="totalPremium"
            value={
              Number(stepData.gstAmount || 0) +
              Number(stepData.odAmount || 0) +
              Number(stepData.tpAmount || 0) || Number(0)
            }
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Breaking Charge <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="breakingCharge"
            value={Number(stepData.breakingCharge) || 0}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2  rounded`}
          />
        </div>
        <div>
          <label>Waiver Amount</label>
          <input
            type="text"
            name="waiverAmount"
            value={Number(stepData.waiverAmount) || 0}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div>
          <label>
            Net Payable Amount
            <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="netPayable"
            value={Number(stepData.netPayable) || 0}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
    </>
  );
};

// --------------------------End Condition 23------------------------------
