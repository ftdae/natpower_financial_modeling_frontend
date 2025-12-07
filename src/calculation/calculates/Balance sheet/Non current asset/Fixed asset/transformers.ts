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

export function calcTransformersAdditions({
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = "2028-01-01",
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
}: {
  initialCapacity?: number;
  costOfAdditions?: ICostOfAdditions;
  capexPaymentsProfile?: ICapexPaymentForm[];
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
    costOfAdditions.transformers * initialCapacity * (1 + capexSensitivity);

  const paymentMilestonesData: number[] =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d.capexObject == "Transformers")
          ?.paymentProfile
    )?.timing || [];

  // transformersProfile ~~~ calcs row 3875
  let transformersProfile: number[] = new Array(11).fill(0);
  transformersProfile[0] =
    paymentMilestonesData[0] * 1 + paymentMilestonesData[1] * 1;
  for (let i = 1; i < 10; i++) {
    transformersProfile[i] =
      1 * paymentMilestonesData[i * 3 - 1] +
      1 * paymentMilestonesData[i * 3] +
      1 * paymentMilestonesData[i * 3 + 1];
  }
  transformersProfile[10] = paymentMilestonesData[29];
  const paymentMilestonesLength = transformersProfile.length;
  const forecastTransformersAdditions = [];
  for (let i = 0; i < calcLength; i++) forecastTransformersAdditions.push(0);
  for (let i = 0; i < paymentMilestonesLength; i++)
    forecastTransformersAdditions[
      operationStartDateMonthNumber + i - paymentMilestonesLength
    ] = (additionsCost * transformersProfile[i]) / 100;

  // forecastTransformersAdditions ~~~ calcs row 3936
  return forecastTransformersAdditions;
}
