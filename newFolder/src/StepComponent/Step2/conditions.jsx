import React, { useEffect, useState } from "react";

export const SecondStepComp = ({ handleChangeStep, stepData, setStepData }) => {
  const currentYear = new Date().getFullYear();
  const vehicleYears = Array.from({ length: currentYear - 2009 }, (_, i) =>
    (currentYear - i).toString()
  );

  // normalize proposalType for case-insensitive/whitespace-robust comparisons
  const proposal = (stepData?.proposalType || "").toString().trim().toLowerCase();

  useEffect(() => {
    console.debug("SecondStepComp - proposalType:", stepData?.proposalType, "normalized:", proposal);
  }, [stepData?.proposalType]);

  const [cityMap, setCityMap] = useState({});
  const [product, setProduct] = useState([]);
  const [productKey, setProductKey] = useState("");
  const [manufacturerKey, setManufacturerKey] = useState("");
  const [modelKey, setModelKey] = useState("");
  const [varientKey, setVarientKey] = useState("");

  const fetchCitiesFromLocal = async () => {
    const url = `https://5ljsrljv5i.execute-api.ap-south-1.amazonaws.com/CustomCitiesOptions/webhook/cities`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      // API returns an object where keys are state names and values are arrays of cities
      if (result && typeof result === "object" && !Array.isArray(result)) {
        setCityMap(result);
      } else if (Array.isArray(result)) {
        // If API returns array of objects, try to convert to map by state property
        const map = result.reduce((acc, item) => {
          const state = item.state || item.State || item.region;
          const city = item.city || item.name || item.label;
          if (!state) return acc;
          acc[state] = acc[state] || [];
          if (city && !acc[state].includes(city)) acc[state].push(city);
          return acc;
        }, {});
        setCityMap(map);
      } else {
        console.warn("Unexpected cities response shape", result);
      }
    } catch (error) {
      console.error("Failed to fetch postcode details", error);
    }
  };

  const fetchproductFromLocal = async () => {
  const url = `https://5ljsrljv5i.execute-api.ap-south-1.amazonaws.com/CustomProducts/webhook/products`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (Array.isArray(result)) {
      // ✅ If it's already an array, use directly
      setProduct(result);
    } else if (typeof result === "object" && result !== null) {
      // ✅ If it's an object like { "Car": [...], "Bike": [...] }
      const normalized = Object.entries(result).flatMap(([productName, items]) =>
        items.map((item) => ({
          product: productName,
          manufacturer: item.manufacturer,
          model: item.model,
          variant: item.varience || item.variant,
          fuel_type: item.fuel_type,
        }))
      );
      setProduct(normalized);
    } else {
      console.warn("Unexpected product data format:", result);
      setProduct([]);
    }
  } catch (error) {
    console.error("Failed to fetch product details", error);
    setProduct([]);
  }
};

  // ✅ Filter manufacturers based on selected product
  const filteredManufacturers = (product || [])
    .filter((item) => item.product === productKey)
    .map((item) => item.manufacturer);
  const uniqueManufacturers = [...new Set(filteredManufacturers)];

  const filteredModel = (product || [])
    .filter(
      (item) =>
        item.product === productKey && item.manufacturer === manufacturerKey
    )
    .map((item) => item.model);
  const uniqueModel = [...new Set(filteredModel)];

  const filteredVarient = product
    .filter(
      (item) =>
        item.product === productKey &&
        item.manufacturer === manufacturerKey &&
        item.model === modelKey
    )
    .map((item) => item.varience || item.variant); // accept either

  const uniqueVarient = [...new Set(filteredVarient)];

  const filteredFuel = (product || [])
    .filter(
      (item) =>
        item.product === productKey &&
        item.manufacturer === manufacturerKey &&
        item.model === modelKey &&
        item.variant === varientKey
    )
    .map((item) => item.fuel_type);
  const uniqueFuel = [...new Set(filteredFuel)];

  useEffect(() => {
    fetchCitiesFromLocal();
    fetchproductFromLocal();
  }, []);

  useEffect(() => {
    if (product.length) {
      setProductKey(stepData.product || "");
      setManufacturerKey(stepData.manufacturerType || "");
      setModelKey(stepData.model || "");
      setVarientKey(stepData.varience || "");
    }
  }, [product]);
  return (
    <>
      <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">
            Proposal Type <span className="text-[#f00]">*</span>
          </label>
          <select
            name="proposalType"
            value={stepData?.proposalType}
            onChange={handleChangeStep}
            className={`w-full border custom-select  px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            <option value="New">New</option>
            <option value="Renewal">Renewal</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">
            Policy Type <span className="text-[#f00]">*</span>
          </label>
          <select
            name="policyType"
            value={stepData?.policyType}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2  border-[#e6e6e6] rounded`}
          >
            <option value="">Select</option>
            {proposal === "new" && (
              <>
                <option value="1+5 Bundle Policy">1+5 Bundle Policy</option>
                <option value="5 Year TP Only Policy">
                  5 Year TP Only Policy
                </option>
              </>
            )}
            {proposal === "renewal" && (
              <>
                <option value="Package Policy">Package Policy</option>
                <option value="TP Only Policy">TP Only Policy</option>
                <option value="OD only Policy">OD only Policy</option>
              </>
            )}
            {proposal === "used" && (
              <>
                <option value="Package Policy">Package Policy</option>
                <option value="TP Only Policy">TP Only Policy</option>
              </>
            )}
          </select>
        </div>

        {/* Row 2 */}
        <div>
          <label className="block font-medium">
            Receipt Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="receiptNumber"
            value={stepData?.receiptNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label className="block font-medium">
            Receipt Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="receiptDate"
            value={stepData?.receiptDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>

        {/* Row 3 */}
        <div>
          <label className="block font-medium">
            Vehicle Year <span className="text-[#f00]">*</span>
          </label>
          <select
            name="vehicleYear"
            value={stepData?.vehicleYear}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select Year</option>
            {vehicleYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">
            Registration Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={stepData?.registrationNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>

        {/* Row 4 */}
        <div>
          <label className="block font-medium">
            Registration Date <span className="text-[#f00]">*</span>
          </label>
          <input
            type="date"
            name="registrationDate"
            value={stepData?.registrationDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label className="block font-medium">
            Chassis Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="chassisNumber"
            value={stepData?.chassisNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>

        {/* Row 5 */}
        <div>
          <label className="block font-medium">
            Engine Number <span className="text-[#f00]">*</span>
          </label>
          <input
            type="text"
            name="engineNumber"
            value={stepData?.engineNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded`}
          />
        </div>
        <div>
          <label className="block font-medium">
            Manufacturing Year <span className="text-[#f00]">*</span>
          </label>
          <select
            name="manufacturingYear"
            value={stepData?.manufacturingYear}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select Year</option>
            {vehicleYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Row 6 */}
        <div>
          <label className="block font-medium">
            RTO State <span className="text-[#f00]">*</span>
          </label>
          <select
            name="rtoState"
            value={stepData.rtoState}
            onChange={(e) => {
              // when state changes, clear city
              handleChangeStep(e);
              setStepData((prev) => ({ ...prev, rtoCity: "" }));
            }}
            className={`w-full border custom-select px-4 py-2 b border-[#e6e6e6] rounded`}
          >
            <option value="">Select State</option>
            {Object.keys(cityMap).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">
            RTO City <span className="text-[#f00]">*</span>
          </label>
          <select
            name="rtoCity"
            value={stepData?.rtoCity}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded`}
          >
            <option value="">Select City</option>
            {(cityMap[stepData.rtoState] || []).map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Row 7 */}
        <div>
        <label className="block font-medium">Product <span className="text-[#f00]">*</span></label>
        <select
          name="product"
          value={stepData.product}
          onChange={(e) => {
            setProductKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select uppercase px-4 py-2 border-[#e6e6e6] rounded `}
        >
          <option value="">Select Product</option>
          {[...new Set((product || []).map((item) => item.product))].map((prod, index) => (
            <option key={index} value={prod} className="uppercase">
              {prod}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Manufactur Type <span className="text-[#f00]">*</span></label>
        <select
          name="manufacturerType"
          value={stepData.manufacturerType}
          onChange={(e) => {
            setManufacturerKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select uppercase px-4 py-2 border-[#e6e6e6] rounded `}
          disabled={!productKey}
        >
          <option value="">Select Manufacturer</option>
          {uniqueManufacturers.map((manu, index) => (
            <option key={index} value={manu} className="uppercase">
              {manu}
            </option>
          ))}
        </select>
      </div>


      {/* Row 8 */}
      <div>
        <label className="block font-medium">Model <span className="text-[#f00]">*</span></label>
        <select
          name="model"
          value={stepData.model}
          onChange={(e) => {
            setModelKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
          disabled={!productKey} // disables until product is selected
        >
          <option value="">Select Model</option>
          {uniqueModel.map((menu, index) => (
            <option key={index} value={menu}>
              {menu}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Varience <span className="text-[#f00]">*</span></label>
        <select
          name="varience"
          value={stepData.varience}
          onChange={(e) => {
            setVarientKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2  rounded `}
        >
          <option value="">Select Varience</option>
          {uniqueVarient.map((menu, index) => (
            <option key={index} value={menu}>
              {menu}
            </option>
          ))}
        </select>
      </div>
        <div className="block">
          <label className="block font-medium">
            Fuel type <span className="text-[#f00]">*</span>
          </label>
          <select
            name="fueltype"
            value={stepData.fueltype}
            onChange={handleChangeStep}
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
          >
            <option value="">Select Fuel Tpe</option>
            <option value="DIESEL">DIESEL</option>
            <option value="ELECTRIC">ELECTRIC</option>
            <option value="PETROL">PETROL</option>
            <option value="PETROL HYBRID">PETROL HYBRID</option>
            <option value="CNG/LPG">CNG/LPG</option>
          </select>
        </div>
      </div>
    </>
  );
};
