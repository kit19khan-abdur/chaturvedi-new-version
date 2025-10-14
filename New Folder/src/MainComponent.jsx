import React, { useEffect, useState } from "react";
import {
    Step1, Step2, Step3, Step4, Step5, Step6, Step7
} from "./StepComponent";
import StepIndicator from "./StepIndicator";
import Swal from "sweetalert2";


const MainComponent = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [stepData, setStepData] = useState({
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

        previousPolicy: "",
        prevPolicyType: "",
        insurerName: "",
        policyNumber: "",
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
        paymentDate: "",
        transactionId: "",
        transactionID: "",
        mopremarks: "",

        // Step 6

        paymentStatus: "",
        checkbox: "",
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
        transactionIDsix: "",
        paymentModessix: [],
        dueAmountLeftByCustomer: "",

        // Step 7

        fieldExecutiveRefs: [],
        policyUnderwriter: '',
        pucAvailable: '',
        pucCertificateNumber: '',
        pucStartDate: '',
        pucEndDate: '',
        remarks: '',
    });



    const next = async () => {
        console.log(`stepData`, stepData)
        setStep((prev) => prev + 1);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    };



    const prev = () => {
        if (prev === 1) {
            return;
        } else {
            setStep((prev) => prev - 1);
        }
    };

    useEffect(() => {
        document.title = `Chaturvedi Motors Form || on Step1`;
    }, []);

    return (
        <div className="capitalize max-w-[95vw] mx-auto">
            {/* <h2 className="text-2xl mb-4 mt-2 text-center">Chaturvedi Motors Form</h2> */}
            <StepIndicator currentStep={step} />
            <div className="max-w-[80vw] mx-auto  p-6 mt-10 rounded">
                <form onSubmit={onSubmit}>
                    {step === 1 && (
                        <Step1
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}
                    {step === 2 && (
                        <>
                            <Step2
                                step={step}
                                stepData={stepData}
                                setStepData={setStepData}
                                setStep={setStep}
                            />
                        </>
                    )}
                    {step === 3 && (
                        <Step3
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}

                    {step === 4 && (
                        <Step4
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}
                    {step === 5 && (
                        <Step5
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}
                    {step === 6 && (
                        <Step6
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}
                    {step === 7 && (
                        <Step7
                            step={step}
                            stepData={stepData}
                            setStepData={setStepData}
                            setStep={setStep}
                        />
                    )}
{/*
                    <div className={` ${step === 1 ? "" : "flex justify-between"} mt-6`}>
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prev}
                                className="bg-gray-500 cursor-pointer font-[700] text-[#fff] px-4 py-2 rounded"
                            >
                                Previous
                            </button>
                        )}
                        {step <= 6 && (
                            <button
                                type="button"
                                onClick={next}
                                className="bg-[#1a8656] cursor-pointer font-[700] text-[#fff] px-4 py-2 rounded ml-auto"
                            >
                                Next
                            </button>
                        )}

                        {step > 6 && (
                            <button
                                type="submit"
                                className="bg-green-600 cursor-pointer font-[700] text-[#fff] px-6 py-2 rounded ml-auto"
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        )}
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default MainComponent;
