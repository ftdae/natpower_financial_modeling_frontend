import { DEFAULT_DEVEX_ADDITIONS } from "../../Cash flow/constant";
import { DEFAULT_NG_SECURITIES } from "../Administrative costs/constant";
import {
  ICommunityBenefitToCapex,
  IDevexAdditions,
  INGSecurities,
} from "../Administrative costs/type";
import { multiplyNumber, roundArray, sumArray, sumArrays } from "../utils";
import { capitalizedCommunityBenefit } from "./community_benefit";
import {
  DEFAULT_BALANCE_OF_PLANT_DEPRECIATION,
  DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION,
  DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
  DEFAULT_EV_DEPRECIATION,
  DEFAULT_POOLING_SUBSTATION_DEPRECIATION,
  DEFAULT_TRANSFORMERSDEPRECIATION,
  DEFAULT_VINTAGES_DEPRECIATION,
} from "./constant";

export function calcTotalDepreciation({
  balanceOfPlantDepreciation = DEFAULT_BALANCE_OF_PLANT_DEPRECIATION,
  transformersDepreciation = DEFAULT_TRANSFORMERSDEPRECIATION,
  evDepreciation = DEFAULT_EV_DEPRECIATION,
  vintagesDepreciation = DEFAULT_VINTAGES_DEPRECIATION,
  poolingSubstationDepreciation = DEFAULT_POOLING_SUBSTATION_DEPRECIATION,
  capitalizedRentInConstruction = DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION,
  communityBenefitToCapex = DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
  nGSecurities = DEFAULT_NG_SECURITIES,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
}: {
  balanceOfPlantDepreciation?: number[];
  transformersDepreciation?: number[];
  evDepreciation?: number[];
  vintagesDepreciation?: number[];
  poolingSubstationDepreciation?: number[];
  capitalizedRentInConstruction?: number[];
  communityBenefitToCapex?: ICommunityBenefitToCapex;
  nGSecurities?: INGSecurities;
  devexAdditions?: IDevexAdditions;
}) {
  const totalDepreciation: number[] = sumArrays(
    balanceOfPlantDepreciation,
    evDepreciation,
    poolingSubstationDepreciation,
    transformersDepreciation,
    capitalizedRentInConstruction,
    communityBenefitToCapex?.capitalizedCommunityBenefitResult,
    nGSecurities?.depreciationForSecuritiesPremiumFee,
    multiplyNumber(vintagesDepreciation, -1),
    devexAdditions.depreciationForecastCharge
  );

  return roundArray(totalDepreciation, 20);
}
