import { DEFAULT_CAPEX_PAYMENT_MILESTONES, DEFAULT_CAPEX_PAYMENTS_PROFILE } from "../../../constant";
import { DEFAULT_COST_OF_ADDITIONS } from "../../../Depreciation/constant";
import { ICostOfAdditions } from "../../../Depreciation/type";
import { ICapexPaymentForm, ICapexPaymentMilestoneForm } from "../../../Revenue/type";
import { getQuarterNumberFromModelStartDate } from "../../../utils";


export function calcLandAdditions({
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30'
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

  const operationStartDateMonthNumber = getQuarterNumberFromModelStartDate(
    modelStartDate,
    operationStartDate
  );

  const additionsCost =
    costOfAdditions.land * initialCapacity * (1 + capexSensitivity);

  const paymentMilestonesData: number[] =
    capexPaymentMilestones.find(
      (d) =>
        d?.profileName ==
        capexPaymentsProfile.find((d) => d.capexObject == 'Land')
          ?.paymentProfile
    )?.timing || [];
  const forecastLandAdditions = [];
  for (let i = 0; i < calcLength; i++) forecastLandAdditions.push(0);

  if (paymentMilestonesData == null) {
    return forecastLandAdditions;
  } else {
    const paymentMilestonesLength = paymentMilestonesData.length;

    for (let i = 0; i < paymentMilestonesLength; i++)
      forecastLandAdditions[
        operationStartDateMonthNumber + i - paymentMilestonesLength
      ] = additionsCost * paymentMilestonesData[i];

    return forecastLandAdditions;
  }
}
