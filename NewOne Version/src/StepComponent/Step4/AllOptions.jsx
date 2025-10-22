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


  export {addonOptions, CheckboxOption, handleAddonsChange, allRealOptions, selectedValues, insurerOptions}
