import { IDSAFeeSetting } from "../Administrative costs/type";
import { ICostOfAdditions } from "./type";

export const DEFAULT_COST_OF_ADDITIONS = {
  land: 0,
  poolingSubstation: 37.5,
  transformers: 19.167,
  balanceOfPlant: [
    {
      duration: 8,
      value: 0,
    },
    {
      duration: 2,
      value: 156698,
    },
    {
      duration: 4,
      value: 298689,
    },
  ],
  substaionBuildDev: 0,
  enterPriseValue: 150,
} as ICostOfAdditions;

export const DEFAULT_BALANCE_OF_PLANT_DEPRECIATION = new Array(300).fill(0);
export const DEFAULT_TRANSFORMERSDEPRECIATION = new Array(300).fill(0);
export const DEFAULT_EV_DEPRECIATION = new Array(300).fill(0);
export const DEFAULT_VINTAGES_DEPRECIATION = new Array(300).fill(0);
export const DEFAULT_POOLING_SUBSTATION_DEPRECIATION = new Array(300).fill(0);
export const DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION = new Array(300).fill(0);
export const DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX = {
  capitalizedCommunityBenefitResult: new Array(300).fill(0),
  forecastCostToCapex: new Array(300).fill(0),
};
export const DEFAULT_DSA_FEE_SETTING = {
  baseTotalDSAFee: 0,
  inflationProfile: "No inflation",
  baseYear: 2024,
  pdaDate: "2020-01-01",
  hotsDate: "2020-01-01",
  landSecuredDate: "2020-01-01",
  gridAppDate: "2020-01-01",
  gridFirstOfferDate: "2020-01-01",
  gridSecuredDate: "2020-01-01",
  prePlanDate: "2020-01-01",
  consultDate: "2020-01-01",
  planConsentDate: "2020-01-01",
  preConDischargeDate: "2020-01-01",
  pdaMile: 0,
  hotsMile: 0,
  landSecuredMile: 0,
  gridAppMile: 0,
  gridFirstOfferMile: 0,
  gridSecuredMile: 0,
  prePlanMile: 0,
  consultMile: 0,
  planConsentMile: 0,
  preConDischargeMile: 0,
} as IDSAFeeSetting;
