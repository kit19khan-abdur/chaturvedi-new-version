import React, { useState } from "react";
import { useEffect } from "react";
export function Individual({ handleChangeStep, stepData, setStepData }) {
  const [locality, setLocality] = useState([])
  const fetchDataFromPost = async (pincode) => {
    const url = `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`

    try {
      const response = await fetch(url);
      const result = await response.json();
      const details = result.postcode_details


      if (result) {
        setStepData((prev) => ({
          ...prev,
          country: details?.country || "",
          state: details?.state || "",
          city: details?.city || "",
        }));
        setLocality(details?.locality || []);
        // console.log(`details`, details)
      }

    } catch (error) {
      console.error("Failed to fetch pincode details", error);
    }
  };
  useEffect(() => {
    if (stepData?.pincode && stepData?.pincode.length === 6) {
      fetchDataFromPost(stepData?.pincode);
    }
    if (stepData?.whatsappSame === "Yes") {
      setStepData((prev) => ({
        ...prev,
        whatsappNumber: prev.primaryPhone
      }))
    }
  }, [stepData.pincode, stepData.whatsappSame])

  return (
    <>
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">
            Customer Name <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="customername"
            value={stepData?.customername}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="md:w-1/2 w-full">
          <label className="block font-medium">
            Father Name <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="fatherName"
            value={stepData?.fatherName}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            required
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={stepData?.dob}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>

        <div className="md:w-1/2 w-full">
          <label className="block font-medium">
            Primary Phone <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="primaryPhone"
            value={stepData?.primaryPhone}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^[0-9]+$/.test(value)) {
                handleChangeStep(e)
              } else {
                { }
              }
            }}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            placeholder="10-digit mobile number"
            required
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">WhatsApp Same as Phone?</label>
          <select
            name="whatsappSame"
            value={stepData?.whatsappSame}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="md:w-1/2 w-full">
          <label className="block font-medium">
            WhatsApp Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="whatsappNumber"
            value={
              stepData?.whatsappSame === "Yes"
                ? stepData?.primaryPhone
                : stepData?.whatsappNumber
            }
            onChange={
              stepData?.whatsappSame === "Yes"
                ? () => { }
                : handleChangeStep
            }
            className={`w-full border px-4 py-2 rounded `}
            disabled={stepData?.whatsappSame === "Yes"}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col  gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Contact 3</label>
          <input
            type="text"
            name="contact3"
            value={stepData?.contact3}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Contact 4</label>
          <input
            type="text"
            name="contact4"
            value={stepData?.contact4}
            onChange={handleChangeStep}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Pincode <span className="text-[#f00]">*</span></label>
          <input
            type="text"
            name="pincode"
            value={stepData?.pincode || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^[0-9]+$/.test(value)) {
                handleChangeStep(e)
              } else {
                { }
              }
            }}
            inputMode="numeric"
            maxLength={6}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
          />
        </div>

        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={stepData?.country}
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            readOnly
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col  gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">State</label>
          <input
            type="text"
            name="state"
            value={stepData?.state}
            readOnly
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            required
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={stepData?.city}
            readOnly
            className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
            required
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col  gap-4 mb-4">
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Locality</label>
          <select
            name="locality"
            value={stepData?.locality}
            onChange={handleChangeStep}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
          >
            <option value="">Select Option</option>
            {locality && locality.length > 0 && (
              locality.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))
            )}
          </select>
        </div>
        <div className="md:w-1/2 w-full">
          <label className="block font-medium">Address <span className="text-[#f00]">*</span></label>
          <input
            type="text"
            name="address"
            value={stepData?.address}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
      </div>

      <div className="capitalize mb-4">
        <label className="block font-medium">Service Book Number</label>
        <input
          type="text"
          name="serviceBook"
          value={stepData?.serviceBook}
          onChange={handleChangeStep}
          className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
        />
      </div>

    </>
  );
}

export function Corporate({ handleChangeStep, stepData, setStepData }) {
  const [locality, setLocality] = useState([])
  const fetchDataFromPost = async (pincode) => {
    const url = `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`

    try {
      const response = await fetch(url);
      const result = await response.json();
      const details = result.postcode_details


      if (result) {
        setStepData((prev) => ({
          ...prev,
          country: details?.country || "",
          state: details?.state || "",
          city: details?.city || "",
        }));
        setLocality(details?.locality || []);
        // console.log(`details`, details)
      }

    } catch (error) {
      console.error("Failed to fetch pincode details", error);
    }
  };
  useEffect(() => {
    if (stepData?.pincode && stepData?.pincode.length === 6) {
      fetchDataFromPost(stepData?.pincode);
    }
    if (stepData?.whatsappSame === "Yes") {
      setStepData((prev) => ({
        ...prev,
        whatsappNumber: prev.primaryPhone
      }))
    }
  }, [stepData.pincode, stepData.whatsappSame])
  return (
     <>
          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Company Name <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="companyName"
                value={stepData?.companyName}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  handleChangeStep({...e, target: {...e.target, value}});
                }}
                className={`w-full border px-4  py-2 border-[#e6e6e6] rounded`}
                placeholder="Company Name"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">U/C Name <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="ucName"
                value={stepData?.ucName}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  handleChangeStep({...e, target: {...e.target, value}});
                }}
                className={`w-full border px-4 py-2 rounded`}
                placeholder="U/C Name"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Primary Phone <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="primaryPhone"
                value={stepData?.primaryPhone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  if(numericValue){
                    handleChangeStep(e)
                  }
                }}
                className={`w-full border px-4 py-2  border-[#e6e6e6] rounded`}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">WhatsApp Same as Phone?</label>
              <select
                name="whatsappSame"
                value={stepData?.whatsappSame}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">WhatsApp Number <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="whatsappNumber"
                value={
                  stepData?.whatsappSame === "Yes"
                    ? stepData?.primaryPhone // use primaryPhone if whatsappSame is "Yes"
                    : stepData?.whatsappNumber
                }
                onChange={
                  stepData?.whatsappSame === "Yes"
                    ? () => { } // disable editing
                    : handleChangeStep // allow editing
                }
                className={`w-full border px-4 py-2 rounded `}
                disabled={stepData?.whatsappSame === "Yes"} // optional: disable input
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Contact 3</label>
              <input
                type="text"
                name="contact3"
                value={stepData?.contact3}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                placeholder="Enter 10 Digit Contact Number"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Contact 4</label>
              <input
                type="text"
                name="contact4"
                value={stepData?.contact4}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                placeholder="Enter 10 Digit Contact Number"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Pincode <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="pincode"
                value={stepData?.pinCode}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  if(numericValue){
                    handleChangeStep(e)
                  }
                }}
                maxLength={6}
                inputMode="numeric"
                pattern="\d*"
                className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
                required
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={stepData?.country}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                readOnly
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">State</label>
              <input
                type="text"
                name="state"
                value={stepData?.state}
                readOnly
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={stepData?.city}
                readOnly
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Locality</label>
              <select
                name="locality"
                value={stepData?.locality}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              >
                  <option  value="">Select Option</option>
                  {locality && locality.length > 0 && (
                    locality.map((loc, index) => (
                      <option key={index} value={loc}>{loc}</option>
                    ))
                  )}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Address <span className="text-[#f00]">*</span></label>
            <input
              type="text"
              name="address"
              value={stepData?.address}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                handleChangeStep({...e, target: {...e.target, value}});
              }}
              className={`w-full border  px-4 py-2 border-[#e6e6e6] rounded`}
              placeholder="Enter Address"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Service Book Number</label>
            <input
              type="text"
              name="serviceBook"
              value={stepData?.serviceBook}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                handleChangeStep({...e, target: {...e.target, value}});
              }}
              className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              placeholder="Enter Service Book Number"
            />
          </div>
        </>
  )
}