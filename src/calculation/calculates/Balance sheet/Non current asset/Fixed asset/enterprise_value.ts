import { DEFAULT_COST_OF_ADDITIONS } from "../../../Depreciation/constant";
import { ICostOfAdditions } from "../../../Depreciation/type";
import {
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
} from "../../../Revenue/type";
import { getQuarterNumberFromModelStartDate } from "../../../utils";
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
} from "../../constant";
import { IDevFeePaymentDates, IDevFeePaymentProfile } from "../../type";

export function calcEnterpriseValueAdditions({
  // developmentFeePaymentPercentageProfile ~~~ Fixed ~~~
  // 8.01 Capex payments ~~~ Development fee payment profile.
  developmentFeePaymentPercentageProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  // developmentFeePaymentDateProfile ~~~ Fixed ~~~ 1.02 technnology,
  // sizing, timing
  developmentFeePaymentDateProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  initialCapacity = 1000,
  modelStartDate = "2023-01-01",
  decommissioningEndDate = "2068-06-30",
  evSwitch = 1,
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
  costOfAdditions?: ICostOfAdditions;
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  initialCapacity?: number;
  batteryDuration?: number;
  capexSensitivity?: number;
  developmentStartDate?: string;
  operationStartDate?: string;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  evSwitch?: number;
}) {
  let investorClosingDatePaymentPercentage: number = 0;
  const percentageSumExceptInvestorClosingDate =
    developmentFeePaymentPercentageProfile.paymentPercentageAtClosingOfDebtAgreementDate *
      1 +
    developmentFeePaymentPercentageProfile.paymentPercentageAtFullyConsented *
      1 +
    developmentFeePaymentPercentageProfile.paymentPercentageAtGridSecuredDate *
      1 +
    developmentFeePaymentPercentageProfile.paymentPercentageAtLandSecuredDate *
      1 +
    developmentFeePaymentPercentageProfile.paymentPercentageAtcOD * 1 +
    developmentFeePaymentPercentageProfile.paymentPercentageAtrTB * 1;
  investorClosingDatePaymentPercentage =
    percentageSumExceptInvestorClosingDate == 0
      ? 0
      : 100 - percentageSumExceptInvestorClosingDate;

  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const totalEnterpriseVlaueAdditions = [];
  for (let i = 0; i < period; i++) {
    totalEnterpriseVlaueAdditions.push(0);
  }

  const gridSecuredDateMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.gridSecuredDate
    ) - 1;

  totalEnterpriseVlaueAdditions[gridSecuredDateMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtGridSecuredDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const closingOfDebtAgreementDateMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.closingOfDebtAgreementDate
    ) - 1;

  totalEnterpriseVlaueAdditions[closingOfDebtAgreementDateMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtClosingOfDebtAgreementDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;
  const landSecuredDateMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.landSecuredDate
    ) - 1;

  totalEnterpriseVlaueAdditions[landSecuredDateMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtLandSecuredDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const investorClosingDateMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.investorClosingDate
    ) - 1;

  totalEnterpriseVlaueAdditions[investorClosingDateMonthNumber - 1] +=
    (investorClosingDatePaymentPercentage *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const fullyConsentedMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.fullyConsented
    ) - 1;
  totalEnterpriseVlaueAdditions[fullyConsentedMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtFullyConsented *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const rTBMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.rTB
    ) - 1;

  totalEnterpriseVlaueAdditions[rTBMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtrTB *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const cODMonthNumber =
    getQuarterNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.cOD
    ) - 1;
  totalEnterpriseVlaueAdditions[cODMonthNumber - 1] +=
    (developmentFeePaymentPercentageProfile.paymentPercentageAtcOD *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;
  return evSwitch == 1
    ? totalEnterpriseVlaueAdditions
    : new Array(period).fill(0);
}
