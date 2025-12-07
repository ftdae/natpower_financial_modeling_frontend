import {
  arraySum,
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  normalizeArray,
} from "../calculates/utils";
//   import { DEFAULT_CORPORATION_TAX } from "../calculates/constant";

import {
  DEFAULT_LAND_RENT_EXEPNESE,
  DEFAULT_NG_SECURITIES,
} from "../calculates/Administrative costs/constant";
import {
  ICommunityBenefitToCapex,
  IDevexAdditions,
  ILandRentExpense,
  INGSecurities,
} from "../calculates/Administrative costs/type";
import { DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX } from "../calculates/Depreciation/constant";
import { IVintage } from "../calculates/Revenue/type";
import { DEFAULT_VINTAGE } from "../calculates/constant";
import { sumArrays } from "../calculates/utils";
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_TRANSFORMERS_ADDITIONS,
} from "./constant";

export function calcCapitalExpenditure({
  modelStartDate = "2023-01-01",
  developmentStartDate = "2023-07-01",
  decommissioningEndDate = "2068-06-30",
  vintage = DEFAULT_VINTAGE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  substationBuildDevAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  communityBenefitToCapex = DEFAULT_COMMUNITY_BENEFIT_TO_CAPEX,
  nGSecurities = DEFAULT_NG_SECURITIES,
}: {
  modelStartDate?: string;
  developmentStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  substationBuildDevAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: IDevexAdditions;
  landRentExpense?: ILandRentExpense;
  communityBenefitToCapex?: ICommunityBenefitToCapex;
  nGSecurities?: INGSecurities;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // vintagesAdditionsCost Calcs 19 Fixed assets ~~~ 19.01 Additions ~~~ Forecast additions

  const vintagesData = vintage.vintages;
  let vintagesAdditionsCost =
    vintagesData[0].data.forecastAdditionsByMilestones ||
    new Array(period).fill(0);
  const numberOfVintages = vintagesData.length;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      vintagesAdditionsCost = arraySum(
        vintagesAdditionsCost,
        vintagesData[i].data.forecastAdditionsByMilestones
      );
  }

  // land, pooling, ...

  const enterpriseValueAdditions = evAdditions;
  // forecastAdditionsForCapitalizedCommunityBenefit ~~~ calcs row 3930
  const forecastAdditionsForCapitalizedCommunityBenefit = multiplyNumber(
    communityBenefitToCapex?.forecastCostToCapex,
    -1
  );
  // forecastAdditionsForCapitalizedCommunityBenefit ~~~ calcs row 3931
  const forecastAdditionsForNGSecurityPremiumFees =
    nGSecurities?.additionsForCapex || new Array(period).fill(0);
  // capitalisedRent calcs row 3929
  const capitalisedRent = multiplyNumber(landRentExpense.rentToFixedAssets, -1);

  const capexExcludingBatteries = sumArrays(
    landAdditions,
    poolingSubstationAdditions,
    substationBuildDevAdditions,
    capitalisedRent,
    devexAdditions.devexAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    enterpriseValueAdditions,
    forecastAdditionsForCapitalizedCommunityBenefit,
    forecastAdditionsForNGSecurityPremiumFees
  );
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  const capexExpenditure = arraySum(
    capexExcludingBatteries,
    normalizeArray(vintagesAdditionsCost, period, 0)
  );

  // capexExpenditure is the calculation of FS_M ~~~ 1 Cashflow ~~~ capital expenditure
  const capexExpenditureForCashflow = developmentToDecommissioningFlag.map(
    (d, index) => -d * capexExpenditure[index]
  );

  const total_additions = arraySum(
    capexExcludingBatteries,
    vintagesAdditionsCost
  );

  // arraySum(capexExcludingBatteries, vintagesAdditionsCost) is used for fixed assets additions.

  return {
    fixed_assets_additions_for_balance_sheet: total_additions,
    capexExpenditure: capexExpenditure,
    capexExpenditureForCashflow: capexExpenditureForCashflow,
    additionsExcludingBatteries: capexExcludingBatteries,
    additionsBatteriesOnly: vintagesAdditionsCost,
  };
}
