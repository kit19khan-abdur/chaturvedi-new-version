import Swal from "sweetalert2";

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();

  return `${day}/${month}/${year}`;
};
const toISTDateString = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in ms
  const istDate = new Date(date.getTime() + istOffset);

  return istDate.toISOString().split("T")[0]; // yyyy-mm-dd
};

const handleSubmit = async (stepData) => {
  const finalData = stepData;
  // Construct the payload as per API expectations
  const payload = {
    Username: "SATYA1060025",
    Password: "4596",
    PersonName: finalData.customername,
    MobileNo: finalData.primaryPhone,
    MobileNo1: finalData.contact3 || "",
    MobileNo2: finalData.contact4 || "",
    CountryCode1: "+91",
    CountryCode2: "+91",
    whatsappNumber: finalData.whatsappNumber || "",
    whatsappSame: finalData.whatsappSame || "",
    PinCode: finalData.pincode || "",
    Title: finalData?.customertype === "Individual" ? finalData?.title : "M/s",
    Country: finalData.country || "",
    City: finalData.city || "",
    ncbPolicy: finalData.ncbPolicy || "",
    bankDetail: finalData.bankDetail || "",
    State: finalData.state || "",
    fueltype: finalData.fueltype || "",
    totalPremium: finalData.totalPremiumWithGst || "",
    brokerAgencyName: finalData.brokerAgencyName || "",
    locality: finalData.locality || "",
    OdPolicyStartDate: toISTDateString(finalData.odPolicyStartDate) || "", // Add this
    OdPolicyEndDate: toISTDateString(finalData.odPolicyEndDate) || "", // Add this
    ResidentialAddress: finalData.address || "",
    newPolicyStartDate: toISTDateString(finalData.newPolicyStartDate) || "", // Add this
    newPolicyEndDate: toISTDateString(finalData.newPolicyEndDate) || "", // Add this
    serviceBook: finalData.serviceBook || "",
    fatherName: finalData.fatherName || "",
    dob: toISTDateString(finalData.dob) || "",
    CompanyName: finalData.companyName || "",
    ucName: finalData.ucName || "",
    proposalType: finalData.proposalType || "",
    policyType: finalData.policyType || "",
    prevPolicyType: finalData.prevPolicyType || "",
    receiptNumber: finalData.receiptNumber || "",
    receiptDate: toISTDateString(finalData.receiptDate) || "",
    vehicleYear: finalData.vehicleYear || "",
    registrationNumber: finalData.registrationNumber || "",
    registrationDate: toISTDateString(finalData.registrationDate) || "",
    chassisNumber: finalData.chassisNumber || "",
    engineNumber: finalData.engineNumber || "",
    manufacturingYear: finalData.manufacturingYear || "",
    rtoState: finalData.rtoState || "",
    rtoCity: finalData.rtoCity || "",
    product: finalData.product || "",
    manufacturerType: finalData.manufacturerType || "",
    model: finalData.model || "",
    varience: finalData.varience || "",
    newOdPolicyStartDate: toISTDateString(finalData.newOdPolicyStartDate) || "",
    newOdPolicyEndDate: toISTDateString(finalData.newOdPolicyEndDate) || "",
    newTpPolicyStartDate: toISTDateString(finalData.newTpPolicyStartDate) || "",
    newTpPolicyEndDate: toISTDateString(finalData.newTpPolicyEndDate) || "",
    prevoiusPolicyStartDate:
      toISTDateString(finalData.prevoiusPolicyStartDate) || "",
    prevoiusPolicyEndDate:
      toISTDateString(finalData.prevoiusPolicyEndDate) || "",
    ncbNewPolicy: finalData.ncbNewPolicy || "",
    brokerName: finalData.brokerName || "",
    policyNumber: finalData.policyNumber || "",
    insurerName: finalData.insurerName || "",
    policyIssueDate: toISTDateString(finalData.policyIssueDate) || "",
    idv: finalData.idv || "",
    paCover: finalData.paCover || "",
    addon: (finalData.addons || []).join(", "),
    odAmount: finalData.odAmount || "",
    tpAmount: finalData.tpAmount || "",
    netTotal: finalData.netTotal || "",
    gstAmount: finalData.gstAmount || "",
    totalPremiumWithGst: finalData.totalPremiumWithGst || "",
    breakingCharge: finalData.breakingCharge || "",
    waiverAmount: finalData.waiverAmount || "",
    netPayable: finalData.netPayable || "",
    paymentModesOptions: (finalData.paymentModes || []).join(", "),
    agencyAmount: finalData.agencyAmount || "",
    paymentDate: toISTDateString(finalData.paymentDate) || "",
    paymentModes: (finalData.paymentModes || []).join(", "),
    cashAmount: finalData.cashAmount || "",
    neftAmount: finalData.neftAmount || "",
    googlePayAmount: finalData.googlePayAmount || "",
    googlePayDetail: finalData.googlePayDetail || "",
    debitAmount: finalData.debitAmount || "",
    debitCardDetail: finalData.debitCardDetail || "",
    creditAmount: finalData.creditAmount || "",
    creditCardDetail: finalData.creditCardDetail || "",
    netbankingAmount: finalData.netbankingAmount || "",
    netbankingDetail: finalData.netbankingDetail || "",
    chequeAmount: finalData.chequeAmount || "",
    phonepeAmount: finalData.phonepeAmount || "",
    phonepeDetail: finalData.phonepeDetail || "",
    paymentStatus: finalData.paymentStatus || "",
    paymentMethods: (finalData.paymentMethods || []).join(", "),
    chequeNumber: finalData.chequeNumber || "",
    transactionId: finalData.transactionId || "",
    drawnBank: finalData.drawnBank || "",
    chequeClearanceDate: toISTDateString(finalData.chequeClearanceDate) || "",
    chequestatus: finalData.chequestatus || "",
    paymentRecievedRemarks: finalData.paymentRecievedRemarks || "",
    expectedClearDate: toISTDateString(finalData.expectedClearDate) || "",
    callExecutiveRefs: (finalData.callExecutiveRefs || []).join(", "),
    fieldExecutiveRefs: (finalData.fieldExecutiveRefs || []).join(", "),
    policyUnderwriter: finalData.policyUnderwriter || "",
    pucAvailable: finalData.pucAvailable || "",
    pucCertificateNumber: finalData.pucCertificateNumber || "",
    pucStartDate: toISTDateString(finalData.pucStartDate) || "",
    pucEndDate: toISTDateString(finalData.pucEndDate) || "",
    remarks: finalData.remarks || "",
    cashAmountsix: finalData.cashAmountsix,
    neftAmountsix: finalData.neftAmountsix,
    googlePayAmountsix: finalData.googlePayAmountsix,
    googlePayDetailsix: finalData.googlePayDetailsix,
    debitAmountsix: finalData.debitAmountsix,
    debitCardDetailsix: finalData.debitCardDetailsix,
    creditAmountsix: finalData.creditAmountsix,
    creditCardsix: finalData.creditCardsix,
    creditCardDetailsix: finalData.creditCardDetailsix,
    netbankingAmountsix: finalData.netbankingAmountsix,
    netbankingDetailsix: finalData.netbankingDetailsix,
    chequeAmountsix: finalData.chequeAmountsix,
    chequeDetailssix: finalData.chequeDetailssix,
    phonepeAmountsix: finalData.phonepeAmountsix,
    phonepeDetailsix: finalData.phonepeDetailsix,
    agencyAmountsix: finalData.agencyAmountsix,
    paymentDatesix: toISTDateString(finalData.paymentDatesix) || "",
    transactionIdsix: finalData.transactionIdsix,
    transactionIDsix: finalData.transactionIDsix,
    mopremarks: finalData.mopremarks || "",
    SourceName: "Chaturvedi Motors Form",
    MediumName: "Website",
    CountryCode: "+91",
    FollowupStatus: "Call-Back",
    AssignedTo: "SATYA1060025", // Or appropriate field
    NextStatusDate: getTomorrowDate(),
    Time: "10:02:00",
    Amount: "0",
    FollowupRemarks: finalData.remarks || "",
    Remarks: finalData.remarks || "",
    LeadNo: "0",
    Update: "1",
  };
  // "Chaturvedi Motors Form"

  try {
    const res = await fetch(
      "https://sipapi.crmapp.in.net/Lead/FB8BF7C6-D8D5-464A-A274-5258CC63C157/AddLeadAPI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.Message === "Success") {
      Swal.fire({
        title: "✅ Success!",
        text: `✅ ${data?.Details ? data.Details : data.Message}`,
        icon: "success",
        confirmButtonColor: "#008d3fff",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "❗Failed",
        text: `❗ ${data?.Details ? data.Details : data.Message}`,
        icon: "error",
        confirmButtonColor: "#970000ff",
        confirmButtonText: "Got It",
      });
    }
  } catch (error) {
    // console.error("Error submitting form:", error);
    Swal.fire({
      title: "❗Failed",
      text: `❗Error Connecting to Network:  ${error}`,
      icon: "error",
      confirmButtonColor: "#970000ff",
      confirmButtonText: "Got It",
    });
  }
};

export default handleSubmit;
