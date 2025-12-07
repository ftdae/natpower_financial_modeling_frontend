import {
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
} from "../../../constant";
import { DEFAULT_COST_OF_ADDITIONS } from "../../../Depreciation/constant";
import { ICostOfAdditions } from "../../../Depreciation/type";
import {
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
} from "../../../Revenue/type";
import { getQuarterNumberFromModelStartDate, sumArray } from "../../../utils";

export function calcBalacneOfPlantAdditions({
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  batteryDuration = 4,
  capexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  costOfAdditions?: ICostOfAdditions;
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  batteryDuration?: number;
  capexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  decommissioningEndDate?: string;
}) {
  // calcLength ~~~ Month number of decommissioning end date from model start date.
  // example:546
  const calcLength =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const operationStartDateMonthNumber =
    getQuarterNumberFromModelStartDate(modelStartDate, operationStartDate) - 1;

  const additionsCost =
    costOfAdditions.balanceOfPlant.find((d) => d.duration == batteryDuration)
      ?.value || 0 * (1 + capexSensitivity);

  const paymentMilestonesData =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d.capexObject == "Balance of Plant")
          ?.paymentProfile
    )?.timing || [];

  // balanceOfPlantProfile ~~~ calcs row 3876
  let balanceOfPlantProfile: number[] = new Array(11).fill(0);
  balanceOfPlantProfile[0] =
    paymentMilestonesData[0] * 1 + paymentMilestonesData[1] * 1;
  for (let i = 1; i < 10; i++) {
    balanceOfPlantProfile[i] =
      1 * paymentMilestonesData[i * 3 - 1] +
      1 * paymentMilestonesData[i * 3] +
      1 * paymentMilestonesData[i * 3 + 1];
  }
  balanceOfPlantProfile[10] = paymentMilestonesData[29];
  const paymentMilestonesLength = balanceOfPlantProfile.length;
  const forecastBalanceOfPlantAdditions = [];
  for (let i = 0; i < calcLength; i++) forecastBalanceOfPlantAdditions.push(0);
  for (let i = 0; i < paymentMilestonesLength; i++)
    forecastBalanceOfPlantAdditions[
      operationStartDateMonthNumber + i - paymentMilestonesLength
    ] = (additionsCost * balanceOfPlantProfile[i]) / 100;

  // forecastBalanceOfPlantAdditions ~~~ calcs row 3937
  return forecastBalanceOfPlantAdditions;
}
