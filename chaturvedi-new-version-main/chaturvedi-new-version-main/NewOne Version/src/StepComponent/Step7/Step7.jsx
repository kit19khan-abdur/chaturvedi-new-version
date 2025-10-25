import React, { useEffect, useState } from "react";
import { RenderSeven } from "./conditons";
import handleSubmit from "../../handleSubmit";
import Swal from "sweetalert2";

const Step7 = ({ stepData, setStepData, step, setStep }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // initial default for the form — used to reset after submit
  const initialStepData = {
    customertype: "Individual",
    title: "M/s",
    customername: "",
    fatherName: "",
    dob: "",
    primaryPhone: "",
    whatsappSame: "",
    whatsappNumber: "",
    contact3: "",
    contact4: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    locality: "",
    address: "",
    serviceBook: "",
    companyName: "",
    ucName: "",

    //Step 2
    proposalType: "",
    policyType: "",
    receiptNumber: "",
    receiptDate: "",
    vehicleYear: "",
    registrationNumber: "",
    registrationDate: "",
    chassisNumber: "",
    engineNumber: "",
    manufacturingYear: "",
    rtoState: "",
    rtoCity: "",
    product: "",
    manufacturerType: "",
    model: "",
    varience: "",
    fueltype: "",

    //Step 3

    previousPolicy: "No",
    prevPolicyType: "",
    newOdPolicyStartDate: "",
    newOdPolicyEndDate: "",
    ncbPolicy: "",
    newTpPolicyStartDate: "",
    newTpPolicyEndDate: "",
    prevoiusPolicyStartDate: "",
    prevoiusPolicyEndDate: "",
    addons: [],

    // Step 4

    newPolicyStartDate: "",
    newPolicyEndDate: "",
    ncbNewPolicy: "",
    brokerAgencyName: "",
    policyNumber: "",
    insurerName: "",
    policyIssueDate: "",
    idv: "",
    paCover: "",
    odAmount: "",
    tpAmount: "",
    netTotal: "",
    gstAmount: "",
    totalPremium: "",
    breakingCharge: "",
    waiverAmount: "",
    netPayable: "",

    // Step 5

    checkbox: "",
    cashAmount: "",
    neftAmount: "",
    googlePayAmount: "",
    googlePayDetail: "",
    debitAmount: "",
    debitCardDetail: "",
    creditAmount: "",
    creditCardDetail: "",
    creditCard: "",
    netbankingAmount: "",
    netbankingDetail: "",
    chequeAmount: "",
    chequeDetails: "",
    phonepeAmount: "",
    phonepeDetail: "",
    agencyAmount: "",
    mopremarks: "",

    // Step 6
    drawnBank: "",
    chequeClearanceDate: "",
    chequestatus: "",
    paymentRecievedRemarks: "",
    paymentStatus: "",
    chequeNumber: "",
    transactionId: "",
    paymentDate: "",
    dueAmount: "",
    expectedClearDate: "",
    comments: "",
    checkboxsix: "",
    cashAmountsix: "",
    neftAmountsix: "",
    googlePayAmountsix: "",
    googlePayDetailsix: "",
    debitAmountsix: "",
    debitCardDetailsix: "",
    creditAmountsix: "",
    creditCardsix: "",
    creditCardDetailsix: "",
    netbankingAmountsix: "",
    netbankingDetailsix: "",
    chequeAmountsix: "",
    chequeDetailssix: "",
    phonepeAmountsix: "",
    phonepeDetailsix: "",
    agencyAmountsix: "",
    paymentDatesix: "",
    transactionIdsix: "",
    paymentModessix: [],
    dueAmountLeftByCustomer: "",

    // Step 7

    fieldExecutiveRefs: [],
    policyUnderwriter: "",
    pucAvailable: "",
    pucCertificateNumber: "",
    pucStartDate: "",
    pucEndDate: "",
    remarks: "",
  };
  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    const updated = { ...stepData, [name]: value };
    setStepData(updated);
  };

  const validateFields = () => {
    for (let field of requiredFields) {
      const value = stepData[field];

      // handle undefined, arrays, numbers, etc. safely
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        const name = `<span style="color:#e74c3c; font-weight:600; text-transform: capitalize;">${field}</span>`;
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
  const submit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      Swal.fire({
        icon: "info",
        title: "Wait!",
        text: "Wait Until this Submission Complete!",
        confirmButtonColor: "#3fc3ee",
      });
      return;
    }
    if (validateFields()) {
      setIsLoading(true);
      try {
        if (
          stepData?.customername.trim() === "" &&
          stepData?.primaryPhone.trim() === ""
        ) {
          Swal.fire({
            title: "Ooops!",
            text: `Please Provide Person Name and Mobile No.`,
            icon: "warning",
            confirmButtonColor: "#8d8400",
            confirmButtonText: "OK",
          });
          return;
        }
        await handleSubmit(stepData);
        // reset form data after successful submit
        setStepData(initialStepData);
        const result = await Swal.fire({
          icon: "success",
          title: "Submitted",
          text: "Form submitted and reset.",
          confirmButtonColor: "#3fc3ee",
        });
        if (result.isConfirmed) {
          setStep(1);
        } else {
          setStep(1);
        }
      } catch (error) {
        console.error("Error in submission:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step7`;
  }, []);
  return (
    <div>
      <RenderSeven
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
          type="submit"
          onClick={(e) => submit(e)}
          className="bg-green-600 cursor-pointer font-[700] text-[#fff] px-6 py-2 rounded ml-auto"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step7;
