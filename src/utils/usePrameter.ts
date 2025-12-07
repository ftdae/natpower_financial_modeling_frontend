import { isArray } from "highcharts";
import moment from "moment";
import { useCallback, useEffect } from "react";
import { calcArrangementFees } from "../calculation/calculates/Administrative costs/arrangement_fees";
import { calcAssetManagementCosts } from "../calculation/calculates/Administrative costs/asset_management";
import { calcBusinessRates } from "../calculation/calculates/Administrative costs/business_rates";
import { calcCommunityBenefit } from "../calculation/calculates/Administrative costs/community_benefit";
import { calcDecommissiongCosts } from "../calculation/calculates/Administrative costs/decommissioning_cost";
import { calcEasementCosts } from "../calculation/calculates/Administrative costs/easement_costs";
import { calcExtendedWarranty } from "../calculation/calculates/Administrative costs/extended_warranty";
import { calcInsuranceExpense } from "../calculation/calculates/Administrative costs/insurance";
import { calcIntercompanyExpense } from "../calculation/calculates/Administrative costs/intercompany_expenses";
import { calcLandRentToPL } from "../calculation/calculates/Administrative costs/land_rent";
import { calcLegalCosts } from "../calculation/calculates/Administrative costs/legal_cost";
import { calcOperationAndManagementCost } from "../calculation/calculates/Administrative costs/o_and_m";
import { calcOtherAdminCosts } from "../calculation/calculates/Administrative costs/other_administrative_cost";
import { calcSiteSecurity } from "../calculation/calculates/Administrative costs/site_security";
import { calcTotalAdminCosts } from "../calculation/calculates/Administrative costs/total_admin_cost";
import { calcWaterRates } from "../calculation/calculates/Administrative costs/water_rates";
import { calcBalacneOfPlantAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/balance_of_plant";
import { calcDevexAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/devex";
import { calcEnterpriseValueAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/enterprise_value";
import { calcLandAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/land";
import { calcPoolingSubstationAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/pooling_substation";
import { calcSubstationBuildDevAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/substaion_build_dev";
import { calcTransformersAdditions } from "../calculation/calculates/Balance sheet/Non current asset/Fixed asset/transformers";
import { calcCorporationTax } from "../calculation/calculates/Cash flow/corporation_tax";
import { calcAuxilliaryLosses } from "../calculation/calculates/CoGS/auxilliary_losses";
import { calcDUoSCharges } from "../calculation/calculates/CoGS/duos_charges";
import { calcMetering } from "../calculation/calculates/CoGS/metering";
import { calcOptimiserCommission } from "../calculation/calculates/CoGS/optimiser_commission";
import { calcPPAFees } from "../calculation/calculates/CoGS/ppa_fees";
import { calcTNUoSCharges } from "../calculation/calculates/CoGS/tnuos_export_charges";
import { calcTnuosTriadCharges } from "../calculation/calculates/CoGS/tnuos_triad_charges";
import { calcTotalCostOfSales } from "../calculation/calculates/CoGS/total_cost_of_sales";
import { calcBalanceOfPlant } from "../calculation/calculates/Depreciation/balance_of_plant";
import { calcCapitalizedRentInConstruction } from "../calculation/calculates/Depreciation/capitalised_rent_in_construction";
import { capitalizedCommunityBenefit } from "../calculation/calculates/Depreciation/community_benefit";
import { calcEnterpriseValue } from "../calculation/calculates/Depreciation/enterprise_value";
import { calcPoolingSubstation } from "../calculation/calculates/Depreciation/pooling_substation";
import { calcTotalDepreciation } from "../calculation/calculates/Depreciation/total_depreciation";
import { calcTransformers } from "../calculation/calculates/Depreciation/transformers";
import { calcVintagesDepreciation } from "../calculation/calculates/Depreciation/vintages_depreciation";
import { calcEBIT } from "../calculation/calculates/ebit";
import { calcBalancingMechanismRevenue } from "../calculation/calculates/Revenue/balancing_mechanism";
import { calcCapacityMarket } from "../calculation/calculates/Revenue/capacity_market";
import { calcCFDRevenue } from "../calculation/calculates/Revenue/cfd_revenue";
import { calcEmbeddedBenefits } from "../calculation/calculates/Revenue/embedded_benefits";
import { calcFixedPPA } from "../calculation/calculates/Revenue/fixed_ppa";
import { calcFloatingPPA } from "../calculation/calculates/Revenue/floating_ppa";
import { calcFrequencyResponse } from "../calculation/calculates/Revenue/frequency_response";
import { calcGainOnDisposal } from "../calculation/calculates/Revenue/gain_on_disposal_of_batteries";
import { calcREGORevenue } from "../calculation/calculates/Revenue/rego_revenue";
import { calcReserveMarginRevenue } from "../calculation/calculates/Revenue/reserve_margin_revenue";
import { calcResidualRevenue } from "../calculation/calculates/Revenue/residual_value";
import { calcTNUoSRevenue } from "../calculation/calculates/Revenue/tnuos_revenues";
import { calcTollingRevenue } from "../calculation/calculates/Revenue/tolling_revenue";
import { calcTotalRevenue } from "../calculation/calculates/Revenue/total_revenue";
import { calcTotalTNUosTriads } from "../calculation/calculates/Revenue/total_tnuos_triads";
import { calcTriadsIncome } from "../calculation/calculates/Revenue/triads_income";
import {
  IBatteryCubes,
  IRevenueSetup,
} from "../calculation/calculates/Revenue/type";
import { calcUpsidePotentialRevenue } from "../calculation/calculates/Revenue/upside_potential";
import { calcWholeSaleDayAheadRevenue } from "../calculation/calculates/Revenue/wholesale_day_ahead";
import { calcSolarRevenue } from "../calculation/calculates/Revenue/wholesale_solar";
import { calcWholesaleIntraday } from "../calculation/calculates/Revenue/wholsale_intraday";
import {
  annualIndexToMonths,
  calcVintages,
  getAverageValue,
  multiplyNumber,
  roundNumber,
} from "../calculation/calculates/utils";
import { calcCapexProvision } from "../calculation/Cash flow/capex_provision";
import { calcCapitalExpenditure } from "../calculation/Cash flow/capital_expenditure";
import { calcCapexCreditor } from "../calculation/Cash flow/Movement/movement_in_capex_creditor";
import { calcNationalGridSecurities } from "../calculation/Cash flow/Movement/movement_in_escrow_account";
import { calcPrepayments } from "../calculation/Cash flow/Movement/movement_in_prepayments";
import { calcTradeCreditors } from "../calculation/Cash flow/Movement/movement_in_trade_creditors";
import { calcTradeDebtors } from "../calculation/Cash flow/Movement/movement_in_trade_debtors";
import { calcVATCreditor } from "../calculation/Cash flow/Movement/movement_in_vat_creditor";
import { calcOperatingCashFlow } from "../calculation/Cash flow/Movement/operating_cashflow";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectParam } from "../store/slices/parameterSlice";
import {
  selectResult,
  setAfryRevenueData,
  setAjdustmentTariffData,
  setArrangementFees,
  setAssetManagement,
  setAssetMExpense,
  setAssetName,
  setAssumptionsData,
  setAuxilliaryLoss,
  setAuxilliaryLossesSettings,
  setAverageWholeSaleDayAheadPrice,
  setBalanceOfPlantAdditions,
  setBalanceOfPlantDepreciation,
  setBalancingMechanism,
  setBalancingReserve,
  setBatteryAugmentation,
  setBatteryCubes,
  setBatteryDisposals,
  setBatteryDuration,
  setBatteryEfficiency,
  setBatteryExCubes,
  setBatterySensitivity,
  setBessCapexForecast,
  setBoPCapexPercentage,
  setBusinessRates,
  setBusinessRatesExpense,
  setCalculationPeriod,
  setCapacityMarket,
  setCapexCreditor,
  setCapexForecasetScenarioData,
  setCapexForecastModel,
  setCapexPaymentMilestones,
  setCapexPaymentsProfile,
  setCapexProvision,
  setCapexSensitivity,
  setCapexUEL,
  setCapitalExpenditure,
  setCapitalizedRentInConstruction,
  setCashRequirements,
  setCFDRevenue,
  setCFDSettings,
  setCommunityBenefit,
  setCommunityBenefitExpense,
  setCommunityBenefitToCapex,
  setConstraintFactor,
  setConstructionStartDate,
  setCorporationTax,
  setCorporationTaxValue,
  setCostOfAdditions,
  setCyclesData,
  setDecommissioningCost,
  setDecommissioningCosts,
  setDecommissioningEndDate,
  setDecommissioningStartDate,
  setDetailedRevenueData,
  setDevelopmentFeePaymentDateProfile,
  setDevelopmentFeePaymentPercentageProfile,
  setDevelopmentStartDate,
  setDevexAdditions,
  setDevexSetting,
  setDividends,
  setDSAFeeSetting,
  setduosChargesSetting,
  setduosCost,
  setEasementExpense,
  setEasementSetting,
  setEBIT,
  setEmbeddedBenefits,
  setEmbeddedSetting,
  setEquity,
  setEVAdditions,
  setEVDepreciation,
  setEVSwitch,
  setExportChargesOfTNUoS,
  setExtended_warranty,
  setExtendedCalculationPeriod,
  setExtendedWarrantyExpense,
  setFixedPPARevenue,
  setFixedPPAValue,
  setFloatingPPARevenue,
  setFloatingPPAValue,
  setFrequencyResponse,
  setFullyConsentedDate,
  setGainOnDisposal,
  setGainOnDisposalSwitch,
  setGearingByCapexType,
  setGridConnectionDate,
  setInflationInputs,
  setInitialCapacity,
  setInitialCycleData,
  setInsurance,
  setInsuranceExpense,
  setIntercompanyExp,
  setIntercompanySettings,
  setInvestorClosingDate,
  setLandAdditions,
  setLandRent,
  setLandRentExpense,
  setLandSize,
  setLegalCosts,
  setLegalExpense,
  setLengthOfConstruction,
  setLengthOfDecommissioning,
  setLengthOfOperations,
  setLocalCircuitsData,
  setLocalSubstationSwitch,
  setLocalSubstationTariff,
  setMCapexProvision,
  setMeteringCost,
  setMeteringSettings,
  setModel,
  setModelStartDate,
  setModoRegion,
  setMovementInPrepayments,
  setMovementInTradeCreditor,
  setMovementInTradeDebtor,
  setMovementInVATCreditor,
  setNationalGridSecurities,
  setNGSecurities,
  setNotSharedYearRoundTariffData,
  setOAndMExpense,
  setOperatingCashFlowValue,
  setOperationAndManagementSettings,
  setOperationEndDate,
  setOperationStartDate,
  setOperationYears,
  setOpexSensitivity,
  setOptimiser,
  setOptimiserCost,
  setOtherAdminExpense,
  setOtherAdministrativeCosts,
  setPoolingSubstationAdditions,
  setPoolingSubstationDepreciation,
  setPPAFee,
  setPPAFeesPercentage,
  setRampRateSettings,
  setRegion,
  setRegoRevenue,
  setREGOSettings,
  setResidualRevenue,
  setResidualValue,
  setReturnsSettings,
  setRevenueGraphData,
  setRevenueSensitivity,
  setRevenueSetup,
  setSeniorDebt,
  setSharedYearRoundTariffData,
  setSiteSecurity,
  setSiteSecurityExpense,
  setSolarRevenue,
  setSolarRevenueSettings,
  setStartingAssumptionsForBatteries,
  setSubstationBuildDevAdditions,
  setSystemPeakTariffData,
  setTNUoSCharge,
  setTNUoSRevenues,
  settnuosTriadChargeSetting,
  setTnuosTriadCost,
  setTollingRevenue,
  setTollingSetting,
  setTotalAdminCosts,
  setTotalCoGS,
  setTotalDepreciation,
  setTotalRevenue,
  setTotalTNUoSTriads,
  setTransformersAdditions,
  setTransformersDepreciation,
  setTriadsIncome,
  setTriadsIncomeSetting,
  setUpsidePotentialRevenue,
  setValuation,
  setVariableProfileForAttributableCosts,
  setVat,
  setVintage,
  setVintagesDepreciation,
  setWaterRatesExpense,
  setWaterRatesSettings,
  setWholesaleDayAhead,
  setWholesaleDayIntraday,
  setWorkingCapital,
} from "../store/slices/resultSlice";
import {
  AFRY_PARAMS,
  CHOICE_DATA,
  INFLATION_LIST,
  LOCAL_CIRCUITS_ZONE,
  PARAM_TYPE,
  PAYMENT_PROFILE_LIST,
  REGION_LIST,
  REGION_PARAMS,
  STRATEGY_LIST,
  TNUOS_ZONE_LIST,
  VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
} from "./constant";

export const DATE_FORMAT = "YYYY-MM-DD";

const useParameter = () => {
  const dispatch = useAppDispatch();
  const { parameterInfos } = useAppSelector(selectParam);

  const {
    calculationPeriod,
    // revenue
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    totalRevenue,
    fixedPPARevenue,
    floatingPPARevenue,
    fixedPPAValue,
    floatingPPAValue,
    // revenue
    // cost of goods sold
    ppaFee,
    ppaFeesPercentage,
    auxilliaryLoss,
    optimiserCost,
    meteringCost,
    tnuosCharge,
    totalCoGS,
    // cost of goods sold
    // admin costs
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
    totalAdminCosts,
    // depreciation
    balanceOfPlantDepreciation,
    transformersDepreciation,
    evDepreciation,
    vintagesDepreciation,
    poolingSubstationDepreciation,
    capitalizedRentInConstruction,
    totalDepreciation,
    ebit,
    //
    landAdditions,
    poolingSubstationAdditions,
    substationBuildDevAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    //
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInPrepayments,
    movementInVATCreditor,
    capitalExpenditure,
    operatingCashFlowValue,
    corporationTaxValue,
    //
    vintage,
    model,
    operationYears,
    decommissioningStartDate,
    modelStartDate,
    lengthOfOperations,
    operationStartDate,
    lengthOfDecommissioning,
    decommissioningEndDate,
    revenueSetup,
    lengthOfConstruction,
    batteryDuration,
    assumptionsData,
    easement_costs,
    fullyConsentedDate,
    detailedRevenueData,
    initialCycleData,
    initialCapacity,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    batterySensitivity,
    water_rates,
    workingCapital,
    vat,
    landRent,
    landSize,
    operationEndDate,
    constructionStartDate,
    costOfAdditions,
    capexSensitivity,
    developmentStartDate,
    optimiser,
    meteringSettings,
    auxilliaryLossesSettings,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localCircuitsData,
    opexSensitivity,
    extended_warranty,
    intercompany_expense,
    siteSecurity,
    otherAdministrativeCosts,
    legalCosts,
    insurance,
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    communityBenefit,
    averageWholeSaleDayAheadPrice,
    businessRates,
    assetManagement,
    revenueSensitivity,
    operationAndManagementSettings,
    constraintFactor,
    extendedCaluculationPeriod,
    capexForecastScenarioData,
    decommissioningCost,
    communityBenefitToCapex,
    arrangementFees,
    residualValue,
    residualRevenue,
    tollingRevenue,
    tollingSetting,
    balancingReserve,
    gainOnDisposalSwitch,
    triadsIncomeSetting,
    triadsIncome,
    tnuosRevenues,
    totalTNUoSTriads,
    duosChargeSetting,
    duosCost,
    tnuosTriadChargeSetting,
    modoRegion,
    tnuosTriadCost,
    upsidePotentialRevenue,
    devexSetting,
    evSwitch,
    devexAdditions,
    afryRevenueData,
    bopCapexPercentage,
    localSubstationTariff,
    localSubstationSwitch,
    solarRevenueSettings,
    regoSettings,
    regoRevenue,
    solarRevenue,
    cfdRevenue,
    embeddedBenefits,
    cfdSettings,
    embeddedSettings,
    investorClosingDate,
    valuation,
    mCapexProvision,
    returnsSettings,
    evAddition,
  } = useAppSelector(selectResult);
  const getParameter = useCallback(
    (param_index: string) => {
      return parameterInfos?.find((p) => p?.param_index == param_index);
    },
    [parameterInfos]
  );
  useEffect(() => {
    dispatch(setModelStartDate("2023-01-01"));
  }, []);

  useEffect(() => {
    dispatch(
      setBatteryDuration(
        CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION]?.find(
          (d) =>
            d?.id ==
            getParameter("battery_assumption@starting_assumption")?.value
              ?.battery_duration?.data
        )?.label || (4 as number)
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setOperationStartDate(
        parameterInfos?.find((p) => p?.param_index == "basic_project_inputs")
          ?.value.grid_connection_date?.data || "2032-10-31"
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const valuationDateSelection = parameterInfos?.find(
      (p) => p?.param_index == "valuation_and_returns_inputs@valuation"
    )?.value.date_to_use_for_valuation_date?.data;
    const data = getParameter("basic_project_inputs")?.value;
    const investorClosingDate =
      data?.investor_closing_date?.data || "2024-06-01";
    const landSecuredDate = data?.land_secured_date?.data || "2024-05-05";
    const gridSecuredDate =
      data?.grid_secured_date_offer_accepted?.data || "2024-01-02";
    const closingOfDebtAgreementDate =
      data?.closing_of_dbt_agreement_date?.data || "2024-09-01";
    const fullyConsented =
      moment(data?.development_start_date?.data)
        .add(
          data
            ?.time_between_development_start_date_and_planning_permission_granted
            ?.data || 16,
          "month"
        )
        .format(DATE_FORMAT) || "2024-11-01";
    const rTB =
      moment(data?.development_start_date?.data)
        .add(
          1 *
            data
              ?.time_between_development_start_date_and_planning_permission_granted
              ?.data +
            1 * data?.time_between_planning_permission_granted_and_rtb?.data ||
            6,
          "month"
        )
        .format(DATE_FORMAT) || "2025-05-01";
    const cOD = data?.grid_connection_date?.data || "2028-01-01";

    const customizedValuationDate =
      parameterInfos?.find(
        (p) => p?.param_index == "valuation_and_returns_inputs@valuation"
      )?.value.valuation_date?.data || "2030-01-01";
    const valuationDate =
      valuationDateSelection == 1 || !valuationDateSelection
        ? fullyConsented
        : valuationDateSelection == 2
        ? rTB
        : valuationDateSelection == 3
        ? cOD
        : valuationDateSelection == 5
        ? investorClosingDate
        : customizedValuationDate;
    const valuationDateString =
      valuationDateSelection == 1 || !valuationDateSelection
        ? "Fully consented"
        : valuationDateSelection == 2
        ? "RtB"
        : valuationDateSelection == 3
        ? "COD"
        : valuationDateSelection == 5
        ? "Investor close date"
        : "Customized date";
    dispatch(
      setValuation({
        valuation_date: valuationDate || "2030-01-01",
        cost_of_equity:
          parameterInfos?.find(
            (p) => p?.param_index == "valuation_and_returns_inputs@valuation"
          )?.value.cost_of_equity?.data || 0,
        date_string: valuationDateString || "Date not selected",
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == "valuation_and_returns_inputs@returns"
    )?.value;
    dispatch(
      setReturnsSettings({
        carryFunActiveSwitch: r?.gp_lp_carry_functionality?.data || 1,
        numberOfStages: r?.number_of_stages?.data || 1,
        carryBasis: r?.carry_basis?.data || 1,
        stageOne: {
          hurdleRate: r?.hurdle_rate_1?.data || 0,
          gpPortion: r?.gp_portion_after_hurdle_rate_1?.data || 0,
          gpPortionForCarry: r?.gp_portion_for_carry_1?.data || 0,
        },
        stageTwo: {
          hurdleRate: r?.hurdle_rate_2?.data || 0,
          gpPortion: r?.gp_portion_after_hurdle_rate_2?.data || 0,
          gpPortionForCarry: r?.gp_portion_for_carry_2?.data || 0,
        },
        discountRate: r?.gp_discount_rate?.data || 0.07,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == "revenue@setup"
    )?.value;
    const switchValue = r?.ramp_rate_switch?.data || 0;
    const percentage =
      switchValue == 1 ? r?.ramp_rate_percentage?.data || 0 : 0;
    dispatch(
      setRampRateSettings({
        rampSwitch: switchValue,
        rampPercentage: percentage,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    dispatch(
      setLengthOfOperations(
        parameterInfos?.find((p) => p?.param_index == "basic_project_inputs")
          ?.value.length_of_operations?.data || 540
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setLengthOfDecommissioning(
        parameterInfos?.find((p) => p?.param_index == "basic_project_inputs")
          ?.value.length_of_decommissioning?.data || 12
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@working_capital")?.value;
    dispatch(
      setWorkingCapital({
        debtor_days: r?.debtor_days?.data || 90,
        creditor_days: r?.creditor_days?.data || 90,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@vat")?.value;
    dispatch(
      setVat({
        vatRate: r?.vat_rate?.data || 0,
        percentageOfRevenueSubjectToVAT:
          r?.percentage_of_revenue_subject_to_vat?.data || 0,
        percentageOfCostsAndCapexSubjectToVAT:
          r?.percentage_of_costs_and_capex_subject_to_vat?.data || 0,
        monthlyPaymentsOnAccount: r?.monthly_payments_on_account?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setDecommissioningStartDate(
        moment(operationStartDate)
          .add(lengthOfOperations * 1, "month")
          .format(DATE_FORMAT) || "2075-07-01"
      )
    );
  }, [lengthOfOperations, operationStartDate]);

  useEffect(() => {
    dispatch(
      setDecommissioningEndDate(
        moment(decommissioningStartDate)
          .add(1 * lengthOfDecommissioning, "month")
          .add(-1, "days")
          .format(DATE_FORMAT) || "2075-12-31"
      )
    );
  }, [decommissioningStartDate, lengthOfDecommissioning]);

  useEffect(() => {
    dispatch(
      setCalculationPeriod(
        Math.floor(
          Number.isInteger(
            moment(decommissioningEndDate).diff(
              moment(modelStartDate),
              "months"
            ) / 3
          )
            ? moment(decommissioningEndDate).diff(
                moment(modelStartDate),
                "months"
              ) / 3
            : moment(decommissioningEndDate).diff(
                moment(modelStartDate),
                "months"
              ) /
                3 +
                1
        )
      )
    );
  }, [modelStartDate, decommissioningEndDate]);
  useEffect(() => {
    dispatch(
      setExtendedCalculationPeriod(
        Math.floor(
          Number.isInteger(
            moment("2076-01-01").diff(moment(modelStartDate), "months") / 3
          )
            ? moment("2076-01-01").diff(moment(modelStartDate), "months") / 3
            : moment("2076-01-01").diff(moment(modelStartDate), "months") / 3 +
                1
        )
      )
    );
  }, [modelStartDate]);

  useEffect(() => {
    dispatch(setConstraintFactor(100));
  }, []);

  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == "revenue@setup"
    )?.value;
    dispatch(
      setRevenueSetup({
        forecastProviderChoice:
          CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER]?.find(
            (p) => p?.id == r?.forecast_provider?.data
          )?.label || "",
        inflation:
          CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION]?.find(
            (p) => p?.id == r?.revenue_inflation?.data
          )?.label || "",
        baseYear: r?.revenue_inflation_base_year?.data || (2023 as number),
      } as IRevenueSetup)
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setRegion(
        REGION_LIST[
          (getParameter("basic_project_inputs")?.value?.region
            ?.data as number) - 1
        ]
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == "revenue@triads"
    )?.value;
    const regionIndex =
      parameterInfos?.find((p) => p?.param_index == "revenue@setup")?.value
        ?.region_for_modo?.data - 1 || 0;
    dispatch(
      setTriadsIncomeSetting({
        switch: r?.triads_income_switch?.data || 0,
        value: isArray(r?.triads_embedded_export_tariffs?.data)
          ? r?.triads_embedded_export_tariffs?.data[regionIndex]
          : new Array(100).fill(0),
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == "revenue@setup"
    )?.value;
    dispatch(
      setModoRegion(
        CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION][r?.region_for_modo?.data - 1]
          ?.label || ""
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || "modo";
    dispatch(
      setAssumptionsData([
        {
          providerName: revenueSetup?.forecastProviderChoice,
          data: {
            efficiency: parseFloat(
              getParameter(`revenue@setup`)?.value[`efficiency_for_${model}`]
                ?.data || 0
            ),
            inflation:
              INFLATION_LIST[
                (getParameter(`revenue@setup`)?.value[`inflation_for_${model}`]
                  ?.data as number) - 1 || 0
              ],
            baseYear: 2023,
            region:
              REGION_LIST[
                (getParameter("revenue@setup")?.value[`region_for_${model}`]
                  ?.data as number) - 1
              ],
            tradingStrategy:
              STRATEGY_LIST[
                (getParameter(`revenue@setup`)?.value?.trading_strategy
                  ?.data as number) - 1 || 0
              ],
          },
        },
      ])
    );
  }, [parameterInfos, revenueSetup]);
  useEffect(() => {
    const solarValue = parameterInfos?.find(
      (p) => p?.param_index == "revenue@solar_tech"
    )?.value;
    dispatch(
      setSolarRevenueSettings({
        solarSwitch: solarValue?.solar_switch?.data || 0,
        solarTrackingSwitch: solarValue?.solar_tracking?.data || 0,
        solarRetentionRate: isArray(
          solarValue?.solar_panel_retention_rate?.data
        )
          ? solarValue?.solar_panel_retention_rate?.data[0]
          : new Array(60).fill(0),
        pvEnergy: solarValue?.pv_energy_production?.data || 0,
        trackingPercentage:
          solarValue?.extra_solar_tracking_percentage?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const rego = getParameter("revenue@rego")?.value;
    const switchValue = rego?.rego_switch?.data || 0;
    const price = rego?.rego_unit_price?.data || 0;
    dispatch(
      setREGOSettings({
        regoSwich: switchValue,
        regoPrice: price,
        inflationProfile: INFLATION_LIST[rego?.rego_inflation?.data - 1] || "",
        inflationBaseYear: rego?.rego_inflation_year?.data || 2023,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const cfd = getParameter("revenue@cfd")?.value;
    const switchValue = cfd?.cfd_switch?.data || 0;
    const price = cfd?.cfd_unit_price?.data || 0;
    dispatch(
      setCFDSettings({
        cfdSwich: switchValue,
        cfdPrice: price,
        inflationProfile: INFLATION_LIST[cfd?.cfd_inflation?.data - 1] || "",
        inflationBaseYear: cfd?.cfd_inflation_year?.data || 2023,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const embedded = getParameter("revenue@embedded_benefits")?.value;
    const switchValue = embedded?.embedded_benefits_switch?.data || 0;
    const price = embedded?.embedded_benefits_unit_price?.data || 0;
    dispatch(
      setEmbeddedSetting({
        embeddedSwich: switchValue,
        embeddedPrice: price,
        inflationProfile:
          INFLATION_LIST[embedded?.embedded_benefits_inflation?.data - 1] || "",
        inflationBaseYear:
          embedded?.embedded_benefits_inflation_year?.data || 2023,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase();
    const trading =
      STRATEGY_LIST[
        ((getParameter(`revenue@setup`)?.value?.trading_strategy
          ?.data as number) || 1) - 1
      ];
    const region_for_modo =
      CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION][
        (getParameter("revenue@setup")?.value?.region_for_modo
          ?.data as number) - 1 || 0
      ]?.label || "";
    if (model == "")
      dispatch(setDetailedRevenueData(new Array(calculationPeriod).fill(0)));
    else if (model == "modo")
      dispatch(
        setDetailedRevenueData([
          {
            forecastProvider: revenueSetup?.forecastProviderChoice,
            dataByBatteryDuration: [
              {
                duration: batteryDuration,
                dataByTradingStrategy: [
                  {
                    tradingStrategy: trading,
                    dataByRegion: [
                      {
                        region: region_for_modo,
                        dataByItems: (
                          getParameter(`revenue@forecast_provider_data`)?.value[
                            `modo_${batteryDuration}hour_${trading.toLowerCase()}_${region_for_modo
                              .toString()
                              .toLowerCase()}`
                          ]?.data || [new Array(300).fill(0)]
                        ).map((p: number[], index: number) => ({
                          item: REGION_PARAMS[index],
                          data: multiplyNumber(p, 1) || new Array(300).fill(0),
                        })),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ])
      );
    else if (model == "afry") {
      const region_for_afry =
        CHOICE_DATA[PARAM_TYPE.CHOICE.AFRY_REGION][
          (getParameter("revenue@setup")?.value?.region_for_afry
            ?.data as number) - 1 || 0
        ]?.label || "";
      const tableData = getParameter("revenue@forecast_provider_data")?.value[
        `${model}_${batteryDuration}hour_${region_for_afry
          .toString()
          .toLowerCase()}`
      ]?.data || [
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
        new Array(60).fill(0),
      ];
      const dataLen = tableData[0].length;
      dispatch(
        setAfryRevenueData(
          AFRY_PARAMS.map((d, index) => ({
            item: d,
            data:
              index == 0
                ? annualIndexToMonths(tableData[index])
                : annualIndexToMonths(tableData[index]).map(
                    (d, ind) =>
                      d *
                      (ind % 4 == 0
                        ? 0.287859
                        : ind % 4 == 1
                        ? 0.22181995
                        : ind % 4 == 2
                        ? 0.22579408
                        : 0.26452698)
                  ),
          }))
        )
      );
    }
  }, [revenueSetup, batteryDuration, calculationPeriod, parameterInfos]);

  useEffect(() => {
    dispatch(
      setInitialCycleData(
        getParameter("battery_assumption@starting_assumption")?.value[
          "degradation_forecast_retention_rate_data"
        ]?.data?.map((p: number[], index: number) => ({
          averageCyclesPerDay: index == 0 ? 2.0 : index == 1 ? 1.5 : 1.0,
          retentionRate: p || new Array(300).fill(0),
        }))
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setInitialCapacity(
        getParameter("basic_project_inputs")?.value["grid_connection_capacity"]
          ?.data as number
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    dispatch(
      setGridConnectionDate(
        getParameter("basic_project_inputs")?.value["grid_connection_date"]
          ?.data || ("-" as string)
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("administrative_costs@intercompany_expense")?.value;
    dispatch(
      setIntercompanySettings({
        inflation_profile_intercompany_expense:
          INFLATION_LIST[r?.inflation_profile?.data - 1] || "",
        inflation_profile_base_year: r?.inflation_base_year?.data || 2023,
        annual_cost: r?.annual_cost?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("administrative_costs@water_rates")?.value;
    dispatch(
      setWaterRatesSettings({
        inflation_profile_water_rates:
          INFLATION_LIST[r?.inflation_profile?.data - 1] || "",
        inflation_profile_base_year: r?.inflation_base_year?.data || 2023,
        annual_fees_per_mw: r?.annual_fees_per_mw?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("administrative_costs@easement_costs")?.value;
    dispatch(
      setEasementSetting({
        inflation_profile_easement_costs:
          INFLATION_LIST[r?.inflation_profile?.data - 1] || "",
        inflation_profile_base_year: r?.inflation_base_year?.data || 2023,
        annual_cost: r?.annual_cost?.data || 0,
        cable_length: r?.cable_length?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("battery_assumption@starting_assumption")?.value;

    const trading =
      STRATEGY_LIST[
        ((getParameter(`revenue@setup`)?.value?.trading_strategy
          ?.data as number) || 1) - 1
      ];
    const region_for_modo =
      CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION][
        (getParameter("revenue@setup")?.value?.region_for_modo
          ?.data as number) - 1 || 0
      ]?.label || "";
    const rr = getParameter(`revenue@forecast_provider_data`)?.value[
      `modo_${batteryDuration}hour_${trading.toLowerCase()}_${region_for_modo
        .toString()
        .toLowerCase()}`
    ]?.data;

    const afryCycleData = afryRevenueData?.find(
      (d) => d?.item == "Avg. Cycles per day"
    )?.data;

    const cycleData =
      revenueSetup?.forecastProviderChoice == "Modo"
        ? rr
          ? rr[0]
          : new Array(extendedCaluculationPeriod).fill(0)
        : afryCycleData;
    dispatch(
      setStartingAssumptionsForBatteries({
        degradationForecastAverageCyclesPerDay: Math.min(
          2,
          Math.max(1, roundNumber(getAverageValue(cycleData) * 8, 0) / 8)
        ),
        batteryAvailability: r?.battery_availablity?.data || 0,
        batteryDuration: batteryDuration,
      })
    );
  }, [
    parameterInfos,
    batteryDuration,
    extendedCaluculationPeriod,
    revenueSetup,
    afryRevenueData,
  ]);
  useEffect(() => {
    const r = getParameter("battery_assumption@starting_assumption")?.value;

    const trading =
      STRATEGY_LIST[
        ((getParameter(`revenue@setup`)?.value?.trading_strategy
          ?.data as number) || 1) - 1
      ];
    const region_for_modo =
      CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION][
        (getParameter("revenue@setup")?.value?.region_for_modo
          ?.data as number) - 1 || 0
      ]?.label || "";
    const rr = getParameter(`revenue@forecast_provider_data`)?.value[
      `modo_${batteryDuration}hour_${trading.toLowerCase()}_${region_for_modo
        .toString()
        .toLowerCase()}`
    ]?.data;

    const afryCycleData = afryRevenueData?.find(
      (d) => d?.item == "Avg. Cycles per day"
    )?.data;

    const cycleData =
      revenueSetup?.forecastProviderChoice == "Modo"
        ? rr
          ? rr[0]
          : new Array(extendedCaluculationPeriod).fill(0)
        : afryCycleData;
    dispatch(setCyclesData(cycleData));
  }, [
    parameterInfos,
    batteryDuration,
    extendedCaluculationPeriod,
    revenueSetup,
    afryRevenueData,
  ]);
  useEffect(() => {
    const r = getParameter("battery_assumption@disposal")?.value;
    dispatch(
      setBatteryDisposals({
        batteryDisposalSwitch: r?.disposal_switch?.data || 0,
        disposedRetentionRate: r?.diposal_percentage?.data || 0,
        recyclePricePercent: r?.recycle_percentage?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("battery_assumption@efficiency")?.value;
    dispatch(
      setBatteryEfficiency({
        efficiencySwitch: r?.forecast_switch?.data || 0,
        fixedEfficiency: r?.fixed_battery_efficiency?.data || 0,
        forecastEfficiency: isArray(r?.forecast_battery_efficiency?.data)
          ? r?.forecast_battery_efficiency?.data[0]
          : new Array(53).fill(0),
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("battery_assumption@augmentation")?.value;
    dispatch(
      setBatteryAugmentation({
        batteryAugmentationSwitch:
          batteryDuration == 2
            ? r?.augmentation_switch_2?.data
            : batteryDuration == 4
            ? r?.augmentation_switch_4?.data
            : batteryDuration == 8
            ? r?.augmentation_switch_8?.data
            : 0,
        batteryAugmentationStopYear:
          r
            ?.number_of_months_before_end_of_operations_to_stop_augmentation_and_disposals
            ?.data / 12,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;
    dispatch(
      setCapexForecastModel(
        CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST]?.find(
          (f) => f?.id == r?.capex_forecast_scenario_choice?.data
        )?.label as string
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;
    const supplierChoice = r?.supplier_choice?.data;
    dispatch(
      setBatteryCubes({
        baseYear:
          supplierChoice == 1
            ? r?.byd_latest_year?.data || 2024
            : supplierChoice == 2
            ? r?.byd_july_inputs_kka_year?.data || 2024
            : 2024,
        data: [
          {
            duration: batteryDuration as number,
            value:
              supplierChoice == 1
                ? r?.byd_latest?.data || 0
                : supplierChoice == 2
                ? r?.byd_july_inputs_kka?.data || 0
                : 0,
            // value:
            // batteryDuration == 8
            //   ? r?.excubes_price_for_8?.data
            //   : batteryDuration == 4
            //   ? r?.excubes_price_for_4?.data
            //   : batteryDuration == 2
            //   ? r?.excubes_price_for_2?.data
            //   : 0,
          },
        ],
        value:
          supplierChoice == 0 || supplierChoice == undefined
            ? 0
            : supplierChoice == 1
            ? r?.byd_latest?.data || 0
            : r?.byd_july_inputs_kka?.data || 0,
      } as IBatteryCubes)
    );
  }, [parameterInfos, batteryDuration]);

  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;
    const supplierChoice = r?.supplier_choice?.data;
    dispatch(
      setBatteryExCubes({
        // baseYear:
        //   (r?.capex_forecast_base_year_excubes as number) ||
        //   DEFAULT_BATTERY_EXCUBES.baseYear,
        baseYear:
          supplierChoice == 1
            ? r?.byd_latest_year?.data || 2024
            : supplierChoice == 2
            ? r?.byd_july_inputs_kka_year?.data || 2024
            : 2024,
        data: [
          {
            duration: batteryDuration,
            value:
              supplierChoice == 1
                ? r?.byd_latest_ex?.data || 0
                : supplierChoice == 2
                ? r?.byd_july_inputs_kka_ex?.data || 0
                : 0,
          },
        ],
        value:
          supplierChoice == 0 || supplierChoice == undefined
            ? 0
            : supplierChoice == 1
            ? r?.byd_latest_ex?.data || 0
            : r?.byd_july_inputs_kka_ex?.data || 0,
      })
    );
  }, [parameterInfos, batteryDuration]);

  useEffect(() => {
    // const model =
    // 	revenueSetup?.forecastProviderChoice?.toLowerCase() || "modo";
    const r = getParameter("other_inputs@inflation_rate_data")?.value
      ?.inflation_index_table?.data || [new Array(300).fill(1)];
    // const inflation_profile = getParameter(
    // 	`revenue@forecast_provider @${ model }`
    // )?.value?.model_inflation_profile as number;
    dispatch(
      setInflationInputs(
        INFLATION_LIST?.map((i, index) => ({
          profile: i,
          rate: r[index] || new Array(300).fill(1),
        }))
      )
    );
  }, [parameterInfos, revenueSetup]);

  useEffect(() => {
    const r = getParameter("capex@capex_payment_profile_data")?.value
      ?.capex_payment_profiles?.data;
    if (Array.isArray(r))
      dispatch(
        setCapexPaymentMilestones(
          PAYMENT_PROFILE_LIST.map((rr, index) => ({
            profileName: rr,
            timing: r[index] || new Array(300).fill(0),
          }))
        )
      );
  }, [parameterInfos]);

  useEffect(() => {
    // const model =
    // 	revenueSetup?.forecastProviderChoice?.toLowerCase() || "modo";
    const batteries =
      (getParameter("capex@batteries")?.value?.payment_profile?.data ||
        (1 as number)) - 1;
    // const land =
    // 	(getParameter("capex@excluding_batteries@land")?.value
    // 		?.payment_profile as number | 1) - 1;
    const pooling_substation =
      (getParameter("capex@excluding_batteries@pooling_substation")?.value
        ?.payment_profile?.data || (1 as number)) - 1;
    const transformers =
      (getParameter("capex@excluding_batteries@transformers")?.value
        ?.payment_profile?.data || (1 as number)) - 1;
    const balance_of_plant =
      (getParameter("capex@excluding_batteries@balance_of_plant")?.value
        ?.payment_profile?.data || (1 as number)) - 1;
    const enterprise_value =
      (getParameter("capex@excluding_batteries@enterprise_value")?.value
        ?.payment_profile?.data || (1 as number)) - 1;
    dispatch(
      setCapexPaymentsProfile([
        {
          capexObject: "Batteries",
          paymentProfile: PAYMENT_PROFILE_LIST[batteries] || "BESS profile",
        },
        // {
        // 	capexObject: "Land",
        // 	paymentProfile: PAYMENT_PROFILE_LIST[land] || "",
        // },
        {
          capexObject: "Pooling substation",
          paymentProfile:
            PAYMENT_PROFILE_LIST[pooling_substation] || "BESS profile",
        },
        {
          capexObject: "Transformers",
          paymentProfile: PAYMENT_PROFILE_LIST[transformers] || "Tx profile",
        },
        {
          capexObject: "Balance of Plant",
          paymentProfile:
            PAYMENT_PROFILE_LIST[balance_of_plant] ||
            "Balance of Plant profile",
        },
        {
          capexObject: "Enterprise value - Development fee",
          paymentProfile: PAYMENT_PROFILE_LIST[enterprise_value],
        },
        {
          capexObject: "Substation build development and capex premium",
          paymentProfile: "Balance of Plant profile",
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const batteries = getParameter("capex@batteries")?.value
      ?.useful_economic_life?.data as number;
    const land = getParameter("capex@excluding_batteries@land")?.value
      ?.useful_economic_life?.data as number;
    const pooling_substation = getParameter(
      "capex@excluding_batteries@pooling_substation"
    )?.value?.useful_economic_life?.data as number;
    const transformers = getParameter("capex@excluding_batteries@transformers")
      ?.value?.useful_economic_life?.data as number;
    const balance_of_plant = getParameter(
      "capex@excluding_batteries@balance_of_plant"
    )?.value?.useful_economic_life?.data as number;
    const enterprise_value = getParameter(
      "capex@excluding_batteries@enterprise_value"
    )?.value?.useful_economic_life?.data as number;
    dispatch(
      setCapexUEL([
        {
          capexObject: "Batteries",
          usefulEconomicLife: batteries || 15,
        },
        {
          capexObject: "Pooling substation",
          usefulEconomicLife: pooling_substation || operationYears,
        },
        {
          capexObject: "Transformers",
          usefulEconomicLife: transformers || operationYears,
        },
        {
          capexObject: "Balance of Plant",
          usefulEconomicLife: balance_of_plant || operationYears,
        },
        {
          capexObject: "Enterprise value - Development fee",
          usefulEconomicLife: enterprise_value || operationYears,
        },
        {
          capexObject: "Capitalised rent in construction",
          usefulEconomicLife: land || operationYears,
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;
    const forecastSelection = r?.forecast_selection?.data;

    // const inflation_profile_index =
    //   (r?.capex_forecast_inflation_profile as number) || 1;
    // dispatch(
    //   setBessCapexForecast({
    //     inflationProfile: INFLATION_LIST[inflation_profile_index - 1],
    //     baseYear:
    //       r?.capex_forecast_inflation_base_year ||
    //       DEFAULT_BESS_CAPEX_FORECAST.baseYear,
    //   })
    // );
    const inflationProfile =
      forecastSelection == 0
        ? r?.relative_inflation_profile?.data
        : forecastSelection == 1
        ? r?.absolute_inflation_profile?.data
        : 1;
    const baseYear =
      forecastSelection == 0
        ? r?.relative_inflation_year?.data
        : forecastSelection == 1
        ? r?.absolute_inflation_year?.data
        : 2024;
    dispatch(
      setBessCapexForecast({
        inflationProfile: INFLATION_LIST[inflationProfile - 1],
        baseYear: baseYear,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;

    // const inflation_profile_index =
    //   (r?.capex_forecast_inflation_profile as number) || 1;
    // dispatch(
    //   setBessCapexForecast({
    //     inflationProfile: INFLATION_LIST[inflation_profile_index - 1],
    //     baseYear:
    //       r?.capex_forecast_inflation_base_year ||
    //       DEFAULT_BESS_CAPEX_FORECAST.baseYear,
    //   })
    // );
    dispatch(
      setBoPCapexPercentage(r?.uplift_on_top_percentage?.data / 100 || 0)
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("capex@batteries")?.value;
    dispatch(
      setBatterySensitivity(
        r?.battery_sensitivity?.data == 0
          ? 0
          : r?.battery_sensitivity_magnitude?.data / 100 || 0
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const admin_cost = getParameter("administrative_costs@land_rent")?.value;
    const anual_land_rent = getParameter(
      "administrative_costs@land_rent@annual_land_rent"
    )?.value;
    const option_one = getParameter(
      "administrative_costs@land_rent@option_charges_1"
    )?.value;
    const option_two = getParameter(
      "administrative_costs@land_rent@option_charges_2"
    )?.value;
    const substation_rent = getParameter(
      "administrative_costs@land_rent@substation_rent_at_end_of_project"
    )?.value;
    const one_time_payment = getParameter(
      "administrative_costs@land_rent@one_time_payment"
    )?.value;
    dispatch(
      setLandRent({
        switch: admin_cost?.land_rent_switch?.data || 0,
        sensitivity: admin_cost?.land_rent_sensitivity?.data || 0,
        sensitivity_magnitude:
          admin_cost?.land_rent_sensitivity_magnitude?.data || 0,
        annualLandRent: {
          paymentTerms:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS][
              anual_land_rent?.payment_terms?.data
            ]?.label || "",
          landRentBasis:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_BASIS][
              anual_land_rent?.land_rent_basis?.data - 1
            ]?.label || "",
          annualLandRentPerAcreCharge:
            anual_land_rent?.annual_land_rent_per_acre_charge?.data || 0,
          annualLandRentPerMWCharge:
            anual_land_rent?.annual_land_rent_per_mw_charge?.data || 0,
          portionPayableDuringConstruction:
            anual_land_rent?.portion_payable_during_construction?.data || 0,
          portionPayableDuringOperations:
            anual_land_rent?.portion_payable_during_operations?.data || 0,
          portionPayableDuringDecommissioning:
            anual_land_rent?.portion_payable_during_decommissioning?.data || 0,
        },
        optionChargeOne: {
          landRentBasis:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_BASIS][
              option_one?.land_rent_basis_for_option_one?.data - 1
            ]?.label || "",
          annualLandRentPerAcreCharge:
            option_one?.annual_land_option_one_rent_per_acre_charge?.data || 0,
          annualLandRentPerMWCharge:
            option_one?.annual_land_option_one_rent_per_mw_charge?.data || 0,
          paymentTerms:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS][
              option_one?.payment_terms_for_option_one?.data
            ]?.label || "",
          startDate: option_one?.option_one_start_date?.data || "2024-10-01",
          endDate:
            moment(constructionStartDate).add(-1, "days").format(DATE_FORMAT) ||
            option_one?.option_one_end_date?.data ||
            "2028-06-30",
        },
        optionChargeTwo: {
          landRentBasis:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_BASIS][
              option_two?.land_rent_basis_for_option_two?.data - 1
            ]?.label || "",
          annualLandRentPerAcreCharge:
            option_two?.annual_land_option_two_rent_per_acre_charge?.data || 0,
          paymentTerms:
            CHOICE_DATA[PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS][
              option_two?.payment_terms_for_option_two?.data
            ]?.label || "",
          annualLandRentPerMWCharge:
            option_two?.annual_land_option_two_rent_per_mw_charge?.data || 0,
          startDate: option_two?.option_two_start_date?.data || "2024-10-01",
          endDate: option_two?.option_two_end_date?.data || "2028-06-30",
          landSizeForOptionTwo: option_two?.land_size_for_option_two?.data || 0,
          capacityForOptionTwo: option_two?.capacity_for_option_two?.data || 0,
        },
        substationRent: {
          substationRentAtEndOfLifeSwitch:
            substation_rent?.substation_rent_at_end_of_life_switch?.data,
          substationRentAtEndOfLifeSwitchAtEndOfLifeSwitchToUseInModel:
            substation_rent
              ?.substation_rent_at_end_of_life_switch_to_use_in_model?.data,
          discountRate: substation_rent?.discount_rate?.data,
          timeRemainingOnLease:
            substation_rent?.time_remaining_on_release_at_end_of_decommissioning
              ?.data,
          acresForSubstation: substation_rent?.acres_for_substation?.data,
          longTermCPIAssumption:
            substation_rent?.long_term_cpi_assumption?.data,
        },
        oneTimePayment: {
          paymentAmount: one_time_payment?.payment_amount?.data || 0,
          paymentDate: one_time_payment?.payment_date?.data || "2024-08-08",
        },
        inflation: {
          profile:
            INFLATION_LIST[
              ((admin_cost?.land_rent_inflation_profile?.data as number) || 1) -
                1
            ],
          baseYear: admin_cost?.land_rent_inflation_base_year?.data,
        },
      })
    );
  }, [parameterInfos, constructionStartDate]);

  useEffect(() => {
    dispatch(
      setAssetName(
        getParameter("basic_project_inputs")?.value?.asset_name?.data || "-"
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    dispatch(
      setLandSize(getParameter("basic_project_inputs")?.value?.land_size?.data)
    );
  }, [parameterInfos]);

  useEffect(() => {
    const dev_start_date = getParameter("basic_project_inputs")?.value
      ?.development_start_date?.data;
    dispatch(setDevelopmentStartDate(dev_start_date));
  }, [parameterInfos]);

  useEffect(() => {
    const dev_start_date = getParameter("basic_project_inputs")?.value
      ?.development_start_date?.data;
    const time_between_development_start_date_and_planning_permission_granted =
      getParameter("basic_project_inputs")?.value
        ?.time_between_development_start_date_and_planning_permission_granted
        ?.data;

    dispatch(
      setFullyConsentedDate(
        moment(dev_start_date)
          .add(
            time_between_development_start_date_and_planning_permission_granted,
            "month"
          )
          .format("DD-MMM-YYYY")
      )
    );
  }, [parameterInfos]);

  // const landRentSensitivity = useMemo(() => {
  //   return 0;
  // }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setOperationEndDate(
        moment(operationStartDate)
          .add(lengthOfOperations, "month")
          .add(-1, "day")
          .format(DATE_FORMAT)
      )
    );
  }, [operationStartDate, lengthOfOperations]);

  useEffect(() => {
    dispatch(
      setLengthOfConstruction(
        getParameter("basic_project_inputs")?.value?.length_of_construction
          ?.data
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setConstructionStartDate(
        moment(operationStartDate)
          .add(-lengthOfConstruction, "month")
          .format(DATE_FORMAT)
      )
    );
  }, [operationStartDate, lengthOfConstruction]);

  useEffect(() => {
    // const grid_connection_capacity =
    // 	getParameter("basic_project_inputs")?.value
    // 		?.grid_connection_capacity || 1000;
    const land = getParameter("capex@excluding_batteries@land")?.value;
    const pooling_substation = getParameter(
      "capex@excluding_batteries@pooling_substation"
    )?.value;
    const transformers = getParameter(
      "capex@excluding_batteries@transformers"
    )?.value;
    const substationBuildDev = getParameter(
      "capex@excluding_batteries@transformers"
    )?.value;
    const enterprise =
      getParameter("capex@excluding_batteries@enterprise_value")?.value || {};
    let vv = 0;
    for (let i = 1; i <= batteryDuration; i++) {
      vv += parseFloat(enterprise[`development_fee_hour_${i}`]?.data) || 0;
    }
    const bop = getParameter(
      "capex@excluding_batteries@balance_of_plant"
    )?.value;
    dispatch(
      setCostOfAdditions({
        land: land?.land_cost?.data / 1000 || 0,
        poolingSubstation:
          pooling_substation?.pooling_substation_cost?.data || 0,
        transformers: transformers?.transformers_cost?.data || 0,
        balanceOfPlant: [
          {
            duration: 8,
            value:
              (bop?.aggregated_cost_for_8?.data || 0) * 1 +
              (bop?.aggregated_cost_for_infra_8?.data || 0) * 1 +
              (bop?.grid_connection_8?.data || 0) * 1 +
              (bop?.internal_and_control_connections_8?.data?.data || 0) * 1 +
              (bop?.power_electronics_8?.data || 0) * 1 +
              (bop?.writing_and_conduits_8?.data || 0) * 1 +
              (bop?.dc_cabling_8?.data || 0) * 1 +
              (bop?.inverter_8?.data || 0) * 1 +
              (bop?.switch_gear_8?.data || 0) * 1 +
              (bop?.energy_management_system_8?.data || 0) * 1 +
              (bop?.monitors_8?.data || 0) * 1 +
              (bop?.aggregated_cost_for_generation_8?.data || 0) * 1 +
              (bop?.plant_construction_8?.data || 0) * 1 +
              (bop?.power_plant_equipment_8?.data || 0) * 1 +
              (bop?.thermal_8?.data || 0) * 1 +
              (bop?.fire_8?.data || 0) * 1 +
              (bop?.battery_racking_8?.data || 0) * 1 +
              (bop?.foundation_8?.data || 0) * 1 +
              (bop?.inverter_housing_8?.data || 0) * 1 +
              (bop?.aggregated_cost_for_installation_8?.data || 0) * 1 +
              (bop?.enabling_works_8?.data || 0) * 1 +
              (bop?.distributable_labor_8?.data || 0) * 1 +
              (bop?.engineering_8?.data || 0) * 1 +
              (bop?.start_up_8?.data || 0) * 1 +
              (bop?.legal_costs_8?.data || 0) * 1 +
              (bop?.construction_insurance_8?.data || 0) * 1 +
              (bop?.consulting_and_advisory_8?.data || 0) * 1 +
              (bop?.meters_8?.data || 0) * 1 +
              (bop?.power_during_cons_8?.data || 0) * 1 +
              (bop?.software_8?.data || 0) * 1 +
              (bop?.water_8?.data || 0) * 1 +
              (bop?.contingency_8?.data || 0) * 1,
          },
          {
            duration: 2,
            value:
              (bop?.aggregated_cost_for_2?.data || 0) * 1 +
              (bop?.aggregated_cost_for_infra_2?.data || 0) * 1 +
              (bop?.grid_connection_2?.data || 0) * 1 +
              (bop?.internal_and_control_connections_2?.data || 0) * 1 +
              (bop?.power_electronics_2?.data || 0) * 1 +
              (bop?.writing_and_conduits_2?.data || 0) * 1 +
              (bop?.dc_cabling_2?.data || 0) * 1 +
              (bop?.inverter_2?.data || 0) * 1 +
              (bop?.switch_gear_2?.data || 0) * 1 +
              (bop?.energy_management_system_2?.data || 0) * 1 +
              (bop?.monitors_2?.data || 0) * 1 +
              (bop?.aggregated_cost_for_generation_2?.data || 0) * 1 +
              (bop?.plant_construction_2?.data || 0) * 1 +
              (bop?.power_plant_equipment_2?.data || 0) * 1 +
              (bop?.thermal_2?.data || 0) * 1 +
              (bop?.fire_2?.data || 0) * 1 +
              (bop?.battery_racking_2?.data || 0) * 1 +
              (bop?.foundation_2?.data || 0) * 1 +
              (bop?.inverter_housing_2?.data || 0) * 1 +
              (bop?.aggregated_cost_for_installation_2?.data || 0) * 1 +
              (bop?.enabling_works_2?.data || 0) * 1 +
              (bop?.distributable_labor_2?.data || 0) * 1 +
              (bop?.engineering_2?.data || 0) * 1 +
              (bop?.start_up_2?.data || 0) * 1 +
              (bop?.legal_costs_2?.data || 0) * 1 +
              (bop?.construction_insurance_2?.data || 0) * 1 +
              (bop?.consulting_and_advisory_2?.data || 0) * 1 +
              (bop?.meters_2?.data || 0) * 1 +
              (bop?.power_during_cons_2?.data || 0) * 1 +
              (bop?.software_2?.data || 0) * 1 +
              (bop?.water_2?.data || 0) * 1 +
              (bop?.contingency_2?.data || 0) * 1,
          },
          {
            duration: 4,
            value:
              (bop?.aggregated_cost_for_4?.data || 0) * 1 +
              (bop?.aggregated_cost_for_infra_4?.data || 0) * 1 +
              (bop?.grid_connection_4?.data || 0) * 1 +
              (bop?.internal_and_control_connections_4?.data || 0) * 1 +
              (bop?.power_electronics_4?.data || 0) * 1 +
              (bop?.writing_and_conduits_4?.data || 0) * 1 +
              (bop?.dc_cabling_4?.data || 0) * 1 +
              (bop?.inverter_4?.data || 0) * 1 +
              (bop?.switch_gear_4?.data || 0) * 1 +
              (bop?.energy_management_system_4?.data || 0) * 1 +
              (bop?.monitors_4?.data || 0) * 1 +
              (bop?.aggregated_cost_for_generation_4?.data || 0) * 1 +
              (bop?.plant_construction_4?.data || 0) * 1 +
              (bop?.power_plant_equipment_4?.data || 0) * 1 +
              (bop?.thermal_4?.data || 0) * 1 +
              (bop?.fire_4?.data || 0) * 1 +
              (bop?.battery_racking_4?.data || 0) * 1 +
              (bop?.foundation_4?.data || 0) * 1 +
              (bop?.inverter_housing_4?.data || 0) * 1 +
              (bop?.aggregated_cost_for_installation_4?.data || 0) * 1 +
              (bop?.enabling_works_4?.data || 0) * 1 +
              (bop?.distributable_labor_4?.data || 0) * 1 +
              (bop?.engineering_4?.data || 0) * 1 +
              (bop?.start_up_4?.data || 0) * 1 +
              (bop?.legal_costs_4?.data || 0) * 1 +
              (bop?.construction_insurance_4?.data || 0) * 1 +
              (bop?.consulting_and_advisory_4?.data || 0) * 1 +
              (bop?.meters_4?.data || 0) * 1 +
              (bop?.power_during_cons_4?.data || 0) * 1 +
              (bop?.software_4?.data || 0) * 1 +
              (bop?.water_4?.data || 0) * 1 +
              (bop?.contingency_4?.data || 0) * 1,
          },
        ],
        enterPriseValue: vv,
        substaionBuildDev:
          substationBuildDev?.substation_build_dev_cost?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("cost_of_sales@auxilliary_losses")?.value;
    dispatch(
      setAuxilliaryLossesSettings({
        inflationProfile:
          INFLATION_LIST[
            (r?.auxiliary_losses_inflation_profile?.data || 1) - 1
          ],
        baseYear: r?.auxiliary_losses_inflation_base_year?.data,
        lossFactor: [
          {
            duration: 2,
            auxiliaryLossValue: r?.auxiliary_losses_factor_2?.data as number,
          },
          {
            duration: 4,
            auxiliaryLossValue: r?.auxiliary_losses_factor_4?.data as number,
          },
          {
            duration: 8,
            auxiliaryLossValue: r?.auxiliary_losses_factor_8?.data as number,
          },
        ],
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`revenue@forecast_provider_data`)?.value;

    // Safely check if r and r.average_wholesale_day_ahead_price are defined

    const averagePrice =
      revenueSetup?.forecastProviderChoice == "Modo"
        ? r?.average_wholesale_day_ahead_price_for_modo?.data?.[0] ||
          new Array(300).fill(0)
        : revenueSetup?.forecastProviderChoice == "Afry"
        ? annualIndexToMonths(
            r?.average_wholesale_day_ahead_price_for_afry?.data?.[0] ||
              new Array(60).fill(0)
          )
        : new Array(300).fill(0);

    dispatch(setAverageWholeSaleDayAheadPrice(averagePrice));
  }, [parameterInfos, revenueSetup]);
  useEffect(() => {
    const r = getParameter(`revenue@residual_value`)?.value;
    // Safely check if r and r.average_wholesale_day_ahead_price are defined
    const value = r?.residual_value?.data || 0;
    dispatch(setResidualValue(value));
  }, [parameterInfos, revenueSetup]);

  useEffect(() => {
    const fixedData = getParameter(`revenue@ppa@fixed_ppa`)?.value;
    dispatch(
      setFixedPPARevenue({
        data: [
          {
            contract: "firstFixed",
            data: {
              startDate: fixedData?.ppa_start_date_1?.data,
              endDate: fixedData?.ppa_end_date_1?.data,
              price: fixedData?.ppa_price_period_1?.data,
              inflationProfile:
                fixedData?.inflation_profile_1?.data || "No inflation",
              baseYear: fixedData?.inflation_base_year_1?.data,
            },
          },
          {
            contract: "secondFixed",
            data: {
              startDate: fixedData?.ppa_start_date_2?.data,
              endDate: fixedData?.ppa_end_date_2?.data,
              price: fixedData?.ppa_price_period_2?.data,
              inflationProfile:
                fixedData?.inflation_profile_2?.data || "No inflation",
              baseYear: fixedData?.inflation_base_year_2?.data,
            },
          },
        ],
        assignedPercentage: fixedData?.fixed_ppa_percentage?.data,
        switch: fixedData?.fixed_ppa_switch?.data,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const floatingPPAData = getParameter(`revenue@ppa @floating_ppa`)?.value;
    dispatch(
      setFloatingPPARevenue({
        data: [
          {
            contract: "firstFloating",
            data: {
              startDate: floatingPPAData?.ppa_start_date_1?.data,
              endDate: floatingPPAData?.ppa_end_date_1?.data,
            },
          },
          {
            contract: "secondFloating",
            data: {
              startDate: floatingPPAData?.ppa_start_date_2?.data,
              endDate: floatingPPAData?.ppa_end_date_2?.data,
            },
          },
        ],
        discountToWholesalePriceForMarginPercentage:
          floatingPPAData?.discount_to_wholesale_price_for_margin?.data || 10,
        assignedPercentage: floatingPPAData?.flaoting_ppa_percentage?.data || 0,
        switch: floatingPPAData?.floating_ppa_switch?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const percentage = getParameter(`cost_of_sales@ppa_fees`)?.value;
    dispatch(
      setPPAFeesPercentage(
        percentage?.ppa_fee_as_a_percent_of_revenue?.data || 0
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@asset_management`)?.value;
    dispatch(
      setAssetManagement({
        firstPeriod: {
          inflationProfile:
            INFLATION_LIST[r?.inflation_profile_1?.data - 1 || 0] || "",
          baseYear: r?.inflation_base_year_1?.data || 2024,
          startDate:
            operationStartDate || r?.start_date_period_1?.data || "2028-01-01",
          endDate:
            moment(decommissioningStartDate)
              .add(-1, "days")
              .format(DATE_FORMAT) ||
            r?.end_date_period_1?.data ||
            "2067-12-31",
          feesAsAPercentOfRevenue: {
            realTimeManagement:
              r?.real_time_management_percentage_period_1?.data || 0,
            maintenance: r?.maintenance_percentage_period_1?.data || 0,
          },
          feesPerMW: {
            realTimeManagement: r?.real_time_management_period_1?.data || 0,
            maintenance: r?.maintenance_period_1?.data || 0,
          },
        },
        secondPeriod: {
          inflationProfile:
            INFLATION_LIST[r?.inflation_profile_2?.data - 1 || 0] || "",
          baseYear: r?.inflation_base_year_2?.data || 2023,
          startDate: r?.start_date_period_2?.data,
          endDate: r?.end_date_period_2?.data,
          feesAsAPercentOfRevenue: {
            realTimeManagement:
              r?.real_time_management_percentage_period_2?.data || 0,
            maintenance: r?.maintenance_percentage_period_2?.data || 0,
          },
          feesPerMW: {
            realTimeManagement: r?.real_time_management_period_2?.data || 0,
            maintenance: r?.maintenance_period_2?.data || 0,
          },
        },
      })
    );
  }, [parameterInfos, decommissioningStartDate]);

  useEffect(() => {
    const fixed = getParameter(`administrative_costs@o_and_m@fixed`)?.value;
    const variable = getParameter(
      `administrative_costs@o_and_m@variable`
    )?.value;

    dispatch(
      setOperationAndManagementSettings([
        {
          type: "Fixed",
          inflationProfile:
            INFLATION_LIST[fixed?.inflation_profile?.data - 1 || 0],
          baseYear: fixed?.inflation_base_year?.data || 2024,
          cost: [
            { duration: 2, value: fixed?.annual_fixed_o_and_m_2?.data || 0 },
            { duration: 4, value: fixed?.annual_fixed_o_and_m_4?.data || 0 },
            { duration: 8, value: fixed?.annual_fixed_o_and_m_8?.data || 0 },
          ],
        },
        {
          type: "Variable",
          inflationProfile:
            INFLATION_LIST[variable?.inflation_profile?.data - 1 || 0],
          baseYear: variable?.inflation_base_year?.data || 2024,
          cost: [
            { duration: 2, value: variable?.variable_o_and_m_2?.data || 0 },
            { duration: 4, value: variable?.variable_o_and_m_4?.data || 0 },
            { duration: 8, value: variable?.variable_o_and_m_8?.data || 0 },
          ],
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@insurance`)?.value;
    dispatch(
      setInsurance({
        inflation: {
          profile: INFLATION_LIST[r?.inflation_profile?.data - 1 || 0],
          baseYear: r?.inflation_base_year_operations?.data,
        },
        annualFees: r?.annual_fees_per_mw_operations?.data,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(
      `administrative_costs@decommissioning_provision`
    )?.value;
    dispatch(setDecommissioningCost(r?.decommissioning_total_cost?.data || 0));
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@community_benefit`)?.value;
    dispatch(
      setCommunityBenefit({
        capitalisationSwitch: r?.capitalise_swtich?.data || 0,
        inflationProfile:
          INFLATION_LIST[r?.inflation_profile?.data - 1 || 0] || "",
        baseYear: r?.inflation_base_year?.data || 2023,
        annualFixedFundToCommunityBenefit:
          r?.annual_fixed_fund_to_community_benefit?.data || 0,
        annualMWhToCommunityBenefit:
          r?.annual_mwh_to_community_benefit?.data || 0,
        uelYears: r?.useful_economic_life?.data || 40,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@business_rates`)?.value;
    dispatch(
      setBusinessRates({
        inflationProfile: INFLATION_LIST[r?.inflation_profile?.data - 1 || 0],
        baseYear: r?.inflation_base_year?.data || 2024,
        annualFeesPerMW: r?.annual_fees_per_mw?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@extended_warranty`)?.value;
    dispatch(
      setExtended_warranty({
        extended_warranty_switch: r?.extended_warranty_switch?.data || 0,
        inflation_profile_warranty:
          INFLATION_LIST[r?.inflation_profile?.data - 1 || 0] || "",
        inflation_base_year_warranty: r?.inflation_base_year?.data || 2023,
        length_of_warranty: r?.length_of_warranty?.data || 0,
        annual_fees_per_mw: [
          { duration: 2, fee: r?.annual_fees_per_mw_2?.data || 0 },
          { duration: 4, fee: r?.annual_fees_per_mw_4?.data || 0 },
          { duration: 8, fee: r?.annual_fees_per_mw_8?.data || 0 },
        ],
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@site_security`)?.value;
    dispatch(
      setSiteSecurity({
        inflationProfile: INFLATION_LIST[r?.inflation_profile?.data - 1 || 0],
        baseYear: r?.inflation_base_year?.data,
        annualFeesPerMW: r?.annual_fees_per_mw?.data,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@legal_costs`)?.value;
    dispatch(
      setLegalCosts({
        inflationProfile: INFLATION_LIST[r?.inflation_profile?.data - 1 || 0],
        baseYear: r?.inflation_base_year?.data,
        annualCost: r?.annual_cost?.data,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(
      `administrative_costs@other_administrative_costs`
    )?.value;
    dispatch(
      setOtherAdministrativeCosts({
        inflationProfile: INFLATION_LIST[r?.inflation_profile?.data - 1 || 0],
        baseYear: r?.inflation_base_year?.data,
        annualAccountingFeesAndAudit:
          r?.annual_accounting_fees_and_audit?.data || 0,
        annualIT: r?.annual_it?.data || 0,
        annualOtherCost: r?.annual_other_cost?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`cost_of_sales@optimiser`)?.value;
    const selectedUpside = r?.optimiser_upside_value?.data || 0;
    dispatch(
      setOptimiser({
        switch: r?.optimiser_switch?.data || 0,
        commission: r?.optimiser_commission?.data || 0,
        floor: {
          startDate: r?.start_date?.data,
          endDate: r?.end_date?.data,
          floorPrice: r?.floor_price?.data || 0,
        },
        upsideValue:
          selectedUpside == 1
            ? r?.upside_90?.data
            : selectedUpside == 2
            ? r?.upside_50?.data
            : selectedUpside == 3
            ? r?.upside_25?.data
            : selectedUpside == 4
            ? r?.upside_10?.data
            : 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`cost_of_sales@metering`)?.value;
    dispatch(
      setMeteringSettings({
        inflationProfile:
          INFLATION_LIST[r?.metering_inflation_profile?.data - 1 || 0],
        baseYear: r?.metering_inflation_base_year?.data,
        annualCost: [
          { duration: 2, annualCostPerMW: r?.annual_cost_per_MW_2?.data },
          { duration: 4, annualCostPerMW: r?.annual_cost_per_MW_4?.data },
          { duration: 8, annualCostPerMW: r?.annual_cost_per_MW_8?.data },
        ],
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`devex`)?.value;
    const enterpriseSwitch =
      getParameter("capex@excluding_batteries@enterprise_value")?.value
        ?.enterprise_value_switch?.data || 0;
    const devexProfilData = r?.devex_profile_data?.data;
    dispatch(
      setDevexSetting({
        devexSwitch: 1 - enterpriseSwitch,
        devexProfile: isArray(devexProfilData)
          ? devexProfilData[r?.profile?.data - 1 || 0]
          : new Array(24).fill(0),
        usefulEL: r?.useful_economic_life_devex?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const enterpriseSwitch =
      getParameter("capex@excluding_batteries@enterprise_value")?.value
        ?.enterprise_value_switch?.data || 0;
    dispatch(setEVSwitch(enterpriseSwitch));
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@duos_charges`)?.value;
    dispatch(
      setduosChargesSetting({
        connectionSwitch: r?.distribution_connection?.data || 0,
        dnoRegion: r?.dno?.data || -1,
        meteringPoints: r?.number_of_metering_points?.data || 0,
        inflationProfile:
          INFLATION_LIST[r?.duos_inflation_profile?.data - 1 || 0],
        baseYear: r?.duos_inflation_base_year?.data || 2023,
        duosData: r?.dnuos_data?.data || [
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
          new Array(14).fill(0),
        ],
        demandRed:
          100 -
          (r?.duos_demand_amber?.data || 0) -
          (r?.duos_demand_green?.data || 0),
        demandAmber: r?.duos_demand_amber?.data || 0,
        demandGreen: r?.duos_demand_green?.data || 0,
        generationRed:
          100 -
          (r?.gduos_generation_amber?.data || 0) -
          (r?.gduos_generation_green?.data || 0),
        generationAmber: r?.gduos_generation_green?.data || 0,
        generationGreen: r?.gduos_generation_green?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@triad_charges`)?.value;
    dispatch(
      settnuosTriadChargeSetting({
        switch: r?.tnuos_charges_unavoidable_switch?.data || 0,
        exportPortion:
          r?.anticipated_export_during_triads_as_a_percent_of_grid_connection
            ?.data || 0,
        novPortion: r?.portion_of_triads_expected_november?.data || 0,
        decPortion: r?.portion_of_triads_expected_december?.data || 0,
        janPortion: r?.portion_of_triads_expected_january?.data || 0,
        febPortion: r?.portion_of_triads_expected_february?.data || 0,
        demandTariffData: [
          `Northern Scotland`,
          `Southern Scotland`,
          `Northern`,
          `North West`,
          `Yorkshire`,
          `N Wales & Mersey`,
          `East Midlands`,
          `Midlands`,
          `Eastern`,
          `South Wales`,
          `South East`,
          `London`,
          `Southern`,
          `South Western`,
        ].map((d, index) => ({
          region: d,
          data: Array.isArray(r?.demand_tariffs?.data)
            ? r?.demand_tariffs?.data[index]
            : new Array(55).fill(0),
        })),
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
    dispatch(
      setExportChargesOfTNUoS({
        transmissionConnectionSwitch:
          r?.transmission_connection_switch?.data || 0,
        zone: TNUOS_ZONE_LIST[r?.tnuos_zone?.data - 1 || 0],
        localCircuits: LOCAL_CIRCUITS_ZONE[r?.local_circuits?.data - 1],
        annualLoadFactor: r?.annual_load_factor?.data || 1,
        gridConnectionVoltage: r?.grid_connection_voltage?.data || 1,
        localSubstationType: r?.local_substation_type?.data || 1,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone?.data;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value?.adjustment_tariff
        ?.data || [];

    dispatch(
      setAjdustmentTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : [],
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`capex@batteries`)?.value;
    const mdl =
      CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST][
        r?.capex_forecast_scenario_choice?.data - 1 || 0
      ]?.label;
    dispatch(setModel(mdl.toString()));
  }, [parameterInfos]);

  // const localSubstationTariff = useMemo(() => {
  //   const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
  //   const rows = CHOICE_DATA[PARAM_TYPE.CHOICE.SUBSTATION_TYPE].length;
  //   const cols = CHOICE_DATA[PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE].length;
  //   let binResult = [];
  //   for (let i = 0; i < rows; i++) {
  //     const tempRow: number[] = new Array(cols).fill(0);
  //     binResult.push(tempRow);
  //   }
  //   return r?.local_substation_type_by_voltage_data || binResult;
  // }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
    const rows = CHOICE_DATA[PARAM_TYPE.CHOICE.SUBSTATION_TYPE].length;
    const cols = CHOICE_DATA[PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE].length;
    let binResult = [];
    for (let i = 0; i < rows; i++) {
      const tempRow: number[] = new Array(cols).fill(0);
      binResult.push(tempRow);
    }
    dispatch(
      setLocalSubstationTariff(
        r?.local_substation_type_by_voltage_data?.data || binResult
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;

    if (
      r &&
      r.local_circuits?.data &&
      Array.isArray(r.local_circuits_data?.data)
    ) {
      const localCircuitsIndex = r.local_circuits?.data - 1;
      const localCircuitsZone =
        LOCAL_CIRCUITS_ZONE[localCircuitsIndex] || "Unknown Zone"; // Provide a fallback for zone
      const localCircuitsData =
        r.local_circuits_data?.data[localCircuitsIndex] ||
        new Array(60).fill(0);

      dispatch(
        setLocalCircuitsData([
          {
            zone: localCircuitsZone,
            value: localCircuitsData,
          },
        ])
      );
    } else {
      console.error("Invalid data structure for parameter:", r);
    }
  }, [parameterInfos]);

  // useEffect(() => {
  //   const r = getParameter(`cost_of_sales@pooling_substation`)?.value;
  //   let result = 0;

  //   if (r?.pooling_substation_cost == 0) result = 1;
  //   dispatch(setLocalSubstationSwitch(result));
  // }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@pooling_substation`)?.value;
    let result = 0;

    if (r?.pooling_substation_cost?.data == 0) result = 1;
    dispatch(setLocalSubstationSwitch(1));
  }, [parameterInfos]);
  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone?.data;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.shared_year_round_tariff?.data || [];
    dispatch(
      setSharedYearRoundTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : [],
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone?.data;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.not_shared_round_tariff?.data || [];
    dispatch(
      setNotSharedYearRoundTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : [],
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("capex@excluding_batteries")?.value;
    dispatch(
      setCapexSensitivity(
        r?.excluding_battery_sensitivity?.data == 0
          ? 0
          : r?.excluding_battery_sensitivity_magnitude?.data / 100 || 0
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("revenue@setup")?.value;
    dispatch(
      setRevenueSensitivity(
        r?.revenue_sensitivity == 0
          ? 0
          : r?.revenue_sensitivity_magnitude?.data / 100 || 0
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("administrative_costs@setup")?.value;
    const opexSwitch = r?.opex_sensitivity?.data;
    const magnitude = (r?.opex_sensitivity_magnitude?.data || 0) / 100;
    dispatch(setOpexSensitivity(opexSwitch == 0 ? 0 : magnitude));
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@national_grid_securities")?.value;
    dispatch(
      setNationalGridSecurities({
        security_choice: CHOICE_DATA[PARAM_TYPE.CHOICE.SECURITY][
          r?.security_choice?.data - 1
        ]?.label as string,
        attributable_security_choice:
          VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS[
            r?.attributable_security_choice?.data - 1 || 0
          ],
        total_attributable_costs: r?.total_attributable_costs?.data || 0,
        annual_wider_cancellation_costs:
          r?.annual_wider_cancellation_costs?.data || 0,
        premium_fee: r?.premium_fee?.data || 0,
        usefulEconomicLife: r?.useful_economic_life?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@national_grid_securities")?.value;

    const attributableSecurityChoiceData =
      r?.attributable_security_choice_data?.data;

    // Ensure the array exists and has the expected structure before accessing it
    dispatch(
      setVariableProfileForAttributableCosts(
        // {
        // variable_upsall_central: attributableSecurityChoiceData?.[0] || [
        // 	0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06,
        // 	4800.06,
        // ],
        // variable_tees: attributableSecurityChoiceData?.[1] || [
        // 	0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06,
        // 	4800.06,
        // ],
        // }
        CHOICE_DATA[PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY].map(
          (d, index) => ({
            security: d.label,
            value: isArray(attributableSecurityChoiceData)
              ? attributableSecurityChoiceData[index]
              : new Array(8).fill(0),
          })
        )
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@corporation_tax")?.value;
    dispatch(
      setCorporationTax({
        smallProfitsTaxRate: r?.small_profits_tax_rate?.data || 0,
        mainRateOfTax: r?.main_rate_of_tax?.data || 0,
        profitThresholdForSmallProfits:
          r?.profit_threshold_for_small_profits?.data || 0,
        annualInvestmentAllowance: r?.aia?.data || 0,
        rateForCapitalAllowancesSpecialPool:
          r?.rate_for_capital_allowances_capital_pool?.data || 0,
        rateForCapitalAllowancesMainPool:
          r?.rate_for_capital_allowances_main_pool?.data || 0,
        smallPoolAllowanceThreshold:
          r?.small_pool_allowances_threshold?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter("other_inputs@financing@cash_requirements")?.value;
    dispatch(
      setCapexProvision([
        {
          capexObject: "Batteries",
          months: r?.batteries?.data || 0,
        },
        {
          capexObject: "Devex",
          months: r?.devex?.data || 0,
        },
        {
          capexObject: "Capitalised rent in construction",
          months: r?.capitalised_rent_in_construction?.data || 0,
        },
        {
          capexObject: "Land",
          months: r?.land_purchase?.data || 0,
        },
        {
          capexObject: "Pooling substation",
          months: r?.pooling_substation?.data || 0,
        },
        {
          capexObject: "Transformers",
          months: r?.transformers?.data || 0,
        },
        {
          capexObject: "Balance of Plant",
          months: r?.balance_of_plant?.data,
        },
        {
          capexObject: "Enterprise value - Development fee",
          months: r?.ev_dev_fee?.data || 0,
        },
        {
          capexObject: "Community benefit",
          months: r?.capitalised_communnity_benefit_in_construction?.data || 0,
        },
      ])
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("other_inputs@financing@cash_requirements")?.value;
    dispatch(
      setCashRequirements({
        cashSwitch: r?.minimum_cash_switch?.data || 0,
        minimumCashBalance: r?.minimum_cash_balance?.data || 0,
        cashRequirementLookForwardRestriction:
          r?.cash_requirement_look_forward_restriction?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(
      "other_inputs@financing@gearing_by_capex_type"
    )?.value;
    dispatch(
      setGearingByCapexType({
        bessAugmentation: r?.bess_augmentation?.data || 0,
        bessReplacement1: r?.bess_replacement_1?.data || 0,
        bessReplacement2: r?.bess_replacement_2?.data || 0,
        excludingBatteries: r?.gearing_excluding_batteries?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("other_inputs@financing@equity")?.value;
    dispatch(
      setEquity({
        equitySplitToShareholderLoan:
          r?.equity_split_to_sharholder_loan?.data || 0,
        equitySplitToShareholderCapital:
          100 - r?.equity_split_to_sharholder_loan?.data || 0,
        shareholderLoanInterest: r?.shareholder_loan_interest?.data || 0,
        shareholderLoanCashSweepPercentage:
          r?.shareholder_loan_cash_sweep_percentage_of_available_cash?.data ||
          0,
        shareCapitalCashSweepPercentage:
          r?.share_capital_cash_sweep_percentage_of_available_cash?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("other_inputs@financing@dividends")?.value;
    dispatch(
      setDividends({
        dividends_cash_sweep_percent_of_available_cash:
          r?.dividends_cash_sweep_percentage_of_available_cash?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("capex@excluding_batteries@enterprise_value")?.value;
    dispatch(
      setDevelopmentFeePaymentPercentageProfile({
        // paymentPercentageAtInvestorClosingDate: 0,
        paymentPercentageAtLandSecuredDate:
          r?.percent_land_secured_date?.data || 0,
        paymentPercentageAtGridSecuredDate:
          r?.percent_grid_secured_date?.data || 0,
        paymentPercentageAtClosingOfDebtAgreementDate:
          r?.percent_closing_debt_agreement?.data || 0,
        paymentPercentageAtFullyConsented:
          r?.percent_fully_consented?.data || 0,
        paymentPercentageAtrTB: r?.percent_rtb?.data || 0,
        paymentPercentageAtcOD: r?.percent_cod?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter("basic_project_inputs")?.value;
    dispatch(
      setDevelopmentFeePaymentDateProfile({
        investorClosingDate: data?.investor_closing_date?.data || "2024-06-01",
        landSecuredDate: data?.land_secured_date?.data || "2024-05-05",
        gridSecuredDate:
          data?.grid_secured_date_offer_accepted?.data || "2024-01-02",
        closingOfDebtAgreementDate:
          data?.closing_of_dbt_agreement_date?.data || "2024-09-01",
        fullyConsented:
          moment(data?.development_start_date?.data)
            .add(
              data
                ?.time_between_development_start_date_and_planning_permission_granted
                ?.data || 16,
              "month"
            )
            .format(DATE_FORMAT) || "2024-11-01",
        rTB:
          moment(data?.development_start_date?.data)
            .add(
              1 *
                data
                  ?.time_between_development_start_date_and_planning_permission_granted
                  ?.data +
                1 *
                  data?.time_between_planning_permission_granted_and_rtb
                    ?.data || 6,
              "month"
            )
            .format(DATE_FORMAT) || "2025-05-01",
        cOD: data?.grid_connection_date?.data || "2028-01-01",
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter("basic_project_inputs")?.value;
    dispatch(
      setInvestorClosingDate(data?.investor_closing_date?.data || "2024-06-01")
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter("basic_project_inputs")?.value;
    dispatch(
      setFullyConsentedDate(
        moment(data?.development_start_date?.data)
          .add(
            data
              ?.time_between_development_start_date_and_planning_permission_granted
              ?.data || 16,
            "month"
          )
          .format(DATE_FORMAT) || "2024-11-01"
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter("other_inputs@financing@senior_debt")?.value;
    dispatch(
      setSeniorDebt({
        repaymentStrategy: r?.senior_debt_strategy?.data || 0,
        seniorDebtInterst: r?.senior_debt_interest?.data || 0,
        cashSweepPercentOfAvailableCash:
          r?.cash_sweep_percentage_of_available_cash?.data || 0,
        minimumAllowedDSCRHalfYearly:
          r?.minimum_allowed_dscr_half_yearly?.data || 0,
        minimumAllowedDSCRAnnual: r?.minimum_allowed_dscr_annual?.data || 0,
        arrangementFeePercentage: r?.arrangement_fee_percentage?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone?.data;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.system_peak_tariff_data?.data || [];
    dispatch(
      setSystemPeakTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : [],
        },
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`basic_project_inputs`)?.value;
    dispatch(setOperationYears(r?.length_of_operations?.data / 12 || 45));
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`revenue@tolling`)?.value;
    dispatch(
      setTollingSetting({
        tollingSwitch: r?.tolling_switch?.data || 0,
        startDate: r?.tolling_start_date?.data || operationStartDate,
        endDate: r?.tolling_end_date?.data || decommissioningEndDate,
        tollingPrice: r?.tolling_price?.data || 0,
        tollingPercentage: r?.tolling_percentage?.data || 0,
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`revenue@gain_on_disposal_of_batteries`)?.value;
    dispatch(setGainOnDisposalSwitch(r?.switch?.data || 0));
  }, [parameterInfos]);
  useEffect(() => {
    const setting = getParameter(`other_inputs@dsa_details`)?.value;
    const basic = getParameter("basic_inputs")?.value;
    dispatch(
      setDSAFeeSetting({
        baseTotalDSAFee: setting?.base_total_dsa_fee?.data || 0,
        inflationProfile: setting?.inflation_profile,
        baseYear: setting?.base_year?.data || 2024,
        pdaDate: setting?.pda_date?.data || "2020-01-01",
        hotsDate: setting?.hots_date?.data || "2020-01-01",
        landSecuredDate: basic?.land_secured_date?.data || "2020-01-01",
        gridAppDate: setting?.grid_application_date?.data || "2020-01-01",
        gridFirstOfferDate:
          setting?.grid_first_offer_received_date?.data || "2020-01-01",
        gridSecuredDate: basic?.grid_secured_date?.data || "2020-01-01",
        prePlanDate: setting?.preplanning_date?.data || "2020-01-01",
        consultDate: setting?.consultation_date?.data || "2020-01-01",
        planConsentDate: setting?.planning_consent_date?.data || "2020-01-01",
        preConDischargeDate:
          setting?.pre_construction_discharched_date?.data || "2020-01-01",
        pdaMile: setting?.pda_milestone?.data || 0,
        hotsMile: setting?.hots_milestone?.data || 0,
        landSecuredMile: setting?.land_secured_milestone?.data || 0,
        gridAppMile: setting?.grid_application_milestone?.data || 0,
        gridFirstOfferMile:
          setting?.grid_first_offer_received_milestone?.data || 0,
        gridSecuredMile: setting?.grid_secured_milestone?.data || 0,
        prePlanMile: setting?.preplanning_milestone?.data || 0,
        consultMile: setting?.consultation_milestone?.data || 0,
        planConsentMile: setting?.planning_consent_milestone?.data || 0,
        preConDischargeMile:
          setting?.pre_construction_discharched_milestone?.data || 0,
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`capex@batteries`)?.value;
    const scenario = r?.capex_forecast_scenario_choice?.data;

    dispatch(
      setCapexForecasetScenarioData([
        {
          model: CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST][scenario - 1]?.label,
          data: CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].map((d, index) => ({
            duration: d?.label,
            data: r
              ? isArray(
                  r[
                    `capex_forecast_scenario_data_${CHOICE_DATA[
                      PARAM_TYPE.CHOICE.FORECAST
                    ][scenario - 1]?.label
                      .toString()
                      .toLowerCase()}`
                  ]?.data
                )
                ? r[
                    `capex_forecast_scenario_data_${CHOICE_DATA[
                      PARAM_TYPE.CHOICE.FORECAST
                    ][scenario - 1]?.label
                      .toString()
                      .toLowerCase()}`
                  ]?.data[index]
                : new Array(300).fill(1)
              : new Array(300).fill(1),
          })),
        },
      ])
    );
  }, [parameterInfos]);
  // updates of function results

  useEffect(() => {
    updateVintage();
  }, [
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    initialCycleData,
    initialCapacity,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    model,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    batterySensitivity,
    operationYears,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    capexForecastScenarioData,
    afryRevenueData,
    bopCapexPercentage,
    // lengthOfDecommissioning
  ]);
  useEffect(() => {
    updateWholesaleDayAhead();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateSolarRevenue();
  }, [
    solarRevenueSettings,
    initialCapacity,
    operationEndDate,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
  ]);
  useEffect(() => {
    updateRegoRevenue();
  }, [
    regoSettings,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    revenueSensitivity,
    vintage,
  ]);
  useEffect(() => {
    updateCFDRevenue();
  }, [
    cfdSettings,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    revenueSensitivity,
    vintage,
  ]);
  useEffect(() => {
    updateEmbeddedBenefits();
  }, [
    embeddedSettings,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    revenueSensitivity,
    vintage,
  ]);

  useEffect(() => {
    updateTNUosRevenues();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
  ]);

  useEffect(() => {
    updateTriadsIncome();
  }, [
    triadsIncomeSetting,
    constraintFactor,
    revenueSetup,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
  ]);

  useEffect(() => {
    updateTotalTNUoSTriads();
  }, [tnuosRevenues, triadsIncome]);
  useEffect(() => {
    updateTollingRevenue();
  }, [
    tollingSetting,
    vintage,
    startingAssumptionsForBatteries,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateBalancingReserve();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateUpsidePotentialRevenue();
  }, [
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    balancingReserve,
    optimiser,
    modelStartDate,
    decommissioningEndDate,
    vintage,
    inflationInputs,
    revenueSetup,
    operationYears,
  ]);

  useEffect(() => {
    updateResidualRevenue();
  }, [
    residualValue,
    modelStartDate,
    decommissioningEndDate,
    developmentStartDate,
  ]);
  useEffect(() => {
    updateWholesaleDayIntraday();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateBalancingMechanism();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateCapacityMarket();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateFrequencyResponse();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateGainOnDiposal();
  }, [
    gainOnDisposalSwitch,
    model,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    bessCapexForecast,
    batterySensitivity,
    operationYears,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
    capexForecastScenarioData,
    batteryDisposals,
  ]);
  useEffect(() => {
    updateTotalRevenue();
  }, [
    gainOnDisposal,
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    fixedPPAValue,
    floatingPPAValue,
    residualRevenue,
    tollingRevenue,
    balancingReserve,
    totalTNUoSTriads,
    upsidePotentialRevenue,
    regoRevenue,
    solarRevenue,
    cfdRevenue,
    embeddedBenefits,
  ]);
  useEffect(() => {
    updateAuxilliaryLoss();
  }, [
    auxilliaryLossesSettings,
    averageWholeSaleDayAheadPrice,
    revenueSetup,
    assumptionsData,
    initialCapacity,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationYears,
    detailedRevenueData,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateOptimiserCost();
  }, [
    modelStartDate,
    decommissioningEndDate,
    optimiser,
    vintage,
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    balancingReserve,
  ]);
  useEffect(() => {
    updateTNUoSCharge();
  }, [
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
    initialCapacity,
    operationYears,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    operationEndDate,
  ]);
  useEffect(() => {
    updateMeteringCost();
  }, [
    meteringSettings,
    initialCapacity,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationYears,
    opexSensitivity,
    operationEndDate,
  ]);
  useEffect(() => {
    updateTnuosTriadCost();
  }, [
    tnuosTriadChargeSetting,
    revenueSetup,
    assumptionsData,
    modoRegion,
    startingAssumptionsForBatteries,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationEndDate,
    detailedRevenueData,
    vintage,
    batteryDuration,
    initialCapacity,
    opexSensitivity,
  ]);
  useEffect(() => {
    updateDUoSCost();
  }, [
    duosChargeSetting,
    revenueSetup,
    assumptionsData,
    startingAssumptionsForBatteries,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationEndDate,
    detailedRevenueData,
    vintage,
    batteryDuration,
    inflationInputs,
    operationYears,
    initialCapacity,
    opexSensitivity,
    afryRevenueData,
  ]);
  useEffect(() => {
    updateTotalCoGS();
  }, [
    meteringCost,
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    ppaFee,
    duosCost,
    tnuosTriadCost,
  ]);
  useEffect(() => {
    updateAssetMExpense();
  }, [
    assetManagement,
    decommissioningEndDate,
    modelStartDate,
    constraintFactor,
    inflationInputs,
    opexSensitivity,
    vintage,
    totalRevenue,
  ]);
  useEffect(() => {
    updateBusinessRatesExpense();
  }, [
    businessRates,
    inflationInputs,
    initialCapacity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateCommunityBenefitExpense();
  }, [
    communityBenefit,
    inflationInputs,
    averageWholeSaleDayAheadPrice,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
    constructionStartDate,
    developmentStartDate,
  ]);
  useEffect(() => {
    updateInsuranceExpense();
  }, [
    insurance,
    inflationInputs,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateLandRentExpense();
  }, [
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate,
    developmentStartDate,
  ]);
  useEffect(() => {
    updateLegalExpense();
  }, [
    legalCosts,
    inflationInputs,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateOAndMexpense();
  }, [
    batteryDuration,
    inflationInputs,
    operationAndManagementSettings,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
    opexSensitivity,
    vintage,
    extended_warranty,
  ]);
  useEffect(() => {
    updateOtherAdminExpense();
  }, [
    otherAdministrativeCosts,
    opexSensitivity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateSiteSecurityExpense();
  }, [
    initialCapacity,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate,
    siteSecurity,
  ]);
  useEffect(() => {
    updateExtendedWarrantyExpense();
  }, [
    extended_warranty,
    batteryDuration,
    inflationInputs,
    opexSensitivity,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage,
  ]);
  useEffect(() => {
    updateIntercompanyExp();
  }, [
    intercompany_expense,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    opexSensitivity,
  ]);
  useEffect(() => {
    updateIntercompanyExp();
  }, [
    easement_costs,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    batteryDuration,
    opexSensitivity,
  ]);
  useEffect(() => {
    updateEasementExpense();
  }, [
    easement_costs,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    batteryDuration,
    opexSensitivity,
  ]);
  useEffect(() => {
    updateDecommissioningCosts();
  }, [
    costOfAdditions,
    lengthOfConstruction,
    modelStartDate,
    developmentStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    lengthOfDecommissioning,
    decommissioningCost,
  ]);
  useEffect(() => {
    updateWaterRatesExpense();
  }, [
    water_rates,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    opexSensitivity,
    initialCapacity,
  ]);
  useEffect(() => {
    updateArrangementFees();
  }, [
    capexProvision,
    gearingByCapexType,
    seniorDebt,
    vat,
    modelStartDate,
    decommissioningEndDate,
    developmentStartDate,
    vintage,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    capexUEL,
    communityBenefitToCapex,
  ]);
  useEffect(() => {
    updateNGSecurities();
  }, [
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    modelStartDate,
    fullyConsentedDate,
    developmentStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    operationEndDate,
  ]);
  useEffect(() => {
    updateTotalAdminCosts();
  }, [
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
    arrangementFees,
  ]);
  useEffect(() => {
    updateBalanceOfPlantDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateTransformersDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
    initialCapacity,
  ]);
  useEffect(() => {
    updateEVDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
    evSwitch,
    initialCapacity,
  ]);
  useEffect(() => {
    updateVintagesDepreciation();
  }, [modelStartDate, decommissioningEndDate, vintage]);
  useEffect(() => {
    updatePoolingSubstationDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateCapitalizedRentInConstruction();
  }, [
    capexUEL,
    operationStartDate,
    modelStartDate,
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate,
    developmentStartDate,
  ]);

  useEffect(() => {
    updateCommunityBenifitToCapex();
  }, [
    communityBenefit,
    inflationInputs,
    averageWholeSaleDayAheadPrice,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
    constructionStartDate,
    developmentStartDate,
  ]);
  useEffect(() => {
    updateTotalDepreciation();
  }, [
    balanceOfPlantDepreciation,
    transformersDepreciation,
    evDepreciation,
    vintagesDepreciation,
    poolingSubstationDepreciation,
    capitalizedRentInConstruction,
    communityBenefitToCapex,
    nGSecurities,
    devexAdditions,
  ]);

  useEffect(() => {
    updateMovementInTradeCreditor();
  }, [
    workingCapital,
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    developmentStartDate,
    totalCoGS,
    totalAdminCosts,
    landRentExpense,
    decommissioningCosts,
  ]);
  useEffect(() => {
    updateMovementInTradeDebtor();
  }, [
    workingCapital,
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    developmentStartDate,
    totalRevenue,
    gainOnDisposal,
    residualRevenue,
  ]);
  useEffect(() => {
    updatetLandAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    batteryDuration,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updatePoolingSubstationAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateSubstationBuildDevAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateTransformersAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateBalanceOfPlantAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate,
  ]);
  useEffect(() => {
    updateEVAdditions();
  }, [
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    costOfAdditions,
    initialCapacity,
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    evSwitch,
  ]);
  useEffect(() => {
    updateDevexAdditions();
  }, [
    modelStartDate,
    decommissioningEndDate,
    devexSetting,
    developmentStartDate,
    operationStartDate,
  ]);
  useEffect(() => {
    updateCapitalExpenditure();
  }, [
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    vintage,
    landAdditions,
    poolingSubstationAdditions,
    substationBuildDevAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    communityBenefitToCapex,
    nGSecurities,
    communityBenefitToCapex,
    nGSecurities,
  ]);
  useEffect(() => {
    updateCapexCreditor();
  }, [
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    vintage,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    capitalExpenditure,
  ]);
  useEffect(() => {
    updateMovementInPrepayments();
  }, [
    landRent,
    operationStartDate,
    modelStartDate,
    developmentStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    landRentExpense,
  ]);
  useEffect(() => {
    updateMovementInVATCreditor();
  }, [
    operationStartDate,
    modelStartDate,
    developmentStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    landRentExpense,
  ]);
  useEffect(() => {
    updateMovementInVATCreditor();
  }, [
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
  ]);
  useEffect(() => {
    updateCorporationTaxValue();
  }, [
    corporationTax,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    ebit,
    capitalExpenditure,
  ]);
  useEffect(() => {
    updateOperatingCashFlowValue();
  }, [
    ebit,
    movementInTradeCreditor,
    movementInTradeDebtor,
    gainOnDisposal,
    decommissioningCosts,
    nGSecurities,
    movementInPrepayments,
    movementInVATCreditor,
    capexCreditor,
  ]);
  useEffect(() => {
    updatePPAFee();
  }, [floatingPPAValue, fixedPPAValue, ppaFeesPercentage]);
  useEffect(() => {
    updateFixedPPAValue();
  }, [fixedPPARevenue, modelStartDate, decommissioningEndDate, vintage]);
  useEffect(() => {
    updateFloatingPPAValue();
  }, [
    floatingPPARevenue,
    modelStartDate,
    decommissioningEndDate,
    averageWholeSaleDayAheadPrice,
    vintage,
  ]);

  useEffect(() => {
    updateEBIT();
  }, [totalRevenue, totalCoGS, totalAdminCosts, totalDepreciation]);
  useEffect(() => {
    if (
      Array.isArray(vintage?.totalGenerationCapacity) &&
      Array.isArray(vintage?.electricitySold) &&
      Array.isArray(vintage?.vintages)
    )
      updateMCapexProvision();
  }, [
    devexAdditions,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    vat,
    modelStartDate,
    decommissioningEndDate,
    developmentStartDate,
    vintage,
    ebit,
    operatingCashFlowValue,
    corporationTaxValue,
    capitalExpenditure,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    gainOnDisposal,
    capexUEL,
    arrangementFees,
    communityBenefitToCapex,
  ]);
  useEffect(() => {
    updateRevenueGraphData();
  }, [
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    totalRevenue,
  ]);
  // useEffect(() => {
  //   updateValuationResult();
  // }, [
  //   valuation,
  //   corporationTax,
  //   gearingByCapexType,
  //   seniorDebt,
  //   decommissioningEndDate,
  //   mCapexProvision,
  //   operatingCashFlowValue,
  //   capitalExpenditure,
  //   corporationTaxValue,
  //   gainOnDisposal,
  //   returnsSettings,
  //   evAdditions,
  //   operationStartDate,
  // ]);

  // update functions
  const updateVintage = () => {
    const calc_vintage = calcVintages({
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      initialCycleData,
      initialCapacity,
      startingAssumptionsForBatteries,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model,
      operationYears,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      batterySensitivity,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      capexForecastScenarioData,
      afryRevenueData,
      bopCapexPercentage,
    });
    dispatch(setVintage(calc_vintage));
  };
  const updateMCapexProvision = () => {
    const m_capex_provision = calcCapexProvision({
      capexProvision,
      cashRequirements,
      gearingByCapexType,
      equity,
      seniorDebt,
      dividends,
      vat,
      modelStartDate,
      decommissioningEndDate,
      developmentStartDate,
      vintage,
      ebit,
      operatingCashFlowValue,
      corporationTaxValue,
      capitalExpenditure,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      gainOnDisposal,
      capexUEL,
      communityBenefitToCapex,
      // arrangementFees
    });

    dispatch(setMCapexProvision(m_capex_provision));
  };
  const updateWholesaleDayAhead = () => {
    const wholesaleDayAhead = calcWholeSaleDayAheadRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setWholesaleDayAhead(wholesaleDayAhead));
  };
  const updateSolarRevenue = () => {
    const solarRevenue = calcSolarRevenue({
      solarRevenueSettings,
      initialCapacity,
      operationEndDate,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setSolarRevenue(solarRevenue));
  };
  const updateRegoRevenue = () => {
    const regoRevenue = calcREGORevenue({
      regoSettings,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      revenueSensitivity,
      vintage,
    });
    dispatch(setRegoRevenue(regoRevenue));
  };
  const updateCFDRevenue = () => {
    const cfdRevenue = calcCFDRevenue({
      cfdSettings,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      revenueSensitivity,
      vintage,
    });
    dispatch(setCFDRevenue(cfdRevenue));
  };
  const updateEmbeddedBenefits = () => {
    const embeddedBenefits = calcEmbeddedBenefits({
      embeddedSettings,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      revenueSensitivity,
      vintage,
    });
    dispatch(setEmbeddedBenefits(embeddedBenefits));
  };
  const updateTNUosRevenues = () => {
    const result = calcTNUoSRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setTNUoSRevenues(result));
  };
  const updateTriadsIncome = () => {
    const result = calcTriadsIncome({
      triadsIncomeSetting,
      constraintFactor,
      revenueSetup,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setTriadsIncome(result));
  };
  const updateTotalTNUoSTriads = () => {
    const result = calcTotalTNUosTriads({
      tnuosRevenues,
      triadsIncome,
    });
    dispatch(setTotalTNUoSTriads(result));
  };
  const updateTollingRevenue = () => {
    const tollingRevenue = calcTollingRevenue({
      tollingSetting,
      vintage,
      startingAssumptionsForBatteries,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setTollingRevenue(tollingRevenue));
  };
  const updateResidualRevenue = () => {
    const residualRevenue = calcResidualRevenue({
      residualValue,
      modelStartDate,
      decommissioningEndDate,
      developmentStartDate,
    });
    dispatch(setResidualRevenue(residualRevenue));
  };
  const updateBalancingReserve = () => {
    const balancingReserve = calcReserveMarginRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setBalancingReserve(balancingReserve));
  };
  const updateUpsidePotentialRevenue = () => {
    const result = calcUpsidePotentialRevenue({
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      balancingReserve,
      optimiser,
      modelStartDate,
      decommissioningEndDate,
      vintage,
      inflationInputs,
      revenueSetup,
      operationYears,
    });
    dispatch(setUpsidePotentialRevenue(result));
  };
  const updateWholesaleDayIntraday = () => {
    const wholesaleDayIntraday = calcWholesaleIntraday({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setWholesaleDayIntraday(wholesaleDayIntraday));
  };
  const updateBalancingMechanism = () => {
    const balancingMechanism = calcBalancingMechanismRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setBalancingMechanism(balancingMechanism));
  };
  const updateCapacityMarket = () => {
    const capacityMarket = calcCapacityMarket({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setCapacityMarket(capacityMarket));
  };
  const updateFrequencyResponse = () => {
    const frequencyResponse = calcFrequencyResponse({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      afryRevenueData,
    });
    dispatch(setFrequencyResponse(frequencyResponse));
  };
  const updateGainOnDiposal = () => {
    const r = calcGainOnDisposal({
      gainOnDisposalSwitch,
      model,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      bessCapexForecast,
      batterySensitivity,
      operationYears,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      capexForecastScenarioData,
      batteryDisposals,
    });
    dispatch(setGainOnDisposal(r));
  };
  const updateTotalRevenue = () => {
    const totalRevenue = calcTotalRevenue({
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      gainOnDisposal,
      fixedPPAValue,
      floatingPPAValue,
      residualRevenue,
      balancingReserve,
      totalTNUoSTriads,
      upsidePotentialRevenue,
      regoRevenue,
      solarRevenue,
      cfdRevenue,
      embeddedBenefits,
    });
    dispatch(setTotalRevenue(totalRevenue));
  };
  const updateAuxilliaryLoss = () => {
    const auxilliaryLoss = calcAuxilliaryLosses({
      auxilliaryLossesSettings,
      averageWholeSaleDayAheadPrice,
      revenueSetup,
      assumptionsData,
      initialCapacity,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationYears,
      detailedRevenueData,
      afryRevenueData,
    });
    dispatch(setAuxilliaryLoss(auxilliaryLoss));
  };
  const updateOptimiserCost = () => {
    const optimiserCost = calcOptimiserCommission({
      modelStartDate,
      decommissioningEndDate,
      optimiser,
      vintage,
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      balancingReserve,
    });
    dispatch(setOptimiserCost(optimiserCost));
  };
  const updateMeteringCost = () => {
    const meteringCost = calcMetering({
      meteringSettings,
      initialCapacity,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationYears,
      opexSensitivity,
      operationEndDate,
    });
    dispatch(setMeteringCost(meteringCost));
  };
  const updateTnuosTriadCost = () => {
    const result = calcTnuosTriadCharges({
      tnuosTriadChargeSetting,
      revenueSetup,
      assumptionsData,
      modoRegion,
      startingAssumptionsForBatteries,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationEndDate,
      detailedRevenueData,
      vintage,
      batteryDuration,
      initialCapacity,
      opexSensitivity,
    });
    dispatch(setTnuosTriadCost(result));
  };
  const updateDUoSCost = () => {
    const result = calcDUoSCharges({
      duosChargeSetting,
      revenueSetup,
      assumptionsData,
      startingAssumptionsForBatteries,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationEndDate,
      detailedRevenueData,
      vintage,
      batteryDuration,
      inflationInputs,
      operationYears,
      initialCapacity,
      opexSensitivity,
      afryRevenueData,
    });
    dispatch(setduosCost(result));
  };
  const updateTNUoSCharge = () => {
    const tnuosCharge = calcTNUoSCharges({
      systemPeakTariffData,
      sharedYearRoundTariffData,
      notSharedYearRoundTariffData,
      ajdustmentTariffData,
      exportChargesOfTNUoS,
      localSubstationTariff,
      localSubstationSwitch,
      localCircuitsData,
      initialCapacity,
      operationYears,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      operationEndDate,
    });
    dispatch(setTNUoSCharge(tnuosCharge));
  };
  const updateTotalCoGS = () => {
    const totalCoGS = calcTotalCostOfSales({
      meteringCost,
      auxilliaryLoss,
      optimiserCost,
      tnuosCharge,
      ppaFee,
      duosCost,
      tnuosTriadCost,
    });
    dispatch(setTotalCoGS(totalCoGS));
  };
  const updateAssetMExpense = () => {
    const assetMExpense = calcAssetManagementCosts({
      assetManagement,
      decommissioningEndDate,
      modelStartDate,
      constraintFactor,
      inflationInputs,
      opexSensitivity,
      vintage,
      totalRevenue,
    });
    dispatch(setAssetMExpense(assetMExpense));
  };
  const updateBusinessRatesExpense = () => {
    const businessRatesExpense = calcBusinessRates({
      businessRates,
      inflationInputs,
      initialCapacity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
    });
    dispatch(setBusinessRatesExpense(businessRatesExpense));
  };
  const updateCommunityBenefitExpense = () => {
    const result = calcCommunityBenefit({
      communityBenefit,
      inflationInputs,
      averageWholeSaleDayAheadPrice,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
      constructionStartDate,
      developmentStartDate,
    });
    dispatch(setCommunityBenefitExpense(result));
  };
  const updateInsuranceExpense = () => {
    const result = calcInsuranceExpense({
      insurance,
      inflationInputs,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
    });
    dispatch(setInsuranceExpense(result));
  };
  const updateLandRentExpense = () => {
    const result = calcLandRentToPL({
      landRent,
      landSize,
      initialCapacity,
      inflationInputs,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      constructionStartDate,
      developmentStartDate,
    });
    dispatch(setLandRentExpense(result));
  };
  const updateLegalExpense = () => {
    const result = calcLegalCosts({
      legalCosts,
      inflationInputs,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
    });
    dispatch(setLegalExpense(result));
  };
  const updateOAndMexpense = () => {
    const result = calcOperationAndManagementCost({
      batteryDuration,
      inflationInputs,
      operationAndManagementSettings,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
      opexSensitivity,
      vintage,
      extended_warranty,
      constraintFactor,
    });
    dispatch(setOAndMExpense(result));
  };
  const updateOtherAdminExpense = () => {
    const result = calcOtherAdminCosts({
      otherAdministrativeCosts,
      opexSensitivity,
      inflationInputs,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
    });
    dispatch(setOtherAdminExpense(result));
  };
  const updateSiteSecurityExpense = () => {
    const result = calcSiteSecurity({
      initialCapacity,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      operationEndDate,
      decommissioningEndDate,
      siteSecurity,
    });
    dispatch(setSiteSecurityExpense(result));
  };
  const updateExtendedWarrantyExpense = () => {
    const result = calcExtendedWarranty({
      extended_warranty,
      battery_duration: batteryDuration,
      inflationInputs,
      opexSensitivity,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setExtendedWarrantyExpense(result));
  };
  const updateIntercompanyExp = () => {
    const result = calcIntercompanyExpense({
      intercompany_expense,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      opexSensitivity,
    });
    dispatch(setIntercompanyExp(result));
  };
  const updateEasementExpense = () => {
    const result = calcEasementCosts({
      easement_costs,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      battery_duration: batteryDuration,
      opexSensitivity,
    });
    dispatch(setEasementExpense(result));
  };
  const updateDecommissioningCosts = () => {
    const result = calcDecommissiongCosts({
      length_of_construction: lengthOfConstruction,
      modelStartDate,
      developmentStartDate,
      constructionStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      length_of_decommissioning: lengthOfDecommissioning,
      decommissioningCost,
    });
    dispatch(setDecommissioningCosts(result));
  };
  const updateWaterRatesExpense = () => {
    const result = calcWaterRates({
      water_rates,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      opexSensitivity,
      initialCapacity,
    });
    dispatch(setWaterRatesExpense(result));
  };
  const updateArrangementFees = () => {
    const result = calcArrangementFees({
      capexProvision,
      gearingByCapexType,
      seniorDebt,
      vat,
      modelStartDate,
      decommissioningEndDate,
      developmentStartDate,
      vintage,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      capexUEL,
      communityBenefitToCapex,
    });
    dispatch(setArrangementFees(result));
  };

  const updateNGSecurities = () => {
    const result = calcNationalGridSecurities({
      national_grid_securities: nationalGridSecurities,
      variable_profile_for_attributable_costs:
        variableProfileForAttributableCosts,
      modelStartDate,
      fullyConsentedDate,
      developmentStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      operationEndDate,
    });
    dispatch(setNGSecurities(result));
  };
  const updateTotalAdminCosts = () => {
    const result = calcTotalAdminCosts({
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
      arrangementFees,
    });
    dispatch(setTotalAdminCosts(result));
  };
  const updateBalanceOfPlantDepreciation = () => {
    const result = calcBalanceOfPlant({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setBalanceOfPlantDepreciation(result));
  };
  const updateTransformersDepreciation = () => {
    const result = calcTransformers({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
      initialCapacity,
    });
    dispatch(setTransformersDepreciation(result));
  };
  const updateEVDepreciation = () => {
    const result = calcEnterpriseValue({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
      evSwitch,
      initialCapacity,
    });
    dispatch(setEVDepreciation(result));
  };
  const updateVintagesDepreciation = () => {
    const result = calcVintagesDepreciation({
      modelStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setVintagesDepreciation(result));
  };
  const updatePoolingSubstationDepreciation = () => {
    const result = calcPoolingSubstation({
      capexUEL,
      // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setPoolingSubstationDepreciation(result));
  };
  const updateCapitalizedRentInConstruction = () => {
    const result = calcCapitalizedRentInConstruction({
      capexUEL,
      operationStartDate,
      modelStartDate,
      landRent,
      landSize,
      initialCapacity,
      inflationInputs,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      constructionStartDate,
      developmentStartDate,
    });
    dispatch(setCapitalizedRentInConstruction(result));
  };
  const updateCommunityBenifitToCapex = () => {
    const result = capitalizedCommunityBenefit({
      communityBenefit,
      inflationInputs,
      averageWholeSaleDayAheadPrice,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
      constructionStartDate,
      developmentStartDate,
    });
    dispatch(setCommunityBenefitToCapex(result));
  };
  const updateTotalDepreciation = () => {
    const result = calcTotalDepreciation({
      balanceOfPlantDepreciation,
      transformersDepreciation,
      evDepreciation,
      vintagesDepreciation,
      poolingSubstationDepreciation,
      capitalizedRentInConstruction,
      communityBenefitToCapex,
      nGSecurities,
      devexAdditions,
    });
    dispatch(setTotalDepreciation(result));
  };
  const updateMovementInTradeCreditor = () => {
    const result = calcTradeCreditors({
      working_capital: workingCapital,
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      developmentStartDate,
      totalCoGS,
      totalAdminCosts,
      landRentExpense,
      decommissioningCosts,
    });
    dispatch(setMovementInTradeCreditor(result));
  };
  const updateMovementInTradeDebtor = () => {
    const result = calcTradeDebtors({
      working_capital: workingCapital,
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      developmentStartDate,
      totalRevenue,
      gainOnDisposal,
      residualRevenue,
    });
    dispatch(setMovementInTradeDebtor(result));
  };
  const updatetLandAdditions = () => {
    const result = calcLandAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      batteryDuration,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setLandAdditions(result));
  };
  const updateSubstationBuildDevAdditions = () => {
    const result = calcSubstationBuildDevAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setSubstationBuildDevAdditions(result));
  };
  const updatePoolingSubstationAdditions = () => {
    const result = calcPoolingSubstationAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setPoolingSubstationAdditions(result));
  };
  const updateTransformersAdditions = () => {
    const result = calcTransformersAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setTransformersAdditions(result));
  };
  const updateBalanceOfPlantAdditions = () => {
    const result = calcBalacneOfPlantAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate,
    });
    dispatch(setBalanceOfPlantAdditions(result));
  };
  const updateEVAdditions = () => {
    const result = calcEnterpriseValueAdditions({
      developmentFeePaymentPercentageProfile,
      developmentFeePaymentDateProfile,
      costOfAdditions,
      initialCapacity,
      modelStartDate,
      developmentStartDate,
      decommissioningEndDate,
      evSwitch,
    });
    dispatch(setEVAdditions(result));
  };
  const updateDevexAdditions = () => {
    const result = calcDevexAdditions({
      modelStartDate,
      decommissioningEndDate,
      devexSetting,
      developmentStartDate,
      operationStartDate,
    });
    dispatch(setDevexAdditions(result));
  };
  const updateCapitalExpenditure = () => {
    const result = calcCapitalExpenditure({
      modelStartDate,
      developmentStartDate,
      decommissioningEndDate,
      vintage,
      landAdditions,
      poolingSubstationAdditions,
      substationBuildDevAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      communityBenefitToCapex,
      nGSecurities,
    });
    dispatch(setCapitalExpenditure(result));
  };
  const updateCapexCreditor = () => {
    const result = calcCapexCreditor({
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      vintage,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      capitalExpenditure,
      communityBenefitToCapex,
      nGSecurities,
    });
    dispatch(setCapexCreditor(result));
  };
  const updateMovementInPrepayments = () => {
    const result = calcPrepayments({
      landRent,
      operationStartDate,
      modelStartDate,
      developmentStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      landRentExpense,
    });
    dispatch(setMovementInPrepayments(result));
  };
  const updateMovementInVATCreditor = () => {
    const result = calcVATCreditor({
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      movementInTradeCreditor,
      movementInTradeDebtor,
      capexCreditor,
    });
    dispatch(setMovementInVATCreditor(result));
  };
  const updateEBIT = () => {
    const result = calcEBIT({
      totalRevenue,
      totalCoGS,
      totalAdminCosts,
      totalDepreciation,
    });
    dispatch(setEBIT(result));
  };
  const updateCorporationTaxValue = () => {
    const result = calcCorporationTax({
      corporationTax,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      ebit,
      capitalExpenditure,
    });
    dispatch(setCorporationTaxValue(result));
  };
  const updateOperatingCashFlowValue = () => {
    const result = calcOperatingCashFlow({
      ebit,
      movementInTradeCreditor,
      movementInTradeDebtor,
      gainOnDisposal,
      decommissioningCosts,
      nGSecurities,
      movementInPrepayments,
      movementInVATCreditor,
      capexCreditor,
    });
    dispatch(setOperatingCashFlowValue(result));
  };
  const updateFixedPPAValue = () => {
    const result = calcFixedPPA({
      fixedPPARevenue,
      modelStartDate,
      decommissioningEndDate,
      vintage,
    });
    dispatch(setFixedPPAValue(result));
  };
  const updateFloatingPPAValue = () => {
    const result = calcFloatingPPA({
      floatingPPARevenue,
      modelStartDate,
      decommissioningEndDate,
      vintage,
      averageWholeSaleDayAheadPrice,
    });
    dispatch(setFloatingPPAValue(result));
  };
  const updatePPAFee = () => {
    const result = calcPPAFees({
      floatingPPAValue,
      fixedPPAValue,
      ppaFeesPercentage,
    });

    dispatch(setPPAFee(result));
  };
  // const updateValuationResult = () => {
  //   const result = calcKPIs({
  //     valuation,
  //     corporationTax,
  //     gearingByCapexType,
  //     seniorDebt,
  //     decommissioningEndDate,
  //     mCapexProvision,
  //     operatingCashFlowValue,
  //     capitalExpenditure,
  //     corporationTaxValue,
  //     gainOnDisposal,
  //     returnsSettings,
  //     evAdditions,
  //     operationStartDate,
  //   });

  //   dispatch(setValuationResult(result));
  // };
  const updateRevenueGraphData = () => {
    const result = [
      {
        name: "Capacity Market" as string,
        data: capacityMarket,
      },
      {
        name: "Frequency Response" as string,
        data: frequencyResponse,
      },
      {
        name: "Wholesale Intraday" as string,
        data: wholesaleDayIntraday,
      },
      {
        name: "Wholesale day ahead" as string,
        data: wholesaleDayAhead,
      },
      {
        name: "Balancing Mechanism" as string,
        data: balancingMechanism,
      },
      {
        name: "Gain on diposal" as string,
        data: gainOnDisposal?.gainOnDisposalRevenue,
      },
      {
        name: "Fixed PPA Revenue" as string,
        data: fixedPPAValue,
      },
      {
        name: "Floating PPA Revenue" as string,
        data: floatingPPAValue,
      },
    ];
    dispatch(setRevenueGraphData(result));
  };
  // const updateNetCashFlow = () => {
  // 	const result = [
  // 		{
  // 			name: 'Capacity Market' as string,
  // 			data: capacityMarket
  // 		},
  // 		{
  // 			name: 'Frequency Response' as string,
  // 			data: frequencyResponse
  // 		},
  // 		{
  // 			name: 'Wholesale Intraday' as string,
  // 			data: wholesaleDayIntraday
  // 		},
  // 		{
  // 			name: 'Wholesale day ahead' as string,
  // 			data: wholesaleDayAhead
  // 		},
  // 		{
  // 			name: 'Balancing Mechanism' as string,
  // 			data: balancingMechanism
  // 		},
  // 		{
  // 			name: 'Gain on diposal' as string,
  // 			data: gainOnDisposal?.gainOnDisposalRevenue
  // 		},
  // 		{
  // 			name: 'Fixed PPA Revenue' as string,
  // 			data: fixedPPAValue
  // 		},
  // 		{
  // 			name: 'Floating PPA Revenue' as string,
  // 			data: floatingPPAValue
  // 		},
  // 	];
  // 	dispatch(setRevenueGraphData(result));
  // };

  return {
    updateVintage,
    updateMCapexProvision,
  };
};

export default useParameter;
