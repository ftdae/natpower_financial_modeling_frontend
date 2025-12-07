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
import { getQuarterNumberFromModelStartDate } from "../../../utils";

export function calcSubstationBuildDevAdditions({
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  initialCapacity?: number;
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
  const additionsCost = costOfAdditions.substaionBuildDev;

  const paymentMilestonesData: number[] =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find(
          (d) =>
            d.capexObject == "Substation build development and capex premium"
        )?.paymentProfile
    )?.timing || [];
  let substationBuildDevProfile: number[] = new Array(11).fill(0);
  substationBuildDevProfile[0] =
    paymentMilestonesData[0] * 1 + paymentMilestonesData[1] * 1;
  for (let i = 1; i < 10; i++) {
    substationBuildDevProfile[i] =
      1 * paymentMilestonesData[i * 3 - 1] +
      1 * paymentMilestonesData[i * 3] +
      1 * paymentMilestonesData[i * 3 + 1];
  }
  substationBuildDevProfile[10] = paymentMilestonesData[29];
  const paymentMilestonesLength = substationBuildDevProfile.length;
  const forecastPoolingSubstationAdditions = [];
  for (let i = 0; i < calcLength; i++)
    forecastPoolingSubstationAdditions.push(0);
  for (let i = 0; i < paymentMilestonesLength; i++)
    forecastPoolingSubstationAdditions[
      operationStartDateMonthNumber + i - paymentMilestonesLength
    ] = (additionsCost * substationBuildDevProfile[i]) / 100;
  // forecastPoolingSubstationAdditions ~~~ calcs row 3935
  return forecastPoolingSubstationAdditions;
}
