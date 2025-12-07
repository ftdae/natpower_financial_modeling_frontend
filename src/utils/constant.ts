import moment from "moment";
import { toSnakeCase } from "../calculation/calculates/utils";
import { IInputParameter } from "./types";
import {
  ALL_CAPEX_PAYMENT_PROFILE_LIST,
  EMARINE_INFLATION_LIST,
  EMARINE_VALUATION_POINT_LIST,
  MARINE_PARAM_TYPE,
  ONE_OFF_CAPEX_ITEM_LIST,
  PROPULSION_NM_LIST,
} from "../eMarine/emarine front constant";

export const INPUT_TYPE_FIXED = "I_FIXED";
export const INPUT_TYPE_TIMING = "I_TIMING";
export const INPUT_TYPE_SETUP = "SETUP";

export const INPUT_TYPES = {};
export const INFLATION_START_YEAR = 2021;
export const MODEL_START_YEAR = 2023;
export const TNUOS_DATA_START_YEAR = 2023;
export const MODEL_LAST_YEAR = 2080;
export const LAST_QUARTER_NUMBER = 232;
export const RETENTION_RATE_YEARS = 48;
// export const DNO_DATA = [{}]

export const sortStrArr = (arr: string[]) => {
  return arr?.sort((a, b) => a.localeCompare(b));
};
export const LOCAL_CIRCUITS_ZONE: string[] = [
  `Not applicable`,
  `Aberarder`,
  `Aberdeen Bay`,
  `Achruach`,
  `Aigas`,
  `An Suidhe`,
  `Arecleoch`,
  `Arecleoch extension`,
  `Ayrshire grid collector`,
  `beaw field`,
  `Beinneun Wind Farm`,
  `Benbrack`,
  `Bhlaraidh Wind Farm`,
  `Black Hill`,
  `Black Law`,
  `BlackCraig Wind Farm`,
  `BlackLaw Extension`,
  `Blarghour`,
  `Branxton`,
  `Broken Cross`,
  `carrick`,
  `Chirmorie`,
  `Clash Gour`,
  `Clauchrie`,
  `Cloiche`,
  `Clyde (North)`,
  `Clyde (South)`,
  `Coalburn BESS`,
  `Coire Glas`,
  `Connagill`,
  `Corriegarth`,
  `Corriemoillie`,
  `Coryton`,
  `costa head`,
  `Craig Watch Wind Farm`,
  `CREAG RIABHACH`,
  `Cruachan`,
  `culham jet`,
  `Culligran`,
  `Cumberhead Collector`,
  `Cumberhead West`,
  `daer`,
  `Deanie`,
  `Dersalloch`,
  `Dinorwig`,
  `Dorenell`,
  `Douglas North`,
  `Dumnaglass`,
  `Dunhill`,
  `Dunlaw Extension`,
  `Edinbane`,
  `elchies`,
  `energy isles wind farm`,
  `Enoch Hill`,
  `euchanhead`,
  `Ewe Hill`,
  `Fallago`,
  `Farr`,
  `Faw Side`,
  `Fernoch`,
  `Ffestiniogg`,
  `Fife Grid Services`,
  `Finlarig`,
  `Foyers`,
  `Friston`,
  `Galawhistle`,
  `Gills Bay`,
  `Glen Kyllachy`,
  `Glen Ullinish`,
  `Glendoe`,
  `Glenglass`,
  `glenmuckloch hydro pumped storage`,
  `glenshimmeroch`,
  `Gordonbush`,
  `Greenburn`,
  `Griffin Wind`,
  `Hadyard Hill`,
  `Harestanes`,
  `Hartlepool`,
  `Heathland`,
  `hesta head`,
  `hopsrig collector`,
  `Invergarry`,
  `Kennoxhead`,
  `Kergord`,
  `Kilgallioch`,
  `Kilmarnock BESS`,
  `Kilmorack`,
  `Kings Lynn`,
  `kirkton`,
  `Kype Muir`,
  `Lairg`,
  `Langage`,
  `lethans`,
  `Limekilns`,
  `Lochay`,
  `Lorg`,
  `Luichart`,
  `Marchwood`,
  `Mark Hill`,
  `melvich`,
  `Middle Muir`,
  `Middleton`,
  `Millennium South`,
  `Millennium Wind `,
  `Mossford`,
  `mossy hill`,
  `Nant`,
  `Necton`,
  `north lowther energy initiative`,
  `old forest of ae`,
  `overhill`,
  `quantans hill`,
  `Rawhills`,
  `Rhigos`,
  `Rocksavage`,
  `ryhall`,
  `Saltend`,
  `Sandy Knowe`,
  `Sanquhar II`,
  `Scoop Hill`,
  `Shepherds rig`,
  `South Humber Bank`,
  `Spalding`,
  `stornoway wind`,
  `Stranoch`,
  `Strathbrora`,
  `Strathy`,
  `Strathy Wind`,
  `Strathy Wood`,
  `Stronelairg`,
  `teindland wind farm`,
  `troston`,
  `Wester Dod`,
  `Whitelee`,
  `Whitelee Extension`,
];

export const TNUOS_ZONE_LIST: string[] = [
  `North Scotland`,
  `East Aberdeenshire`,
  `Western Highlands`,
  `Skye and Lochalsh`,
  `Eastern Grampian and Tayside`,
  `Central Grampian`,
  `Argyll`,
  `The Trossachs`,
  `Stirlingshire and Fife`,
  `South West Scotlands`,
  `Lothian and Borders`,
  `Solway and Cheviot`,
  `North East England`,
  `North Lancashire and The Lakes`,
  `South Lancashire Yorkshire and Humber`,
  `North Midlands and North Wales`,
  `South Lincolnshire and North Norfolk`,
  `Mid Wales and The Midlands`,
  `Anglesey and Snowdon`,
  `Pembrokeshire`,
  `South Wales & Gloucester`,
  `Cotswold`,
  `Central London`,
  `Essex and Kent`,
  `Oxfordshire Surrey and Sussex`,
  `Somerset and Wessex`,
  `West Devon and Cornwall`,
];
export const LOCAL_SUBSTATION_TYPE: string[] = [
  `No redundancy & <1320 MW`,
  `Redundancy & <1320 MW`,
  `No redundancy & >=1320 MW`,
  `Redundancy & >=1320 MW`,
];
export const VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS: string[] = [
  "Variable - EP1 - 1001",
  "Variable - EM9 - 1609",
  "Variable - EA23 - 1323",
  "Variable - EA1 - 1301",
  "Variable - EA16 - 1316",
  "Variable - EA29 - 1329",
  "Variable - EP5 - 1005",
  "Variable - EP14 - 1014",
  "Variable - EP18 - 1018",
  "Variable - EA26 - 1326",
  "Variable - EP11 - 1011",
  "Variable - EP16 - 1016",
  "Variable - EA7 - 1307",
  "Variable - EA29 - 1329",
  "Variable - EA24 - 1324",
  "Variable - EP13 - 1013",
  "Fixed profile",
];

export const INFLATION_LIST: string[] = [
  `No inflation`,
  `RPI(OBR)`,
  `CPI(OBR)`,
  `Tees rent high case`,
  `FES to 2050 then nil`,
  `FES constant from 2050`,
  `CPI to 2050 then nil`,
  `CPI with 2% collar and 5% cap`,
  `CPI to 2060 then nil`,
  `CPI(BOE)`,
  `CPI(average BOE and OBR)`,
  `Afry inflation`,
];

export const REGION_LIST: string[] = sortStrArr([
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
]);

export const REGION_PARAMS: string[] = [
  "Avg. Cycles per day",
  "Wholesale Day Ahead Total Revenues",
  "Wholesale Intraday Revenues",
  "Balancing Mechanism Revenues",
  "Capacity Market Revenues",
  "Frequency Response Revenues",
  "Balancing Reserve Revenues",
  "TNUoS Revenues",
  "Total Revenues",
];
export const AFRY_PARAMS: string[] = [
  "Avg. Cycles per day",
  "Day Ahead Sell Revenue",
  "Day Ahead Buy Costs",
  "Intra-Day Sell Revenue",
  "Intra-Day Buy Costs",
  "Balancing Mechanism Offer Revenues",
  "Balancing Mechanism Bid Costs",
  "Capacity Price",
  "Response Availability Revenue",
  "Response SoE Costs",
  "Reserve Availablility Revenue",
];
export const BARINGA_PARAMS: string[] = [
  "Estimated full cycle equivalent (DA + ID + BM + DC)",
  "Day ahead market",
  "Additional volatility value",
  "Intraday market",
  "Intraday market churn",
  "Balancing Mechanism",
  "Ancillary Services: Dynamic Containment",
  "Capacity Mechanism",
  "TNUoS",
];

export const PAYMENT_PROFILE_LIST: string[] = [
  "BESS profile",
  "Tx profile",
  "Balance of Plant profile",
  "Worset Lane - BESS profile",
  "Worset Lane - Tx profile",
  "Worset Lane - Balance of Plant profile",
  "Bramley SSEN payment profile",
  "Development fee payment profile",
  "Fully consented 100% payment profile",
];

export const STRATEGY_LIST: string[] = ["Ancillaries Focus", "Merchant Focus"];

export const PARAM_TYPE = {
  YEAR: "year",
  TEXT: "text",
  NUMBER: "number",
  INTEGER: "integer",
  DATE: "date",
  TABLE: "table",
  GROUP: "group",
  CHECKBOX: "checkbox",
  SWITCH: {
    EFFICIENCY: "switch_efficiency",
    ONOFF: "switch_onoff",
    YESNO: "switch_yesno",
  },
  CHOICE: {
    // ~~~ eMarine
    OWNERSHIP: "choice_ownership",
    // STEVEDORE_COST_METHOD: "choice_stevedore_cost_method",
    // ~~~ eMarine
    PROVIDER_REGION: "choice_provider_region",
    AFRY_REGION: "choice_afry_region",
    MODO_REGION: "choice_modo_region",
    BARINGA_REGION: "choice_baringa_region",
    TECH: "choice_tech",
    CURRENCY: "choice_currency",
    ASSET: "choice_asset",
    REGION: "choice_region",
    STRATEGY: "choice_strategy",
    ACRES: "choice_acres",
    DURATION: "choice_duration",
    ABSOLUTE_FORECAST: "choice_absolute_forecast",
    RELATIVE_FORECAST: "choice_relative_forecast",
    STAGES: "choice_stage",
    CARRY_BASIS: "choice_carry_basis",
    FORECAST_PROVIDER: "choice_forecast_provider",
    INFLATION: "choice_inflation",
    VALUATION_DATE: "choice_valuation_date",
    UPSIDE: "choice_upside",
    DNO: "choice_dno",
    // LOCALSUBSTATION: 'local_substation_type',
    SUBSTATION_TYPE: "choice_substation_type",
    GRID_CONNECTION_VOLTAGE: "choice_grid_connection_voltage",
    SECURITY: "choice_security",
    DEVEX_PROFILE: "choice_devex_profile",
    ATTRIBUTABLE_SECURITY: "choice_attributable_security",
    PAYMENT_PROFILE: "choice_payment_profile",
    FORECAST: "choice_forecast",
    SUPPLIER: "choice_supplier",
    TNUOS_ZONE_LIST: "choice_tnuos_zone_list",
    LOCAL_CIRCUITS_ZONE: "choice_local_circuits_zone",
    LAND_RENT_PAYMENT_TERMS: "choice_land_rent_payment_terms",
    LAND_RENT_BASIS: "choice_land_rent_basis",
    DEBT_STRATEGY: "choice_debt_strategy",
    AUTHORITY: "choice_authority",
  },
};

export const SWITCH_DATA = {
  [PARAM_TYPE.SWITCH.EFFICIENCY]: {
    FIXED: { id: 0, label: "Fixed" },
    FORECAST: { id: 1, label: "Forecaset" },
  },
  [PARAM_TYPE.SWITCH.ONOFF]: {
    OFF: { id: 0, label: "Off" },
    ON: { id: 1, label: "On" },
  },
  [PARAM_TYPE.SWITCH.YESNO]: {
    NO: { id: 0, label: "No" },
    YES: { id: 1, label: "Yes" },
  },
};

export const CHOICE_DATA: Record<
  string,
  { id: number; label: string | number; disabled?: boolean }[]
> = {
  // ~~~ eMarine
  [MARINE_PARAM_TYPE.CHOICE.OWNERSHIP]: [
    { id: 1, label: "Full stack" },
    { id: 2, label: "JV" },
    { id: 3, label: "Affiliate" },
    { id: 4, label: "Roaming" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE]: [
    { id: 1, label: "Afry Q4 2023 wholesale - Central" },
    { id: 2, label: "Afry Q4 2023 wholesale - High" },
    { id: 3, label: "Afry Q4 2023 wholesale - Low" },
    {
      id: 4,
      label: "Baringa 4h day-ahead market average received (Q4 2023 Real)",
    },
    { id: 5, label: "Baringa 4h day-ahead market average paid (Q4 2023 Real)" },
    {
      id: 6,
      label:
        "Baringa 4h day-ahead market average  received/paid (Q4 2023 Real)",
    },
    { id: 7, label: "Modo (20240606 central run)" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE]: [
    { id: 1, label: "Oil tankers" },
    { id: 2, label: "Chemical/product tankers" },
    { id: 3, label: "Gas tankers" },
    { id: 4, label: "Bulk carriers" },
    { id: 5, label: "General cargo" },
    { id: 6, label: "Container vessels" },
    { id: 7, label: "Ro-Ro automotive" },
    { id: 8, label: "Ro-Pax vessels" },
    { id: 9, label: "Cruise ships" },
    { id: 10, label: "Offshore supply vessels" },
    { id: 11, label: "Fishing vessels" },
    { id: 12, label: "CRUISE" },
    { id: 13, label: "FERRY" },
    { id: 14, label: "SERVICE TUG" },
    { id: 15, label: "CONTAINER" },
    { id: 16, label: "CAR CARRIER" },
    { id: 17, label: "CHEMICAL" },
    { id: 18, label: "CARGO" },
    { id: 19, label: "Offshore Constructor" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST]: PROPULSION_NM_LIST.map(
    (t, index) => ({
      id: index + 1,
      label: t,
    })
  ),
  [MARINE_PARAM_TYPE.CHOICE.MONTH_NAME]: [
    { id: 1, label: "January" },
    { id: 2, label: "February" },
    { id: 3, label: "March" },
    { id: 4, label: "April" },
    { id: 5, label: "May" },
    { id: 6, label: "June" },
    { id: 7, label: "July" },
    { id: 8, label: "August" },
    { id: 9, label: "September" },
    { id: 10, label: "October" },
    { id: 11, label: "Novemeber" },
    { id: 12, label: "December" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.AMORT_PAY_TIMING]: [
    { id: 1, label: "End of calendar year" },
    { id: 2, label: "Manual input" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_DAY_COST_TYPE]: [
    { id: 1, label: "Single all-in pricing" },
    { id: 2, label: "Peak/Off-peak pricing" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE]: [
    { id: 1, label: "CRUISE - Cold-Ironing(% of vessels at berth)" },
    { id: 2, label: "FERRY - Cold-Ironing(% of vessels at berth)" },
    { id: 3, label: "SERVICE TUG - Cold-Ironing(% of vessels at berth)" },
    { id: 4, label: "CONTAINER - Cold-Ironing(% of vessels at berth)" },
    { id: 5, label: "CAR CARRIER - Cold-Ironing(% of vessels at berth)" },
    { id: 6, label: "CHEMICAL - Cold-Ironing(% of vessels at berth)" },
    { id: 7, label: "CARGO - Cold-Ironing(% of vessels at berth)" },
    {
      id: 8,
      label: "Offshore Construction - Cold-Ironing(% of vessels at berth)",
    },
    {
      id: 9,
      label:
        "CRUISE - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 10,
      label:
        "FERRY - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 11,
      label:
        "SERVICE TUG - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 12,
      label:
        "CONTAINER - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 13,
      label:
        "CAR CARRIER - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 14,
      label:
        "CHEMICAL - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 15,
      label:
        "CARGO - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 16,
      label:
        "Offshore Construction - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 17,
      label: "IOMSP - Heysham - Cold-Ironing(% of vessles at berth)",
    },

    {
      id: 18,
      label: "CLDN - Heysham - Cold-Ironing(% of vessles at berth)",
    },
    {
      id: 19,
      label: "Stena - Heysham - Cold-Ironing(% of vessles at berth)",
    },
    {
      id: 20,
      label:
        "IOMSP - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },

    {
      id: 21,
      label:
        "CLDN - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
    {
      id: 22,
      label:
        "Stena - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
    },
  ],
  [MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS]: [
    { id: 1, label: "Growth profile 1 for traffic at one berth" },
    { id: 2, label: "Growth profile 2" },
    { id: 3, label: "Growth profile 3" },
    { id: 4, label: "Growth profile 4" },
    { id: 5, label: "Growth profile 5" },
    { id: 6, label: "Growth profile 6" },
    { id: 7, label: "Growth profile 7" },
    { id: 8, label: "Growth profile 8" },
    { id: 9, label: "Growth profile 9" },
    { id: 10, label: "Growth profile 10" },
    { id: 11, label: "Growth profile 11" },
    { id: 12, label: "Growth profile 12" },
    { id: 13, label: "Growth profile 13" },
    { id: 14, label: "Growth profile 14" },
    { id: 15, label: "Growth profile 15" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE]: [
    { id: 1, label: "Cash sweep" },
    { id: 2, label: "Bullet" },
    { id: 3, label: "Amortisation" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.LOCATION_TYPE]: [
    { id: 1, label: "Port & Terminal" },
    { id: 2, label: "eBunker" },
    { id: 3, label: "Anchorage" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ENTITY]: [
    { id: 1, label: "NPM Infra Marine" },
    { id: 2, label: "NPM Infra BESS" },
    { id: 3, label: "NPM CPO" },
    { id: 4, label: "NPM e-shipping Service Provider" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.PHASES]: [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.SELL_OUT_PRICE_METHOD]: [
    { id: 1, label: "%" },
    { id: 2, label: "£/MWh" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.PLUGS]: [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE]: [
    {
      id: 1,
      label:
        "Offshore Construction Vessel - Teesworks (Seah Wind) - All traffic at the berth where the charger is located",
    },

    { id: 2, label: "CRUISE" },
    { id: 3, label: "FERRY" },
    { id: 4, label: "SERVICE TUG" },
    { id: 5, label: "CONTAINER" },
    { id: 6, label: "CAR CARRIER" },
    { id: 7, label: "CHEMICAL" },
    { id: 8, label: "CARGO" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE]: [
    { id: 1, label: "Even profile" },
    { id: 2, label: "Seasonality - CRUISE" },
    { id: 3, label: "Seasonality - FERRY" },
    { id: 4, label: "Seasonality - SERVICE TUG" },
    { id: 5, label: "Seasonality - CONTAINER" },
    { id: 6, label: "Seasonality - CAR CARRIER" },
    { id: 7, label: "Seasonality - CHEMICAL" },
    { id: 8, label: "Seasonality - CARGO" },
    { id: 9, label: "Seasonality (Stena Specific)" },
    { id: 10, label: "Seasonality (CLDNN Specific)" },
    { id: 11, label: "Seasonality (IOMSP Specific)" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION]: EMARINE_INFLATION_LIST.map(
    (i, index) => ({
      id: index + 1,
      label: i,
    })
  ),
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_VALUATION_POINT]:
    EMARINE_VALUATION_POINT_LIST.map((i, index) => ({
      id: index + 1,
      label: i,
    })),
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_VALUATION_POINT]:
    EMARINE_VALUATION_POINT_LIST.map((i, index) => ({
      id: index + 1,
      label: i,
    })),
  [MARINE_PARAM_TYPE.CHOICE.MARGIN_CHOICE]: [
    { id: 1, label: "Fixed" },
    { id: 2, label: "Variable" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.SPECIFY_CLIENT]: [
    { id: 1, label: "No client contract specified" },
    { id: 2, label: "Specify client" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.PRICING_STRATEGY]: [
    { id: 1, label: "Inflation only" },
    { id: 2, label: "Tracking energy cost" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM]: ONE_OFF_CAPEX_ITEM_LIST.map(
    (i, index) => ({
      id: index + 1,
      label: i,
    })
  ),
  [MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE]:
    ALL_CAPEX_PAYMENT_PROFILE_LIST.map((i, index) => ({
      id: index + 1,
      label: i,
    })),
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY]: [
    { id: 1, label: "Local currency" },
    { id: 2, label: "USD" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY_REVENUE]: [
    { id: 1, label: "USD" },
    { id: 2, label: "GBP" },
    { id: 2, label: "EURO" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_PROFILE]: [],
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE]: [
    { id: 1, label: "Profile 1" },
    { id: 2, label: "Profile 2" },
  ],

  [MARINE_PARAM_TYPE.CHOICE.EMARINE_COUNTRY]: [{ id: 1, label: "UK" }],
  [MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST]: [
    { id: 1, label: "Stena + CLDN +IOMSP non-wholesale cost contract 1" },
    { id: 2, label: "Stena + CLDN +IOMSP non-wholesale cost contract 2" },
    { id: 3, label: "Peel Ports General - non-wholesale cost contract 1" },
    { id: 4, label: "Peel Ports General - non-wholesale cost contract 2" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE]: [
    { id: 1, label: "Generic Annual Concession Cost (flat $500k/pa)" },
    { id: 2, label: "Teesworks - Option Fee" },
    { id: 3, label: "Teesworks - Concession Fee" },
    { id: 4, label: "Heysham Annual Concession " },
    { id: 5, label: "Teesworks - Concession Premium" },
    { id: 6, label: "Teesworks - OPTION / EXCLUSIVITY" },
    { id: 7, label: "Teesworks - CONCESSION" },
    { id: 8, label: "Teesworks - CONNECTION FEE" },
    { id: 9, label: "" },
    { id: 10, label: "Phase 1 Heysham  - E.House and Protection v2" },
    { id: 11, label: "Phase 2 Heysham  - E.House and Protection v2" },
    { id: 12, label: "Phase 3 Heysham  - E.House and Protection v2" },
    { id: 13, label: "" },

    { id: 14, label: "Peel Ports General - E.House and Protection v2" },
    { id: 15, label: "Peel Ports General - E.House and Protection v2" },
    { id: 16, label: "Peel Ports General - E.House and Protection v2" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE]: [
    { id: 1, label: "1 - Infra Marine - Heysham - First Plug - Devex GBP" },
    { id: 2, label: "2 - Infra Marine - Heysham - Second Plug - Devex GBP" },
    { id: 3, label: "3 - Infra Marine - Heysham - Third Plug - Devex GBP" },
    { id: 4, label: "1 - Infra BESS - Heysham - First Plug - Devex GBP" },
    { id: 5, label: "2 - Infra BESS - Heysham - Second Plug - Devex GBP" },
    { id: 6, label: "3 - Infra BESS - Heysham - Third Plug - Devex GBP" },
    {
      id: 7,
      label: "1 - Infra Marine - Peel Ports General - First Plug - Devex GBP",
    },
    {
      id: 8,
      label: "2 - Infra Marine - Peel Ports General - Second Plug - Devex GBP",
    },
    {
      id: 9,
      label: "3 - Infra Marine - Peel Ports General - Third Plug - Devex GBP",
    },
    {
      id: 10,
      label: "1 - Infra BESS - Peel Ports General - First Plug - Devex GBP",
    },
    {
      id: 11,
      label: "2 - Infra BESS - Peel Ports General - Second Plug - Devex GBP",
    },
    {
      id: 12,
      label: "3 - Infra BESS - Peel Ports General - Third Plug - Devex GBP",
    },
  ],
  [MARINE_PARAM_TYPE.CHOICE.STEVEDORE_COST_METHOD]: [
    { id: 1, label: "Hourly rate" },
    { id: 2, label: "Fixed annual cost" },
  ],
  // ~~~ eMarine
  [PARAM_TYPE.CHOICE.MODO_REGION]: REGION_LIST.map((r, index) => ({
    id: index + 1,
    label: r,
  })),
  [PARAM_TYPE.CHOICE.AFRY_REGION]: [
    { id: 1, label: "GB without zones" },
    { id: 2, label: "East EC5" },
    { id: 3, label: "London LE1" },
    { id: 4, label: "Midlands unconstrained" },
    { id: 5, label: "North B8" },
    { id: 6, label: "South SC1" },
    { id: 7, label: "Swales SW1" },
    { id: 8, label: "Thames SC3" },
    { id: 9, label: "UpperNorth B7a" },
    { id: 10, label: "SHETL N B2" },
    { id: 11, label: "SHETL S B4" },
    { id: 12, label: "SPT B6" },
  ],
  [PARAM_TYPE.CHOICE.BARINGA_REGION]: [
    { id: 1, label: "B2" },
    { id: 2, label: "B4" },
    { id: 3, label: "B6" },
    { id: 4, label: "B7a" },
    { id: 5, label: "B8" },
    { id: 6, label: "EC5" },
    { id: 7, label: "SC1" },
    { id: 8, label: "X" },
  ],
  [PARAM_TYPE.CHOICE.ASSET]: [
    { id: 1, label: "EP1 - Upsall Central (Hag Lane) - base case" },
    { id: 2, label: "[spare] - base case" },
  ],
  [PARAM_TYPE.CHOICE.AUTHORITY]: [
    { id: 1, label: "Hartlepool" },
    { id: 2, label: "Basingstoke and Deane" },
    { id: 3, label: "Denbighshire" },
    { id: 4, label: "North Kesteven" },
    { id: 5, label: "Flintshire" },
    { id: 6, label: "Country Durham" },
    { id: 7, label: "Hambleton" },
    { id: 8, label: "Daventry" },
    { id: 9, label: "Shropshire" },
    { id: 10, label: "North Lincolnshire" },
    { id: 11, label: "Westmorland and Furness" },
    { id: 12, label: "Rushcliffe" },
    { id: 13, label: "Redcar and Cleveland" },
    { id: 14, label: "Swale" },
  ],
  [PARAM_TYPE.CHOICE.DEBT_STRATEGY]: [
    { id: 1, label: "Pari passu" },
    { id: 2, label: "Equity first" },
  ],
  [PARAM_TYPE.CHOICE.FORECAST]: [
    { id: 1, label: "Afry low" },
    { id: 2, label: "Afry central" },
    { id: 3, label: "Afry high" },
    { id: 4, label: "Bespoke" },
  ],
  [PARAM_TYPE.CHOICE.SUPPLIER]: [
    { id: 1, label: "BYD latest" },
    { id: 2, label: "BYD - July inputs(KKA)" },
  ],
  [PARAM_TYPE.CHOICE.RELATIVE_FORECAST]: [
    { id: 1, label: "Afry low" },
    { id: 2, label: "Afry central" },
    { id: 3, label: "Afry high" },
    { id: 4, label: "Bespoke" },
  ],
  [PARAM_TYPE.CHOICE.ABSOLUTE_FORECAST]: [
    { id: 1, label: "NREL low" },
    { id: 2, label: "NREL central" },
    { id: 3, label: "NREL high" },
    {
      id: 4,
      label:
        "Afry KKA case with 15% uplift for all vintages (make sure to switch off augmentation uplift else double counted)",
    },
    {
      id: 5,
      label:
        "Afry KKA case with no uplift (if augmentation uplift is required enter this separately)",
    },
  ],
  [PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST]: TNUOS_ZONE_LIST.map((t, index) => ({
    id: index + 1,
    label: t,
  })),
  [PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE]: LOCAL_CIRCUITS_ZONE.map(
    (t, index) => ({
      id: index + 1,
      label: t,
    })
  ),
  [PARAM_TYPE.CHOICE.SUBSTATION_TYPE]: LOCAL_SUBSTATION_TYPE.map(
    (t, index) => ({
      id: index + 1,
      label: t,
    })
  ),

  [PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY]:
    VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS.map((pr, index) => ({
      id: index + 1,
      label: pr,
    })),

  [PARAM_TYPE.CHOICE.DEVEX_PROFILE]: [
    { id: 1, label: "EP1 - 1001 - Upsall Central (Hag Lane)" },
    { id: 2, label: "EP5 - 1005 - Upsall North Dugdale (Mowbray)" },
    { id: 3, label: "EA26 - 1326 - Connahs Quay" },
    { id: 4, label: "EP11 - 1011 - Enderby to Patford" },
    { id: 5, label: "EP16 - 1016 - Harker to Hutton " },
    { id: 6, label: "EM9 - 1609 - Teesside" },
    { id: 7, label: "EA29 - 1329 - Hawthorn Pit" },
    { id: 8, label: "EP14 - 1014 - Cottam to Ryhall" },
    { id: 9, label: "EP18 - 1018 - Grendon to Staythorpe (Kinoulton)" },
    { id: 10, label: "EA1 - 1301 - Fleet (NatG)" },
    { id: 11, label: "EA7 - 1307 - Hartmoor (Whangdon Farm)" },
    { id: 12, label: "EA16 - 1316 - Bramley sub" },
    { id: 13, label: "EA23 - 1323 - Gwyddelwern (Tyn Celyn)" },
    { id: 14, label: "EM13 - 1613 - Medway Group" },
    { id: 15, label: "EA24 - 1324 - Navenby" },
    { id: 16, label: "EP13 - 1013 - Legacy to Ironbridge" },
  ],
  //   export const VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS: string[] = [
  //   "Variable - EP1 - 1001",
  //   "Variable - EM9 - 1609",
  //   "Variable - EA23 - 1323",
  //   "Variable - EA1 - 1301",
  //   "Variable - EA16 - 1316",
  //   "Variable - EA29 - 1329",
  //   "Variable - EP5 - 1005",
  //   "Variable - EP14 - 1014",
  //   "Variable - EP18 - 1018",
  //   "Variable - EA26 - 1326",
  //   "Variable - EP11 - 1011",
  //   "Variable - EP16 - 1016",
  //   "Variable - EA7 - 1307",
  //   "Variable - EA29 - 1329",
  //   "Variable - EA24 - 1324",
  //   "Fixed profile",
  // ];
  [PARAM_TYPE.CHOICE.SECURITY]: [
    { id: 1, label: "Letter of credit" },
    { id: 2, label: "Parent Company Guarnatee" },
    { id: 3, label: "Bond" },
    { id: 4, label: "Escrow account" },
  ],
  [PARAM_TYPE.CHOICE.PAYMENT_PROFILE]: PAYMENT_PROFILE_LIST.map((d, index) => ({
    id: index + 1,
    label: d,
  })),
  // 	[
  // 	{ id: 1, label: "BESS profile" },
  // 	{ id: 2, label: "Tx profile" },
  // 	{ id: 3, label: "Balance of Plant profile" },
  // 	{ id: 4, label: "Bramley SSEN payment profile" },
  // 	{ id: 5, label: "Development fee payment profile" },
  // 	{ id: 6, label: "Fully consented 100% payment profile" },
  // ],
  [PARAM_TYPE.CHOICE.CURRENCY]: [
    { id: 1, label: "GBP" },
    { id: 2, label: "EUR" },
    { id: 3, label: "USD" },
  ],

  [PARAM_TYPE.CHOICE.VALUATION_DATE]: [
    { id: 1, label: "Fully consented" },
    { id: 2, label: "RtB" },
    { id: 3, label: "COD" },
    { id: 4, label: "Valuation date" },
    { id: 5, label: "Investor close date/Exit date" },
  ],
  [PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: "Upside value at P90" },
    { id: 2, label: "Upside value at P50" },
    { id: 3, label: "Upside value at P25" },
    { id: 4, label: "Upside value at P10" },
  ],
  [PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE]: [
    { id: 1, label: "<132 kV" },
    { id: 2, label: "132 kV" },
    { id: 3, label: "275 kV" },
    { id: 4, label: "400 kV" },
  ],
  [PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: "Upside value at P90" },
    { id: 2, label: "Upside value at P50" },
    { id: 3, label: "Upside value at P25" },
    { id: 4, label: "Upside value at P10" },
  ],
  [PARAM_TYPE.CHOICE.DNO]: REGION_LIST.map((r, index) => ({
    id: index + 1,
    label: r,
  })),
  [PARAM_TYPE.CHOICE.STRATEGY]: STRATEGY_LIST.map((r, index) => ({
    id: index + 1,
    label: r,
  })),
  [PARAM_TYPE.CHOICE.TECH]: [
    { id: 1, label: "BESS" },
    { id: 2, label: "Substation", disabled: true },
    { id: 3, label: "Solar", disabled: true },
    { id: 4, label: "Onshore wind", disabled: true },
    { id: 5, label: "Offshore wind", disabled: true },
    { id: 6, label: "Ev charging", disabled: true },
  ],
  [PARAM_TYPE.CHOICE.REGION]: REGION_LIST.map((r, index) => ({
    id: index + 1,
    label: r,
  })),
  [PARAM_TYPE.CHOICE.FORECAST_PROVIDER]: [
    { id: 1, label: "Modo" },
    { id: 2, label: "Afry" },
    { id: 3, label: "Baringa" },
    { id: 4, label: "Modo - Solar" },
    { id: 5, label: "Afry - Solar" },
    { id: 6, label: "Baringa - Solar" },
  ],
  [PARAM_TYPE.CHOICE.STAGES]: [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
  ],
  [PARAM_TYPE.CHOICE.CARRY_BASIS]: [
    { id: 1, label: "cashflows including capex" },
    { id: 2, label: "cashflows excluding capex" },
    { id: 3, label: "profit after tax" },
  ],
  [PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS]: [
    { id: 1, label: "quarterly in advance" },
    { id: 2, label: "annually in advance" },
  ],
  [PARAM_TYPE.CHOICE.LAND_RENT_BASIS]: [
    { id: 1, label: "per acre" },
    { id: 2, label: "per MW" },
    { id: 3, label: `"MAX of (A)% revenue and (B)£ per acre" only` },
    { id: 4, label: `"MAX of (A)% revenue and (B)£ per acre" plus "£ per MW"` },
  ],
  [PARAM_TYPE.CHOICE.ACRES]: [{ id: 1, label: 75 }],
  [PARAM_TYPE.CHOICE.DURATION]: [
    { id: 1, label: 2 },
    { id: 2, label: 4 },
    { id: 3, label: 8 },
  ],
  [PARAM_TYPE.CHOICE.INFLATION]: INFLATION_LIST.map((i, index) => ({
    id: index + 1,
    label: i,
  })),
};

export const PARAM_UNIT = {
  MW: {
    id: "mw",
    label: "MW",
  },
  DATE: {
    id: "date",
    label: "Date",
  },
  ACRES: {
    id: "acres",
    label: "Acres",
  },
  DAYS: {
    id: "days",
    label: "Days",
  },
  MONTH: {
    id: "month",
    label: "Month",
  },
  MONTHS: {
    id: "months",
    label: "Months",
  },
  QUARTERS: {
    id: "quarters",
    label: "Quarters",
  },
  YEAR: {
    id: "year",
    label: "Year",
  },
  YEARS: {
    id: "years",
    label: "Years",
  },
  HOUR: {
    id: "hour",
    label: "Hours",
  },
  PERCENTAGE: {
    id: "percentage",
    label: "%",
  },
  PERCENTAGE_PA: {
    id: "percentage_pa",
    label: "% p.a",
  },
  MWH: {
    id: "mwh",
    label: "MWh",
  },
  GBP_PER_MWH: {
    id: "gbp_per_mwh",
    label: "£/MWh",
  },
  GBP_PER_KW_YEAR: {
    id: "gbp_per_kwy",
    label: "£/kW/year",
  },
  GBP_PER_KW: {
    id: "gbp_per_kw",
    label: "£/kW",
  },
  GBP_PRO_1000: {
    id: "gbp_pro_1000",
    label: "£'000",
  },
  GBP_PRO_1000_PER_MW: {
    id: "gbp_pro_1000_per_mw",
    label: "£'000/MW",
  },
  GBP_PRO_1000_PER_KM: {
    id: "gbp_pro_1000_per_km",
    label: "£'000/km",
  },
  GBP_PRO_1000_PER_KM_PER_HOUR: {
    id: "gbp_pro_1000_per_mw_per_hour",
    label: "£'000/MW/hour",
  },
  KM: {
    id: "km",
    label: "km",
  },
  KW_PER_HOUR: {
    id: "kw_per_hour",
    label: "kW/hr",
  },
  KWH_PER_KWP: {
    id: "kw_per_hour",
    label: "kWh/KWp",
  },
  EUR: {
    id: "eur",
    label: "€",
  },
  GBP: {
    id: "gbp",
    label: "£",
  },
  USD: {
    id: "usd",
    label: "$",
  },
  GBP_PER_GBP: {
    id: "gbp_per_gbp",
    label: "£/£",
  },
  EUR_PER_GBP: {
    id: "eur_per_gbp",
    label: "€/£",
  },
  USD_PER_GBP: {
    id: "usd_per_gbp",
    label: "$/£",
  },
};

export interface ICurrency {
  id: "usd" | "eur" | "gbp";
  unit: { id: string; label: string };
  label: "USD" | "EUR" | "GBP";
}

export const CURRENCY_LIST: ICurrency[] = [
  { id: "usd", unit: PARAM_UNIT.USD, label: "USD" },
  { id: "eur", unit: PARAM_UNIT.EUR, label: "EUR" },
  { id: "gbp", unit: PARAM_UNIT.GBP, label: "GBP" },
];

export const TABLE_SETTING = {};

export const defaultCurrency = CURRENCY_LIST[2];

export const FIXED_PARAMETERS = [
  {
    id: "1",
    category: "Project inputs",
    sub_categories: [
      {
        id: "1.01",
        title: "Asset selection",
        values: [
          {
            title: "Asset number",
            type: PARAM_TYPE.CHOICE.ASSET,
            defaultValue: 1,
          },
        ],
      },
      {
        id: "1.02",
        title: "Technology, sizing and timing",
        values: [
          {
            title: "Technology",
            type: PARAM_TYPE.CHOICE.TECH,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.TECH][0].id,
          },
          {
            title: "Grid connection capacity",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MW,
            defaultValue: 1000,
            editable: "disabled",
          },
          {
            title: "Grid connection date",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: "2028-1-1",
          },
          {
            title: "Investor closing date",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: "2024-1-1",
          },
          {
            title: "Land secured date",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,

            defaultValue: "2024-5-5",
          },
          {
            title: "Grid secured date (offer accepted)",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,

            defaultValue: "2024-1-2",
          },
          {
            title: "Closing of debt agreement date",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: "2024-9-1",
          },
          {
            title: "Region",
            type: PARAM_TYPE.CHOICE.REGION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.REGION][0].id,
          },
          {
            title: "Land size",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.ACRES,
            defaultValue: 75,
          },
          {
            title: "Development start date",
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: "2023-7-1",
          },
          {
            title:
              "Time between development start date and planning permission granted",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 16,
            minValue: 0,
          },
          {
            title: "Planning permission granted date",
            type: PARAM_TYPE.DATE,
            defaultValue: "2024-11-1",
          },
          {
            title: "Fully consented",
            type: PARAM_TYPE.DATE,
            defaultValue: "2024-11-1",
          },
          {
            title: "Time between planning permission granted and RtB",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 6,
            minValue: 0,
            maxValue: 100,
          },
          {
            title: "RtB date",
            type: PARAM_TYPE.DATE,
            defaultValue: "2025-5-1",
          },
          {
            title: "Construction start date",
            type: PARAM_TYPE.DATE,
            defaultValue: "2027-1-1",
          },
          {
            title: "Length of construction",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            minValue: 3,
            maxValue: 24,
          },
          {
            title: "COD and operating start date",
            type: PARAM_TYPE.DATE,
            defaultValue: "2028-1-1",
          },
          {
            title: "Length of operations",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 480,
          },
          {
            title: "End of operations",
            type: PARAM_TYPE.DATE,
            defaultValue: "2067-12-31",
          },
          {
            title: "Decommissioning start date",
            type: PARAM_TYPE.DATE,
            defaultValue: "2068-1-1",
          },
          {
            title: "Length of decommissioning",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            minValue: 3,
            maxValue: 12,
          },
          {
            title: "End of decommissioning",
            type: PARAM_TYPE.DATE,
            defaultValue: "2068-6-30",
          },
          {
            title: "Alert if construction start before RtB",
            type: PARAM_TYPE.TEXT,
          },
        ],
      },
    ],
  },
];

export interface ITABLE_PARAMETER {
  title: string;
  type: string;
  unit: { id: string; label: string } | null;
  stickyCols:
    | {
        type: string;
        params: string[];
        fn: any;
      }
    | undefined
    | null;
  stickyRows:
    | {
        type: string;
        params: string[];
        fn: any;
      }
    | undefined
    | null;
}
export interface ITIMING_PARAMETER_SUBCATEGORY {
  id: string;
  title: string;
  values: ITABLE_PARAMETER[];
}
export interface ITIMEING_PARAMETER {
  id: string;
  category: string;
  sub_categories: ITIMING_PARAMETER_SUBCATEGORY[];
}

export const TIMING_PARAMETERS: ITIMEING_PARAMETER[] = [
  {
    id: "1",
    category: "FX",
    sub_categories: [
      {
        id: "1.01",
        title: "Exchange rates",
        values: [
          {
            title: "ExchangeRates",
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: "function",
              params: ["defaultCurrency"],
              fn: ({ defaultCurrency }: { defaultCurrency: ICurrency }) =>
                CURRENCY_LIST.map((c) => ({
                  id: `${c.id}_per_${defaultCurrency.id}`,
                  label: `${c.label}(${c.unit.label}/${defaultCurrency.unit.label})`,
                  unit: Object.values(PARAM_UNIT).find(
                    (u) => u?.id == `${c.id}_per_${defaultCurrency.id}`
                  ),
                })),
            },
            stickyRows: {
              type: "function",
              params: ["modelStartDate", "calculationPeriod"],
              fn: ({ modelStartDate, calculationPeriod }: any) => {
                const result = [];
                result.push(["Period", "Start date", "End date"]);
                for (let i = 0; i < calculationPeriod; i++) {
                  result.push([
                    i + 1,
                    moment(modelStartDate)
                      .add(i, "month")
                      .startOf("months")
                      .format("YY-MMM-DD"),
                    moment(modelStartDate)
                      .add(i, "month")
                      .endOf("months")
                      .format("YY-MMM-DD"),
                  ]);
                }
                return result;
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    category: "Technical inputs",
    sub_categories: [
      {
        id: "2.01",
        title: "Degradation input curves",
        values: [
          {
            title: "Degradation input curves",
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: "function",
              params: ["cyclesPerDay"],
              fn: ({ cyclesPerDay }: { cyclesPerDay: [] }) => cyclesPerDay,
            },
            stickyRows: {
              type: "function",
              params: ["calculationPeriod"],
              fn: ({ calculationPeriod }: any) => {
                const result = [];
                result.push(["", "Avg cycles per day"]);
                for (let i = 0; i < calculationPeriod; i++) {
                  result.push(["Year", i + 1]);
                }
                return result;
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "3",
    category: "Inflation",
    sub_categories: [],
  },
  {
    id: "4",
    category: "Devex",
    sub_categories: [],
  },
  {
    id: "5",
    category: "Capex",
    sub_categories: [
      {
        id: "5.01",
        title: "NREL Capex forecasts",
        values: [],
      },
    ],
  },
  {
    id: "6",
    category: "Revenue Summary",
    sub_categories: [],
  },
  {
    id: "7",
    category: "Modo revenue setup and summary",
    sub_categories: [],
  },

  {
    id: "8",
    category: "Modo revenue - 2 hour system",
    sub_categories: [],
  },
  {
    id: "9",
    category: "Modo revenue - 4 hour system",
    sub_categories: [],
  },
  {
    id: "10",
    category: "Modo revenue - 8 hour system",
    sub_categories: [],
  },
  {
    id: "11",
    category: "Afry overview",
    sub_categories: [],
  },
  {
    id: "12",
    category: "Other revenue",
    sub_categories: [],
  },
  {
    id: "13",
    category: "TNUoS",
    sub_categories: [],
  },
  {
    id: "14",
    category: "DUoS",
    sub_categories: [],
  },
  {
    id: "15",
    category: "National grid securities",
    sub_categories: [],
  },
];

export const INPUT_PARAMS: IInputParameter[] = [
  {
    id: "basic_project_inputs",
    title: "Basic Project Inputs",
    datum: [
      {
        id: "technology",
        title: "Technology",
        type: PARAM_TYPE.CHOICE.TECH,
        defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.TECH][0].id,
        required: "Must",
      },
      {
        id: "asset_name",
        title: "Asset Name",
        type: PARAM_TYPE.TEXT,
        required: "Must",
      },
      {
        id: "grid_connection_capacity",
        title: "Grid Connection Capacity",
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MW,
        defaultValue: 1000,
        minValue: 100,
        maxValue: 3000,
        required: "Must",
      },
      {
        id: "development_start_date",
        title: "Development Start Date",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2023-7-1",
        required: "Must",
      },
      {
        id: "grid_secured_date_offer_accepted",
        title: "Grid Secured Date (Offer Accepted)",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2024-1-2",
        required: "Must",
      },
      {
        id: "land_secured_date",
        title: "Land Secured Date",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2024-5-5",
        required: "Must",
      },
      {
        id: "investor_closing_date",
        title: "Investor Closing Date",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2024-1-1",
        required: "Must",
      },
      {
        id: "closing_of_dbt_agreement_date",
        title: "Closing of Debt Agreement Date",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2024-9-1",
        required: "Must",
      },
      {
        id: "grid_connection_date",
        title: "Grid Connection Date",
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: "2024-10-18",
        required: "Must",
      },
      // {
      // 	id: "region",
      // 	title: "Region",
      // 	type: PARAM_TYPE.CHOICE.REGION,
      // 	defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.REGION][0].id,

      // },
      {
        id: "planning_authority",
        title: "Planning authority",
        type: PARAM_TYPE.CHOICE.AUTHORITY,
        required: "Must",
      },
      {
        id: "land_size",
        title: "Land Size",
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.ACRES,
        defaultValue: 75,
        minValue: 10,
        required: "Must",
        maxValue: 250,
      },

      {
        id: "time_between_development_start_date_and_planning_permission_granted",
        title:
          "Time Between Development Start Date and Planning Permission Granted",
        type: PARAM_TYPE.INTEGER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 16,
        minValue: 12,
        maxValue: 30,
        required: "Must",
      },
      {
        id: "time_between_planning_permission_granted_and_rtb",
        title: "Time Between Planning Permission Granted and RtB",
        type: PARAM_TYPE.INTEGER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 6,
        minValue: 6,
        required: "Must",
        maxValue: 100,
      },
      {
        id: "length_of_construction",
        title: "Length of Construction",
        type: PARAM_TYPE.INTEGER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 12,
        minValue: 6,
        required: "Must",
        maxValue: 24,
      },
      {
        id: "length_of_operations",
        title: "Length of Operations",
        type: PARAM_TYPE.INTEGER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 480,
        minValue: 0,
        maxValue: 600,
        required: "Must",
      },
      {
        id: "length_of_decommissioning",
        title: "Length of Decommissioning",
        type: PARAM_TYPE.INTEGER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 6,
        minValue: 3,
        maxValue: 12,
        required: "Must",
      },
    ],
    children: [],
  },
  {
    id: "battery_assumption",
    title: "Battery Assumption",
    datum: [],
    children: [
      {
        id: "starting_assumption",
        title: "Starting Assumptions",
        datum: [
          {
            id: "battery_duration",
            title: "Battery Duration",
            type: PARAM_TYPE.CHOICE.DURATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][1].id,
          },
          // {
          // 	id: "degradation_forecast",
          // 	title: "Degradation forecast",
          // 	type: PARAM_TYPE.NUMBER,
          // 	defaultValue: 1.25,
          // 	maxValue: 2,
          // 	minValue: 1,
          // },
          {
            id: "degradation_forecast_retention_rate_data",
            title: "Degradation Forecast Retention Rate Data (%)",
            type: PARAM_TYPE.TABLE,
            //  Timing 2.01 Degradation input curvess
            stickyCols: {
              type: "function",
              params: [""],
              fn: () => [
                "Avg cycles per day(2.0)",
                "Avg cycles per day(1.5)",
                "Avg cycles per day(1.0)",
              ],
            },
            stickyRows: {
              type: "function",
              params: ["lengthOfOperations"],
              fn: ({ lengthOfOperations }: { lengthOfOperations: number }) => {
                const result = [];
                result.push(["", ""]);
                for (let i = 0; i < RETENTION_RATE_YEARS; i++)
                  result.push(["Year", i + 1]);
                return result;
              },
            },
            valueRange: "percentage",
            editable: "disabled",
          },
          {
            id: "battery_availablity",
            title: "Battery Availability",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 97,
          },
        ],
      },
      {
        id: "efficiency",
        title: "Efficiency",
        datum: [
          {
            id: "forecast_switch",
            title: "Switch for Fixed or Forecast",
            type: PARAM_TYPE.SWITCH.EFFICIENCY,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FIXED?.id,
          },
          {
            id: "fixed_battery_efficiency",
            title: "Fixed Battery Efficiency",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 85,
            isShow: {
              params: {
                global: [],
                local: ["forecast_switch"],
              },
              fn: ({ forecast_switch }: { forecast_switch: number }) =>
                forecast_switch !=
                SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FORECAST?.id,
            },
          },
          {
            id: "forecast_battery_efficiency",
            title: "Forecast Battery Efficiency (%)",
            type: PARAM_TYPE.TABLE,
            unit: null,

            stickyCols: {
              type: "function",
              params: ["forecastEfficiency"],
              fn: ({ forecastEfficiency }: { forecastEfficiency: [] }) =>
                forecastEfficiency,
            },
            stickyRows: {
              type: "function",
              params: ["calculationPeriod"],
              fn: () => {
                const result = [];
                result.push(["", "Avg cycles per day"]);
                for (
                  let i = 0;
                  i < MODEL_LAST_YEAR - MODEL_START_YEAR + 1;
                  i++
                ) {
                  result.push(["Year", MODEL_START_YEAR + i]);
                }
                return result;
              },
            },
            valueRange: "percentage",
            editable: "disabled",

            isShow: {
              params: {
                global: [],
                local: ["forecast_switch"],
              },
              fn: ({ forecast_switch }: { forecast_switch: number }) =>
                forecast_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FORECAST?.id,
            },
          },
        ],
      },
      {
        id: "disposal",
        title: "Disposal",
        datum: [
          {
            id: "disposal_switch",
            title: "Disposal Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
          },

          {
            id: "recycle_percentage",
            title: "Recycle Price as a Percentage of New Batteries",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 15,
            isShow: {
              params: {
                global: [],
                local: ["disposal_switch"],
              },
              fn: ({ disposal_switch }: { disposal_switch: number }) =>
                disposal_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "diposal_percentage",
            title: "Disposed of When Energy Retention Reaches",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 70,
            isShow: {
              params: {
                global: [],
                local: ["disposal_switch"],
              },
              fn: ({ disposal_switch }: { disposal_switch: number }) =>
                disposal_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },
      {
        id: "augmentation",
        title: "Augmentation",
        datum: [
          {
            id: "duration",
            title: "Battery Duration Match",
            type: PARAM_TYPE.TEXT,
            renderValue: {
              params: {
                local: [],
                global: ["battery_duration"],
              },
              fn: ({ battery_duration = 0 }: { battery_duration: number }) => {
                return battery_duration
                  ? `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                        battery_duration - 1
                      ].label
                    } hour system`
                  : "Not selected";
              },
            },
          },
          {
            id: "active_augmentation_switch",
            title: "Battery Augmentation Switch - Active",
            type: PARAM_TYPE.SWITCH.ONOFF,
            renderValue: {
              params: {
                local: [
                  "augmentation_switch_2",
                  "augmentation_switch_4",
                  "augmentation_switch_8",
                ],
                global: ["battery_duration"],
              },
              fn: ({
                battery_duration = 0,
                augmentation_switch_2,
                augmentation_switch_4,
                augmentation_switch_8,
              }: {
                battery_duration: number;
                augmentation_switch_2: number;
                augmentation_switch_4: number;
                augmentation_switch_8: number;
              }) => {
                return battery_duration == 1
                  ? augmentation_switch_2
                  : battery_duration == 2
                  ? augmentation_switch_4
                  : battery_duration == 3
                  ? augmentation_switch_8
                  : 0;
              },
            },
          },

          ...[...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length)].map(
            (_, index) => ({
              id:
                // index == 0
                // 	? "capex_forecast_scenario_data"
                // 	: "capex_forecast_scenario_data1",
                `augmentation_switch_${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                  index
                ].label
                  .toString()
                  .toLowerCase()}`,
              title: `Battery Augmentation Switch - ${CHOICE_DATA[
                PARAM_TYPE.CHOICE.DURATION
              ][index].label
                .toString()
                .toLowerCase()} Hour System`,
              type: PARAM_TYPE.SWITCH.ONOFF,
            })
          ),
          {
            id: "number_of_months_before_end_of_operations_to_stop_augmentation_and_disposals",
            title:
              "Number of Months Before End of Operations to Stop Augmentation and Disposals",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 120,
            maxValue: 240,
            minValue: 0,
            // isShow: {
            //   params: {
            //     global: [],
            //     local: ["augmentation_switch"],
            //   },
            //   fn: ({ augmentation_switch }: { augmentation_switch: number }) =>
            //     augmentation_switch ==
            //     SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            // },
          },
        ],
      },
      {
        id: "curtailment",
        title: "Curtailment",
        datum: [
          {
            id: "curtailment_switch",
            title: "Curtailment Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            editable: "disabled",
          },
          {
            id: "curtailment_percentage_to_reduce_operating_cycles",
            title: "Curtailment as a % to Reduce Operating Cycles",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            editable: "disabled",
            isShow: {
              params: {
                global: [],
                local: ["curtailment_switch"],
              },
              fn: ({ curtailment_switch }: { curtailment_switch: number }) =>
                curtailment_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "curtailment_start_date",
            title: "Curtailment Start Date",
            type: PARAM_TYPE.DATE,
            isShow: {
              params: {
                global: [],
                local: ["curtailment_switch"],
              },
              fn: ({ curtailment_switch }: { curtailment_switch: number }) =>
                curtailment_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
            editable: "disabled",
          },
          {
            id: "curtailment_end_date",
            title: "Curtailment End Date",
            editable: "disabled",
            type: PARAM_TYPE.DATE,
            isShow: {
              params: {
                global: [],
                local: ["curtailment_switch"],
              },
              fn: ({ curtailment_switch }: { curtailment_switch: number }) =>
                curtailment_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },
    ],
  },
  {
    id: "devex",
    title: "Devex",
    datum: [
      {
        id: "devex_switch",
        title: "Devex Switch",
        type: PARAM_TYPE.SWITCH.YESNO,
        renderValue: {
          params: {
            local: [],
            global: ["enterprise_value_switch"],
          },
          fn: ({
            enterprise_value_switch,
          }: {
            enterprise_value_switch: number;
          }) => {
            return enterprise_value_switch == 1 ? 0 : 1;
          },
        },
      },
      {
        id: "profile",
        title: "Devex Profile",
        type: PARAM_TYPE.CHOICE.DEVEX_PROFILE,
      },
      {
        id: "useful_economic_life_devex",
        title: "Useful Economic Life for Devex",
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.YEARS,
      },

      {
        id: "devex_profile_data",
        title: "Devex Profile Data (£'000)",
        type: PARAM_TYPE.TABLE,
        stickyRows: {
          type: "function",
          params: ["operationStartDate"],
          fn: ({
            operationStartDate = "2028-01-01",
          }: {
            operationStartDate: string;
          }) => {
            const result = [];
            result.push([""]);
            for (let i = 0; i < 24; i++) {
              result.push([`Month ${i + 1}`]);
            }
            return result;
          },
        },
        stickyCols: {
          type: "function",
          params: [],
          fn: () =>
            CHOICE_DATA[PARAM_TYPE.CHOICE.DEVEX_PROFILE].map((c) => c?.label),
        },
      },
    ],
  },
  {
    id: "capex",
    title: "Capex",
    datum: [],
    children: [
      {
        id: "batteries",
        title: "Batteries",
        datum: [
          {
            id: "battery_sensitivity",
            title: "Battery Sensitivity",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "battery_sensitivity_magnitude",
            title: "Battery Sensitivity Magnitude",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            minValue: -100,
            maxValue: 100,
            isShow: {
              params: {
                global: [],
                local: ["battery_sensitivity"],
              },
              fn: ({ battery_sensitivity }: { battery_sensitivity: number }) =>
                battery_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "batteries_forecast",
            title: "Forecast",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "forecast_selection",
                title: "Forecast selection(off:relative on:absolute)",
                type: PARAM_TYPE.SWITCH.ONOFF,
                editable: "disabled",
              },
              {
                id: "capex_forecast_scenario_choice",
                title: "Relative choice",
                editable: "disabled",
                type: PARAM_TYPE.CHOICE.RELATIVE_FORECAST,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 0,
                },
              },
              {
                id: "relative_inflation_profile",
                title: "Inflation profile - relative",
                editable: "disabled",
                type: PARAM_TYPE.CHOICE.INFLATION,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 0,
                },
              },
              {
                id: "relative_inflation_year",
                title: "Inflation base year - relative",
                editable: "disabled",
                type: PARAM_TYPE.YEAR,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 0,
                },
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST].length),
              ].map((_, index) => ({
                id: `capex_forecast_scenario_data_${CHOICE_DATA[
                  PARAM_TYPE.CHOICE.FORECAST
                ][index].label
                  .toString()
                  .toLowerCase()}`,
                title: `Relative capex movements by ${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST][index].label
                }`,
                editable: "disabled",
                type: PARAM_TYPE.TABLE,
                isShow: {
                  params: {
                    global: [],
                    local: [
                      "capex_forecast_scenario_choice",
                      "forecast_selection",
                    ],
                  },
                  fn: ({
                    capex_forecast_scenario_choice,
                    forecast_selection,
                  }: {
                    capex_forecast_scenario_choice: number;
                    forecast_selection: number;
                  }) =>
                    capex_forecast_scenario_choice == index + 1 &&
                    forecast_selection == 0,
                },
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].map(
                      (c) => `${c?.label}hour system`
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push("");
                    for (
                      let i = 0;
                      i < MODEL_LAST_YEAR - MODEL_START_YEAR + 3;
                      i++
                    ) {
                      result.push([INFLATION_START_YEAR + i]);
                    }
                    return result;
                  },
                },
              })),
              {
                id: "absolute_choice",
                title: "Absolute choice",
                type: PARAM_TYPE.CHOICE.ABSOLUTE_FORECAST,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 1,
                },
                editable: "disabled",
              },
              {
                id: "absolute_inflation_profile",
                title: "Inflation profile - absolute",
                type: PARAM_TYPE.CHOICE.INFLATION,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 1,
                },
                editable: "disabled",
              },
              {
                id: "absolute_inflation_year",
                title: "Absolute base year - relative",
                type: PARAM_TYPE.YEAR,
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_selection"],
                  },
                  fn: ({
                    forecast_selection,
                  }: {
                    forecast_selection: number;
                  }) => forecast_selection == 1,
                },
                editable: "disabled",
              },
              {
                id: "battery_duration_alert",
                title: "Battery duration alert",
                type: PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) => {
                    return !battery_duration
                      ? "Battery duration not selected"
                      : "OK";
                  },
                },
                isShow: {
                  params: {
                    global: ["battery_duration"],
                    local: [
                      "capex_forecast_scenario_choice",
                      "forecast_selection",
                    ],
                  },
                  fn: ({
                    battery_duration,
                    forecast_selection,
                  }: {
                    battery_duration: number;
                    forecast_selection: number;
                  }) => !battery_duration,
                },
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
              ].map((_, index) => ({
                id: `capex_forecast_scenario_data_${CHOICE_DATA[
                  PARAM_TYPE.CHOICE.DURATION
                ][index].label
                  .toString()
                  .toLowerCase()}`,
                title: `Absolute capex profile for ${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index].label
                }hour system`,
                editable: "disabled",
                type: PARAM_TYPE.TABLE,
                isShow: {
                  params: {
                    global: ["battery_duration"],
                    local: [
                      "capex_forecast_scenario_choice",
                      "forecast_selection",
                    ],
                  },
                  fn: ({
                    battery_duration,
                    forecast_selection,
                  }: {
                    battery_duration: number;
                    forecast_selection: number;
                  }) =>
                    forecast_selection == 1 && battery_duration == index + 1,
                },
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.ABSOLUTE_FORECAST].map(
                      (c) => `${c?.label}`
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push("");
                    for (let i = 0; i < 40; i++) {
                      result.push([INFLATION_START_YEAR + i]);
                    }
                    return result;
                  },
                },
              })),
            ],
          },
          {
            id: "supplier",
            title: "Supplier choice",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "supplier_choice",
                title: "Battery supplier choice",
                type: PARAM_TYPE.CHOICE.SUPPLIER,
                editable: "disabled",
              },
              {
                id: "cubes",
                title: "Battery cubes base price",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "live",
                    title: "Live",
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_KM_PER_HOUR,
                    renderValue: {
                      params: {
                        local: [
                          "supplier_choice",
                          "byd_latest",
                          "byd_july_inputs_kka",
                        ],
                        global: [],
                      },
                      fn: ({
                        supplier_choice,
                        byd_latest,
                        byd_july_inputs_kka,
                      }: {
                        supplier_choice: number;
                        byd_latest: number;
                        byd_july_inputs_kka: number;
                      }) => {
                        return supplier_choice == 1
                          ? byd_latest
                          : supplier_choice == 2
                          ? byd_july_inputs_kka
                          : "Supplier not selected";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER].length
                    ),
                  ].map((_, index) => ({
                    id: `${toSnakeCase(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][
                        index
                      ].label.toString()
                    )}`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][index].label
                    }`,
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_KM_PER_HOUR,
                  })),
                ],
              },
              {
                id: "ex_cubes",
                title:
                  "Battery excluding cubes base price (MV Skid, shipping, support etc)",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "live_ex",
                    title: "Live",
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_KM_PER_HOUR,
                    renderValue: {
                      params: {
                        local: [
                          "supplier_choice",
                          "byd_latest_ex",
                          "byd_july_inputs_kka_ex",
                        ],
                        global: [],
                      },
                      fn: ({
                        supplier_choice,
                        byd_latest_ex,
                        byd_july_inputs_kka_ex,
                      }: {
                        supplier_choice: number;
                        byd_latest_ex: number;
                        byd_july_inputs_kka_ex: number;
                      }) => {
                        return supplier_choice == 1
                          ? byd_latest_ex
                          : supplier_choice == 2
                          ? byd_july_inputs_kka_ex
                          : "Supplier not selected";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER].length
                    ),
                  ].map((_, index) => ({
                    id: `${toSnakeCase(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][
                        index
                      ].label.toString()
                    )}_ex`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][index].label
                    }`,
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_KM_PER_HOUR,
                  })),
                ],
              },
              {
                id: "quote_base_year",
                title: "Base year of quote",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "quote_base_year",
                    title: "Live",
                    type: PARAM_TYPE.TEXT,
                    editable: "disabled",
                    unit: PARAM_UNIT.YEAR,
                    renderValue: {
                      params: {
                        local: [
                          "supplier_choice",
                          "byd_latest_year",
                          "byd_july_inputs_kka_year",
                        ],
                        global: [],
                      },
                      fn: ({
                        supplier_choice,
                        byd_latest_year,
                        byd_july_inputs_kka_year,
                      }: {
                        supplier_choice: number;
                        byd_latest_year: number;
                        byd_july_inputs_kka_year: number;
                      }) => {
                        return supplier_choice == 1
                          ? byd_latest_year
                          : supplier_choice == 2
                          ? byd_july_inputs_kka_year
                          : "Supplier not selected";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER].length
                    ),
                  ].map((_, index) => ({
                    id: `${toSnakeCase(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][
                        index
                      ].label.toString()
                    )}_year`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.SUPPLIER][index].label
                    }`,
                    type: PARAM_TYPE.YEAR,
                    editable: "disabled",
                    unit: PARAM_UNIT.YEAR,
                  })),
                ],
              },
              {
                id: "bop_capex_aug",
                title: "BoP capex for augmentation",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "uplift_on_top_percentage",
                    title: `Uplift on top of augmentation batteries' capex to cover BoP`,
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    editable: "disabled",
                  },
                ],
              },
            ],
          },
          {
            id: "payment_profile",
            title: "Payment Profile",
            type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][0].id,
            editable: "disabled",
          },

          {
            id: "useful_economic_life",
            title: "Useful Economic Life",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEARS,
            minValue: 5,
            maxValue: 50,
            defaultValue: 15,
          },
          // {
          //   id: "battery_cubes",
          //   title: "Battery Cubes Base Price",
          //   type: PARAM_TYPE.GROUP,
          //   children: [
          //     {
          //       id: "capex_forecast_base_year_cubes",
          //       title: "Base Year",
          //       type: PARAM_TYPE.YEAR,
          //       unit: PARAM_UNIT.YEAR,
          //       minValue: 2021,
          //       maxValue: 2075,
          //       defaultValue: 2023,
          //     },
          //     ...[
          //       ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
          //     ].map((_, index) => ({
          //       id: `cubes_price_for_${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
          //         index
          //       ].label
          //         .toString()
          //         .toLowerCase()}`,
          //       title: `${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index].label
          //         .toString()
          //         .toLowerCase()} Hour System`,
          //       type: PARAM_TYPE.NUMBER,
          //       unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          //     })),
          //   ],
          // },
          // {
          //   id: "battery_excubes",
          //   title:
          //     "Battery Excluding Cubes Base Price(MV Skid, Shipping, Support etc)",
          //   type: PARAM_TYPE.GROUP,
          //   children: [
          //     {
          //       id: "capex_forecast_base_year_excubes",
          //       title: "Base Year",
          //       type: PARAM_TYPE.YEAR,
          //       unit: PARAM_UNIT.YEAR,
          //       minValue: 2021,
          //       maxValue: 2075,
          //       defaultValue: 2023,
          //     },
          //     ...[
          //       ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
          //     ].map((_, index) => ({
          //       id: `excubes_price_for_${CHOICE_DATA[
          //         PARAM_TYPE.CHOICE.DURATION
          //       ][index].label
          //         .toString()
          //         .toLowerCase()}`,
          //       title: `${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index].label
          //         .toString()
          //         .toLowerCase()} Hour System`,
          //       type: PARAM_TYPE.NUMBER,
          //       unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          //     })),
          //   ],
          // },
          // {
          //   id: "capex_forecast_inflation_profile",
          //   title: "Capex Forecast Inflation Profile",
          //   type: PARAM_TYPE.CHOICE.INFLATION,
          //   defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          // },
          // {
          //   id: "capex_forecast_inflation_base_year",
          //   title: "Capex Forecast Inflation Base Year",
          //   type: PARAM_TYPE.INTEGER,
          //   unit: PARAM_UNIT.YEAR,
          //   minValue: 2021,
          //   maxValue: 2075,
          //   defaultValue: 2023,
          // },
          // {
          //   id: "payment_profile",
          //   title: "Payment Profile",
          //   type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
          //   defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][0].id,
          // },

          // {
          //   id: "useful_economic_life",
          //   title: "Useful Economic Life",
          //   type: PARAM_TYPE.INTEGER,
          //   unit: PARAM_UNIT.YEARS,
          //   minValue: 5,
          //   maxValue: 50,
          //   defaultValue: 15,
          // },
          // {
          //   id: "capex_provision_months",
          //   title: "Capex Provision Months",
          //   type: PARAM_TYPE.INTEGER,
          //   unit: PARAM_UNIT.MONTHS,
          //   minValue: 0,
          //   maxValue: 6,
          //   defaultValue: 3,
          // },
        ],
      },
      {
        id: "excluding_batteries",
        title: "Excluding Batteries",
        datum: [
          {
            id: "excluding_battery_sensitivity",
            title: "Excluding Battery Sensitivity",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "excluding_battery_sensitivity_magnitude",
            title: "Excluding Battery Sensitivity Magnitude",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            minValue: -100,
            maxValue: 100,
            isShow: {
              params: {
                global: [],
                local: ["excluding_battery_sensitivity"],
              },
              fn: ({
                excluding_battery_sensitivity,
              }: {
                excluding_battery_sensitivity: number;
              }) =>
                excluding_battery_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
        children: [
          {
            id: "land",
            title: "Land",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "land_cost",
                title: "Land Purchase",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "capacity",
                title: "Capacity",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.MW,
                renderValue: {
                  params: {
                    local: [],
                    global: ["initial_capacity"],
                  },
                  fn: ({ initial_capacity }: { initial_capacity: string }) => {
                    return initial_capacity || "Not set";
                  },
                },
              },
              {
                id: "total_cost",
                title: "Total Cost",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.GBP_PRO_1000,
                renderValue: {
                  params: {
                    local: ["land_cost"],
                    global: ["initial_capacity"],
                  },
                  fn: ({
                    land_cost = 0,
                    initial_capacity,
                  }: {
                    land_cost: number;
                    initial_capacity: number;
                  }) => {
                    return initial_capacity && land_cost
                      ? initial_capacity * land_cost
                      : "";
                  },
                },
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                editable: "disabled",
              },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },

              {
                id: "capex_provision_months",
                title: "Capex Provision Months",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                minValue: 0,
                maxValue: 6,
              },
            ],
          },
          {
            id: "pooling_substation",
            title: "Pooling Substation",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "pooling_substation_cost",
                title: "Pooling Substation Cost",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 37.5,
                minValue: 0,
              },
              {
                id: "capacity",
                title: "Capacity",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.MW,
                renderValue: {
                  params: {
                    local: [],
                    global: ["initial_capacity"],
                  },
                  fn: ({ initial_capacity }: { initial_capacity: string }) => {
                    return initial_capacity || "Not set";
                  },
                },
              },
              {
                id: "total_cost",
                title: "Total Cost",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.GBP_PRO_1000,
                renderValue: {
                  params: {
                    local: ["pooling_substation_cost"],
                    global: ["initial_capacity"],
                  },
                  fn: ({
                    pooling_substation_cost = 0,
                    initial_capacity,
                  }: {
                    pooling_substation_cost: number;
                    initial_capacity: number;
                  }) => {
                    return initial_capacity && pooling_substation_cost
                      ? initial_capacity * pooling_substation_cost
                      : "";
                  },
                },
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][2].id,
                editable: "disabled",
              },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },

              {
                id: "capex_provision_months",
                title: "Capex Provision Months",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                minValue: 0,
                maxValue: 6,
                defaultValue: 3,
              },
            ],
          },
          {
            id: "transformers",
            title: "Transformers",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "transformers_cost",
                title: "Transformers Cost",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 19.166667,
              },
              {
                id: "capacity",
                title: "Capacity",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.MW,
                renderValue: {
                  params: {
                    local: [],
                    global: ["initial_capacity"],
                  },
                  fn: ({ initial_capacity }: { initial_capacity: string }) => {
                    return initial_capacity || "Not set";
                  },
                },
              },
              {
                id: "total_cost",
                title: "Total Cost",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.GBP_PRO_1000,
                renderValue: {
                  params: {
                    local: ["transformers_cost"],
                    global: ["initial_capacity"],
                  },
                  fn: ({
                    transformers_cost = 0,
                    initial_capacity,
                  }: {
                    transformers_cost: number;
                    initial_capacity: number;
                  }) => {
                    return initial_capacity && transformers_cost
                      ? initial_capacity * transformers_cost
                      : "";
                  },
                },
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][1].id,
                editable: "disabled",
              },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },

              {
                id: "capex_provision_months",
                title: "Capex Provision Months",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                minValue: 0,
                maxValue: 6,
                defaultValue: 3,
              },
            ],
          },
          {
            id: "balance_of_plant",
            title: "Balance of Plant",
            datum: [
              // {
              // 	id: "balance_of_plant_cost",
              // 	title: "Balance of plant cost",
              // 	type: PARAM_TYPE.NUMBER,
              // 	unit: PARAM_UNIT.GBP_PRO_1000,
              // 	minValue: 0,
              // 	renderValue: {
              // 		params: {
              // 			local: [
              // 			],
              // 			global: ["battery_duration"],
              // 		},
              // 		fn: ({
              // 			battery_duration = "1"
              // 		}: {
              // 			battery_duration: string

              // 		}) => {
              // 			return CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][parseInt(battery_duration) - 1].label
              // 		},
              // 	},
              // },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][2].id,
                editable: "disabled",
              },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },

              {
                id: "capex_provision_months",
                title: "Capex Provision Months",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                minValue: 0,
                maxValue: 6,
                defaultValue: 3,
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
              ].map((_, index) => ({
                id: `bop_cost_${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                }`,
                title: `Balance of Plant Cost for ${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                } Hour System`,
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: `balance_of_system_for_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title: "Balance of System",
                    type: PARAM_TYPE.GROUP,
                    children: [
                      {
                        id: `aggregated_cost_for_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Aggregated Cost",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `total_bop_for_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Total",
                        type: PARAM_TYPE.TEXT,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                        renderValue: {
                          params: {
                            local: [
                              "aggregated_cost_for_2",
                              "aggregated_cost_for_4",
                              "aggregated_cost_for_8",
                            ],
                            global: ["battery_duration"],
                          },
                          fn: ({
                            battery_duration = "1",
                            aggregated_cost_for_8 = 0,
                            aggregated_cost_for_4 = 0,
                            aggregated_cost_for_2 = 0,
                          }: {
                            battery_duration: string;
                            aggregated_cost_for_8: number;
                            aggregated_cost_for_4: number;
                            aggregated_cost_for_2: number;
                          }) => {
                            const value =
                              CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                                parseInt(battery_duration) - 1
                              ].label;
                            return value == 2
                              ? aggregated_cost_for_2
                              : value == 4
                              ? aggregated_cost_for_4
                              : value == 8
                              ? aggregated_cost_for_8
                              : "Not selected";
                          },
                        },
                      },
                    ],
                  },
                  {
                    id: `electrical_infrastructure_interconnection_for_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title: "Electrical Infrastructure and Interconnection",
                    type: PARAM_TYPE.GROUP,
                    children: [
                      {
                        id: `aggregated_cost_for_infra_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title:
                          "Aggregated Cost (Excluding any Items Noted Individually Below)",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `grid_connection_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Grid Connection",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `internal_and_control_connections_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Internal and Control Connections",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `power_electronics_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Power Electronics",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `writing_and_conduits_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Writing and Conduits",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `dc_cabling_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "DC Cabling",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `inverter_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Inverter",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `switch_gear_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Switch Gear",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `energy_management_system_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Energy Management System",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `monitors_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Monitors, Controls and Communications",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `total_infra_for_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Total",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                        renderValue: {
                          params: {
                            local: [
                              "aggregated_cost_for_infra_2",
                              "grid_connection_2",
                              "internal_and_control_connections_2",
                              "power_electronics_2",
                              "writing_and_conduits_2",
                              "dc_cabling_2",
                              "inverter_2",
                              "switch_gear_2",
                              "energy_management_system_2",
                              "monitors_2",
                              "aggregated_cost_for_infra_4",
                              "grid_connection_4",
                              "internal_and_control_connections_4",
                              "power_electronics_4",
                              "writing_and_conduits_4",
                              "dc_cabling_4",
                              "inverter_4",
                              "switch_gear_4",
                              "energy_management_system_4",
                              "monitors_4",
                              "aggregated_cost_for_infra_8",
                              "grid_connection_8",
                              "internal_and_control_connections_8",
                              "power_electronics_8",
                              "writing_and_conduits_8",
                              "dc_cabling_8",
                              "inverter_8",
                              "switch_gear_8",
                              "energy_management_system_8",
                              "monitors_8",
                            ],
                            global: ["battery_duration"],
                          },
                          fn: ({
                            battery_duration = "1",
                            aggregated_cost_for_infra_2 = 0,
                            grid_connection_2 = 0,
                            internal_and_control_connections_2 = 0,
                            power_electronics_2 = 0,
                            writing_and_conduits_2 = 0,
                            dc_cabling_2 = 0,
                            inverter_2 = 0,
                            switch_gear_2 = 0,
                            energy_management_system_2 = 0,
                            monitors_2 = 0,
                            aggregated_cost_for_infra_4 = 0,
                            grid_connection_4 = 0,
                            internal_and_control_connections_4 = 0,
                            power_electronics_4 = 0,
                            writing_and_conduits_4 = 0,
                            dc_cabling_4 = 0,
                            inverter_4 = 0,
                            switch_gear_4 = 0,
                            energy_management_system_4 = 0,
                            monitors_4 = 0,
                            aggregated_cost_for_infra_8 = 0,
                            grid_connection_8 = 0,
                            internal_and_control_connections_8 = 0,
                            power_electronics_8 = 0,
                            writing_and_conduits_8 = 0,
                            dc_cabling_8 = 0,
                            inverter_8 = 0,
                            switch_gear_8 = 0,
                            energy_management_system_8 = 0,
                            monitors_8 = 0,
                          }: {
                            battery_duration: string;
                            aggregated_cost_for_infra_2: number;
                            grid_connection_2: number;
                            internal_and_control_connections_2: number;
                            power_electronics_2: number;
                            writing_and_conduits_2: number;
                            dc_cabling_2: number;
                            inverter_2: number;
                            switch_gear_2: number;
                            energy_management_system_2: number;
                            monitors_2: number;
                            aggregated_cost_for_infra_4: number;
                            grid_connection_4: number;
                            internal_and_control_connections_4: number;
                            power_electronics_4: number;
                            writing_and_conduits_4: number;
                            dc_cabling_4: number;
                            inverter_4: number;
                            switch_gear_4: number;
                            energy_management_system_4: number;
                            monitors_4: number;
                            aggregated_cost_for_infra_8: number;
                            grid_connection_8: number;
                            internal_and_control_connections_8: number;
                            power_electronics_8: number;
                            writing_and_conduits_8: number;
                            dc_cabling_8: number;
                            inverter_8: number;
                            switch_gear_8: number;
                            energy_management_system_8: number;
                            monitors_8: number;
                          }) => {
                            const value =
                              CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                                parseInt(battery_duration) - 1
                              ].label;
                            return value == 2
                              ? aggregated_cost_for_infra_2 * 1 +
                                  grid_connection_2 * 1 +
                                  internal_and_control_connections_2 * 1 +
                                  power_electronics_2 * 1 +
                                  writing_and_conduits_2 * 1 +
                                  dc_cabling_2 * 1 +
                                  inverter_2 * 1 +
                                  switch_gear_2 * 1 +
                                  energy_management_system_2 * 1 +
                                  monitors_2 * 1
                              : value == 4
                              ? aggregated_cost_for_infra_4 * 1 +
                                grid_connection_4 * 1 +
                                internal_and_control_connections_4 * 1 +
                                power_electronics_4 * 1 +
                                writing_and_conduits_4 * 1 +
                                dc_cabling_4 * 1 +
                                inverter_4 * 1 +
                                switch_gear_4 * 1 +
                                energy_management_system_4 * 1 +
                                monitors_4 * 1
                              : value == 8
                              ? aggregated_cost_for_infra_8 * 1 +
                                grid_connection_8 * 1 +
                                internal_and_control_connections_8 * 1 +
                                power_electronics_8 * 1 +
                                writing_and_conduits_8 * 1 +
                                dc_cabling_8 * 1 +
                                inverter_8 * 1 +
                                switch_gear_8 * 1 +
                                energy_management_system_8 * 1 +
                                monitors_8 * 1
                              : "";
                          },
                        },
                      },
                      // {
                      // 	id: `total_for_infra_${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label}`,
                      // 	title: "Total",
                      // 	type: PARAM_TYPE.NUMBER,
                      // 	unit: PARAM_UNIT.GBP_PRO_1000,
                      // 	isShow: {
                      // 		params: {
                      // 			global: [],
                      // 			local: [`aggregated_cost_for_infra_${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label}`, `grid_connection_${d.label}`, `internal_and_control_connections_${d.label}`, `power_electronics_${d.label}`, `writing_and_conduits_${d.label}`, `dc_cabling_${d.label}`, `inverter_${d.label}`, `switch_gear_${d.label}`, `energy_management_system_${d.label}`, `monitors_${d.label}`, `total_for_infra_${d.label}`],
                      // 		},
                      // 		fn: ({
                      // 			enterprise_value_switch,
                      // 		}: {
                      // 			enterprise_value_switch: number;
                      // 		}) =>
                      // 			enterprise_value_switch ==
                      // 			SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                      // 	},
                      // },
                    ],
                  },
                  {
                    id: `generation_equipment_for_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title:
                      "Generation Equipment and Infrastructure (Excluding Batteries - Battery Pack, Battery Container and Battery Management System)",
                    type: PARAM_TYPE.GROUP,
                    children: [
                      {
                        id: `aggregated_cost_for_generation_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title:
                          "Aggregated Cost (Excluding any Items Noted Individually Below)",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `plant_construction_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Plant Construction",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `power_plant_equipment_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Power Plant Equipment",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `thermal_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Thermal Management System",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `fire_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Fire Suppression System",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `battery_racking_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Battery Racking",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `foundation_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Foundation for Battery and Inverters",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `inverter_housing_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Inverter Housing",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `total_generation_for_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Total",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                        renderValue: {
                          params: {
                            local: [
                              "aggregated_cost_for_generation_2",
                              "plant_construction_2",
                              "power_plant_equipment_2",
                              "thermal_2",
                              "fire_2",
                              "battery_racking_2",
                              "foundation_2",
                              "inverter_housing_2",
                              "aggregated_cost_for_generation_4",
                              "plant_construction_4",
                              "power_plant_equipment_4",
                              "thermal_4",
                              "fire_4",
                              "battery_racking_4",
                              "foundation_4",
                              "inverter_housing_4",
                              "aggregated_cost_for_generation_8",
                              "plant_construction_8",
                              "power_plant_equipment_8",
                              "thermal_8",
                              "fire_8",
                              "battery_racking_8",
                              "foundation_8",
                              "inverter_housing_8",
                            ],
                            global: ["battery_duration"],
                          },
                          fn: ({
                            battery_duration = "1",
                            aggregated_cost_for_generation_2 = 0,
                            plant_construction_2 = 0,
                            power_plant_equipment_2 = 0,
                            thermal_2 = 0,
                            fire_2 = 0,
                            battery_racking_2 = 0,
                            foundation_2 = 0,
                            inverter_housing_2 = 0,
                            aggregated_cost_for_generation_4 = 0,
                            plant_construction_4 = 0,
                            power_plant_equipment_4 = 0,
                            thermal_4 = 0,
                            fire_4 = 0,
                            battery_racking_4 = 0,
                            foundation_4 = 0,
                            inverter_housing_4 = 0,
                            aggregated_cost_for_generation_8 = 0,
                            plant_construction_8 = 0,
                            power_plant_equipment_8 = 0,
                            thermal_8 = 0,
                            fire_8 = 0,
                            battery_racking_8 = 0,
                            foundation_8 = 0,
                            inverter_housing_8 = 0,
                          }: {
                            battery_duration: string;
                            aggregated_cost_for_generation_2: number;
                            plant_construction_2: number;
                            power_plant_equipment_2: number;
                            thermal_2: number;
                            fire_2: number;
                            battery_racking_2: number;
                            foundation_2: number;
                            inverter_housing_2: number;
                            aggregated_cost_for_generation_4: number;
                            plant_construction_4: number;
                            power_plant_equipment_4: number;
                            thermal_4: number;
                            fire_4: number;
                            battery_racking_4: number;
                            foundation_4: number;
                            inverter_housing_4: number;
                            aggregated_cost_for_generation_8: number;
                            plant_construction_8: number;
                            power_plant_equipment_8: number;
                            thermal_8: number;
                            fire_8: number;
                            battery_racking_8: number;
                            foundation_8: number;
                            inverter_housing_8: number;
                          }) => {
                            const value =
                              CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                                parseInt(battery_duration) - 1
                              ].label;
                            return value == 2
                              ? aggregated_cost_for_generation_2 * 1 +
                                  plant_construction_2 * 1 +
                                  power_plant_equipment_2 * 1 +
                                  thermal_2 * 1 +
                                  fire_2 * 1 +
                                  battery_racking_2 * 1 +
                                  foundation_2 * 1 +
                                  inverter_housing_2 * 1
                              : value == 4
                              ? aggregated_cost_for_generation_4 * 1 +
                                plant_construction_4 * 1 +
                                power_plant_equipment_4 * 1 +
                                thermal_4 * 1 +
                                fire_4 * 1 +
                                battery_racking_4 * 1 +
                                foundation_4 * 1 +
                                inverter_housing_4 * 1
                              : value == 8
                              ? aggregated_cost_for_generation_8 * 1 +
                                plant_construction_8 * 1 +
                                power_plant_equipment_8 * 1 +
                                thermal_8 * 1 +
                                fire_8 * 1 +
                                battery_racking_8 * 1 +
                                foundation_8 * 1 +
                                inverter_housing_8 * 1
                              : "";
                          },
                        },
                      },
                    ],
                  },
                  {
                    id: `installation_for_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title:
                      "Installation, Indirect and Owner's Costs (Excluding Land Lease, Devex and Financing)",
                    type: PARAM_TYPE.GROUP,
                    children: [
                      {
                        id: `aggregated_cost_for_installation_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title:
                          "Aggregated Cost (Excluding any Items Noted Individually Below)",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `enabling_works_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Enabling Works(Groundworks)",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `distributable_labor_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Distributable Labour and Materials",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `engineering_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Engineering",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `start_up_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Start Up and Commissioning",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `legal_costs_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Legal Costs",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `construction_insurance_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Construction Insurance",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `consulting_and_advisory_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Consulting and Advisory",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `meters_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Meters",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `power_during_cons_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Power During Construction and Generator Hire",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `software_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "IT, Software and Coms",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `water_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Water",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                      {
                        id: `total_install_for_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Total",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                        renderValue: {
                          params: {
                            local: [
                              "aggregated_cost_for_installation_2",
                              "enabling_works_2",
                              "distributable_labor_2",
                              "engineering_2",
                              "start_up_2",
                              "legal_costs_2",
                              "construction_insurance_2",
                              "consulting_and_advisory_2",
                              "meters_2",
                              "power_during_cons_2",
                              "software_2",
                              "water_2",
                              "aggregated_cost_for_installation_4",
                              "enabling_works_4",
                              "distributable_labor_4",
                              "engineering_4",
                              "start_up_4",
                              "legal_costs_4",
                              "construction_insurance_4",
                              "consulting_and_advisory_4",
                              "meters_4",
                              "power_during_cons_4",
                              "software_4",
                              "water_4",
                              "aggregated_cost_for_installation_8",
                              "enabling_works_8",
                              "distributable_labor_8",
                              "engineering_8",
                              "start_up_8",
                              "legal_costs_8",
                              "construction_insurance_8",
                              "consulting_and_advisory_8",
                              "meters_8",
                              "power_during_cons_8",
                              "software_8",
                              "water_8",
                            ],
                            global: ["battery_duration"],
                          },
                          fn: ({
                            battery_duration = "1",
                            aggregated_cost_for_installation_2 = 0,
                            enabling_works_2 = 0,
                            distributable_labor_2 = 0,
                            engineering_2 = 0,
                            start_up_2 = 0,
                            legal_costs_2 = 0,
                            construction_insurance_2 = 0,
                            consulting_and_advisory_2 = 0,
                            meters_2 = 0,
                            power_during_cons_2 = 0,
                            software_2 = 0,
                            water_2 = 0,
                            aggregated_cost_for_installation_4 = 0,
                            enabling_works_4 = 0,
                            distributable_labor_4 = 0,
                            engineering_4 = 0,
                            start_up_4 = 0,
                            legal_costs_4 = 0,
                            construction_insurance_4 = 0,
                            consulting_and_advisory_4 = 0,
                            meters_4 = 0,
                            power_during_cons_4 = 0,
                            software_4 = 0,
                            water_4 = 0,
                            aggregated_cost_for_installation_8 = 0,
                            enabling_works_8 = 0,
                            distributable_labor_8 = 0,
                            engineering_8 = 0,
                            start_up_8 = 0,
                            legal_costs_8 = 0,
                            construction_insurance_8 = 0,
                            consulting_and_advisory_8 = 0,
                            meters_8 = 0,
                            power_during_cons_8 = 0,
                            software_8 = 0,
                            water_8 = 0,
                          }: {
                            battery_duration: string;
                            aggregated_cost_for_installation_2: number;
                            enabling_works_2: number;
                            distributable_labor_2: number;
                            engineering_2: number;
                            start_up_2: number;
                            legal_costs_2: number;
                            construction_insurance_2: number;
                            consulting_and_advisory_2: number;
                            meters_2: number;
                            power_during_cons_2: number;
                            software_2: number;
                            water_2: number;
                            aggregated_cost_for_installation_4: number;
                            enabling_works_4: number;
                            distributable_labor_4: number;
                            engineering_4: number;
                            start_up_4: number;
                            legal_costs_4: number;
                            construction_insurance_4: number;
                            consulting_and_advisory_4: number;
                            meters_4: number;
                            power_during_cons_4: number;
                            software_4: number;
                            water_4: number;
                            aggregated_cost_for_installation_8: number;
                            enabling_works_8: number;
                            distributable_labor_8: number;
                            engineering_8: number;
                            start_up_8: number;
                            legal_costs_8: number;
                            construction_insurance_8: number;
                            consulting_and_advisory_8: number;
                            meters_8: number;
                            power_during_cons_8: number;
                            software_8: number;
                            water_8: number;
                          }) => {
                            const value =
                              CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                                parseInt(battery_duration) - 1
                              ].label;
                            return value == 2
                              ? aggregated_cost_for_installation_2 * 1 +
                                  enabling_works_2 * 1 +
                                  distributable_labor_2 * 1 +
                                  engineering_2 * 1 +
                                  start_up_2 * 1 +
                                  legal_costs_2 * 1 +
                                  construction_insurance_2 * 1 +
                                  consulting_and_advisory_2 * 1 +
                                  meters_2 * 1 +
                                  power_during_cons_2 * 1 +
                                  software_2 * 1 +
                                  water_2 * 1
                              : value == 4
                              ? aggregated_cost_for_installation_4 * 1 +
                                enabling_works_4 * 1 +
                                distributable_labor_4 * 1 +
                                engineering_4 * 1 +
                                start_up_4 * 1 +
                                legal_costs_4 * 1 +
                                construction_insurance_4 * 1 +
                                consulting_and_advisory_4 * 1 +
                                meters_4 * 1 +
                                power_during_cons_4 * 1 +
                                software_4 * 1 +
                                water_4 * 1
                              : value == 8
                              ? aggregated_cost_for_installation_8 * 1 +
                                enabling_works_8 * 1 +
                                distributable_labor_8 * 1 +
                                engineering_8 * 1 +
                                start_up_8 * 1 +
                                legal_costs_8 * 1 +
                                construction_insurance_8 * 1 +
                                consulting_and_advisory_8 * 1 +
                                meters_8 * 1 +
                                power_during_cons_8 * 1 +
                                software_8 * 1 +
                                water_8 * 1
                              : "";
                          },
                        },
                      },
                    ],
                  },
                  {
                    id: `contingency_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title: "Contingency",
                    type: PARAM_TYPE.GROUP,
                    children: [
                      {
                        id: `contingency_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                        }`,
                        title: "Contingency",
                        type: PARAM_TYPE.NUMBER,
                        unit: PARAM_UNIT.GBP_PRO_1000,
                      },
                    ],
                  },
                  {
                    id: `total_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index]?.label
                    }`,
                    title: "Total",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000,
                    renderValue: {
                      params: {
                        local: [
                          "aggregated_cost_for_2",
                          "aggregated_cost_for_4",
                          "aggregated_cost_for_8",
                          "contingency_2",
                          "contingency_4",
                          "contingency_8",
                          "aggregated_cost_for_infra_2",
                          "grid_connection_2",
                          "internal_and_control_connections_2",
                          "power_electronics_2",
                          "writing_and_conduits_2",
                          "dc_cabling_2",
                          "inverter_2",
                          "switch_gear_2",
                          "energy_management_system_2",
                          "monitors_2",
                          "aggregated_cost_for_infra_4",
                          "grid_connection_4",
                          "internal_and_control_connections_4",
                          "power_electronics_4",
                          "writing_and_conduits_4",
                          "dc_cabling_4",
                          "inverter_4",
                          "switch_gear_4",
                          "energy_management_system_4",
                          "monitors_4",
                          "aggregated_cost_for_infra_8",
                          "grid_connection_8",
                          "internal_and_control_connections_8",
                          "power_electronics_8",
                          "writing_and_conduits_8",
                          "dc_cabling_8",
                          "inverter_8",
                          "switch_gear_8",
                          "energy_management_system_8",
                          "monitors_8",
                          "aggregated_cost_for_generation_2",
                          "plant_construction_2",
                          "power_plant_equipment_2",
                          "thermal_2",
                          "fire_2",
                          "battery_racking_2",
                          "foundation_2",
                          "inverter_housing_2",
                          "aggregated_cost_for_generation_4",
                          "plant_construction_4",
                          "power_plant_equipment_4",
                          "thermal_4",
                          "fire_4",
                          "battery_racking_4",
                          "foundation_4",
                          "inverter_housing_4",
                          "aggregated_cost_for_generation_8",
                          "plant_construction_8",
                          "power_plant_equipment_8",
                          "thermal_8",
                          "fire_8",
                          "battery_racking_8",
                          "foundation_8",
                          "inverter_housing_8",
                          "aggregated_cost_for_installation_2",
                          "enabling_works_2",
                          "distributable_labor_2",
                          "engineering_2",
                          "start_up_2",
                          "legal_costs_2",
                          "construction_insurance_2",
                          "consulting_and_advisory_2",
                          "meters_2",
                          "power_during_cons_2",
                          "software_2",
                          "water_2",
                          "aggregated_cost_for_installation_4",
                          "enabling_works_4",
                          "distributable_labor_4",
                          "engineering_4",
                          "start_up_4",
                          "legal_costs_4",
                          "construction_insurance_4",
                          "consulting_and_advisory_4",
                          "meters_4",
                          "power_during_cons_4",
                          "software_4",
                          "water_4",
                          "aggregated_cost_for_installation_8",
                          "enabling_works_8",
                          "distributable_labor_8",
                          "engineering_8",
                          "start_up_8",
                          "legal_costs_8",
                          "construction_insurance_8",
                          "consulting_and_advisory_8",
                          "meters_8",
                          "power_during_cons_8",
                          "software_8",
                          "water_8",
                        ],
                        global: ["battery_duration"],
                      },
                      fn: ({
                        battery_duration = "1",
                        aggregated_cost_for_2,
                        aggregated_cost_for_4,
                        aggregated_cost_for_8,
                        contingency_2 = 0,
                        contingency_4 = 0,
                        contingency_8 = 0,
                        aggregated_cost_for_infra_2 = 0,
                        grid_connection_2 = 0,
                        internal_and_control_connections_2 = 0,
                        power_electronics_2 = 0,
                        writing_and_conduits_2 = 0,
                        dc_cabling_2 = 0,
                        inverter_2 = 0,
                        switch_gear_2 = 0,
                        energy_management_system_2 = 0,
                        monitors_2 = 0,
                        aggregated_cost_for_infra_4 = 0,
                        grid_connection_4 = 0,
                        internal_and_control_connections_4 = 0,
                        power_electronics_4 = 0,
                        writing_and_conduits_4 = 0,
                        dc_cabling_4 = 0,
                        inverter_4 = 0,
                        switch_gear_4 = 0,
                        energy_management_system_4 = 0,
                        monitors_4 = 0,
                        aggregated_cost_for_infra_8 = 0,
                        grid_connection_8 = 0,
                        internal_and_control_connections_8 = 0,
                        power_electronics_8 = 0,
                        writing_and_conduits_8 = 0,
                        dc_cabling_8 = 0,
                        inverter_8 = 0,
                        switch_gear_8 = 0,
                        energy_management_system_8 = 0,
                        monitors_8 = 0,
                        aggregated_cost_for_generation_2 = 0,
                        plant_construction_2 = 0,
                        power_plant_equipment_2 = 0,
                        thermal_2 = 0,
                        fire_2 = 0,
                        battery_racking_2 = 0,
                        foundation_2 = 0,
                        inverter_housing_2 = 0,
                        aggregated_cost_for_generation_4 = 0,
                        plant_construction_4 = 0,
                        power_plant_equipment_4 = 0,
                        thermal_4 = 0,
                        fire_4 = 0,
                        battery_racking_4 = 0,
                        foundation_4 = 0,
                        inverter_housing_4 = 0,
                        aggregated_cost_for_generation_8 = 0,
                        plant_construction_8 = 0,
                        power_plant_equipment_8 = 0,
                        thermal_8 = 0,
                        fire_8 = 0,
                        battery_racking_8 = 0,
                        foundation_8 = 0,
                        inverter_housing_8 = 0,
                        aggregated_cost_for_installation_2 = 0,
                        enabling_works_2 = 0,
                        distributable_labor_2 = 0,
                        engineering_2 = 0,
                        start_up_2 = 0,
                        legal_costs_2 = 0,
                        construction_insurance_2 = 0,
                        consulting_and_advisory_2 = 0,
                        meters_2 = 0,
                        power_during_cons_2 = 0,
                        software_2 = 0,
                        water_2 = 0,
                        aggregated_cost_for_installation_4 = 0,
                        enabling_works_4 = 0,
                        distributable_labor_4 = 0,
                        engineering_4 = 0,
                        start_up_4 = 0,
                        legal_costs_4 = 0,
                        construction_insurance_4 = 0,
                        consulting_and_advisory_4 = 0,
                        meters_4 = 0,
                        power_during_cons_4 = 0,
                        software_4 = 0,
                        water_4 = 0,
                        aggregated_cost_for_installation_8 = 0,
                        enabling_works_8 = 0,
                        distributable_labor_8 = 0,
                        engineering_8 = 0,
                        start_up_8 = 0,
                        legal_costs_8 = 0,
                        construction_insurance_8 = 0,
                        consulting_and_advisory_8 = 0,
                        meters_8 = 0,
                        power_during_cons_8 = 0,
                        software_8 = 0,
                        water_8 = 0,
                      }: {
                        battery_duration: string;
                        aggregated_cost_for_2: number;
                        aggregated_cost_for_4: number;
                        aggregated_cost_for_8: number;
                        contingency_2: number;
                        contingency_4: number;
                        contingency_8: number;
                        aggregated_cost_for_infra_2: number;
                        grid_connection_2: number;
                        internal_and_control_connections_2: number;
                        power_electronics_2: number;
                        writing_and_conduits_2: number;
                        dc_cabling_2: number;
                        inverter_2: number;
                        switch_gear_2: number;
                        energy_management_system_2: number;
                        monitors_2: number;
                        aggregated_cost_for_infra_4: number;
                        grid_connection_4: number;
                        internal_and_control_connections_4: number;
                        power_electronics_4: number;
                        writing_and_conduits_4: number;
                        dc_cabling_4: number;
                        inverter_4: number;
                        switch_gear_4: number;
                        energy_management_system_4: number;
                        monitors_4: number;
                        aggregated_cost_for_infra_8: number;
                        grid_connection_8: number;
                        internal_and_control_connections_8: number;
                        power_electronics_8: number;
                        writing_and_conduits_8: number;
                        dc_cabling_8: number;
                        inverter_8: number;
                        switch_gear_8: number;
                        energy_management_system_8: number;
                        monitors_8: number;
                        aggregated_cost_for_generation_2: number;
                        plant_construction_2: number;
                        power_plant_equipment_2: number;
                        thermal_2: number;
                        fire_2: number;
                        battery_racking_2: number;
                        foundation_2: number;
                        inverter_housing_2: number;
                        aggregated_cost_for_generation_4: number;
                        plant_construction_4: number;
                        power_plant_equipment_4: number;
                        thermal_4: number;
                        fire_4: number;
                        battery_racking_4: number;
                        foundation_4: number;
                        inverter_housing_4: number;
                        aggregated_cost_for_generation_8: number;
                        plant_construction_8: number;
                        power_plant_equipment_8: number;
                        thermal_8: number;
                        fire_8: number;
                        battery_racking_8: number;
                        foundation_8: number;
                        inverter_housing_8: number;
                        aggregated_cost_for_installation_2: number;
                        enabling_works_2: number;
                        distributable_labor_2: number;
                        engineering_2: number;
                        start_up_2: number;
                        legal_costs_2: number;
                        construction_insurance_2: number;
                        consulting_and_advisory_2: number;
                        meters_2: number;
                        power_during_cons_2: number;
                        software_2: number;
                        water_2: number;
                        aggregated_cost_for_installation_4: number;
                        enabling_works_4: number;
                        distributable_labor_4: number;
                        engineering_4: number;
                        start_up_4: number;
                        legal_costs_4: number;
                        construction_insurance_4: number;
                        consulting_and_advisory_4: number;
                        meters_4: number;
                        power_during_cons_4: number;
                        software_4: number;
                        water_4: number;
                        aggregated_cost_for_installation_8: number;
                        enabling_works_8: number;
                        distributable_labor_8: number;
                        engineering_8: number;
                        start_up_8: number;
                        legal_costs_8: number;
                        construction_insurance_8: number;
                        consulting_and_advisory_8: number;
                        meters_8: number;
                        power_during_cons_8: number;
                        software_8: number;
                        water_8: number;
                      }) => {
                        const value =
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                            parseInt(battery_duration) - 1
                          ].label;
                        return value == 2
                          ? aggregated_cost_for_2 * 1 +
                              aggregated_cost_for_infra_2 * 1 +
                              grid_connection_2 * 1 +
                              internal_and_control_connections_2 * 1 +
                              power_electronics_2 * 1 +
                              writing_and_conduits_2 * 1 +
                              dc_cabling_2 * 1 +
                              inverter_2 * 1 +
                              switch_gear_2 * 1 +
                              energy_management_system_2 * 1 +
                              monitors_2 * 1 +
                              aggregated_cost_for_generation_2 * 1 +
                              plant_construction_2 * 1 +
                              power_plant_equipment_2 * 1 +
                              thermal_2 * 1 +
                              fire_2 * 1 +
                              battery_racking_2 * 1 +
                              foundation_2 * 1 +
                              inverter_housing_2 * 1 +
                              aggregated_cost_for_installation_2 * 1 +
                              enabling_works_2 * 1 +
                              distributable_labor_2 * 1 +
                              engineering_2 * 1 +
                              start_up_2 * 1 +
                              legal_costs_2 * 1 +
                              construction_insurance_2 * 1 +
                              consulting_and_advisory_2 * 1 +
                              meters_2 * 1 +
                              power_during_cons_2 * 1 +
                              software_2 * 1 +
                              water_2 * 1 +
                              contingency_2 * 1
                          : value == 4
                          ? aggregated_cost_for_4 * 1 +
                            aggregated_cost_for_infra_4 * 1 +
                            grid_connection_4 * 1 +
                            internal_and_control_connections_4 * 1 +
                            power_electronics_4 * 1 +
                            writing_and_conduits_4 * 1 +
                            dc_cabling_4 * 1 +
                            inverter_4 * 1 +
                            switch_gear_4 * 1 +
                            energy_management_system_4 * 1 +
                            monitors_4 * 1 +
                            aggregated_cost_for_generation_4 * 1 +
                            plant_construction_4 * 1 +
                            power_plant_equipment_4 * 1 +
                            thermal_4 * 1 +
                            fire_4 * 1 +
                            battery_racking_4 * 1 +
                            foundation_4 * 1 +
                            inverter_housing_4 * 1 +
                            aggregated_cost_for_installation_4 * 1 +
                            enabling_works_4 * 1 +
                            distributable_labor_4 * 1 +
                            engineering_4 * 1 +
                            start_up_4 * 1 +
                            legal_costs_4 * 1 +
                            construction_insurance_4 * 1 +
                            consulting_and_advisory_4 * 1 +
                            meters_4 * 1 +
                            power_during_cons_4 * 1 +
                            software_4 * 1 +
                            water_4 * 1 +
                            contingency_4 * 1
                          : value == 8
                          ? aggregated_cost_for_8 * 1 +
                            aggregated_cost_for_infra_8 * 1 +
                            grid_connection_8 * 1 +
                            internal_and_control_connections_8 * 1 +
                            power_electronics_8 * 1 +
                            writing_and_conduits_8 * 1 +
                            dc_cabling_8 * 1 +
                            inverter_8 * 1 +
                            switch_gear_8 * 1 +
                            energy_management_system_8 * 1 +
                            monitors_8 * 1 +
                            aggregated_cost_for_generation_8 * 1 +
                            plant_construction_8 * 1 +
                            power_plant_equipment_8 * 1 +
                            thermal_8 * 1 +
                            fire_8 * 1 +
                            battery_racking_8 * 1 +
                            foundation_8 * 1 +
                            inverter_housing_8 * 1 +
                            aggregated_cost_for_installation_8 * 1 +
                            enabling_works_8 * 1 +
                            distributable_labor_8 * 1 +
                            engineering_8 * 1 +
                            start_up_8 * 1 +
                            legal_costs_8 * 1 +
                            construction_insurance_8 * 1 +
                            consulting_and_advisory_8 * 1 +
                            meters_8 * 1 +
                            power_during_cons_8 * 1 +
                            software_8 * 1 +
                            water_8 * 1 +
                            contingency_8 * 1
                          : "";
                      },
                    },
                  },
                ],
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) => {
                    return battery_duration == index + 1;
                  },
                },
              })),
            ],
          },
          {
            id: "substation_build_dev",
            title: "Substation build development and capex premium",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "substation_build_dev_cost",
                title: "Substation build development and capex premium cost",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
                defaultValue: 19.166667,
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][1].id,
                editable: "disabled",
              },
              // {
              //   id: "capex_provision_months",
              //   title: "Capex Provision Months",
              //   type: PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.MONTHS,
              //   minValue: 0,
              //   maxValue: 6,
              //   defaultValue: 3,
              // },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },
            ],
          },
          {
            id: "solar_replacement",
            title: "Solar EPC(need replacement)",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "solar_replacement_cost",
                title: "Solar EPC(need replacement) cost",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][1].id,
                editable: "disabled",
              },
              // {
              //   id: "capex_provision_months",
              //   title: "Capex Provision Months",
              //   type: PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.MONTHS,
              //   minValue: 0,
              //   maxValue: 6,
              //   defaultValue: 3,
              // },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },
              {
                id: "solar_panel_price_per_mw",
                title: "EPC solar pannel",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                editable: "disabled",
              },
              {
                id: "solar_replacement_inflation",
                title: "Inflation profile - solar panel price",
                type: PARAM_TYPE.CHOICE.INFLATION,
                editable: "disabled",
              },
              {
                id: "solar_replacement_base_year",
                title: "Base year - solar panel price",
                type: PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
                editable: "disabled",
              },
              {
                id: "solar_operation_length",
                title: "Length of operation",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                editable: "disabled",
              },
            ],
          },
          {
            id: "solar",
            title: "Solar EPC(no replacement)",
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: "solar_cost",
                title: "Solar EPC(no replacement) cost",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][1].id,
                editable: "disabled",
              },
              // {
              //   id: "capex_provision_months",
              //   title: "Capex Provision Months",
              //   type: PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.MONTHS,
              //   minValue: 0,
              //   maxValue: 6,
              //   defaultValue: 3,
              // },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
              },
            ],
          },
          {
            id: "enterprise_value",
            title: "Enterprise Value - Development Fee",
            datum: [
              {
                id: "enterprise_value_switch",
                title: "Switch",
                type: PARAM_TYPE.SWITCH.ONOFF,
                defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                editable: "disabled",
              },

              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY,
              //   isShow: {
              //     params: {
              //       global: [],
              //       local: ['enterprise_value_switch']
              //     },
              //     fn: ({
              //       enterprise_value_switch
              //     }: {
              //       enterprise_value_switch: number;
              //     }) =>
              //       enterprise_value_switch ==
              //       SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
              //   }
              // },
              {
                id: "enterprise_value_data",
                title: "Enterprise Value Data",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "development_fee_hour_1",
                    title: "Development Fee Hour 1",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_2",
                    title: "Development Fee Hour 2",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_3",
                    title: "Development Fee Hour 3",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_4",
                    title: "Development Fee Hour 4",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_5",
                    title: "Development Fee Hour 5",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_6",
                    title: "Development Fee Hour 6",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_7",
                    title: "Development Fee Hour 7",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "development_fee_hour_8",
                    title: "Development Fee Hour 8",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    defaultValue: 37.5,
                  },
                  {
                    id: "battery_duration",
                    title: "Current Battery Duration",
                    type: PARAM_TYPE.TEXT,
                    unit: PARAM_UNIT.HOUR,
                    renderValue: {
                      params: {
                        local: [],
                        global: ["battery_duration"],
                      },
                      fn: ({
                        battery_duration,
                      }: {
                        battery_duration: string;
                      }) => {
                        return battery_duration
                          ? CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                              parseInt(battery_duration) - 1
                            ].label
                          : "Not selected";
                      },
                    },
                  },
                  {
                    id: "total_development_fee",
                    title: "Total Development Fee",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                    // defaultValue: 37.5,
                    renderValue: {
                      params: {
                        local: [
                          "development_fee_hour_1",
                          "development_fee_hour_2",
                          "development_fee_hour_3",
                          "development_fee_hour_4",
                          "development_fee_hour_5",
                          "development_fee_hour_6",
                          "development_fee_hour_7",
                          "development_fee_hour_8",
                        ],
                        global: ["battery_duration"],
                      },
                      fn: ({
                        development_fee_hour_1 = "0",
                        development_fee_hour_2 = "0",
                        development_fee_hour_3 = "0",
                        development_fee_hour_4 = "0",
                        development_fee_hour_5 = "0",
                        development_fee_hour_6 = "0",
                        development_fee_hour_7 = "0",
                        development_fee_hour_8 = "0",
                        battery_duration,
                      }: {
                        development_fee_hour_1: string;
                        development_fee_hour_2: string;
                        development_fee_hour_3: string;
                        development_fee_hour_4: string;
                        development_fee_hour_5: string;
                        development_fee_hour_6: string;
                        development_fee_hour_7: string;
                        development_fee_hour_8: string;
                        battery_duration: string;
                      }) => {
                        if (parseInt(battery_duration) == 3) {
                          let val = parseFloat(development_fee_hour_1) || 0;
                          val += parseFloat(development_fee_hour_2);
                          val += parseFloat(development_fee_hour_3);
                          val += parseFloat(development_fee_hour_4);
                          val += parseFloat(development_fee_hour_5);
                          val += parseFloat(development_fee_hour_6);
                          val += parseFloat(development_fee_hour_7);
                          val += parseFloat(development_fee_hour_8);

                          return val;
                        } else if (parseInt(battery_duration) == 2) {
                          let val = parseFloat(development_fee_hour_1) || 0;
                          val += parseFloat(development_fee_hour_2);
                          val += parseFloat(development_fee_hour_3);
                          val += parseFloat(development_fee_hour_4);

                          return val;
                        } else if (parseInt(battery_duration) == 1) {
                          let val = parseFloat(development_fee_hour_1) || 0;
                          val += parseFloat(development_fee_hour_2);

                          return val;
                        } else return 0;
                      },
                    },
                  },
                ],

                isShow: {
                  params: {
                    global: [],
                    local: ["enterprise_value_switch"],
                  },
                  fn: ({
                    enterprise_value_switch,
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "payment_profile",
                title: "Payment Profile",
                editable: "disabled",
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                defaultValue:
                  CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][0].id,
                isShow: {
                  params: {
                    global: [],
                    local: ["enterprise_value_switch"],
                  },
                  fn: ({
                    enterprise_value_switch,
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "dev_fee_payment_profile",
                title: "Development Payment Profile",
                type: PARAM_TYPE.GROUP,
                editable: "disabled",
                children: [
                  {
                    id: "percent_investor_closing_date",
                    title: "Payment % at Investor Closing Date",
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.PERCENTAGE,
                    renderValue: {
                      params: {
                        local: [
                          "percent_rtb",
                          "percent_land_secured_date",
                          "percent_grid_secured_date",
                          "percent_closing_debt_agreement",
                          "percent_fully_consented",
                          "percent_cod",
                        ],
                        global: [],
                      },
                      fn: ({
                        percent_rtb = 0,
                        percent_land_secured_date = 0,
                        percent_grid_secured_date = 0,
                        percent_closing_debt_agreement = 0,
                        percent_fully_consented = 0,
                        percent_cod = 0,
                      }: {
                        percent_rtb: number;
                        percent_land_secured_date: number;
                        percent_grid_secured_date: number;
                        percent_closing_debt_agreement: number;
                        percent_fully_consented: number;
                        percent_cod: number;
                      }) => {
                        return (
                          100 -
                          (percent_rtb * 1 +
                            percent_land_secured_date * 1 +
                            percent_grid_secured_date * 1 +
                            percent_closing_debt_agreement * 1 +
                            percent_fully_consented * 1 +
                            percent_cod * 1)
                        );
                      },
                    },
                  },
                  {
                    id: "percent_land_secured_date",
                    title: "Payment % at Land Secured Date",
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                  {
                    id: "percent_grid_secured_date",
                    title: "Payment % at Grid Secured Date",
                    type: PARAM_TYPE.NUMBER,
                    editable: "disabled",
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                  {
                    id: "percent_closing_debt_agreement",
                    title: "Payment % at Closing of Debt Agreement Date",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    editable: "disabled",
                  },
                  {
                    id: "percent_fully_consented",
                    title: "Payment % at Fully Consented",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    editable: "disabled",
                  },
                  {
                    id: "percent_rtb",
                    title: "Payment % at RtB",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    editable: "disabled",
                  },
                  {
                    id: "percent_cod",
                    title: "Payment % at COD",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    editable: "disabled",
                  },
                ],
                isShow: {
                  params: {
                    global: [],
                    local: ["payment_profile"],
                  },
                  fn: ({ payment_profile }: { payment_profile: number }) =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE][
                      payment_profile - 1
                    ]?.label == "Development fee payment profile",
                },
              },
              {
                id: "useful_economic_life",
                title: "Useful Economic Life",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
                minValue: 5,
                maxValue: 50,
                defaultValue: 40,
                isShow: {
                  params: {
                    global: [],
                    local: ["enterprise_value_switch"],
                  },
                  fn: ({
                    enterprise_value_switch,
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "capex_provision_months",
                title: "Capex Provision Months",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                minValue: 0,
                maxValue: 6,
                isShow: {
                  params: {
                    global: [],
                    local: ["enterprise_value_switch"],
                  },
                  fn: ({
                    enterprise_value_switch,
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
            ],
          },
        ],
      },
      {
        id: "capex_payment_profile_data",
        title: "Capex Payment Profile Data",
        datum: [
          // {
          //   id: 'operation_start_date',
          //   title: 'COD and operation start date',
          //   type: PARAM_TYPE.DATE
          //   //  this date comes from operation start date.
          //   // only visible, not changeable
          // },
          {
            id: "capex_payment_profiles",
            title: "Capex Payment Profiles (%)",
            type: PARAM_TYPE.TABLE,
            stickyRows: {
              type: "function",
              params: ["operationStartDate"],
              fn: ({
                operationStartDate = "2028-01-01",
              }: {
                operationStartDate: string;
              }) => {
                const result = [];
                result.push([
                  "CapexMilestonePaymentList",
                  moment(operationStartDate).format("DD-MMM-YY"),
                ]);
                for (let i = 0; i < 30; i++) {
                  result.push([
                    i + 1 - 30,
                    `COD ${i + 1 - 30}`,
                    moment(operationStartDate)
                      .add(i - 29, "month")
                      .endOf("month")
                      .format("DD-MMM-YY"),
                  ]);
                }
                return result;
              },
            },
            stickyCols: {
              type: "function",
              params: ["cyclesPerDay"],

              //

              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE].map(
                  (c) => c?.label
                ),
            },
            valueRange: "percentage",
            editable: "disabled",
          },
        ],
      },
    ],
  },
  {
    id: "revenue",
    title: "Revenue",
    datum: [],
    children: [
      {
        id: "setup",
        title: "Setup",
        datum: [
          {
            id: "battery_duration",
            title: "Current Battery Duration",
            type: PARAM_TYPE.TEXT,
            unit: PARAM_UNIT.HOUR,
            renderValue: {
              params: {
                local: [],
                global: ["battery_duration"],
              },
              fn: ({ battery_duration }: { battery_duration: string }) => {
                return battery_duration
                  ? CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                      parseInt(battery_duration) - 1
                    ]?.label
                  : "Not selected";
              },
            },
          },
          {
            id: "revenue_sensitivity",
            title: "Revenue Sensitivity",
            type: PARAM_TYPE.SWITCH.YESNO,
          },
          {
            id: "revenue_sensitivity_magnitude",
            title: "Revenue Sensitivity Magnitude",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            minValue: -100,
            maxValue: 100,
            isShow: {
              params: {
                global: [],
                local: ["revenue_sensitivity"],
              },
              fn: ({ revenue_sensitivity }: { revenue_sensitivity: number }) =>
                revenue_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "ramp_rate",
            title: "Ramp rate restriction",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "ramp_rate_switch",
                title: "Ramp rate restriction switch",
                type: PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "ramp_rate_percentage",
                title: "Ramp rate percentage",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                minValue: -100,
                maxValue: 100,
                isShow: {
                  params: {
                    global: [],
                    local: ["ramp_rate_switch"],
                  },
                  fn: ({ ramp_rate_switch }: { ramp_rate_switch: number }) =>
                    ramp_rate_switch == 1,
                },
              },
            ],
          },
          {
            id: "forecast_provider",
            title: "Forecast Provider",
            // editable: "disabled",
            type: PARAM_TYPE.CHOICE.FORECAST_PROVIDER,
          },
          ...[
            ...new Array(
              CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER].length
            ),
          ].map((d, index) => ({
            id: `region_for_${CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER][
              index
            ].label
              .toString()
              .toLowerCase()}`,
            title: `Region for ${CHOICE_DATA[
              PARAM_TYPE.CHOICE.FORECAST_PROVIDER
            ][index].label.toString()}`,
            type:
              index == 0
                ? PARAM_TYPE.CHOICE.MODO_REGION
                : index == 1
                ? PARAM_TYPE.CHOICE.AFRY_REGION
                : PARAM_TYPE.CHOICE.BARINGA_REGION,
            isShow: {
              params: {
                global: [],
                local: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == index + 1,
            },
          })),
          {
            id: "revenue_inflation",
            title: "Revenue Inflation",
            editable: "disabled",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][7].id,
          },
          {
            id: "revenue_inflation_base_year",
            title: "Inflaion Base Year",
            type: PARAM_TYPE.INTEGER,
            editable: "disabled",
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
            defaultValue: 2023,
          },
          {
            id: "bespoke_cycle_active",
            title: "Bespoke cycle active",
            // editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          ...[
            ...new Array(
              CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER].length
            ),
          ].map((d, index) => ({
            id: `provider_assumptions_for_${CHOICE_DATA[
              PARAM_TYPE.CHOICE.FORECAST_PROVIDER
            ][index].label
              .toString()
              .toLowerCase()}`,
            type: PARAM_TYPE.GROUP,
            title: `Provider Assumptions for ${
              CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER][index].label
            }`,
            isShow: {
              params: {
                global: [],
                local: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == index + 1,
            },
            children: [
              {
                id: `efficiency_for_${CHOICE_DATA[
                  PARAM_TYPE.CHOICE.FORECAST_PROVIDER
                ][index].label
                  .toString()
                  .toLowerCase()}`,
                title: "Efficiency",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: `inflation_for_${CHOICE_DATA[
                  PARAM_TYPE.CHOICE.FORECAST_PROVIDER
                ][index].label
                  .toString()
                  .toLowerCase()}`,
                title: `${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER][index].label
                } Inflation`,
                editable: "disabled",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: `inflation_base_year_for_${CHOICE_DATA[
                  PARAM_TYPE.CHOICE.FORECAST_PROVIDER
                ][index].label
                  .toString()
                  .toLowerCase()}`,
                title: `Inflation Base Year for ${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER][index].label
                }`,
                type: PARAM_TYPE.YEAR,
                editable: "disabled",
                unit: PARAM_UNIT.YEAR,
                minValue: 2021,
                maxValue: 2075,
              },
              {
                id: `trading_strategy`,
                title: "Trading Strategy",
                type: PARAM_TYPE.CHOICE.STRATEGY,
                // editable: "disabled",
                isShow: {
                  params: {
                    global: [],
                    local: ["forecast_provider"],
                  },
                  fn: ({ forecast_provider }: { forecast_provider: number }) =>
                    forecast_provider == 1,
                },
              },
            ],
          })),
        ],
      },
      {
        id: "forecast_provider_data",
        title: "Forecast Provider Data",
        datum: [
          {
            id: "modo_data",
            title: "Modo Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 1,
            },
            children: [
              {
                id: "average_wholesale_day_ahead_price_for_modo",
                title: "Wholesale Day Ahead Price for Modo (/MWh)",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Avg wholesale day ahead price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ["Period", "Start date", "End date"],
                    ...[...new Array(LAST_QUARTER_NUMBER)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index * 3, "month")
                        .format("D-MMM-YY"),
                      moment(modelStartDate)
                        .add(index * 3 + 2, "month")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "battery_duration_alert",
                title: "Battery duration alert",
                type: PARAM_TYPE.TEXT,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) => {
                    return !battery_duration;
                  },
                },
                renderValue: {
                  params: {
                    local: [],
                    global: [],
                  },
                  fn: () => {
                    return "Not set";
                  },
                },
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
              ].map((_, index1) => ({
                id: `modo_${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                }hour`,
                title: `${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                } Hour System`,
                editable: "disabled",
                type: PARAM_TYPE.GROUP,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) =>
                    battery_duration == index1 + 1,
                },
                children: [
                  {
                    id: "trading_strategy_alert",
                    title: "Trading strategy alert",
                    type: PARAM_TYPE.TEXT,
                    isShow: {
                      params: {
                        local: [],
                        global: ["trading_strategy"],
                      },
                      fn: ({
                        trading_strategy,
                      }: {
                        trading_strategy: number;
                      }) => {
                        return !trading_strategy;
                      },
                    },
                    renderValue: {
                      params: {
                        local: [],
                        global: [],
                      },
                      fn: () => {
                        return "Not set";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.STRATEGY].length
                    ),
                  ].map((_, index2) => ({
                    id: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.STRATEGY][
                        index2
                      ].label.toString().toLowerCase
                    }`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.STRATEGY][index2].label
                    }`,
                    type: PARAM_TYPE.GROUP,
                    isShow: {
                      params: {
                        local: [],
                        global: ["trading_strategy"],
                      },
                      fn: ({
                        trading_strategy,
                      }: {
                        trading_strategy: number;
                      }) => trading_strategy == index2 + 1,
                    },
                    children: [
                      {
                        id: "modo_region_alert",
                        title: "Modo region alert",
                        type: PARAM_TYPE.TEXT,
                        isShow: {
                          params: {
                            local: [],
                            global: ["region_for_modo"],
                          },
                          fn: ({
                            region_for_modo,
                          }: {
                            region_for_modo: number;
                          }) => {
                            return !region_for_modo;
                          },
                        },
                        renderValue: {
                          params: {
                            local: [],
                            global: [],
                          },
                          fn: () => {
                            return "Not set";
                          },
                        },
                      },
                      ...[
                        ...new Array(
                          CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION].length
                        ),
                      ].map((_, index3) => ({
                        id: `modo_${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                        }hour_${CHOICE_DATA[PARAM_TYPE.CHOICE.STRATEGY][
                          index2
                        ].label
                          .toString()
                          .toLowerCase()}_${CHOICE_DATA[
                          PARAM_TYPE.CHOICE.MODO_REGION
                        ][index3].label
                          .toString()
                          .toLowerCase()}`,
                        title: `${
                          CHOICE_DATA[PARAM_TYPE.CHOICE.MODO_REGION][index3]
                            .label
                        } (/MW/quarter)`,
                        type: PARAM_TYPE.TABLE,
                        editable: "disabled",
                        isShow: {
                          params: {
                            local: [],
                            global: ["region_for_modo"],
                          },
                          fn: ({
                            region_for_modo,
                          }: {
                            region_for_modo: number;
                          }) => region_for_modo == index3 + 1,
                        },
                        stickyCols: {
                          type: "function",
                          params: [""],
                          fn: () => REGION_PARAMS,
                        },
                        stickyRows: {
                          type: "function",
                          params: [
                            "extendedCalculationPeriod",
                            "modelStartDate",
                          ],
                          fn: ({
                            modelStartDate,
                            extendedCalculationPeriod,
                          }: {
                            extendedCalculationPeriod: number;
                            modelStartDate: string;
                          }) => [
                            ["Period", "Start date", "End date"],
                            ...[...new Array(LAST_QUARTER_NUMBER)].map(
                              (d, index) => [
                                index + 1,
                                moment(modelStartDate)
                                  .add(index * 3, "month")
                                  .format("D-MMM-YY"),
                                moment(modelStartDate)
                                  .add(index * 3 + 2, "month")
                                  .endOf("month")
                                  .format("D-MMM-YY"),
                              ]
                            ),
                          ],
                        },
                      })),
                    ],
                  })),
                ],
              })),
            ],
            // isShow: {
            // 	params: {
            // 		local: [],
            // 		global: ["battery_duration", "forecast_provider", "trading_strategy", 'region_for_modo'],
            // 	},
            // 	fn: ({
            // 		battery_duration,
            // 		forecast_provider,
            // 		trading_strategy,
            // 		region_for_modo
            // 	}: {
            // 		battery_duration: number;
            // 		forecast_provider: number;
            // 		trading_strategy: number;
            // 		region_for_modo: number

            // 	}) => {
            // 		console.log("battery_duration", battery_duration, region_for_modo, forecast_provider)
            // 		return forecast_provider == 1 && region_for_modo != 0 && battery_duration != 0 && trading_strategy != 0
            // 	},
            // },
          },
          {
            id: "afry_data",
            title: "Afry Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 2,
            },
            children: [
              {
                id: "average_wholesale_day_ahead_price_for_afry",
                title: "Wholesale Day Ahead Price for Afry",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Avg wholesale day ahead price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    [""],
                    ...[
                      ...new Array(MODEL_LAST_YEAR - MODEL_START_YEAR + 1),
                    ].map((_, index) => [2023 + index]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "battery_duration_alert",
                title: "Battery duration alert",
                type: PARAM_TYPE.TEXT,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) => {
                    return !battery_duration;
                  },
                },
                renderValue: {
                  params: {
                    local: [],
                    global: [],
                  },
                  fn: () => {
                    return "Not set";
                  },
                },
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
              ].map((_, index1) => ({
                id: `afry_${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                }hour`,
                title: `${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                } Hour System`,
                type: PARAM_TYPE.GROUP,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) =>
                    battery_duration == index1 + 1,
                },
                children: [
                  {
                    id: "afry_region_alert",
                    title: "Afry region alert",
                    type: PARAM_TYPE.TEXT,
                    isShow: {
                      params: {
                        local: [],
                        global: ["region_for_afry"],
                      },
                      fn: ({
                        region_for_afry,
                      }: {
                        region_for_afry: number;
                      }) => {
                        return !region_for_afry;
                      },
                    },
                    renderValue: {
                      params: {
                        local: [],
                        global: [],
                      },
                      fn: () => {
                        return "Not set";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.AFRY_REGION].length
                    ),
                  ].map((_, index2) => ({
                    id: `afry_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                    }hour_${CHOICE_DATA[PARAM_TYPE.CHOICE.AFRY_REGION][
                      index2
                    ].label
                      .toString()
                      .toLowerCase()}`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.AFRY_REGION][index2].label
                    }`,
                    editable: "disabled",
                    type: PARAM_TYPE.TABLE,
                    isShow: {
                      params: {
                        local: [],
                        global: ["region_for_afry"],
                      },
                      fn: ({ region_for_afry }: { region_for_afry: number }) =>
                        region_for_afry == index2 + 1,
                    },
                    stickyCols: {
                      type: "function",
                      params: [""],
                      fn: () => AFRY_PARAMS,
                    },
                    stickyRows: {
                      type: "function",
                      params: ["calculationPeriod", "modelStartDate"],
                      fn: ({}: {}) => [
                        [""],
                        ...[...new Array(53)].map((_, index) => [2023 + index]),
                      ],
                    },
                  })),
                ],
              })),
            ],
          },
          {
            id: "baringa_data",
            title: "Baringa Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 3,
            },
            children: [
              {
                id: "average_wholesale_day_ahead_price_for_baringa",
                title: "Wholesale Day Ahead Price for Baringa",
                type: PARAM_TYPE.TABLE,
                editable: "disabled",
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Avg wholesale day ahead price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ["Period", "Start date", "End date"],
                    ...[...new Array(calculationPeriod)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index * 3, "month")
                        .format("D-MMM-YY"),
                      moment(modelStartDate)
                        .add(index * 3 + 2, "month")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
              },
              {
                id: "battery_duration_alert",
                title: "Battery duration alert",
                type: PARAM_TYPE.TEXT,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) => {
                    return !battery_duration;
                  },
                },
                renderValue: {
                  params: {
                    local: [],
                    global: [],
                  },
                  fn: () => {
                    return "Not set";
                  },
                },
              },
              ...[
                ...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length),
              ].map((_, index1) => ({
                id: `afry_${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                }hour`,
                title: `${
                  CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                }hour system`,
                editable: "disabled",
                type: PARAM_TYPE.GROUP,
                isShow: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration: number }) =>
                    battery_duration == index1 + 1,
                },
                children: [
                  {
                    id: "baringa_region_alert",
                    title: "Baringa region alert",
                    type: PARAM_TYPE.TEXT,
                    isShow: {
                      params: {
                        local: [],
                        global: ["region_for_baringa"],
                      },
                      fn: ({
                        region_for_baringa,
                      }: {
                        region_for_baringa: number;
                      }) => {
                        return !region_for_baringa;
                      },
                    },
                    renderValue: {
                      params: {
                        local: [],
                        global: [],
                      },
                      fn: () => {
                        return "Not set";
                      },
                    },
                  },
                  ...[
                    ...new Array(
                      CHOICE_DATA[PARAM_TYPE.CHOICE.BARINGA_REGION].length
                    ),
                  ].map((_, index2) => ({
                    id: `baringa_${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][index1].label
                    }hour_${CHOICE_DATA[PARAM_TYPE.CHOICE.BARINGA_REGION][
                      index2
                    ].label
                      .toString()
                      .toLowerCase()}`,
                    title: `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.BARINGA_REGION][index2]
                        .label
                    }`,
                    type: PARAM_TYPE.TABLE,
                    isShow: {
                      params: {
                        local: [],
                        global: ["region_for_baringa"],
                      },
                      fn: ({
                        region_for_baringa,
                      }: {
                        region_for_baringa: number;
                      }) => region_for_baringa == index2 + 1,
                    },
                    stickyCols: {
                      type: "function",
                      params: [""],
                      fn: () => BARINGA_PARAMS,
                    },
                    stickyRows: {
                      type: "function",
                      params: ["calculationPeriod", "modelStartDate"],
                      fn: ({
                        modelStartDate,
                        calculationPeriod,
                      }: {
                        calculationPeriod: number;
                        modelStartDate: string;
                      }) => [
                        ["Year"],
                        ...[
                          ...new Array(MODEL_LAST_YEAR - MODEL_START_YEAR + 1),
                        ].map((_, index) => [index + MODEL_START_YEAR]),
                      ],
                    },
                  })),
                ],
              })),
            ],
          },
          {
            id: "modo_solar_data",
            title: "Modo - Solar Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 4,
            },
            children: [
              {
                id: "modo_solar_wholesale_market_price",
                title: "Wholesale market price (/MWh)",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Wholesale market price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ["Period", "Start date", "End date"],
                    ...[...new Array(LAST_QUARTER_NUMBER)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index * 3, "month")
                        .format("D-MMM-YY"),
                      moment(modelStartDate)
                        .add(index * 3 + 2, "month")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
            ],
          },
          {
            id: "afry_solar_data",
            title: "Afry - Solar Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 5,
            },
            children: [
              {
                id: "afrt_solar_wholesale_market_price",
                title: "Wholesale market price (/MWh)",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Wholesale market price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ["Period", "Start date", "End date"],
                    ...[...new Array(LAST_QUARTER_NUMBER)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index * 3, "month")
                        .format("D-MMM-YY"),
                      moment(modelStartDate)
                        .add(index * 3 + 2, "month")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
            ],
          },
          {
            id: "baringa_solar_data",
            title: "Baringa - Solar Data",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                local: [],
                global: ["forecast_provider"],
              },
              fn: ({ forecast_provider }: { forecast_provider: number }) =>
                forecast_provider == 6,
            },
            children: [
              {
                id: "baringa_solar_wholesale_market_price",
                title: "Wholesale market price (/MWh)",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: "function",
                  params: [""],
                  fn: () => {
                    const data = ["Wholesale market price"];
                    return data;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    modelStartDate,
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ["Period", "Start date", "End date"],
                    ...[...new Array(LAST_QUARTER_NUMBER)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index * 3, "month")
                        .format("D-MMM-YY"),
                      moment(modelStartDate)
                        .add(index * 3 + 2, "month")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
            ],
          },
        ],
      },
      {
        id: "solar_tech",
        title: "Solar",
        datum: [
          {
            id: "solar_switch",
            title: "Solar asset switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "solar_tracking",
            title: "Solar tracking switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ["solar_switch"],
              },
              fn: ({ solar_switch }: { solar_switch: number }) =>
                solar_switch == 1,
            },
          },
          {
            id: "pv_energy_production",
            title: "Annual PV energy production",
            editable: "disabled",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KWH_PER_KWP,
            isShow: {
              params: {
                global: [],
                local: ["solar_switch"],
              },
              fn: ({ solar_switch }: { solar_switch: number }) =>
                solar_switch == 1,
            },
          },
          {
            id: "extra_solar_tracking_percentage",
            title: "Extra energy production due to solar tracking",
            editable: "disabled",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ["solar_switch"],
              },
              fn: ({ solar_switch }: { solar_switch: number }) =>
                solar_switch == 1,
            },
          },
          {
            id: "solar_panel_retention_rate",
            title: "Solar panel retention rate(%)",
            editable: "disabled",
            type: PARAM_TYPE.TABLE,
            unit: PARAM_UNIT.PERCENTAGE,
            stickyCols: {
              type: "function",
              params: [""],
              fn: ({}: {}) => ["Retention rate"],
            },
            stickyRows: {
              type: "function",
              params: ["calculationPeriod"],
              fn: ({ calculationPeriod }: any) => {
                const result = [];
                result.push(["", ""]);
                for (let i = 0; i < 51; i++) {
                  result.push(["Year", i + 1]);
                }
                return result;
              },
            },
            isShow: {
              params: {
                global: [],
                local: ["solar_switch"],
              },
              fn: ({ solar_switch }: { solar_switch: number }) =>
                solar_switch == 1,
            },
            valueRange: "percentage",
          },
        ],
      },
      {
        id: "rego",
        title: "REGO",
        datum: [
          {
            id: "rego_switch",
            title: "REGO revenue switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "rego_unit_price",
            title: "REGO unit price",
            type: PARAM_TYPE.NUMBER,
            editable: "disabled",
            unit: PARAM_UNIT.GBP_PER_MWH,
            isShow: {
              params: {
                global: [],
                local: ["rego_switch"],
              },
              fn: ({ rego_switch }: { rego_switch: number }) =>
                rego_switch == 1,
            },
          },
          {
            id: "rego_inflation",
            title: "Inflation",
            editable: "disabled",
            type: PARAM_TYPE.CHOICE.INFLATION,
            isShow: {
              params: {
                global: [],
                local: ["rego_switch"],
              },
              fn: ({ rego_switch }: { rego_switch: number }) =>
                rego_switch == 1,
            },
          },
          {
            id: "rego_inflation_year",
            title: "Base year",
            type: PARAM_TYPE.YEAR,
            editable: "disabled",
            unit: PARAM_UNIT.YEAR,
            isShow: {
              params: {
                global: [],
                local: ["rego_switch"],
              },
              fn: ({ rego_switch }: { rego_switch: number }) =>
                rego_switch == 1,
            },
          },
        ],
      },
      {
        id: "cfd",
        title: "CfD",
        datum: [
          {
            id: "cfd_switch",
            title: "CfD revenue switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "cfd_unit_price",
            title: "CfD unit price",
            type: PARAM_TYPE.NUMBER,
            editable: "disabled",
            unit: PARAM_UNIT.GBP_PER_MWH,
            isShow: {
              params: {
                global: [],
                local: ["cfd_switch"],
              },
              fn: ({ cfd_switch }: { cfd_switch: number }) => cfd_switch == 1,
            },
          },
          {
            id: "cfd_inflation",
            title: "Inflation",
            editable: "disabled",
            type: PARAM_TYPE.CHOICE.INFLATION,
            isShow: {
              params: {
                global: [],
                local: ["cfd_switch"],
              },
              fn: ({ cfd_switch }: { cfd_switch: number }) => cfd_switch == 1,
            },
          },
          {
            id: "cfd_inflation_year",
            title: "Base year",
            type: PARAM_TYPE.YEAR,
            editable: "disabled",
            unit: PARAM_UNIT.YEAR,
            isShow: {
              params: {
                global: [],
                local: ["cfd_switch"],
              },
              fn: ({ cfd_switch }: { cfd_switch: number }) => cfd_switch == 1,
            },
          },
        ],
      },
      {
        id: "embedded_benefits",
        title: "Embedded benefits",
        datum: [
          {
            id: "embedded_benefits_switch",
            title: "Embedded benefits switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "embedded_benefits_unit_price",
            title: "Embedded benefits unit price",
            type: PARAM_TYPE.NUMBER,
            editable: "disabled",
            unit: PARAM_UNIT.GBP_PER_MWH,
            isShow: {
              params: {
                global: [],
                local: ["embedded_benefits_switch"],
              },
              fn: ({
                embedded_benefits_switch,
              }: {
                embedded_benefits_switch: number;
              }) => embedded_benefits_switch == 1,
            },
          },
          {
            id: "embedded_benefits_inflation",
            title: "Inflation",
            editable: "disabled",
            type: PARAM_TYPE.CHOICE.INFLATION,
            isShow: {
              params: {
                global: [],
                local: ["embedded_benefits_switch"],
              },
              fn: ({
                embedded_benefits_switch,
              }: {
                embedded_benefits_switch: number;
              }) => embedded_benefits_switch == 1,
            },
          },
          {
            id: "embedded_benefits_inflation_year",
            title: "Base year",
            type: PARAM_TYPE.YEAR,
            editable: "disabled",
            unit: PARAM_UNIT.YEAR,
            isShow: {
              params: {
                global: [],
                local: ["embedded_benefits_switch"],
              },
              fn: ({
                embedded_benefits_switch,
              }: {
                embedded_benefits_switch: number;
              }) => embedded_benefits_switch == 1,
            },
          },
        ],
      },
      {
        id: "tolling",
        title: "Tolling",
        datum: [
          {
            id: "tolling_switch",
            title: "Tolling Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
            editable: "disabled",
          },
          {
            id: "tolling_percentage",
            title: "Percentage Split to Tolling",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            minValue: 0,
            maxValue: 100,
            isShow: {
              params: {
                global: [],
                local: ["tolling_switch"],
              },
              fn: ({ tolling_switch }: { tolling_switch: number }) =>
                tolling_switch == 1,
            },
          },
          ...[...new Array(5)].map((_, index) => ({
            id: `tolling_${index + 1}`,
            title: `Period ${index + 1}`,
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                global: [],
                local: ["tolling_switch"],
              },
              fn: ({ tolling_switch }: { tolling_switch: number }) =>
                tolling_switch == 1,
            },
            children: [
              {
                id: `tolling_start_date_${index + 1}`,
                title: `Tolling ${index + 1} Start Date`,
                type: PARAM_TYPE.DATE,
              },
              {
                id: `tolling_end_date_${index + 1}`,
                title: `Tolling ${index + 1} End Date`,
                type: PARAM_TYPE.DATE,
              },
              {
                id: `tolling_price_${index + 1}`,
                title: `Tolling ${index + 1} Price`,
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_KW,
              },
              {
                id: `inflation_${index + 1}`,
                title: `Inflation profile - tolling ${index + 1}`,
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: `base_year_${index + 1}`,
                title: `Base year - tolling ${index + 1}`,
                type: PARAM_TYPE.YEAR,
              },
            ],
          })),
          {
            id: "tolling_curve",
            title: "Tolling 100% curve",
            type: PARAM_TYPE.GROUP,
            isShow: {
              params: {
                global: [],
                local: ["tolling_switch"],
              },
              fn: ({ tolling_switch }: { tolling_switch: number }) =>
                tolling_switch == 1,
            },
            children: [
              {
                id: "tolling_curve_switch",
                title: "Avg Cycles",
                type: PARAM_TYPE.SWITCH.ONOFF,
                renderValue: {
                  params: {
                    local: [],
                    global: ["tolling_percentage"],
                  },
                  fn: ({
                    tolling_percentage,
                  }: {
                    tolling_percentage: number;
                  }) => {
                    return tolling_percentage == 100 ? 1 : 0;
                  },
                },
              },
              {
                id: "bespoke_avg_cycles",
                title: "Bespoke Avg. Cycles per day",
                type: PARAM_TYPE.NUMBER,
              },
            ],
          },
        ],
      },
      {
        id: "ppa",
        title: "PPA",
        datum: [],
        children: [
          {
            id: "fixed_ppa",
            title: "Fixed PPA",
            datum: [
              {
                id: "fixed_ppa_switch",
                title: "Switch",
                type: PARAM_TYPE.SWITCH.ONOFF,
                editable: "disabled",
              },
              {
                id: "fixed_ppa_percentage",
                title: "Fixed PPA Percentage",
                minValue: 0,
                maxValue: 100,
                type: PARAM_TYPE.NUMBER,
                isShow: {
                  params: {
                    global: [],
                    local: ["fixed_ppa_switch"],
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "fixed_ppa_1",
                title: "Fixed PPA 1",
                type: PARAM_TYPE.GROUP,
                isShow: {
                  params: {
                    global: [],
                    local: ["fixed_ppa_switch"],
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
                children: [
                  {
                    id: "ppa_start_date_1",
                    title: "PPA Start Date 1",
                    type: PARAM_TYPE.DATE,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "ppa_end_date_1",
                    title: "PPA End Date 1",
                    type: PARAM_TYPE.DATE,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch", "ppa_start_date_1"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                        ppa_start_date_1,
                      }: {
                        fixed_ppa_switch: number;
                        ppa_start_date_1: string | null;
                      }) =>
                        fixed_ppa_switch ==
                          SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id &&
                        !!ppa_start_date_1, // Ensures start date is provided
                    },
                  },
                  {
                    id: "inflation_profile_1",
                    title: "Inflation Profile - Fixed PPA 1",
                    type: PARAM_TYPE.CHOICE.INFLATION,
                    defaultValue:
                      CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "inflation_base_year_1",
                    title: "Base Year - Fixed PPA 1",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.YEAR,
                    minValue: 2021,
                    maxValue: 2075,
                    defaultValue: 2024,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "ppa_price_period_1",
                    title: "PPA Price Period 1",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PER_MWH,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                ],
              },
              {
                id: "fixed_ppa_2",
                title: "Fixed PPA 2",
                type: PARAM_TYPE.GROUP,
                isShow: {
                  params: {
                    global: [],
                    local: ["fixed_ppa_switch"],
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
                children: [
                  {
                    id: "ppa_start_date_2",
                    title: "PPA Start Date 2",
                    type: PARAM_TYPE.DATE,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "ppa_end_date_2",
                    title: "PPA End Date 2",
                    type: PARAM_TYPE.DATE,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch", "ppa_start_date_2"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                        ppa_start_date_2,
                      }: {
                        fixed_ppa_switch: number;
                        ppa_start_date_2: string | null;
                      }) =>
                        fixed_ppa_switch ==
                          SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id &&
                        !!ppa_start_date_2, // Ensures start date is provided
                    },
                  },
                  {
                    id: "ppa_price_period_2",
                    title: "PPA Price Period 2",
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PER_MWH,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "inflation_profile_2",
                    title: "Inflation Profile - Fixed PPA 2",
                    type: PARAM_TYPE.CHOICE.INFLATION,
                    defaultValue:
                      CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                  {
                    id: "inflation_base_year_2",
                    title: "Base Year - Fixed PPA 2",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.YEAR,
                    minValue: 2021,
                    maxValue: 2075,
                    defaultValue: 2024,
                    isShow: {
                      params: {
                        global: [],
                        local: ["fixed_ppa_switch"],
                      },
                      fn: ({
                        fixed_ppa_switch,
                      }: {
                        fixed_ppa_switch: number;
                      }) =>
                        fixed_ppa_switch ==
                        SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                    },
                  },
                ],
              },
            ],
          },

          {
            id: "floating_ppa",
            title: "Floating PPA",
            datum: [
              {
                id: "floating_ppa_switch",
                title: "Switch",
                type: PARAM_TYPE.SWITCH.ONOFF,
                editable: "disabled",
              },
              {
                id: "flaoting_ppa_percentage",
                title: "Floating PPA Percentage",
                minValue: 0,
                maxValue: 100,
                type: PARAM_TYPE.NUMBER,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch"],
                  },
                  fn: ({
                    floating_ppa_switch,
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "ppa_start_date_1",
                title: "PPA Start Date 1",
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch"],
                  },
                  fn: ({
                    floating_ppa_switch,
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "ppa_end_date_1",
                title: "PPA End Date 1",
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch", "ppa_start_date_1"],
                  },
                  fn: ({
                    floating_ppa_switch,
                    ppa_start_date_1,
                  }: {
                    floating_ppa_switch: number;
                    ppa_start_date_1: string | null;
                  }) =>
                    floating_ppa_switch ==
                      SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id &&
                    !!ppa_start_date_1, // Ensures start date is provided
                },
              },
              {
                id: "ppa_start_date_2",
                title: "PPA Start Date 2",
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch"],
                  },
                  fn: ({
                    floating_ppa_switch,
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "ppa_end_date_2",
                title: "PPA End Date 2",
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch", "ppa_start_date_2"],
                  },
                  fn: ({
                    floating_ppa_switch,
                    ppa_start_date_2,
                  }: {
                    floating_ppa_switch: number;
                    ppa_start_date_2: string | null;
                  }) =>
                    floating_ppa_switch ==
                      SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id &&
                    !!ppa_start_date_2, // Ensures start date is provided
                },
              },
              {
                id: "discount_to_wholesale_price_for_margin",
                title: "Discount to Wholesale Price for Margin",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                isShow: {
                  params: {
                    global: [],
                    local: ["floating_ppa_switch"],
                  },
                  fn: ({
                    floating_ppa_switch,
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
            ],
          },
        ],
      },
      {
        id: "residual_value",
        title: "Residual Value",
        datum: [
          {
            id: "residual_value",
            title: "Residual Value",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
          },
        ],
      },
      // {
      //   id: 'other_revenue',
      //   title: 'Other revenue',
      //   datum: [
      //     {
      //       id: 'tnuos_triads_income',
      //       title: 'TNUos -triads income',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
      //     },
      //     {
      //       id: 'rego',
      //       title: 'REGO',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].OFF?.id
      //     },
      //     {
      //       id: 'cfd',
      //       title: 'CfD',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].OFF?.id
      //     },
      //     {
      //       id: 'gain_or_loss_on_diposal_of_batteries',
      //       title: 'Gain or loss on disposal of batteries',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
      //     }
      //   ]
      // }
      {
        id: "triads",
        title: "Triads",
        datum: [
          {
            id: "triads_income_switch",
            title: "Triads Income Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
            editable: "disabled",
          },
          {
            id: "triads_embedded_export_tariffs",
            title: "Triads(Embedded Export Tariffs) (/kW)",
            type: PARAM_TYPE.TABLE,
            editable: "disabled",
            unit: null,
            stickyRows: {
              type: "function",
              params: ["calculationPeriod", "modelStartDate"],
              fn: ({
                startDate = "2022-04-01",
                calculationPeriod,
              }: {
                calculationPeriod: number;
                startDate: string;
              }) => [
                ["Period", "Start date", "End date"],
                ...[...new Array(55)].map((d, index) => [
                  index + 1,
                  moment(startDate).add(index, "year").format("D-MMM-YY"),
                  moment(startDate)
                    .add(index + 1, "year")
                    .add(-1, "day")
                    .endOf("month")
                    .format("D-MMM-YY"),
                ]),
              ],
            },
            stickyCols: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                const len = CHOICE_DATA[PARAM_TYPE.CHOICE.DNO].length;
                for (let i = 0; i < len; i++) {
                  result.push(
                    [
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
                    ][i]
                  );
                }
                return result;
              },
            },
            isShow: {
              params: {
                global: [],
                local: ["triads_income_switch"],
              },
              fn: ({
                triads_income_switch,
              }: {
                triads_income_switch: number;
              }) =>
                triads_income_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },
      {
        id: "gain_on_disposal_of_batteries",
        title: "Gain/(Loss) on Disposal of Batteries",
        datum: [
          {
            id: "switch",
            title: "Gain/(Loss) on Disposal of Batteries Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
            editable: "disabled",
          },
        ],
      },
    ],
  },
  {
    id: "cost_of_sales",
    title: "Cost of Sales",
    datum: [],
    children: [
      {
        id: "optimiser",
        title: "Optimiser",
        datum: [
          {
            id: "optimiser_switch",
            title: "Optimiser Switch",
            editable: "disabled",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "optimiser_commission",
            title: "Optimiser Commission of Revenue",
            type: PARAM_TYPE.NUMBER,
            editable: "disabled",
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 5,
            isShow: {
              params: {
                global: [],
                local: ["optimiser_switch"],
              },
              fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                optimiser_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },

          {
            id: "upsdie_value",
            title: "Upside Value",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "optimiser_upside_value",
                title: "Optimiser Upside Value",
                editable: "disabled",
                type: PARAM_TYPE.CHOICE.UPSIDE,
                isShow: {
                  params: {
                    global: [],
                    local: ["optimiser_switch"],
                  },
                  fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                    optimiser_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
                },
              },
              {
                id: "selected_upside",
                title: "Selected Upside Value",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "upside_90",
                      "upside_50",
                      "upside_25",
                      "upside_10",
                      "optimiser_upside_value",
                    ],
                    global: [],
                  },
                  fn: ({
                    upside_90 = 0,
                    upside_50 = 0,
                    upside_25 = 0,
                    upside_10 = 0,
                    optimiser_upside_value = 0,
                  }: {
                    upside_90?: number;
                    upside_50?: number;
                    upside_25?: number;
                    upside_10?: number;
                    optimiser_upside_value?: number;
                  }) => {
                    return optimiser_upside_value == 1
                      ? upside_90
                      : optimiser_upside_value == 2
                      ? upside_50
                      : optimiser_upside_value == 3
                      ? upside_25
                      : optimiser_upside_value == 4
                      ? upside_10
                      : "";
                  },
                },
              },
              {
                id: "upside_90",
                title: "Upside Value at P90",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "upside_50",
                title: "Upside Value at P50",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "upside_25",
                title: "Upside Value at P25",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "upside_10",
                title: "Upside Value at P10",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
          {
            id: "optimiser_floor",
            title: "Floor",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "start_date",
                title: "Start Date",
                editable: "disabled",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "end_date",
                title: "End Date",
                editable: "disabled",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "floor_price",
                title: "Floor Price",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.GBP_PER_KW_YEAR,
              },
              {
                id: "floor_inflation_profile",
                title: "Floor Inflation Profile",
                type: PARAM_TYPE.CHOICE.INFLATION,
                editable: "disabled",
              },
              {
                id: "floor_base_year",
                title: "Floor base year",
                editable: "disabled",
                type: PARAM_TYPE.YEAR,
              },
            ],
            isShow: {
              params: {
                global: [],
                local: ["optimiser_switch"],
              },
              fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                optimiser_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },
      {
        id: "ppa_fees",
        title: "PPA Fee",
        datum: [
          {
            id: "ppa_fee_as_a_percent_of_revenue",
            title: "PPA Fee as a Percent of Revenue",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
        ],
      },

      {
        id: "auxilliary_losses",
        title: "Auxiliary Losses",
        datum: [
          {
            id: "duration",
            title: "Battery Duration Match",
            type: PARAM_TYPE.TEXT,
            renderValue: {
              params: {
                local: [],
                global: ["battery_duration"],
              },
              fn: ({ battery_duration = 0 }: { battery_duration: number }) => {
                return battery_duration
                  ? `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                        battery_duration - 1
                      ].label
                    } hour system`
                  : "Not selected";
              },
            },
          },
          {
            id: "active_auxiliary",
            title: "Auxiliary Loss Factor - Active",
            type: PARAM_TYPE.TEXT,
            unit: PARAM_UNIT.PERCENTAGE,
            renderValue: {
              params: {
                local: [
                  "auxiliary_losses_factor_2",
                  "auxiliary_losses_factor_4",
                  "auxiliary_losses_factor_8",
                ],
                global: ["battery_duration"],
              },
              fn: ({
                battery_duration = 0,
                auxiliary_losses_factor_2,
                auxiliary_losses_factor_4,
                auxiliary_losses_factor_8,
              }: {
                battery_duration: number;
                auxiliary_losses_factor_2: number;
                auxiliary_losses_factor_4: number;
                auxiliary_losses_factor_8: number;
              }) => {
                return battery_duration == 1
                  ? auxiliary_losses_factor_2
                  : battery_duration == 2
                  ? auxiliary_losses_factor_4
                  : battery_duration == 3
                  ? auxiliary_losses_factor_8
                  : "-";
              },
            },
          },
          {
            id: "auxiliary_losses_factor_2",
            title: "Auxiliary Losses Factor - 2 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 8,
          },
          {
            id: "auxiliary_losses_factor_4",
            title: "Auxiliary Losses Factor - 4 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 8,
          },
          {
            id: "auxiliary_losses_factor_8",
            title: "Auxiliary Losses Factor - 8 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 8,
          },
          // ...[...new Array(CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].length)].map(
          //   (_, index) => ({
          //     id:
          //       // index == 0
          //       // 	? "capex_forecast_scenario_data"
          //       // 	: "capex_forecast_scenario_data1",
          //       `augmentation_switch_${CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
          //         index
          //       ].label
          //         .toString()
          //         .toLowerCase()}`,
          //     title: `Battery augmentation switch - ${CHOICE_DATA[
          //       PARAM_TYPE.CHOICE.DURATION
          //     ][index].label
          //       .toString()
          //       .toLowerCase()} hour system`,
          //     type: PARAM_TYPE.SWITCH.ONOFF,
          //   })
          // ),
          {
            id: "auxiliary_losses_inflation_profile",
            title: "Auxiliary Losses Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "auxiliary_losses_inflation_base_year",
            title: "Auxiliary Losses Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
            defaultValue: 2024,
          },
        ],
      },
      {
        id: "metering",
        title: "Metering",
        datum: [
          {
            id: "duration",
            title: "Battery Duration Match",
            type: PARAM_TYPE.TEXT,
            renderValue: {
              params: {
                local: [],
                global: ["battery_duration"],
              },
              fn: ({ battery_duration = 0 }: { battery_duration: number }) => {
                return battery_duration
                  ? `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                        battery_duration - 1
                      ].label
                    } hour system`
                  : "Not selected";
              },
            },
          },
          {
            id: "active_auxiliary",
            title: "Auxiliary Loss Factor - Active",
            type: PARAM_TYPE.TEXT,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            renderValue: {
              params: {
                local: [
                  "annual_cost_per_MW_2",
                  "annual_cost_per_MW_4",
                  "annual_cost_per_MW_8",
                ],
                global: ["battery_duration"],
              },
              fn: ({
                battery_duration = 0,
                annual_cost_per_MW_2,
                annual_cost_per_MW_4,
                annual_cost_per_MW_8,
              }: {
                battery_duration: number;
                annual_cost_per_MW_2: number;
                annual_cost_per_MW_4: number;
                annual_cost_per_MW_8: number;
              }) => {
                return battery_duration == 1
                  ? annual_cost_per_MW_2
                  : battery_duration == 2
                  ? annual_cost_per_MW_4
                  : battery_duration == 3
                  ? annual_cost_per_MW_8
                  : "-";
              },
            },
          },
          {
            id: "annual_cost_per_MW_2",
            title: "Annual Cost Per MW - 2 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 0.025,
          },
          {
            id: "annual_cost_per_MW_4",
            title: "Annual Cost Per MW - 4 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 0.025,
          },
          {
            id: "annual_cost_per_MW_8",
            title: "Annual Cost Per MW - 8 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 0.025,
          },
          {
            id: "metering_inflation_profile",
            title: "Metering Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][2].id,
          },
          {
            id: "metering_inflation_base_year",
            title: "Metering Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
            defaultValue: 2024,
          },
        ],
      },

      {
        id: "duos_charges",
        title: "DUoS Charges",
        datum: [
          {
            id: "setup",
            title: "Setup",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "distribution_connection",
                title: "Distribution Connection",
                type: PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "dno",
                title: "DNO",
                type: PARAM_TYPE.CHOICE.DNO,
              },
              {
                id: "number_of_metering_points",
                title: "Number of Metering Points",
                type: PARAM_TYPE.INTEGER,
                maxValue: 100,
              },
              {
                id: "duos_inflation_profile",
                title: "DUoS Inflation Profile",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: "duos_inflation_base_year",
                title: "DUoS Inflation Base Year",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEAR,
                minValue: 2021,
                maxValue: 2075,
              },
              {
                id: "duos_data",
                title: "DUoS Data",
                type: PARAM_TYPE.TABLE,
                unit: null,

                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const dnoDataList = [
                      "DUoS demand red (p/kWh)",
                      "DUoS demand amber (p/kWh)",
                      "DUoS demand green (p/kWh)",
                      "Import fixed charge (p/MPAN/day)",
                      "Import capacity charge (p/MPAN/day)",
                      "Export exceeded capacity charge (p/kVA/day)",
                      "gDUoS generation red (p/kWh)",
                      "gDUoS generation amber (p/kWh)",
                      "gDUoS generation green (p/kWh)",
                      "Export fixed charge (p/MPAN/day)",
                    ];
                    // 'p/kWh', 'p/kWh', 'p/kWh', 'p/MPAN/day', 'p/kVA/day', 'p/kVA/day', 'p/kWh', 'p/kWh', 'p/kWh', 'p/MPAN/day'
                    return dnoDataList;
                  },
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push("");
                    const len = CHOICE_DATA[PARAM_TYPE.CHOICE.DNO].length;
                    for (let i = 0; i < len; i++) {
                      result.push(CHOICE_DATA[PARAM_TYPE.CHOICE.DNO][i].label);
                    }
                    return result;
                  },
                },
                editable: "disabled",
              },
            ],
          },
          {
            id: "timing_split",
            title: "Timing Split",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "duos_demand_red",
                title: "DUoS Demand Red",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["duos_demand_amber", "duos_demand_green"],
                    global: [],
                  },
                  fn: ({
                    duos_demand_amber = 0,
                    duos_demand_green = 0,
                  }: {
                    duos_demand_amber?: number;
                    duos_demand_green?: number;
                  }) => {
                    return 100 - duos_demand_amber - duos_demand_green;
                  },
                },
              },
              {
                id: "duos_demand_amber",
                title: "DUoS Demand Amber",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "duos_demand_green",
                title: "DUoS Demand Green",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "gduos_generation_red",
                title: "gDUoS Generation Red",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["gduos_generation_amber", "gduos_generation_green"],
                    global: [],
                  },
                  fn: ({
                    gduos_generation_amber = 0,
                    gduos_generation_green = 0,
                  }: {
                    gduos_generation_amber?: number;
                    gduos_generation_green?: number;
                  }) => {
                    return (
                      100 - gduos_generation_amber - gduos_generation_green
                    );
                  },
                },
              },
              {
                id: "gduos_generation_amber",
                title: "gDUoS Generation Amber",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "gduos_generation_green",
                title: "gDUoS Generation Green",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
        ],
      },
      {
        id: "tnuos",
        title: "TNUoS",

        children: [
          {
            id: "triad_charges",
            title: "Triad Charges",
            datum: [
              {
                id: "tnuos_charges_unavoidable_switch",
                title: "TNUoS Charges Unavoidable Switch",
                type: PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "anticipated_export_during_triads_as_a_percent_of_grid_connection",
                title:
                  "Anticipated Export During Triads as a Percent of Grid Connection",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "portion_of_triads_expected_november",
                title: "Portion of Triads Expected November",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "portion_of_triads_expected_december",
                title: "Portion of Triads Expected December",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "portion_of_triads_expected_january",
                title: "Portion of Triads Expected January",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "portion_of_triads_expected_february",
                title: "Portion of Triads Expected February",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "demand_tariffs",
                title: "Demand Tariffs (/kW)",
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(55)].map((d, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    const len = CHOICE_DATA[PARAM_TYPE.CHOICE.DNO].length;
                    for (let i = 0; i < len; i++) {
                      result.push(
                        [
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
                        ][i]
                      );
                    }
                    return result;
                  },
                },
                editable: "disabled",
              },
            ],
          },
          {
            id: "export_charges",
            title: "Export Charges",
            datum: [
              {
                id: "transmission_connection_switch",
                title: "Transmission Connection Switch",
                type: PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "tnuos_zone",
                title: "TNUoS Zone",
                type: PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST,
              },
              {
                id: "local_circuits",
                title: "Local Circuits",
                type: PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE,
              },
              {
                id: "local_circuits_data",
                title: "Local Circuits Data (/kW)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(53)].map((_, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "local_substation_type",
                title: "Local Substation Type",
                type: PARAM_TYPE.CHOICE.SUBSTATION_TYPE,
              },
              {
                id: "grid_connection_voltage",
                title: "Grid Connection Voltage",
                type: PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE,
              },
              {
                id: "local_substation_type_by_voltage_data",
                title: "Local Substation Type by Voltage (/kW)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () => LOCAL_SUBSTATION_TYPE,
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push("");

                    CHOICE_DATA[PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE].map(
                      (d) => result.push(d.label)
                    );
                    return result;
                  },
                },
                editable: "disabled",
              },

              {
                id: "annual_load_factor",
                title: "Annual Load Factor",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
          {
            id: "wider_tariff",
            title: "Wider Tariff",
            datum: [
              {
                id: "system_peak_tariff_data",
                title: "System Peak Tariff Data (/kW/year)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(53)].map((_, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "not_shared_round_tariff",
                title: "Not Shared Round Tariff (/kW/year)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(53)].map((_, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "shared_year_round_tariff",
                title: "Shared Year Round Tariff (/kW/year)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(53)].map((_, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
              {
                id: "adjustment_tariff",
                title: "Adjustment Tariff (/kW/year)",
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: ["calculationPeriod", "modelStartDate"],
                  fn: ({
                    startDate = "2022-04-01",
                    calculationPeriod,
                  }: {
                    calculationPeriod: number;
                    startDate: string;
                  }) => [
                    ["Start date", "End date"],
                    ...[...new Array(53)].map((_, index) => [
                      moment(startDate).add(index, "year").format("D-MMM-YY"),
                      moment(startDate)
                        .add(index + 1, "year")
                        .add(-1, "day")
                        .endOf("month")
                        .format("D-MMM-YY"),
                    ]),
                  ],
                },
                editable: "disabled",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "administrative_costs",
    title: "Administrative Costs",
    datum: [],
    children: [
      {
        id: "setup",
        title: "Setup",
        datum: [
          {
            id: "opex_sensitivity",
            title: "Opex Sensitivity",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "opex_sensitivity_magnitude",
            title: "Opex Sensitivity Magnitude",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ["opex_sensitivity"],
              },
              fn: ({ opex_sensitivity }: { opex_sensitivity: number }) =>
                opex_sensitivity == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },

      {
        id: "land_rent",
        title: "Land Rent",
        datum: [
          {
            id: "land_rent_switch",
            title: "Land Rent Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "land_rent_sensitivity",
            title: "Land Rent Sensitivity",
            type: PARAM_TYPE.SWITCH.ONOFF,
            isShow: {
              params: {
                global: [],
                local: ["land_rent_switch"],
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "land_rent_sensitivity_magnitude",
            title: "Land Rent Sensitivity Magnitude",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ["land_rent_sensitivity", "land_rent_switch"],
              },
              fn: ({
                land_rent_sensitivity,
                land_rent_switch,
              }: {
                land_rent_sensitivity: number;
                land_rent_switch: number;
              }) =>
                land_rent_sensitivity * land_rent_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
            minValue: -100,
            maxValue: 100,
          },
          {
            id: "land_rent_inflation_profile",
            title: "Land Rent Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
            isShow: {
              params: {
                global: [],
                local: ["land_rent_switch"],
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "land_rent_inflation_base_year",
            title: "Land Rent Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: INFLATION_START_YEAR,
            maxValue: 2075,
            defaultValue: 2024,

            isShow: {
              params: {
                global: [],
                local: ["land_rent_switch"],
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          // {
          //   id: "land_rent_provision_months",
          //   title: "Land rent provision months",
          //   type: PARAM_TYPE.INTEGER,
          //   unit: PARAM_UNIT.MONTHS,
          //   minValue: 0,
          //   isShow: {
          //     params: {
          //       global: [],
          //       local: ["land_rent_switch"],
          //     },
          //     fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
          //       land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
          //   },
          // },
        ],
        children: [
          {
            id: "annual_land_rent",
            title: "Annual Land Rent",
            datum: [
              {
                id: "payment_terms",
                title: "Payment Terms",
                type: PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS,
              },
              {
                id: "land_rent_basis",
                title: "Land Rent Basis",
                type: PARAM_TYPE.CHOICE.LAND_RENT_BASIS,
              },
              {
                id: "annual_land_rent_per_acre_charge",
                title: "Annual Land Rent Per Acre Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP,
                defaultValue: 100,
                minValue: 0,
              },
              {
                id: "annual_land_rent_per_mw_charge",
                title: "Annual Land Rent Per MW Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 100,
                minValue: 0,
              },
              {
                id: "portion_payable_during_construction",
                title: "Portion Payable During Construction",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 50,
              },
              {
                id: "portion_payable_during_operations",
                title: "Portion Payable During Operations",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "portion_payable_during_decommissioning",
                title: "Portion Payable During Decommissioning",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 50,
              },
              {
                id: "rent_as_percentage_of_revenue",
                title: "Rent as % of revenue",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
          {
            id: "one_time_payment",
            title: "One Time Payment",
            datum: [
              {
                id: "payment_amount",
                title: "One Time Payment",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: "payment_date",
                title: "Payment Date",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
          {
            id: "option_charges_1",
            title: "Option Charges 1",
            datum: [
              {
                id: "payment_terms_for_option_one",
                title: "Payment Terms",
                type: PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS,
              },
              {
                id: "land_rent_basis_for_option_one",
                title: "Land Rent Basis",
                type: PARAM_TYPE.CHOICE.LAND_RENT_BASIS,
              },
              {
                id: "annual_land_option_one_rent_per_acre_charge",
                title: "Annual Land Rent Per Acre Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "annual_land_option_one_rent_per_mw_charge",
                title: "Annual Land Rent Per MW Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "option_one_start_date",
                title: "Option 1 Start Date",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "option_one_end_date",
                title: "Option 1 End Date",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
          {
            id: "option_charges_2",
            title: "Option Charges 2",
            datum: [
              {
                id: "payment_terms_for_option_two",
                title: "Payment Terms",
                type: PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS,
              },
              {
                id: "land_rent_basis_for_option_two",
                title: "Land Rent Basis",
                type: PARAM_TYPE.CHOICE.LAND_RENT_BASIS,
              },
              {
                id: "annual_land_option_two_rent_per_acre_charge",
                title: "Annual Land Rent Per Acre Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "annual_land_option_two_rent_per_mw_charge",
                title: "Annual Land Rent Per MW Charge",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "land_size_for_option_two",
                title: "Land Size for Option 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.ACRES,
              },
              {
                id: "capacity_for_option_two",
                title: "Capacity for Option 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MW,
              },
              {
                id: "option_two_start_date",
                title: "Option 2 Start Date",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "months_after_cod_to_end_the_option",
                title: "Months After COD to End the Option",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                maxValue: 480,
                minValue: 120,
              },
              {
                id: "option_two_end_date",
                title: "Option 2 End Date",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
          {
            id: "substation_rent_at_end_of_project",
            title: "Substation Rent at End of Project",
            datum: [
              {
                id: "substation_rent_at_end_of_life_switch",
                title: "Substation Rent at End of Life Switch",
                type: PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: "substation_rent_at_end_of_life_switch_to_use_in_model",
                title: "Substation Rent at End of Life Switch to Use in Model",
                type: PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: "discount_rate",
                title: "Discount Rate",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "time_remaining_on_release_at_end_of_decommissioning",
                title: "Time Remaining on Lease at End of Decommissioning",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
              },
              {
                id: "acres_for_substation",
                title: "Acres for Substation",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.ACRES,
              },
              {
                id: "long_term_cpi_assumption",
                title: "Long-term CPI Assumption",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "lease_remaining_time_check",
                title: "Lease remaining time check",
                type: PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [
                      "time_remaining_on_release_at_end_of_decommissioning",
                    ],
                    global: [],
                  },
                  fn: ({
                    time_remaining_on_release_at_end_of_decommissioning,
                  }: {
                    time_remaining_on_release_at_end_of_decommissioning?: number;
                  }) => {
                    return time_remaining_on_release_at_end_of_decommissioning <
                      59 * 12 ||
                      !time_remaining_on_release_at_end_of_decommissioning
                      ? "OK"
                      : "ALERT";
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "o_and_m",
        title: "O&M",
        children: [
          {
            id: "fixed",
            title: "Fixed",
            datum: [
              {
                id: "battery_duration",
                title: "Battery Duration",
                type: PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration?: number }) => {
                    return battery_duration
                      ? CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                          battery_duration - 1
                        ]?.label
                      : "Not selected";
                  },
                },
              },
              {
                id: "annual_fixed_o_live_selection",
                title: "Annual Fixed O&M - Live Selection",
                type: PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [
                      "annual_fixed_o_and_m_2",
                      "annual_fixed_o_and_m_4",
                      "annual_fixed_o_and_m_8",
                    ],
                    global: ["battery_duration"],
                  },
                  fn: ({
                    battery_duration,
                    annual_fixed_o_and_m_2,
                    annual_fixed_o_and_m_4,
                    annual_fixed_o_and_m_8,
                  }: {
                    battery_duration?: number;
                    annual_fixed_o_and_m_2?: number;
                    annual_fixed_o_and_m_4?: number;
                    annual_fixed_o_and_m_8?: number;
                  }) => {
                    return battery_duration == 1
                      ? annual_fixed_o_and_m_2
                      : battery_duration == 2
                      ? annual_fixed_o_and_m_4
                      : battery_duration == 3
                      ? annual_fixed_o_and_m_8
                      : "-";
                  },
                },
              },
              {
                id: "annual_fixed_o_and_m_2",
                title: "Annual Fixed O&M - 2 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP,
              },
              {
                id: "annual_fixed_o_and_m_4",
                title: "Annual Fixed O&M - 4 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP,
              },
              {
                id: "annual_fixed_o_and_m_8",
                title: "Annual Fixed O&M - 8 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP,
              },
              {
                id: "inflation_profile",
                title: "Inflation Profile",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: "inflation_base_year",
                title: "Inflation Base Year",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEAR,
                minValue: INFLATION_START_YEAR,
                maxValue: 2075,
              },
            ],
          },
          {
            id: "variable",
            title: "Variable",
            datum: [
              {
                id: "battery_duration",
                title: "Battery Duration",
                type: PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [],
                    global: ["battery_duration"],
                  },
                  fn: ({ battery_duration }: { battery_duration?: number }) => {
                    return battery_duration
                      ? CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                          battery_duration - 1
                        ]?.label
                      : "Not selected";
                  },
                },
              },
              {
                id: "variable_o_m_live_selection",
                title: "Variable O&M - Live Selection",
                type: PARAM_TYPE.NUMBER,
                renderValue: {
                  params: {
                    local: [
                      "variable_o_and_m_2",
                      "variable_o_and_m_4",
                      "variable_o_and_m_8",
                    ],
                    global: ["battery_duration"],
                  },
                  fn: ({
                    battery_duration,
                    variable_o_and_m_2,
                    variable_o_and_m_4,
                    variable_o_and_m_8,
                  }: {
                    battery_duration?: number;
                    variable_o_and_m_2?: number;
                    variable_o_and_m_4?: number;
                    variable_o_and_m_8?: number;
                  }) => {
                    return battery_duration == 1
                      ? variable_o_and_m_2
                      : battery_duration == 2
                      ? variable_o_and_m_4
                      : battery_duration == 3
                      ? variable_o_and_m_8
                      : "-";
                  },
                },
              },
              {
                id: "variable_o_and_m_2",
                title: "Variable O&M - 2 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 10.451,
              },
              {
                id: "variable_o_and_m_4",
                title: "Variable O&M - 4 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 10.451,
              },
              {
                id: "variable_o_and_m_8",
                title: "Variable O&M - 8 Hour System",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 10.451,
              },
              {
                id: "inflation_profile",
                title: "Inflation Profile",
                type: PARAM_TYPE.CHOICE.INFLATION,
                defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
              },
              {
                id: "inflation_base_year",
                title: "Inflation Base Year",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEAR,
                minValue: INFLATION_START_YEAR,
                maxValue: 2075,
                defaultValue: 2024,
              },
            ],
          },
        ],
      },
      {
        id: "asset_management",
        title: "Asset Management",
        datum: [
          {
            id: "inflation",
            title: "Inflation",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "inflation_profile_1",
                title: "Inflation Profile - Period 1",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: "inflation_base_year_1",
                title: "Inflation Base Year - Period 1",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEAR,
                defaultValue: 2024,
                minValue: INFLATION_START_YEAR,
                maxValue: 2075,
              },
              {
                id: "inflation_profile_2",
                title: "Inflation Profile - Period 2",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: "inflation_base_year_2",
                title: "Inflation Base Year - Period 2",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEAR,
                minValue: INFLATION_START_YEAR,
                maxValue: 2075,
              },
            ],
          },
          {
            id: "duration",
            title: "Duration",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "start_date_period_1",
                title: "Start Date - Period 1",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "end_date_period_1",
                title: "End Date - Period 1",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "start_date_period_2",
                title: "Start Date - Period 2",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "end_date_period_2",
                title: "End Date - Period 2",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
          {
            id: "fees_as_a_percentage_of_revenue",
            title: "Fees as a % of Revenue",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "real_time_management_percentage_period_1",
                title: "Real Time Management - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "maintenance_percentage_period_1",
                title: "Maintenance - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "fees_as_a_percent_of_revenue_1",
                title: "Fees as a % of Revenue - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                maxValu: 100,
                renderValue: {
                  params: {
                    local: [
                      "real_time_management_percentage_period_1",
                      "maintenance_percentage_period_1",
                    ],
                    global: [],
                  },
                  fn: ({
                    real_time_management_percentage_period_1 = 0,
                    maintenance_percentage_period_1 = 0,
                  }: {
                    real_time_management_percentage_period_1: number;
                    maintenance_percentage_period_1: number;
                  }) => {
                    let val =
                      (real_time_management_percentage_period_1 || 0) * 1;
                    val += maintenance_percentage_period_1 * 1;

                    return val;
                  },
                },
              },
              {
                id: "real_time_management_percentage_period_2",
                title: "Real Time Management - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "maintenance_percentage_period_2",
                title: "Maintenance - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "fees_as_a_percent_of_revenue_2",
                title: "Fees as a % of Revenue - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                maxValu: 100,
                renderValue: {
                  params: {
                    local: [
                      "real_time_management_percentage_period_2",
                      "maintenance_percentage_period_2",
                    ],
                    global: [],
                  },
                  fn: ({
                    real_time_management_percentage_period_2 = 0,
                    maintenance_percentage_period_2 = 0,
                  }: {
                    real_time_management_percentage_period_2: number;
                    maintenance_percentage_period_2: number;
                  }) => {
                    let val =
                      (real_time_management_percentage_period_2 || 0) * 1;
                    val += maintenance_percentage_period_2 * 1;

                    return val;
                  },
                },
              },
            ],
          },
          // {
          // 	id: "real_time_management_percentage_period_1",
          // 	title: "Real time management - period 1",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.PERCENTAGE,
          // },
          // {
          // 	id: "maintenance_percentage_period_1",
          // 	title: "Maintenance - period 1",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.PERCENTAGE,
          // },
          // {
          // 	id: "real_time_management_percentage_period_2",
          // 	title: "Real time management - period 2",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.PERCENTAGE,
          // },
          // {
          // 	id: "maintenance_percentage_period_2",
          // 	title: "Maintenance - period 2",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.PERCENTAGE,
          // },
          {
            id: "fees_per_mw",
            title: "Fees Per MW",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "real_time_management_period_1",
                title: "Real Time Management - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 1.0,
              },
              {
                id: "maintenance_period_1",
                title: "Maintenance - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                defaultValue: 2.0,
              },
              {
                id: "fees_per_mw_period_1",
                title: "Fees Per MW - Period 1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                renderValue: {
                  params: {
                    local: [
                      "real_time_management_period_1",
                      "maintenance_period_1",
                    ],
                    global: [],
                  },
                  fn: ({
                    real_time_management_period_1 = 0,
                    maintenance_period_1 = 0,
                  }: {
                    real_time_management_period_1: number;
                    maintenance_period_1: number;
                  }) => {
                    let val = (real_time_management_period_1 || 0) * 1;
                    val += maintenance_period_1 * 1;

                    return val;
                  },
                },
              },
              {
                id: "real_time_management_period_2",
                title: "Real Time Management - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "maintenance_period_2",
                title: "Maintenance - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "fees_per_mw_period_2",
                title: "Fees Per MW - Period 2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
                renderValue: {
                  params: {
                    local: [
                      "real_time_management_period_2",
                      "maintenance_period_2",
                    ],
                    global: [],
                  },
                  fn: ({
                    real_time_management_period_2 = 0,
                    maintenance_period_2 = 0,
                  }: {
                    real_time_management_period_2: number;
                    maintenance_period_2: number;
                  }) => {
                    let val = (real_time_management_period_2 || 0) * 1;
                    val += maintenance_period_2 * 1;

                    return val;
                  },
                },
              },
            ],
          },
          // {
          // 	id: "real_time_management_period_1",
          // 	title: "Real time management - period 1",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          // 	defaultValue: 1.0,
          // },
          // {
          // 	id: "maintenance_period_1",
          // 	title: "Maintenance - period 1",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          // 	defaultValue: 2.0,
          // },
          // {
          // 	id: "real_time_management_period_2",
          // 	title: "Real time management - period 2",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          // },
          // {
          // 	id: "maintenance_period_2",
          // 	title: "Maintenance - period 2",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          // },
        ],
      },
      {
        id: "insurance",
        title: "Insurance",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year_operations",
            title: "Inflation Base Year - Operations",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: INFLATION_START_YEAR,
            maxValue: 2075,
          },
          {
            id: "annual_fees_per_mw_operations",
            title: "Annual Fees Per MW - Operations",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 3,
          },
        ],
      },
      {
        id: "community_benefit",
        title: "Community Benefit",
        datum: [
          {
            id: "capitalise_swtich",
            title: "Community Benefit Capitalised During Construction",
            type: PARAM_TYPE.SWITCH.YESNO,
          },
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: INFLATION_START_YEAR,
            maxValue: 2075,
          },
          {
            id: "annual_fixed_fund_to_community_benefit",
            title: "Annual Fixed Fund to Community Benefit",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1000,
          },
          {
            id: "annual_mwh_to_community_benefit",
            title: "Annual MWh to Community Benefit",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MWH,
            defaultValue: 0,
          },
          {
            id: "useful_economic_life",
            title: "Useful Economic Life for Capitalized Community Benefit",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEARS,
          },
        ],
      },
      {
        id: "water_rates",
        title: "Water Rates",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: INFLATION_START_YEAR,
            maxValue: 2075,
          },
          {
            id: "annual_fees_per_mw",
            title: "Annual Fees Per MW",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
          },
        ],
      },
      {
        id: "business_rates",
        title: "Business Rates",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
            defaultValue: 2024,
          },
          {
            id: "annual_fees_per_mw",
            title: "Annual Fees Per MW",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 1.2,
          },
        ],
      },
      {
        id: "extended_warranty",
        title: "Extended Warranty",
        datum: [
          {
            id: "extended_warranty_switch",
            title: "Extended Warranty Switch",
            type: PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
            defaultValue: 2024,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "length_of_warranty",
            title: "Length of Warranty",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEARS,
            minValue: 0,
            maxValue: 600,
            defaultValue: 15,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "duration",
            title: "Battery Duration Match",
            type: PARAM_TYPE.TEXT,
            renderValue: {
              params: {
                local: [],
                global: ["battery_duration"],
              },
              fn: ({ battery_duration = 0 }: { battery_duration: number }) => {
                return battery_duration
                  ? `${
                      CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][
                        battery_duration - 1
                      ].label
                    } hour system`
                  : "Not selected";
              },
            },
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "annual_fees_live",
            title: "Annual Fees Per MW - Live Selection",
            type: PARAM_TYPE.TEXT,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            renderValue: {
              params: {
                local: [
                  "annual_fees_per_mw_2",
                  "annual_fees_per_mw_4",
                  "annual_fees_per_mw_8",
                ],
                global: ["battery_duration"],
              },
              fn: ({
                battery_duration = 0,
                annual_fees_per_mw_2,
                annual_fees_per_mw_4,
                annual_fees_per_mw_8,
              }: {
                battery_duration: number;
                annual_fees_per_mw_2: number;
                annual_fees_per_mw_4: number;
                annual_fees_per_mw_8: number;
              }) => {
                return battery_duration == 1
                  ? annual_fees_per_mw_2
                  : battery_duration == 2
                  ? annual_fees_per_mw_4
                  : battery_duration == 3
                  ? annual_fees_per_mw_8
                  : "-";
              },
            },
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "annual_fees_per_mw_2",
            title: "Annual Fees Per MW - 2 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 4.077,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "annual_fees_per_mw_4",
            title: "Annual Fees Per MW - 4 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 8.153,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
          {
            id: "annual_fees_per_mw_8",
            title: "Annual Fees Per MW - 8 Hour System",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 16.307,
            isShow: {
              params: {
                global: [],
                local: ["extended_warranty_switch"],
              },
              fn: ({
                extended_warranty_switch,
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id,
            },
          },
        ],
      },
      {
        id: "site_security",
        title: "Site Security",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: 2021,
            maxValue: 2075,
          },
          {
            id: "annual_fees_per_mw",
            title: "Annual Fees Per MW",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 0.03,
          },
        ],
      },
      {
        id: "easement_costs",
        title: "Easement Costs",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: 2021,
            maxValue: 2075,
          },
          {
            id: "annual_cost",
            title: "Annual Cost",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_KM,
          },
          {
            id: "cable_length",
            title: "Cable Length",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KM,
          },
        ],
      },
      {
        id: "legal_costs",
        title: "Legal Costs",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: 2021,
            maxValue: 2075,
          },
          {
            id: "annual_cost",
            title: "Annual Cost",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 30,
          },
        ],
      },
      {
        id: "other_administrative_costs",
        title: "Other Administrative Costs",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][0].id,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            minValue: 2021,
            maxValue: 2075,
          },
          {
            id: "annual_accounting_fees_and_audit",
            title: "Annual Accounting Fees and Audit",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5,
          },
          {
            id: "annual_it",
            title: "Annual IT",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5,
          },
          {
            id: "annual_other_cost",
            title: "Annual Other Cost",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5,
          },
          {
            id: "total_costs",
            title: "Total Costs",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            renderValue: {
              params: {
                local: [
                  "annual_accounting_fees_and_audit",
                  "annual_it",
                  "annual_other_cost",
                ],
                global: [],
              },
              fn: ({
                annual_accounting_fees_and_audit = "0",
                annual_it = "0",
                annual_other_cost = "0",
              }: {
                annual_accounting_fees_and_audit: string;
                annual_it: string;
                annual_other_cost: string;
              }) => {
                let val = parseFloat(annual_accounting_fees_and_audit) || 0;
                val += parseFloat(annual_it);
                val += parseFloat(annual_other_cost);
                return val;
              },
            },
          },
        ],
      },
      {
        id: "intercompany_expense",
        title: "Intercompany Expense",
        datum: [
          {
            id: "inflation_profile",
            title: "Inflation Profile",
            type: PARAM_TYPE.CHOICE.INFLATION,
          },
          {
            id: "inflation_base_year",
            title: "Inflation Base Year",
            type: PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEAR,
            minValue: 2021,
            maxValue: 2075,
          },
          {
            id: "annual_cost",
            title: "Annual Cost",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
          },
        ],
      },
      {
        id: "decommissioning_provision",
        title: "Decommissioning Provision",
        datum: [
          {
            id: "decommissioning_total_cost",
            title: "Decommissioning Total Cost",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 150,
          },
          {
            id: "decommissioning_securities",
            title: "Decommissioning securities input",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "decommissioning_security",
                title: "Security choice",
                type: PARAM_TYPE.TEXT,
              },
              {
                id: "decommissioning_security_start",
                title: "Security start date",
                type: PARAM_TYPE.DATE,
              },

              {
                id: "decommissioning_security_length",
                title: "Length of security",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
              },
              {
                id: "decommissioning_security_end",
                title: "Security end date",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "decommissioning_premium_fee",
                title: "Premium fee",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
          {
            id: "interim",
            title: "Interim deposit",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "interim_deposit",
                title: "Interim deposit",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: "interim_deposit_start",
                title: "Interim deposit date",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "other_inputs",
    title: "Other Inputs",
    datum: [],
    children: [
      {
        id: "working_capital",
        title: "Working Capital",
        datum: [
          {
            id: "debtor_days",
            title: "Debtor Days",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            defaultValue: 90,
            maxValue: 180,
            minValue: 0,
          },
          {
            id: "creditor_days",
            title: "Creditor Days",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            defaultValue: 90,
            maxValue: 180,
            minValue: 0,
          },
        ],
      },
      {
        id: "national_grid_securities",
        title: "National Grid Securities",
        datum: [
          {
            id: "security_choice",
            title: "Security Choice",
            type: PARAM_TYPE.CHOICE.SECURITY,
          },
          {
            id: "attributable_security_choice",
            title: "Attributable Security Choice",
            type: PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY,
          },
          {
            id: "attributable_security_choice_data",
            title: "Attributable Security Choice Data (£'000)",
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: "function",
              params: ["securityChoice"],
              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY].map(
                  (c) => c?.label
                ),
            },

            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (let i = 8; i > 0; i--) {
                  result.push([`COD - ${i * 6}`]);
                }
                return result;
              },
            },
          },
          {
            id: "total_attributable_costs",
            title: "Total Attributable Costs",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 4800,
          },
          {
            id: "annual_wider_cancellation_costs",
            title: "Annual Wider Cancellation Costs",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 401,
          },
          {
            id: "premium_fee",
            title: "Premium Fee",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 1.5,
          },
          {
            id: "useful_economic_life",
            title:
              "Useful Economic Life for Capitalised NG Securities Premium Fees",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEARS,
            defaultValue: 40,
          },
        ],
      },
      {
        id: "dsa_details",
        title: "DSA Details",
        children: [],
        datum: [
          {
            id: "dsa_dates",
            title: "DSA Dates",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "pda_date",
                title: "PDA",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "hots_date",
                title: "HOTS",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "land_secured_date",
                title: "Land Secured",
                type: PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    global: ["land_secured_date"],
                    local: [],
                  },
                  fn: ({ land_secured_date }: { land_secured_date: string }) =>
                    land_secured_date,
                },
              },
              {
                id: "grid_application_date",
                title: "Grid Application",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "grid_first_offer_received_date",
                title: "Grid First Offer Received",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "grid_secured_date",
                title: "Grid Secured",
                type: PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    global: ["basic"],
                    local: [],
                  },
                  fn: ({ grid_secured_date }: { grid_secured_date: string }) =>
                    grid_secured_date,
                },
              },
              {
                id: "preplanning_date",
                title: "Preplanning",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "consultation_date",
                title: "Consultation",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "planning_consent_date",
                title: "Planning Consent",
                type: PARAM_TYPE.DATE,
              },
              {
                id: "pre_construction_discharched_date",
                title: "Pre-construction Planning Conditions Discharged",
                type: PARAM_TYPE.DATE,
              },
            ],
          },
          {
            id: "dsa_milestones",
            title: "DSA Milestones",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "pda_milestone",
                title: "PDA",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "hots_milestone",
                title: "HOTS",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "land_secured_milestone",
                title: "Land Secured",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "grid_application_milestone",
                title: "Grid Application",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "grid_first_offer_received_milestone",
                title: "Grid First Offer Received",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "grid_secured_milestone",
                title: "Grid Secured",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "preplanning_milestone",
                title: "Preplanning",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "consultation_milestone",
                title: "Consultation",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "planning_consent_milestone",
                title: "Planning Consent",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "pre_construction_discharched_milestone",
                title: "Pre-construction Planning Conditions Discharged",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    global: [],
                    local: [
                      "pda_milestone",
                      "hots_milestone",
                      "land_secured_milestone",
                      "grid_application_milestone",
                      "grid_first_offer_received_milestone",
                      "grid_secured_milestone",
                      "preplanning_milestone",
                      "consultation_milestone",
                      "planning_consent_milestone",
                    ],
                  },
                  fn: ({
                    pda_milestone = 0,
                    hots_milestone = 0,
                    land_secured_milestone = 0,
                    grid_application_milestone = 0,
                    grid_first_offer_received_milestone = 0,
                    grid_secured_milestone = 0,
                    preplanning_milestone = 0,
                    consultation_milestone = 0,
                    planning_consent_milestone = 0,
                  }: {
                    pda_milestone?: number;
                    hots_milestone?: number;
                    land_secured_milestone?: number;
                    grid_application_milestone?: number;
                    grid_first_offer_received_milestone?: number;
                    grid_secured_milestone?: number;
                    preplanning_milestone?: number;
                    consultation_milestone?: number;
                    planning_consent_milestone?: number;
                  }) =>
                    100 -
                    pda_milestone -
                    hots_milestone -
                    land_secured_milestone -
                    grid_application_milestone -
                    grid_first_offer_received_milestone -
                    grid_secured_milestone -
                    preplanning_milestone -
                    consultation_milestone -
                    planning_consent_milestone,
                },
              },
            ],
          },
          {
            id: "dsa_inflation_details",
            title: "DSA Inflation Details",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "base_total_dsa_fee",
                title: "Base total DSA fee",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
              },
              {
                id: "inflation_profile",
                title: "Inflation Profile",
                type: PARAM_TYPE.CHOICE.INFLATION,
              },
              {
                id: "base_year",
                title: "Base Year",
                type: PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
        ],
      },
      {
        id: "financing",
        title: "Financing",
        datum: [],
        children: [
          {
            id: "cash_requirements",
            title: "Cash Requirements",
            datum: [
              {
                id: "minimum_cash_switch",
                title: "Minimum Cash Switch",
                type: PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "minimum_cash_balance",
                title: "Minimum Cash Balance",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
                defaultValue: 10,
                isShow: {
                  params: {
                    global: [],
                    local: ["minimum_cash_switch"],
                  },
                  fn: ({
                    minimum_cash_switch,
                  }: {
                    minimum_cash_switch: number;
                  }) => minimum_cash_switch == 1,
                },
              },
              {
                id: "cash_requirement_look_forward_restriction",
                title: "Cash Requirement Look-Forward Restriction",
                type: PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.QUARTERS,
                minValue: 0,
                maxValue: 4,
                isShow: {
                  params: {
                    global: [],
                    local: ["minimum_cash_switch"],
                  },
                  fn: ({
                    minimum_cash_switch,
                  }: {
                    minimum_cash_switch: number;
                  }) => minimum_cash_switch == 1,
                },
              },
              {
                id: "number_of_quarters_in_advance",
                title:
                  "Number of Quarters in Advance to Start Saving up Cash Balance to Cover",
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "batteries",
                    title: "Batteries",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "devex",
                    title: "Devex",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "capitalised_rent_in_construction",
                    title: "Capitalised Rent in Construction",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "capitalised_communnity_benefit_in_construction",
                    title: "Capitalised Community Benefit in Construction",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "land_purchase",
                    title: "Land Purchase",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "pooling_substation",
                    title: "Pooling Substation",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "transformers",
                    title: "Transformers",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "balance_of_plant",
                    title: "Balance of Plant",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "substation_build_dev_capex_premium",
                    title: "Substaion build devlopment and capex premium",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "solar_epc_replacement",
                    title: "Solar EPC(need replacement)",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "solar_epc",
                    title: "Solar EPC(no replacement)",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                  {
                    id: "ev_dev_fee",
                    title: "Enterprise Value - Development Fee",
                    type: PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.QUARTERS,
                    minValue: 0,
                    maxValue: 4,
                  },
                ],
              },
            ],
          },
          {
            id: "gearing_by_capex_type",
            title: "Gearing by Capex Type",
            datum: [
              {
                id: "bess_augmentation",
                title: "BESS Augmentation",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
              {
                id: "bess_replacement_1",
                title: "BESS Replacement1",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 70,
              },
              {
                id: "bess_replacement_2",
                title: "BESS Replacement2",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 70,
              },
              {
                id: "gearing_excluding_batteries",
                title: "Gearing Excluding Batteries",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
            ],
          },
          {
            id: "senior_debt",
            title: "Senior Debt",
            datum: [
              {
                id: "senior_debt_strategy",
                title: "Senior debt drawdown/repayment strategy",
                type: PARAM_TYPE.CHOICE.DEBT_STRATEGY,
              },
              {
                id: "senior_debt_interest",
                title: "Senior debt Interest",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                defaultValue: 8.25,
                minValue: 0,
                maxValue: 100,
              },
              {
                id: "cash_sweep_percentage_of_available_cash",
                title:
                  "Cash Sweep % of Available Cash (Senior Debt Repayment Profile)",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "minimum_allowed_dscr_half_yearly",
                title: "Minimum Allowed DSCR (Half-Yearly)",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
              {
                id: "minimum_allowed_dscr_annual",
                title: "Minimum Allowed DSCR (Annual)",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
              {
                id: "arrangement_fee_percentage",
                title: "Arrangement Fee Percentage",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "dscr_check_switch",
                title: "Minimum allowed DSCR check on",
                type: PARAM_TYPE.SWITCH.ONOFF,
              },
            ],
          },
          {
            id: "equity",
            title: "Equity",
            datum: [
              {
                id: "equity_split_to_sharholder_loan",
                title: "Equity Split to Shareholder Loan",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "equity_split_to_share_capital",
                title: "Equity Split to Share Capital",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    global: [],
                    local: ["equity_split_to_sharholder_loan"],
                  },
                  fn: ({
                    equity_split_to_sharholder_loan,
                  }: {
                    equity_split_to_sharholder_loan: number;
                  }) => 100 - equity_split_to_sharholder_loan,
                },
              },
              {
                id: "shareholder_loan_interest_switch",
                title: "Shareholder Loan Interest Active",
                type: PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: "shareholder_loan_interest",
                title: "Shareholder Loan Interest",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                defaultValue: 8,
                minValue: 0,
                maxValue: 100,
              },
              {
                id: "shareholder_loan_interest_for_calculations",
                title: "Shareholder Loan Interest to Use in Calculations",
                type: PARAM_TYPE.TEXT,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                renderValue: {
                  params: {
                    local: [
                      "shareholder_loan_interest",
                      "shareholder_loan_interest_switch",
                    ],
                    global: [],
                  },
                  fn: ({
                    shareholder_loan_interest,
                    shareholder_loan_interest_switch,
                  }: {
                    shareholder_loan_interest: number;
                    shareholder_loan_interest_switch: number;
                  }) => {
                    return shareholder_loan_interest &&
                      shareholder_loan_interest_switch
                      ? shareholder_loan_interest *
                          shareholder_loan_interest_switch
                      : 0;
                  },
                },
              },
              {
                id: "shareholder_loan_cash_sweep_percentage_of_available_cash",
                title: "Shareholder Loan Cash Sweep % of Available Cash",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "share_capital_cash_sweep_percentage_of_available_cash",
                title: "Share Capital Cash Sweep % of Available Cash",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              // {
              // 	id: "dividends_cash_sweep_percentage_of_available_cash",
              // 	title: "Dividends cash sweep % of available cash",
              // 	type: PARAM_TYPE.NUMBER,
              // 	unit: PARAM_UNIT.PERCENTAGE,
              // 	defaultValue: 0,
              // },
            ],
          },
          {
            id: "dividends",
            title: "Dividends",
            datum: [
              {
                id: "dividends_cash_sweep_percentage_of_available_cash",
                title: "Dividends Cash Sweep % of Available Cash",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
            ],
          },
        ],
      },

      {
        id: "vat",
        title: "VAT",
        datum: [
          {
            id: "vat_rate",
            title: "VAT Rate",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 20,
          },
          {
            id: "percentage_of_revenue_subject_to_vat",
            title: "Percentage of Revenue Subject to VAT",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          {
            id: "percentage_of_costs_and_capex_subject_to_vat",
            title: "Percentage of Costs and Capex Subject to VAT",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          // {
          // 	id: "monthly_payments_on_account",
          // 	title: "Monthly payments on account",
          // 	type: PARAM_TYPE.NUMBER,
          // 	unit: PARAM_UNIT.GBP_PRO_1000,
          // 	defaultValue: 35,
          // },
        ],
      },
      {
        id: "corporation_tax",
        title: "Corporation Tax",
        datum: [
          {
            id: "small_profits_tax_rate",
            title: "Small Profits Tax Rate",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 19,
          },
          {
            id: "main_rate_of_tax",
            title: "Main Rate of Tax",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 25,
          },
          {
            id: "profit_threshold_for_small_profits",
            title: "Profit Threshold for Small Profits",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 50,
          },
          {
            id: "aia",
            title: "AIA",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1000,
          },
          {
            id: "rate_for_capital_allowances_main_pool",
            title: "Rate for Capital Allowances Main Pool",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 6,
          },
          {
            id: "rate_for_capital_allowances_capital_pool",
            title: "Rate for Capital Allowances Special Pool",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 6,
          },
          {
            id: "small_pool_allowances_threshold",
            title: "Small Pool Allowance Threshold",
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1,
          },
        ],
      },

      {
        id: "inflation_rate_data",
        title: "Inflation Rate Data",
        datum: [
          {
            id: "inflation_start_year",
            title: "Inflation Start Year",
            type: PARAM_TYPE.NUMBER,
            defaultValue: 2021,
          },
          {
            id: "inflation_index_table",
            title: "Inflation Index Table (%)",
            type: PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: ["cyclesPerDay"],
              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION].map((c) => c?.label),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push("");
                for (let i = 0; i < 60; i++) {
                  result.push([INFLATION_START_YEAR + i]);
                }
                return result;
              },
            },
            valueRange: "percentage",
            editable: "disabled",
          },
        ],
      },
      {
        id: "exchange_rate_data",
        title: "Exchange Rate Data",
        datum: [
          {
            id: "exchange_rate",
            title: "Exchange Rates(%)",
            type: PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [],
              fn: () => ["GBP    £/£", "EUR    €/£", "USD    $/£"],
            },
            stickyRows: {
              type: "function",
              params: ["extendedCalculationPeriod", "modelStartDate"],
              fn: ({
                modelStartDate,
                extendedCalculationPeriod,
              }: {
                extendedCalculationPeriod: number;
                modelStartDate: string;
              }) => [
                ["Period", "Start date", "End date"],
                ...[...new Array(LAST_QUARTER_NUMBER)].map((d, index) => [
                  index + 1,
                  moment(modelStartDate)
                    .add(index * 3, "month")
                    .format("D-MMM-YY"),
                  moment(modelStartDate)
                    .add(index * 3 + 2, "month")
                    .endOf("month")
                    .format("D-MMM-YY"),
                ]),
              ],
            },
            editable: "disabled",
          },
        ],
      },
    ],
  },
  {
    id: "valuation_and_returns_inputs",
    title: "Valuation and Returns Inputs",
    datum: [],
    children: [
      {
        id: "valuation",
        title: "Valuation",
        type: PARAM_TYPE.GROUP,
        datum: [
          {
            id: "valuation_date_group",
            title: "Valuation Date",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "date_to_use_for_valuation_date",
                title: "Date to Use for Valuation Date",
                editable: "disabled",
                // type: PARAM_TYPE.TEXT,
                // renderValue: {
                //   params: {
                //     local: [],
                //     global: ["fully_consented_date"],
                //   },
                //   fn: ({
                //     fully_consented_date,
                //   }: {
                //     fully_consented_date: string;
                //   }) => {
                //     return fully_consented_date == "-"
                //       ? fully_consented_date
                //       : `${fully_consented_date} (Fully consented)`;
                //   },
                // },
                type: PARAM_TYPE.CHOICE.VALUATION_DATE,
              },
              {
                id: "valuation_date",
                title: "Valuation Date",
                type: PARAM_TYPE.DATE,
                editable: "disabled",
                isShow: {
                  params: {
                    global: [],
                    local: ["date_to_use_for_valuation_date"],
                  },
                  fn: ({
                    date_to_use_for_valuation_date,
                  }: {
                    date_to_use_for_valuation_date: number;
                  }) => date_to_use_for_valuation_date == 4,
                },
              },
            ],
          },
          {
            id: "discount_rate",
            title: "Discount Rates",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "cost_of_equity",
                title: "Cost of Equity",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                editable: "disabled",
                defaultValue: 10,
              },
              {
                id: "rate_pre_un",
                title: "Discount Rate Pre-Tax and Unlevered",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["cost_of_equity"],
                    global: [],
                  },
                  fn: ({ cost_of_equity }: { cost_of_equity: number }) => {
                    return cost_of_equity || "-";
                  },
                },
                editable: "disabled",
              },
              {
                id: "rate_post_un",
                title: "Discount Rate Post-Tax and Unlevered",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["cost_of_equity"],
                    global: [],
                  },
                  fn: ({ cost_of_equity }: { cost_of_equity: number }) => {
                    return cost_of_equity || "-";
                  },
                },
                editable: "disabled",
              },
              {
                id: "rate_post",
                title: "Discount Rate Post-Tax and Levered",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["cost_of_equity"],
                    global: ["gearing", "cost_of_debt", "tax_rate"],
                  },
                  fn: ({
                    cost_of_equity,
                    gearing,
                    cost_of_debt,
                    tax_rate,
                  }: {
                    cost_of_equity: number;
                    gearing: number;
                    cost_of_debt: number;
                    tax_rate: number;
                  }) => {
                    return cost_of_equity
                      ? 100 *
                          (((1 - gearing) * cost_of_equity) / 100 +
                            gearing * cost_of_debt * (1 - tax_rate))
                      : "-";
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "returns",
        title: "Returns",
        type: PARAM_TYPE.GROUP,
        datum: [
          {
            id: "setup",
            title: "Setup",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "gp_lp_carry_functionality",
                title: "GP/LP Carry Functionality Active",
                type: PARAM_TYPE.SWITCH.YESNO,
                editable: "disabled",
              },
              {
                id: "number_of_stages",
                title: "Number of Stages",
                type: PARAM_TYPE.CHOICE.STAGES,
                editable: "disabled",
              },

              {
                id: "carry_basis",
                title: "Carry Basis",
                type: PARAM_TYPE.CHOICE.CARRY_BASIS,
                editable: "disabled",
              },
            ],
          },
          {
            id: "stage_1",
            title: "Stage 1",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "hurdle_rate_1",
                title: "Hurdle Rate",
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                editable: "disabled",
              },
              {
                id: "gp_portion_after_hurdle_rate_1",
                title: `GP Portion After LP's Hurdle Rate Achieved`,
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                editable: "disabled",
              },
              {
                id: "gp_portion_for_carry_1",
                title: `GP Portion for Carry`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["gp_portion_after_hurdle_rate_1"],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_1,
                  }: {
                    gp_portion_after_hurdle_rate_1: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_1 || "-";
                  },
                },
              },
              {
                id: "lp_portion",
                title: `LP Portion`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_1",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_1,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_1: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_1
                      ? 100 -
                          (gp_lp_carry_functionality
                            ? gp_portion_after_hurdle_rate_1
                            : 0)
                      : "-";
                  },
                },
              },
              {
                id: "gp_portion_by_product",
                title: `GP Portion After LP's Hurdle Rate Achieved`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_1",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_1,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_1: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_1
                      ? gp_lp_carry_functionality == 1
                        ? gp_portion_after_hurdle_rate_1
                        : 0
                      : "-";
                  },
                },
              },
              {
                id: "gp_portion_for_carry_byproduct",
                title: `GP Portion for Carry`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_1",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_1,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_1: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_1
                      ? gp_lp_carry_functionality
                        ? gp_portion_after_hurdle_rate_1
                        : 0
                      : "-";
                  },
                },
              },
            ],
          },
          {
            id: "stage_2",
            title: "Stage 2",
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: "hurdle_rate_2",
                title: "Hurdle Rate",
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "gp_portion_after_hurdle_rate_2",
                title: `GP Portion After LP's Hurdle Rate Achieved`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "gp_portion_for_carry_2",
                title: `GP Portion for Carry`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: ["gp_portion_after_hurdle_rate_2"],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_2,
                  }: {
                    gp_portion_after_hurdle_rate_2: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_2 || "-";
                  },
                },
              },
              {
                id: "lp_portion",
                title: `LP Portion`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_2",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_2,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_2: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_2
                      ? 100 -
                          (gp_lp_carry_functionality
                            ? gp_portion_after_hurdle_rate_2
                            : 0)
                      : "-";
                  },
                },
              },
              {
                id: "gp_portion_by_product",
                title: `GP Portion After LP's Hurdle Rate Achieved`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_2",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_2,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_2: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_2
                      ? gp_lp_carry_functionality == 1
                        ? gp_portion_after_hurdle_rate_2
                        : 0
                      : "-";
                  },
                },
              },
              {
                id: "gp_portion_for_carry_byproduct",
                title: `GP Portion for Carry`,
                type: PARAM_TYPE.NUMBER,
                editable: "disabled",
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    local: [
                      "gp_portion_after_hurdle_rate_2",
                      "gp_lp_carry_functionality",
                    ],
                    global: [],
                  },
                  fn: ({
                    gp_portion_after_hurdle_rate_2,
                    gp_lp_carry_functionality,
                  }: {
                    gp_portion_after_hurdle_rate_2: number;
                    gp_lp_carry_functionality: number;
                  }) => {
                    return gp_portion_after_hurdle_rate_2
                      ? gp_lp_carry_functionality
                        ? gp_portion_after_hurdle_rate_2
                        : 0
                      : "-";
                  },
                },
              },
            ],
          },
          {
            id: "gp_discount_rate",
            title: "GP Discount Rate",
            type: PARAM_TYPE.NUMBER,
            editable: "disabled",
            unit: PARAM_UNIT.PERCENTAGE,
          },
        ],
      },
    ],
  },
];
