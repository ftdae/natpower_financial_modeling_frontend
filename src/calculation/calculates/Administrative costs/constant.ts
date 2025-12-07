import { IInsurance } from "../CoGS/type";
import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  IEasementCosts,
  IExtendedWarranty,
  IIntercompanyExpenses,
  ILandRent,
  ILegalCost,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity,
  IWaterRates,
} from "./type";

export const DEFAULT_LAND_RENT = {
  switch: 1,
  sensitivity: 0,
  sensitivity_magnitude: 0,
  annualLandRent: {
    paymentTerms: "quarterlly in advance",
    landRentBasis: "per MW",
    annualLandRentPerAcreCharge: 100,
    annualLandRentPerMWCharge: 0,
    portionPayableDuringConstruction: 50,
    portionPayableDuringOperations: 100,
    portionPayableDuringDecommissioning: 50,
  },
  optionChargeOne: {
    landRentBasis: "per acre",
    annualLandRentPerAcreCharge: 2,
    annualLandRentPerMWCharge: 0,
    paymentTerms: "annually in advance",
    startDate: "2028-01-01",
    endDate: "2068-06-30",
  },
  optionChargeTwo: {
    landRentBasis: "per acre",
    annualLandRentPerAcreCharge: 100,
    annualLandRentPerMWCharge: 0,
    paymentTerms: "annually in advance",
    landSizeForOptionTwo: 62,
    capacityForOptionTwo: 0,
    startDate: "2028-01-01",
    endDate: "2044-12-31",
  },
  substationRent: {
    substationRentAtEndOfLifeSwitch: 0,
    substationRentAtEndOfLifeSwitchAtEndOfLifeSwitchToUseInModel: 0,
    discountRate: 0,
    timeRemainingOnLease: 0,
    acresForSubstation: 0,
    longTermCPIAssumption: 0,
  },
  oneTimePayment: {
    paymentAmount: 0,
    paymentDate: "2024-08-08",
  },
  inflation: { profile: "CPI", baseYear: 2024 },
} as ILandRent;

export const DEFAULT_O_AND_M = [
  {
    type: "Fixed",
    inflationProfile: "",
    baseYear: "",
    cost: [
      { duration: 2, value: "" },
      { duration: 4, value: "" },
      { duration: 8, value: "" },
    ],
  },
  {
    type: "Variable",
    inflationProfile: "CPI",
    baseYear: 2024,
    cost: [
      { duration: 2, value: 10.451 },
      { duration: 4, value: 10.451 },
      { duration: 8, value: 10.451 },
    ],
  },
] as IOAndM[];

export const DEFAULT_ASSET_MANAGEMENT = {
  firstPeriod: {
    inflationProfile: "CPI",
    baseYear: 2024,
    startDate: "",
    endDate: "",
    feesAsAPercentOfRevenue: {
      realTimeManagement: 0,
      maintenance: 0,
    },
    feesPerMW: {
      realTimeManagement: 1,
      maintenance: 2,
    },
  },
  secondPeriod: {
    inflationProfile: "",
    baseYear: 2024,
    startDate: "",
    endDate: "",
    feesAsAPercentOfRevenue: {
      realTimeManagement: 1,
      maintenance: 1,
    },
    feesPerMW: {
      realTimeManagement: 0,
      maintenance: 0,
    },
  },
} as IAssetManagement;

export const DEFAULT_INSURANCE = {
  inflation: { profile: "CPI(OBR)", baseYear: 2024 },
  annualFees: 3,
} as IInsurance;

export const DEFAULT_COMMUNITY_BENEFIT = {
  inflationProfile: "No inflation",
  baseYear: 2024,
  annualFixedFundToCommunityBenefit: 1000,
  annualMWhToCommunityBenefit: 0,
  uelYears: 40,
  capitalisationSwitch: 0,
} as ICommunityBenefit;

export const DEFAULT_BUSINESS_RATES = {
  inflationProfile: "CPI(OBR)",
  baseYear: 2024,
  annualFeesPerMW: 1.2,
} as IBusinessRates;

export const DEFAULT_EXTENDED_WARRANTY = {
  extended_warranty_switch: 1,
  inflation_profile_warranty: "No inflation",
  inflation_base_year_warranty: 2024,
  length_of_warranty: 13,
  annual_fees_per_mw: [
    { duration: 2, fee: 4.077 },
    { duration: 4, fee: 8.153 },
    { duration: 8, fee: 16.307 },
  ],
} as IExtendedWarranty;

export const DEFAULT_SITE_SECURITY = {
  inflationProfile: "CPI",
  baseYear: 2024,
  annualFeesPerMW: 0.003,
} as ISiteSecurity;

export const DEFAULT_LEGAL_COST = {
  inflationProfile: "CPI",
  baseYear: 2024,
  annualCost: 0.03,
} as ILegalCost;

export const DEFAULT_OTHER_ADMIN_COSTs = {
  inflationProfile: "CPI",
  baseYear: 2024,
  annualAccountingFeesAndAudit: 7.5,
  annualIT: 7.5,
  annualOtherCost: 7.5,
} as IOtherAdminCosts;

export const DEFAULT_WATER_RATES = {
  inflation_profile_water_rates: "CPI(OBR)",
  inflation_profile_base_year: 2024,
  annual_fees_per_mw: 0,
} as IWaterRates;

export const DEFAULT_EASEMENT_COSTS = {
  inflation_profile_easement_costs: "CPI(OBR)",
  inflation_profile_base_year: 2024,
  annual_cost: 0,
  cable_length: 0,
} as IEasementCosts;

export const DEFAULT_INTERCOMPANY_EXPENSES = {
  inflation_profile_intercompany_expense: "",
  inflation_profile_base_year: 2023,
  annual_cost: 0,
} as IIntercompanyExpenses;

export const DEFAULT_TOTAL_REVENUE = new Array(300).fill(0);
export const DEFAULT_ASSET_M_EXPENSE = new Array(300).fill(0);
export const DEFAULT_BUSINESS_RATES_EXPENSE = new Array(300).fill(0);
export const DEFAULT_COMMUNITY_BENEFIT_EXPENSE = new Array(300).fill(0);
export const DEFAULT_INSURANCE_EXPENSE = new Array(300).fill(0);
export const DEFAULT_LEGAL_EXPENSE = new Array(300).fill(0);
export const DEFAULT_INTERCOMPANY_EXP = new Array(300).fill(0);
export const DEFAULT_EASEMENT_EXPENSE = new Array(300).fill(0);
export const DEFAULT_WATER_RATES_EXPENSE = new Array(300).fill(0);
export const DEFAULT_OTHER_ADMIN_EXPENSE = new Array(300).fill(0);
export const DEFAULT_SITE_SECURITY_EXPENSE = new Array(300).fill(0);
export const DEFAULT_O_AND_M_EXPENSE = new Array(300).fill(0);
export const DEFAULT_EXTENDED_WARRANTY_EXPENSE = new Array(300).fill(0);
export const DEFAULT_LAND_RENT_EXEPNESE = {
  rentToProfit: new Array(300).fill(0),
  rentToFixedAssets: new Array(300).fill(0),
  postGridConnectionForecastForOne: new Array(300).fill(0),
  postGridConnectionForecastForTwo: new Array(300).fill(0),
};
export const DEFAULT_DECOMMSSIONING_COSTS = {
  decommissioning_cost: new Array(300).fill(0),
  movement_in_working_capital: new Array(300).fill(0),
  decommissioning_provision_for_balance_sheet: new Array(300).fill(0),
};
export const DEFAULT_NG_SECURITIES = {
  national_grid_securities_for_cash_flow: new Array(300).fill(0),
  national_grid_securities_for_balance_sheet: new Array(300).fill(0),
  securities_premium_fee: new Array(300).fill(0),
  depreciationForSecuritiesPremiumFee: new Array(300).fill(0),
  additionsForCapex: new Array(300).fill(0),
};
