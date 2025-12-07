import { DEFAULT_DETAILED_REVENUE_DATA, DEFAULT_REVENUE_ASSUMPTIONS_DATA, DEFAULT_REVENUE_SETUP, DEFAULT_STARTING_BATTERY_ASSUMPTION, DEFAULT_VINTAGE } from "../constant";
import { IAssumptionData, IDetailedRevenueData, IInflationForm, IRevenueSetup, IStartingBatteryAssumptions, IVintage } from "../Revenue/type";
import { getAsAPercentOfPeriod, getQuarterNumberFromModelStartDate } from "../utils";
import { DEFAULT_TNUOS_TRIAD_CHARGE_SETTING } from "./constant";
import { ITNUoSTriadChargeSetting } from "./type";

export function calcTnuosTriadCharges(
    {
        tnuosTriadChargeSetting = DEFAULT_TNUOS_TRIAD_CHARGE_SETTING,
        revenueSetup = DEFAULT_REVENUE_SETUP,
        assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
        modoRegion = 'Nothern',
        startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
        modelStartDate = '2023-01-01',
        decommissioningStartDate = '2068-01-01',
        decommissioningEndDate = '2068-06-30',
        operationStartDate = '2028-01-01',
        operationEndDate = '2067-12-31',
        detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
        vintage = DEFAULT_VINTAGE,
        batteryDuration = 4,
        initialCapacity = 1000,
        opexSensitivity = 0
    }:
        {
            modoRegion?: string,
            tnuosTriadChargeSetting?: ITNUoSTriadChargeSetting,
            revenueSetup?: IRevenueSetup;
            assumptionsData?: IAssumptionData[];
            detailedRevenueData?: IDetailedRevenueData[];
            startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
            modelStartDate?: string;
            operationStartDate?: string;
            operationEndDate?: string;
            decommissioningStartDate?: string;
            decommissioningEndDate?: string;
            vintage?: IVintage;
            batteryDuration?: number;
            initialCapacity?: number;
            inflationInputs?: IInflationForm[];
            operationYears?: number;
            opexSensitivity?: number

        }
) {
    const period =
        getQuarterNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
        1;

    // operationsAsAPercentOfPeriod calcs row 2627
    const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
        modelStartDate,
        operationStartDate,
        operationEndDate,
        decommissioningEndDate
    );

    // triadPaymentProfile calcs row 2694
    const triadPaymentProfile = new Array(period).fill(0);
    for (let i = 0; i < period; i++) {
        triadPaymentProfile[i] = i % 4 == 0 ? (tnuosTriadChargeSetting.janPortion * 0.01 + tnuosTriadChargeSetting.febPortion * 0.01) : i % 4 == 3 ? (tnuosTriadChargeSetting.novPortion * 0.01 + tnuosTriadChargeSetting.decPortion * 0.01) : 0
    }

    // capacityExportedDuringTriads calcs F2698
    const capacityExportedDuringTriads = initialCapacity * tnuosTriadChargeSetting.exportPortion / 100
    // tnuosDemandForecast calcs row 2673
    const tnuosDemandForecast = tnuosTriadChargeSetting?.demandTariffData.find((d, index) => d.region ==
        modoRegion
    )?.data || new Array(period).fill(0)

    // aprToDecForecast calcs row 2681
    const aprToDecForecast = new Array(period).fill(0);
    for (let i = 3; i < period; i++) {
        if ((i - 3) % 4 == 0)
            aprToDecForecast[i] = tnuosDemandForecast[((i - 3) / 4) * 1 + 1]
        else aprToDecForecast[i] = tnuosDemandForecast[((i - 3 - (i - 3) % 4) / 4) * 1 + 2]
    }

    // janToMarForecast calc row 2682
    const janToMarForecast = new Array(period).fill(0);
    // tnuosForecastByQuarter calcs row 2684
    const tnuosForecastByQuarter = new Array(period).fill(0)
    for (let i = 0; i < period; i++) {
        janToMarForecast[i] = tnuosDemandForecast[(i - (i % 4)) / 4]
        tnuosForecastByQuarter[i] = (i + 1) % 4 > 1 ? aprToDecForecast[i] : janToMarForecast[i]
    }
    // forecastCharge calcs row 2702
    const forecastCharge = operationsAsAPercentOfPeriod.map((d, index) => (-(1 + opexSensitivity) * d *
        capacityExportedDuringTriads * triadPaymentProfile[index] * tnuosForecastByQuarter[index]
    ))
    if (tnuosTriadChargeSetting.switch)
        return forecastCharge
    else return new Array(period).fill(0)
}