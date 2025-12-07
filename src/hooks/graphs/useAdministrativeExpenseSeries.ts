import moment from "moment";
import { useMemo, useState } from "react";
import { selectResult } from "../../store/slices/resultSlice";
import { useAppSelector } from "../../hooks/hooks";
import {
  getFilterData,
  getQuarterNumberFromModelStartDate,
  multiplyNumber,
  preProcessArray4Graph,
} from "../../calculation/calculates/utils";
import { DATE_FORMAT } from "../../utils/usePrameter";

export function useAdministrativeExpenseSeries(active: string) {
  const {
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    modelStartDate,
    totalAdminCosts,
    decommissioningEndDate,
  } = useAppSelector(selectResult);
  const period =
    getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const [dateRange, setDateRange] = useState({
    from: modelStartDate,
    to: moment(modelStartDate)
      .add(period, "quarters")
      .add(-1, "days")
      .format(DATE_FORMAT),
  });

  const data = useMemo(() => {
    const land_rent = multiplyNumber(
      landRentExpense?.rentToProfit || new Array(period).fill(0),
      -1
    );
    const o_m = multiplyNumber(oAndMExpense || new Array(period).fill(0), -1);
    const asset_management = multiplyNumber(
      assetMExpense || new Array(period).fill(0),
      -1
    );
    const insurance = multiplyNumber(
      insuranceExpense || new Array(period).fill(0),
      -1
    );
    const community_benefit = multiplyNumber(
      communityBenefitExpense || new Array(period).fill(0),
      -1
    );
    const business_rates = multiplyNumber(
      businessRatesExpense || new Array(period).fill(0),
      -1
    );
    const other_admin_costs = multiplyNumber(
      otherAdminExpense || new Array(period).fill(0),
      -1
    );
    const decommissioning_costs = multiplyNumber(
      decommissioningCosts?.decommissioning_cost || new Array(period).fill(0),
      -1
    );
    const legal_costs = multiplyNumber(
      legalExpense || new Array(period).fill(0),
      -1
    );
    const site_security = multiplyNumber(
      siteSecurityExpense || new Array(period).fill(0),
      -1
    );
    const extended_warranty = multiplyNumber(
      extendedWarrantyExpense || new Array(period).fill(0),
      -1
    );
    // const national_grid_security_premium_fees = multiplyNumber(nGSecurities?.securities_premium_fee || new Array(period).fill(0), -1);
    const easement = multiplyNumber(
      easementExpnese || new Array(period).fill(0),
      -1
    );
    const intercompany = multiplyNumber(
      intercompanyExp || new Array(period).fill(0),
      -1
    );
    const water = multiplyNumber(
      waterRatesExpense || new Array(period).fill(0),
      -1
    );
    const resultForQuarter = [
      {
        name: "Land rent",
        data: preProcessArray4Graph(land_rent || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "O&M",
        data: preProcessArray4Graph(o_m || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Asset management",
        data: preProcessArray4Graph(
          asset_management || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Insurance",
        data: (insurance || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Community benefit",
        data: (community_benefit || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Business rates",
        data: preProcessArray4Graph(business_rates || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      // {
      //   name: 'NG security premium fees',
      //   data: national_grid_security_premium_fee || new Array(period).fill(0)s.concat(new Array(10).fill(0)).map((r, index) => ({
      //     x: moment(modelStartDate).add(index, 'quarters').startOf('month').format('YYYY-MM-DD'),
      //     y: r,
      //   })),
      // },
      {
        name: "Extended warranty",
        data: (extended_warranty || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Site security",
        data: preProcessArray4Graph(site_security || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Legal costs",
        data: preProcessArray4Graph(legal_costs || new Array(period).fill(0))
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Other admin expenses",
        data: preProcessArray4Graph(
          other_admin_costs || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Decommissioning costs",
        data: preProcessArray4Graph(
          decommissioning_costs || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Easement costs",
        data: preProcessArray4Graph(
          multiplyNumber(easement, -1) || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Intercompany expenses",
        data: preProcessArray4Graph(
          multiplyNumber(intercompany, -1) || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Water rates",
        data: preProcessArray4Graph(
          multiplyNumber(water, -1) || new Array(period).fill(0)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Total administrative costs",
        data: preProcessArray4Graph(
          multiplyNumber(totalAdminCosts || new Array(period).fill(0), -1)
        )
          .concat(new Array(10).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(index, "quarters")
              .startOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
    ];
    const resultForAnnual = [
      {
        name: "Land rent",
        data: preProcessArray4Graph(
          getFilterData(
            land_rent || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "O&M",
        data: preProcessArray4Graph(
          getFilterData(
            o_m || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Asset management",
        data: preProcessArray4Graph(
          getFilterData(
            asset_management || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Insurance",
        data: getFilterData(
          (insurance || new Array(period)).fill(0),
          modelStartDate,
          active,
          dateRange
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Community benefit",
        data: getFilterData(
          community_benefit || new Array(period).fill(0),
          modelStartDate,
          active,
          dateRange
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Business rates",
        data: preProcessArray4Graph(
          getFilterData(
            business_rates || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Extended warranty",
        data: getFilterData(
          extended_warranty || new Array(period).fill(0),
          modelStartDate,
          active,
          dateRange
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Site security",
        data: preProcessArray4Graph(
          getFilterData(
            site_security || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Legal costs",
        data: preProcessArray4Graph(
          getFilterData(
            legal_costs || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Other admin expenses",
        data: preProcessArray4Graph(
          getFilterData(
            other_admin_costs || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Decommissioning costs",
        data: preProcessArray4Graph(
          getFilterData(
            decommissioning_costs || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Easement costs",
        data: preProcessArray4Graph(
          getFilterData(
            multiplyNumber(easement, -1) || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Intercompany expenses",
        data: preProcessArray4Graph(
          getFilterData(
            multiplyNumber(intercompany, -1) || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Water rates",
        data: preProcessArray4Graph(
          getFilterData(
            multiplyNumber(water, -1) || new Array(period).fill(0),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
      {
        name: "Total administrative costs",
        data: preProcessArray4Graph(
          getFilterData(
            multiplyNumber(totalAdminCosts || new Array(period).fill(0), -1),
            modelStartDate,
            active,
            dateRange
          )
        )
          .concat(new Array(5).fill(0))
          .map((r, index) => [
            moment(modelStartDate)
              .add(-1, "day")
              .add((index + 1) * 4, "quarters")
              .endOf("month")
              .valueOf(),
            Number(r),
          ]),
      },
    ];
    return active == "quarterly" ? resultForQuarter : resultForAnnual;
  }, [
    landRentExpense,
    oAndMExpense,
    assetMExpense,
    insuranceExpense,
    communityBenefitExpense,
    businessRatesExpense,
    otherAdminExpense,
    decommissioningCosts,
    legalExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    nGSecurities,
    active,
  ]);

  return data;
}
