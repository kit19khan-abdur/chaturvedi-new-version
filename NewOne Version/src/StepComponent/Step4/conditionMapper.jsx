// conditionMapper.js
import {
  condition1,
  condition2,
  condition3,
  condition4,
  condition5,
  condition6,
  condition7,
  condition8,
  condition9,
  condition10,
  condition11,
  condition12,
  condition13,
  condition14,
  condition15,
  condition16,
  condition17,
  condition18,
  condition19,
  condition20,
} from "./conditions";

export const getConditionComponent = ({
  customertype,
  proposalType,
  policyType,
  previousPolicy,
  prevPolicyType,
}) => {
  // Normalize all values to lowercase for safe comparison
  const customer = customertype?.toLowerCase();
  const proposal = proposalType?.toLowerCase();
  const policy = policyType?.toLowerCase();
  const prev = previousPolicy?.toLowerCase();
  const prevType = prevPolicyType?.toLowerCase();

  if (
    customer === "individual" &&
    proposal === "new" &&
    policy === "1+5 bundle policy"
  )
    return condition1;
  if (
    customer === "individual" &&
    proposal === "new" &&
    policy === "5 year tp only policy"
  )
    return condition2;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "package policy" &&
    prev === "no"
  )
    return condition3;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "package policy" &&
    prev === "yes" &&
    (prevType === "od only policy" || prevType  === "od policy")
  )
    return condition4;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "package policy" &&
    prev === "yes" &&
    prevType === "package policy"
  )
    return condition5;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "tp only policy" &&
    prev === "no"
  )
    return condition6;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "tp only policy" &&
    prev === "yes" &&
    (prevType === "od only policy" || prevType  === "od policy")
  )
    return condition7;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "tp only policy" &&
    prev === "yes" &&
    (prevType === "tp only policy" || prevType  === "tp policy")
  )
    return condition8;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "tp only policy" &&
    prev === "yes" &&
    prevType === "package policy"
  )
    return condition9;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "od only policy" &&
    prev === "no"
  )
    return condition10;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "od only policy" &&
    prev === "yes" &&
    (prevType === "od only policy" || prevType  === "od policy")
  )
    return condition11;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "od only policy" &&
    prev === "yes" &&
    (prevType === "tp only policy" || prevType  === "tp policy")
  )
    return condition12;
  if (
    customer === "individual" &&
    proposal === "renewal" &&
    policy === "od only policy" &&
    prev === "yes" &&
    prevType === "package policy"
  )
    return condition13;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "package policy" &&
    prev === "no"
  )
    return condition14;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "package policy" &&
    prev === "yes" &&
    (prevType === "od only policy" || prevType  === "od policy")
  )
    return condition15;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "package policy" &&
    prev === "yes" &&
    prevType === "package policy"
  )
    return condition16;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "tp only policy" &&
    prev === "No"
  )
    return condition17;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "tp only policy" &&
    prev === "Yes" && (prevType === "od only policy" || prevType === "od policy")
  )
    return condition18;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "tp only policy" &&
    prev === "Yes" && (prevType === "tp only policy" || prevType === "tp policy")
  )
    return condition19;
  if (
    customer === "individual" &&
    proposal === "used" &&
    policy === "tp only policy" &&
    prev === "Yes" && prevType === "package policy"
  )
  if(customer === "corporate")
    return condition20;

  return null;
};
