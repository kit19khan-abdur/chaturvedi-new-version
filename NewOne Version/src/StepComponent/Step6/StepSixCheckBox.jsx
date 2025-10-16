import React, { useCallback, useEffect, useState } from "react";

const StepSixCheckBox = ({ stepData, setStepData, paymentStatus, title }) => {
  const paymentModessixList = [
    "Cash",
    "NEFT/RTGS",
    "Google Pay",
    "Debit Card",
    "Credit Card",
    "Netbanking",
    "Cheque",
    "PhonePe",
    "QR Code",
  ];
  const [localData, setLocalData] = useState(stepData);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stepData"));
    if (saved) {
      setLocalData(saved);
      setLocalData((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const handleChangeStep = (e) => {
    const { name, type, checked, value } = e.target;

    // always treat storage as an object
    const temp = JSON.parse(localStorage.getItem("stepData")) || {};
    const updated = {
      ...temp,
      ...localData, // include current localData so nothing gets lost
      [name]: type === "checkbox" ? (checked ? value : "") : value,
    };

    // write to both
    setLocalData(updated);
  };

  // Sync localData back to parent in real time

  const togglePaymentMode = (mode) => {
    setLocalData((prev) => {
      const currentModes = prev.paymentModessix || [];
      const updatedModes = currentModes.includes(mode)
        ? currentModes.filter((m) => m !== mode)
        : [...currentModes, mode];

      const updated = { ...prev, paymentModessix: updatedModes };

      // clear associated fields if unchecked
      if (!updatedModes.includes(mode)) {
        if (mode === "Cash") updated.cashAmountsix = "";
        if (mode === "NEFT/RTGS") {
          updated.neftAmountsix = "";
          updated.transactionIDsix = "";
        }
        // repeat for other modes as needed
      }

      return updated;
    });
  };

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step6`;
  }, []);

  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Payment Mode Checkboxes */}
      <div className="col-span-2">
        <h2 className="font-semibold text-lg mb-2 text-center">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentModessixList.map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={mode}
                checked={localData.paymentModessix?.includes(mode)}
                onChange={() => togglePaymentMode(mode)}
              />
              <span>{mode}</span>
            </label>
          ))}
          {localData?.paymentModessix?.length === 0 && (
            <p className="text-sm text-[#f00] mt-1">
              Select One Payment Method
            </p>
          )}
        </div>
      </div>

      {/* Conditional Fields */}

      {localData.paymentModessix?.includes("Cash") && (
        <>
          <div>
            <label>Cash Amount Paid by Customer</label>
            <input
              type="text"
              name="cashAmountsix"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              value={localData.cashAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("NEFT/RTGS") && (
        <>
          <div>
            <label>NEFT Or RTGS Amount Paid by Customer</label>
            <input
              type="text"
              name="neftAmountsix"
              placeholder="NEFT Or RTGS Amount Paid by Customer"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              value={localData.neftAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("Google Pay") && (
        <>
          <div>
            <label>Google Pay Amount Paid by Customer</label>
            <input
              type="text"
              name="googlePayAmountsix"
              placeholder="Enter Google Pay Amount Paid by Customer"
              className={`w-full border custom-select px-4 py-2  rounded`}
              value={localData.googlePayAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label htmlFor="">Google Pay Details</label>
            <select
              name="googlePayDetailsix"
              value={localData.googlePayDetailsix}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 rounded`}
            >
              <option value="">Select Option</option>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">
                Chaturvedi Motors - HDFC BANK - C/A
              </option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">
                Chaturvedi Motors - SBI BANK - C/A
              </option>
              <option value="SatyaPrakash - SBI BANK - S/A">
                SatyaPrakash - SBI BANK - S/A
              </option>
              <option value="SatyaPrakash - ICICI BANK - S/A">
                SatyaPrakash - ICICI BANK - S/A
              </option>
              <option value="SatyaPrakash - HDFC BANK - S/A">
                SatyaPrakash - HDFC BANK - S/A
              </option>
              <option value="Yatendra Kumar - SBI BANK - S/A">
                Yatendra Kumar - SBI BANK - S/A
              </option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">
                Yatendra Kumar - HDFC BANK - S/A
              </option>
              <option value="Khem Chand - HDFC BANK - S/A">
                Khem Chand - HDFC BANK - S/A
              </option>
              <option value="Rekha - HDFC BANK - S/A">
                Rekha - HDFC BANK - S/A
              </option>
              <option value="Chitra - HDFC BANK - S/A">
                Chitra - HDFC BANK - S/A
              </option>
              <option value="Chitra - SBI BANK - S/A">
                Chitra - SBI BANK - S/A
              </option>
              <option value="Sapna - HDFC BANK - S/A">
                Sapna - HDFC BANK - S/A
              </option>
              <option value="Sapna - SBI BANK - S/A">
                Sapna - SBI BANK - S/A
              </option>
              <option value="Sangita - SBI BANK - S/A">
                Sangita - SBI BANK - S/A
              </option>
              <option value="Dheeraj - AXIS BANK - S/A">
                Dheeraj - AXIS BANK - S/A
              </option>
              <option value="Ravi Shankar - PNB BANK - S/A">
                Ravi Shankar - PNB BANK - S/A
              </option>
              <option value="Priyanka Sharma - PNB BANK - S/A">
                Priyanka Sharma - PNB BANK - S/A
              </option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("Debit Card") && (
        <>
          <div>
            <label>Debit Card Amount paid by Customer</label>
            <input
              type="text"
              name="debitAmountsix"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6]} rounded`}
              value={localData.debitAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Debit Card</label>
            <select
              name="debitCardDetailsix"
              value={localData.debitCardDetailsix}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select Option</option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">
                Chaturvedi Motors - SBI BANK - C/A
              </option>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">
                Chaturvedi Motors - HDFC BANK - C/A
              </option>
              <option value="SatyaPrakash - SBI BANK - S/A">
                SatyaPrakash - SBI BANK - S/A
              </option>
              <option value="SatyaPrakash - ICICI BANK - S/A">
                SatyaPrakash - ICICI BANK - S/A
              </option>
              <option value="SatyaPrakash - HDFC BANK - S/A">
                SatyaPrakash - HDFC BANK - S/A
              </option>
              <option value="Yatendra Kumar - SBI BANK - S/A">
                Yatendra Kumar - SBI BANK - S/A
              </option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">
                Yatendra Kumar - HDFC BANK - S/A
              </option>
              <option value="Khem Chand - HDFC BANK - S/A">
                Khem Chand - HDFC BANK - S/A
              </option>
              <option value="Rekha - HDFC BANK - S/A">
                Rekha - HDFC BANK - S/A
              </option>
              <option value="Chitra - HDFC BANK - S/A">
                Chitra - HDFC BANK - S/A
              </option>
              <option value="Chitra - SBI BANK - S/A">
                Chitra - SBI BANK - S/A
              </option>
              <option value="Sapna - HDFC BANK - S/A">
                Sapna - HDFC BANK - S/A
              </option>
              <option value="Sapna - SBI BANK - S/A">
                Sapna - SBI BANK - S/A
              </option>
              <option value="Sangita - SBI BANK - S/A">
                Sangita - SBI BANK - S/A
              </option>
              <option value="Dheeraj - AXIS BANK - S/A">
                Dheeraj - AXIS BANK - S/A
              </option>
              <option value="Ravi Shankar - PNB BANK - S/A">
                Ravi Shankar - PNB BANK - S/A
              </option>
              <option value="Priyanka Sharma - PNB BANK - S/A">
                Priyanka Sharma - PNB BANK - S/A
              </option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("Credit Card") && (
        <>
          <div>
            <label>Credit Card Amount Paid by Customer</label>
            <input
              type="text"
              name="creditAmountsix"
              placeholder="Enter Credit Card Amount Paid by Customer"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              value={localData.creditAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Credit Card</label>
            <select
              name="creditCardsix"
              value={localData.creditCardsix}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select Option</option>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">
                Chaturvedi Motors - HDFC BANK - C/A
              </option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">
                Chaturvedi Motors - SBI BANK - C/A
              </option>
              <option value="SatyaPrakash - ICICI BANK - S/A">
                SatyaPrakash - ICICI BANK - S/A
              </option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("Netbanking") && (
        <>
          <div>
            <label>Netbanking Amount Paid by Customer</label>
            <input
              type="text"
              placeholder="Enter Netbanking Amount Paid by Customer"
              name="netbankingAmountsix"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              value={localData.netbankingAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Netbanking Detail</label>
            <select
              name="netbankingDetailsix"
              value={localData.netbankingDetailsix}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select Option</option>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">
                Chaturvedi Motors - HDFC BANK - C/A
              </option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">
                Chaturvedi Motors - SBI BANK - C/A
              </option>
              <option value="SatyaPrakash - SBI BANK - S/A">
                SatyaPrakash - SBI BANK - S/A
              </option>
              <option value="SatyaPrakash - ICICI BANK - S/A">
                SatyaPrakash - ICICI BANK - S/A
              </option>
              <option value="SatyaPrakash - HDFC BANK - S/A">
                SatyaPrakash - HDFC BANK - S/A
              </option>
              <option value="Yatendra Kumar - SBI BANK - S/A">
                Yatendra Kumar - SBI BANK - S/A
              </option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">
                Yatendra Kumar - HDFC BANK - S/A
              </option>
              <option value="Khem Chand - HDFC BANK - S/A">
                Khem Chand - HDFC BANK - S/A
              </option>
              <option value="Rekha - HDFC BANK - S/A">
                Rekha - HDFC BANK - S/A
              </option>
              <option value="Chitra - HDFC BANK - S/A">
                Chitra - HDFC BANK - S/A
              </option>
              <option value="Chitra - SBI BANK - S/A">
                Chitra - SBI BANK - S/A
              </option>
              <option value="Sapna - HDFC BANK - S/A">
                Sapna - HDFC BANK - S/A
              </option>
              <option value="Sapna - SBI BANK - S/A">
                Sapna - SBI BANK - S/A
              </option>
              <option value="Sangita - SBI BANK - S/A">
                Sangita - SBI BANK - S/A
              </option>
              <option value="Dheeraj - AXIS BANK - S/A">
                Dheeraj - AXIS BANK - S/A
              </option>
              <option value="Ravi Shankar - PNB BANK - S/A">
                Ravi Shankar - PNB BANK - S/A
              </option>
              <option value="Priyanka Sharma - PNB BANK - S/A">
                Priyanka Sharma - PNB BANK - S/A
              </option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("Cheque") && (
        <>
          <div>
            <label>Cheque Amount Paid by Customer</label>
            <input
              type="text"
              name="chequeAmountsix"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              placeholder="Enter Cheque Amount"
              value={localData.chequeAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModessix?.includes("PhonePe") && (
        <>
          <div>
            <label>Phonepe Amount Paid by Customer</label>
            <input
              type="text"
              name="phonepeAmountsix"
              placeholder="Enter Phonepe Amount Paid by Customer"
              className={`w-full border custom-select px-4 py-2 rounded`}
              value={localData.phonepeAmountsix || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select PhonePe Detail</label>
            <select
              name="phonepeDetailsix"
              value={localData.phonepeDetailsix}
              onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select Option</option>
              <option value="Yatendra Kumar SBI -7417227114">
                Yatendra Kumar SBI -7417227114
              </option>
              <option value="Yatendra Kumar HDFC -7417227114">
                Yatendra Kumar HDFC -7417227114
              </option>
              <option value="Khem chand HDFC -9410075685">
                Khem chand HDFC -9410075685
              </option>
              <option value="Rekha HDFC -9837111044">
                Rekha HDFC -9837111044
              </option>
              <option value="Chitra CHATURVEDI SBI -7417227114">
                Chitra CHATURVEDI SBI -7417227114
              </option>
              <option value="Chaturvedi Motors HDFC 9837111044">
                Chaturvedi Motors HDFC 9837111044
              </option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModessix?.length > 0 &&
        !(
          localData.paymentModessix?.length === 1 &&
          localData.paymentModessix?.includes("Cash")
        ) && (
          <div>
            <label>UTR / Transaction ID / Cheque Details</label>
            <input
              type="text"
              name="chequeDetailssix"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              placeholder="Enter UTR / Transaction ID / Cheque Details"
              value={localData.chequeDetailssix || ""}
              onChange={handleChangeStep}
            />
          </div>
        )}

      {/* Common Fields */}
      <div>
        <label>Total Amount Paid by Customer</label>
        <input
          type="text"
          name="agencyAmountsix"
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          value={localData.agencyAmountsix || ""}
          onChange={handleChangeStep}
        />
      </div>

      <div>
        <label>Date of Payment by Customer</label>
        <input
          type="date"
          name="paymentDatesix"
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          value={localData.paymentDatesix || ""}
          onChange={handleChangeStep}
        />
      </div>
    </div>
  );
};

export default StepSixCheckBox;
