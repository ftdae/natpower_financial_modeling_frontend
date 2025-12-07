import moment from 'moment';
import {
  DEFAULT_FLOATING_PPA,
  DEFAULT_VINTAGE
} from '../constant';
import {
  getAsAPercentOfPeriod,
  getQuarterNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  sumArrays
} from '../utils';
import {
  IFloatingPPA,
  IVintage
} from './type';

export function calcFloatingPPA({
  floatingPPARevenue = DEFAULT_FLOATING_PPA,
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30',
  averageWholeSaleDayAheadPrice,
  vintage = DEFAULT_VINTAGE
}: {
  floatingPPARevenue: IFloatingPPA;
  modelStartDate?: string;
  averageWholeSaleDayAheadPrice?: number[];
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  let floatingPPARevenueArray: number[] = [];
  let firstFloatingPPA = [];
  let secondFloatingPPA = [];
  const totalGeneration = vintage.electricitySold;
  if (floatingPPARevenue.switch == 0) {
    return new Array(period).fill(0);
  } else {
    const floatingPPAPercentage = floatingPPARevenue?.assignedPercentage || 0;
    if (
      !moment(floatingPPARevenue.data[0].data.startDate).isValid() ||
      !moment(floatingPPARevenue.data[0].data.endDate).isValid()
    ) {
      firstFloatingPPA = new Array(period).fill(0);
    } else {
      const firstPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        floatingPPARevenue.data[0].data?.startDate,
        floatingPPARevenue.data[0].data?.endDate,
        decommissioningEndDate
      );
      const floatingPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        floatingPPAPercentage / 100
      );
      firstFloatingPPA = multiplyArrays([
        floatingPPAGeneration,
        firstPPAAsAPercentOfPeriod,
        averageWholeSaleDayAheadPrice || new Array(period).fill(0)
      ]);
    }
    if (
      !moment(floatingPPARevenue.data[1].data.startDate).isValid() ||
      !moment(floatingPPARevenue.data[1].data.endDate).isValid()
    ) {
      secondFloatingPPA = new Array(period).fill(0);
    } else {
      const secondPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        floatingPPARevenue.data[1].data?.startDate,
        floatingPPARevenue.data[1].data?.endDate,
        decommissioningEndDate
      );
      const floatingPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        floatingPPAPercentage / 100
      );
      secondFloatingPPA = multiplyArrays([
        floatingPPAGeneration,
        secondPPAAsAPercentOfPeriod,
        averageWholeSaleDayAheadPrice || new Array(period).fill(0)
      ]);
    }

    floatingPPARevenueArray = multiplyNumber(
      sumArrays(firstFloatingPPA, secondFloatingPPA),
      (100 - floatingPPARevenue.discountToWholesalePriceForMarginPercentage) /
      1000 /
      100
    );
    return floatingPPARevenueArray;
  }
}
