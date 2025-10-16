import React, { useEffect, useState } from "react";

export const RenderFifth = ({ handleChangeStep, stepData, setStepData }) => {
  const [localData, setLocalData] = useState(stepData);
  const paymentModesList = [
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

  const togglePaymentMode = useCallback(
    (mode) => {
      setLocalData((prev) => {
        const currentModes = prev.paymentModes || [];
        const updatedModes = currentModes.includes(mode)
          ? currentModes.filter((m) => m !== mode)
          : [...currentModes, mode];

        // also update stepData + localStorage
        const updatedStep = { ...stepData, paymentModes: updatedModes };
        setStepData(updatedStep);

        return { ...prev, paymentModes: updatedModes };
      });
    },
    [stepData]
  );

  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Mode Checkboxes */}
        <div className="col-span-2">
          <h2 className="font-semibold text-lg mb-2">
            Mode of Payment to Insurance Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {paymentModesList.map((mode) => (
              <label key={mode} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={mode}
                  checked={localData.paymentModes?.includes(mode)}
                  onChange={(e) => {
                    togglePaymentMode(mode);
                    handleChangeStep(e);
                  }}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Fields */}

        {localData.paymentModes?.includes("Cash") && (
          <>
            <div>
              <label>Cash Amount Paid to Insurance Company</label>
              <input
                type="text"
                name="cashAmount"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.cashAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
          </>
        )}

        {localData.paymentModes?.includes("NEFT/RTGS") && (
          <>
            <div>
              <label>NEFT Or RTGS Amount Paid to Insurance Company</label>
              <input
                type="text"
                name="neftAmount"
                placeholder="NEFT Or RTGS Amount Paid to Insurance Company"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.neftAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label>UTR / Transaction ID / Cheque Details</label>
              <input
                type="text"
                name="transactionID"
                placeholder="Enter UTR / Transaction ID / Cheque Details"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.transactionID || ""}
                onChange={handleChangeStep}
              />
            </div>
          </>
        )}

        {localData.paymentModes?.includes("Google Pay") && (
          <>
            <div>
              <label>Google Pay Amount Paid to Insurance Company</label>
              <input
                type="text"
                name="googlePayAmount"
                placeholder="Enter Google Pay Amount Paid to Insurance Company"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.googlePayAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label htmlFor="">Google Pay Details</label>
              <select
                name="googlePayDetail"
                value={stepData.googlePayDetail}
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

        {localData.paymentModes?.includes("Debit Card") && (
          <>
            <div>
              <label>Debit Card Amount paid to Insurance Company</label>
              <input
                type="text"
                name="debitAmount"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.debitAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label>Select Debit Card</label>
              <select
                name="debitCardDetail"
                value={stepData.debitCardDetail}
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

        {localData.paymentModes?.includes("Credit Card") && (
          <>
            <div>
              <label>Credit Card Amount Paid to Insurance Company</label>
              <input
                type="text"
                name="creditAmount"
                placeholder="Enter Credit Card Amount Paid to Insurance Company"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.creditAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label>Select Credit Card</label>
              <select
                name="creditCard"
                value={stepData.creditCard}
                onChange={handleChangeStep}
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              >
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

        {localData.paymentModes?.includes("Netbanking") && (
          <>
            <div>
              <label>Netbanking Amount Paid to Insurance Company</label>
              <input
                type="text"
                placeholder="Enter Netbanking Amount Paid to Insurance Company"
                name="netbankingAmount"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.netbankingAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label>Select Netbanking Detail</label>
              <select
                name="netbankingDetail"
                value={stepData.netbankingDetail}
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

        {localData.paymentModes?.includes("Cheque") && (
          <>
            <div>
              <label>Cheque Amount Paid To Insurance Company</label>
              <input
                type="text"
                name="chequeAmount"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                placeholder="Enter Cheque Amount"
                value={stepData.chequeAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
          </>
        )}

        {localData.paymentModes?.includes("PhonePe") && (
          <>
            <div>
              <label>Phonepe Amount Paid to Insurance Company</label>
              <input
                type="text"
                name="phonepeAmount"
                placeholder="Enter Phonepe Amount Paid to Insurance Company"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                value={stepData.phonepeAmount || ""}
                onChange={handleChangeStep}
              />
            </div>
            <div>
              <label>Select PhonePe Detail</label>
              <select
                name="phonepeDetail"
                value={stepData.phonepeDetail}
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

        {localData.paymentModes?.length > 0 &&
          !(
            localData.paymentModes?.length === 1 &&
            localData.paymentModes?.includes("Cash")
          ) && (
            <div>
              <label>UTR / Transaction ID / Cheque Details</label>
              <input
                type="text"
                name="chequeDetails"
                className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
                placeholder="Enter UTR / Transaction ID / Cheque Details"
                value={stepData.chequeDetails || ""}
                onChange={handleChangeStep}
              />
            </div>
          )}
        {localData.paymentModes?.length > 0 && (
          <div>
            <label>Remarks</label>
            <textarea
              name="mopremarks"
              className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
              placeholder="Your Remarks"
              value={stepData.mopremarks || ""}
              onChange={handleChangeStep}
            />
          </div>
        )}

        {/* Common Fields */}
        <div>
          <label>Total Amount Paid to Insurance Agency</label>
          <input
            type="text"
            name="agencyAmount"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            value={stepData.agencyAmount || ""}
            onChange={handleChangeStep}
          />
        </div>

        <div>
          <label>Date of Payment to Insurance Company</label>
          <input
            type="date"
            name="paymentDate"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
            value={stepData.paymentDate || ""}
            onChange={handleChangeStep}
          />
        </div>
      </div>
    </>
  );
};
