import React, { useEffect, useState } from "react";
import {
    Step1, Step2, Step3, Step4, Step5, Step6, Step7
} from "./StepComponent";
import StepIndicator from "./StepIndicator";
import Swal from "sweetalert2";


const MainComponent = () => {
    const [step, setStep] = useState(4);
    const [stepData, setStepData] = useState({
        customertype: "Individual",
        title: "",
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
        paCover: "No",
        paCoverAmount: 0,
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
        paymentModes: [],
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
        paymentStatus: "Full Payment Received",
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
        policyUnderwriter: '',
        pucAvailable: '',
        pucCertificateNumber: '',
        pucStartDate: '',
        pucEndDate: '',
        remarks: '',
    });


    useEffect(() => {
        window.setStepManually = setStep;
        window.getStep = () => step;
    }, [step]);

    useEffect(() => {
        if (step > 7) {
            setStep(7);
        }
    }, [step])

    
    useEffect(() => {
        document.title = `Chaturvedi Motors Form || on Step1`;
    }, []);

    return (
        <div className="capitalize max-w-[95vw] mx-auto">
            {/* <h2 className="text-2xl mb-4 mt-2 text-center">Chaturvedi Motors Form</h2> */}
            <StepIndicator currentStep={step} />
            <div className="max-w-[80vw] mx-auto  p-6 mt-10 rounded">
                <form>
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

                </form>
            </div>
        </div>
    );
};

export default MainComponent;
