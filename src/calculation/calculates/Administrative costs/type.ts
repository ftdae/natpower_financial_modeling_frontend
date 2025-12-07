export interface ILandRent {
  switch: number;
  sensitivity: number;
  sensitivity_magnitude: number;
  annualLandRent: {
    paymentTerms: string;
    landRentBasis: string;
    annualLandRentPerAcreCharge: number;
    annualLandRentPerMWCharge: number;
    portionPayableDuringConstruction: number;
    portionPayableDuringOperations: number;
    portionPayableDuringDecommissioning: number;
  };
  optionChargeOne: {
    landRentBasis: string;
    annualLandRentPerAcreCharge: number;
    annualLandRentPerMWCharge: number;
    paymentTerms: string;
    startDate: string;
    endDate: string;
  };
  optionChargeTwo: {
    landRentBasis: string;
    paymentTerms: string;
    startDate: string;
    endDate: string;
    capacityForOptionTwo: number;
    landSizeForOptionTwo: number;
    annualLandRentPerAcreCharge: number;
    annualLandRentPerMWCharge: number;
  };
  substationRent: {
    substationRentAtEndOfLifeSwitch: number;
    substationRentAtEndOfLifeSwitchAtEndOfLifeSwitchToUseInModel: number;
    discountRate: number;
    timeRemainingOnLease: number;
    acresForSubstation: number;
    longTermCPIAssumption: number;
  };
  oneTimePayment: {
    paymentAmount: number;
    paymentDate: string;
  };
  inflation: { profile: string; baseYear: number };
}

export interface IDSAFeeSetting {
  baseTotalDSAFee: number;
  inflationProfile: string;
  baseYear: number;
  pdaDate: string;
  hotsDate: string;
  landSecuredDate: string;
  gridAppDate: string;
  gridFirstOfferDate: string;
  gridSecuredDate: string;
  prePlanDate: string;
  consultDate: string;
  planConsentDate: string;
  preConDischargeDate: string;
  pdaMile: number;
  hotsMile: number;
  landSecuredMile: number;
  gridAppMile: number;
  gridFirstOfferMile: number;
  gridSecuredMile: number;
  prePlanMile: number;
  consultMile: number;
  planConsentMile: number;
  preConDischargeMile: number;
}
export interface IOAndM {
  type: string;
  inflationProfile: string;
  baseYear: number;
  cost: { duration: number; value: number }[];
}

export interface IAssetManagement {
  firstPeriod: {
    inflationProfile: string;
    baseYear: number;
    startDate: string;
    endDate: string;
    feesAsAPercentOfRevenue: {
      realTimeManagement: number;
      maintenance: number;
    };
    feesPerMW: {
      realTimeManagement: number;
      maintenance: number;
    };
  };
  secondPeriod: {
    inflationProfile: string;
    baseYear: number;
    startDate: string;
    endDate: string;
    feesAsAPercentOfRevenue: {
      realTimeManagement: number;
      maintenance: number;
    };
    feesPerMW: {
      realTimeManagement: number;
      maintenance: number;
    };
  };
}

export interface ICommunityBenefit {
  inflationProfile: string;
  baseYear: number;
  annualFixedFundToCommunityBenefit: number;
  annualMWhToCommunityBenefit: number;
  uelYears: number;
  capitalisationSwitch: number;
}

export interface IBusinessRates {
  inflationProfile: string;
  baseYear: number;
  annualFeesPerMW: number;
}

export interface IExtendedWarranty {
  extended_warranty_switch: number;
  inflation_profile_warranty: string;
  inflation_base_year_warranty: number;
  length_of_warranty: number;
  annual_fees_per_mw: { duration: number; fee: number }[];
}

export interface ISiteSecurity {
  inflationProfile: string;
  baseYear: number;
  annualFeesPerMW: number;
}

export interface ILegalCost {
  inflationProfile: string;
  baseYear: number;
  annualCost: number;
}

export interface IOtherAdminCosts {
  inflationProfile: string;
  baseYear: number;
  annualAccountingFeesAndAudit: number;
  annualIT: number;
  annualOtherCost: number;
}
export interface IWaterRates {
  inflation_profile_water_rates: string;
  inflation_profile_base_year: number;
  annual_fees_per_mw: number;
}

export interface IEasementCosts {
  inflation_profile_easement_costs: string;
  inflation_profile_base_year: number;
  annual_cost: number;
  cable_length: number;
}
export interface IIntercompanyExpenses {
  inflation_profile_intercompany_expense: string;
  inflation_profile_base_year: number;
  annual_cost: number;
}
export interface ILandRentExpense {
  rentToProfit: number[];
  rentToFixedAssets: number[];
  postGridConnectionForecastForOne: number[];
  postGridConnectionForecastForTwo: number[];
}
export interface IDecommissioningCosts {
  decommissioning_cost: number[];
  movement_in_working_capital: number[];
  decommissioning_provision_for_balance_sheet: number[];
}
export interface INGSecurities {
  national_grid_securities_for_cash_flow: number[];
  national_grid_securities_for_balance_sheet: number[];
  securities_premium_fee: number[];
  depreciationForSecuritiesPremiumFee: number[];
  additionsForCapex: number[];
}
export interface ICommunityBenefitToCapex {
  capitalizedCommunityBenefitResult: number[];
  forecastCostToCapex: number[];
}
export interface IDevexAdditions {
  devexAdditions: number[];
  depreciationForecastCharge: number[];
}
