// Calcs 17.07 Water rates
import { sumArray, sumArrays } from "../utils";
import {
  DEFAULT_ASSET_M_EXPENSE,
  DEFAULT_BUSINESS_RATES_EXPENSE,
  DEFAULT_COMMUNITY_BENEFIT_EXPENSE,
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_EASEMENT_EXPENSE,
  DEFAULT_EXTENDED_WARRANTY_EXPENSE,
  DEFAULT_INSURANCE_EXPENSE,
  DEFAULT_INTERCOMPANY_EXP,
  DEFAULT_LAND_RENT_EXEPNESE,
  DEFAULT_LEGAL_EXPENSE,
  DEFAULT_O_AND_M_EXPENSE,
  DEFAULT_OTHER_ADMIN_EXPENSE,
  DEFAULT_SITE_SECURITY_EXPENSE,
  DEFAULT_WATER_RATES_EXPENSE,
} from "./constant";
import { IDecommissioningCosts, ILandRentExpense } from "./type";

export function calcTotalAdminCosts({
  assetMExpense = DEFAULT_ASSET_M_EXPENSE,
  businessRatesExpense = DEFAULT_BUSINESS_RATES_EXPENSE,
  communityBenefitExpense = DEFAULT_COMMUNITY_BENEFIT_EXPENSE,
  insuranceExpense = DEFAULT_INSURANCE_EXPENSE,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  legalExpense = DEFAULT_LEGAL_EXPENSE,
  oAndMExpense = DEFAULT_O_AND_M_EXPENSE,
  otherAdminExpense = DEFAULT_OTHER_ADMIN_EXPENSE,
  siteSecurityExpense = DEFAULT_SITE_SECURITY_EXPENSE,
  extendedWarrantyExpense = DEFAULT_EXTENDED_WARRANTY_EXPENSE,
  intercompanyExp = DEFAULT_INTERCOMPANY_EXP,
  easementExpnese = DEFAULT_EASEMENT_EXPENSE,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS,
  waterRatesExpense = DEFAULT_WATER_RATES_EXPENSE,
  arrangementFees = new Array(300).fill(0),
}: {
  assetMExpense?: number[];
  businessRatesExpense?: number[];
  communityBenefitExpense?: number[];
  insuranceExpense?: number[];
  landRentExpense?: ILandRentExpense;
  legalExpense?: number[];
  oAndMExpense?: number[];
  otherAdminExpense?: number[];
  siteSecurityExpense?: number[];
  extendedWarrantyExpense?: number[];
  intercompanyExp?: number[];
  easementExpnese?: number[];
  decommissioningCosts?: IDecommissioningCosts;
  waterRatesExpense?: number[];
  arrangementFees?: number[];
}) {
  const totalAdminCost: number[] = sumArrays(
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense.rentToProfit,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts.decommissioning_cost,
    waterRatesExpense,
    arrangementFees
    // nGSecurities.securities_premium_fee
  );

  return totalAdminCost;
}
