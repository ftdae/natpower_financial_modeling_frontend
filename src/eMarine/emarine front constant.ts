import moment from "moment";
import { IInputParameter } from "../utils/types";
import { DATE_FORMAT } from "../utils/usePrameter";
import { PARAM_TYPE } from "../utils/constant";
import {
  getMonthNumberFromModelStartDate,
  getQuarterNumberFromModelStartDate,
} from "../calculation/calculates/utils";

export const INPUT_TYPES = {};
export const INFLATION_START_YEAR = 2023;
export const INFLATION_END_YEAR = 2072;

export const MODEL_START_YEAR = 2023;
export const EMARINE_MODEL_START_YEAR = 2023;
export const EMARINE_MODEL_END_YEAR = 2072;

export const sortStrArr = (arr: string[]) => {
  return arr?.sort((a, b) => a.localeCompare(b));
};

// export const LOCAL_CIRCUITS_ZONE: string[] = [
//   `Not applicable`,
//   `Aberarder`,
//   `Aberdeen Bay`,
//   `Achruach`,
//   `Aigas`,
//   `An Suidhe`,
//   `Arecleoch`,
//   `Arecleoch extension`,
//   `Ayrshire grid collector`,
//   `beaw field`,
//   `Beinneun Wind Farm`,
//   `Benbrack`,
//   `Bhlaraidh Wind Farm`,
//   `Black Hill`,
//   `Black Law`,
//   `BlackCraig Wind Farm`,
//   `BlackLaw Extension`,
//   `Blarghour`,
//   `Branxton`,
//   `Broken Cross`,
//   `carrick`,
//   `Chirmorie`,
//   `Clash Gour`,
//   `Clauchrie`,
//   `Cloiche`,
//   `Clyde (North)`,
//   `Clyde (South)`,
//   `Coalburn BESS`,
//   `Coire Glas`,
//   `Connagill`,
//   `Corriegarth`,
//   `Corriemoillie`,
//   `Coryton`,
//   `costa head`,
//   `Craig Watch Wind Farm`,
//   `CREAG RIABHACH`,
//   `Cruachan`,
//   `culham jet`,
//   `Culligran`,
//   `Cumberhead Collector`,
//   `Cumberhead West`,
//   `daer`,
//   `Deanie`,
//   `Dersalloch`,
//   `Dinorwig`,
//   `Dorenell`,
//   `Douglas North`,
//   `Dumnaglass`,
//   `Dunhill`,
//   `Dunlaw Extension`,
//   `Edinbane`,
//   `elchies`,
//   `energy isles wind farm`,
//   `Enoch Hill`,
//   `euchanhead`,
//   `Ewe Hill`,
//   `Fallago`,
//   `Farr`,
//   `Faw Side`,
//   `Fernoch`,
//   `Ffestiniogg`,
//   `Fife Grid Services`,
//   `Finlarig`,
//   `Foyers`,
//   `Friston`,
//   `Galawhistle`,
//   `Gills Bay`,
//   `Glen Kyllachy`,
//   `Glen Ullinish`,
//   `Glendoe`,
//   `Glenglass`,
//   `glenmuckloch hydro pumped storage`,
//   `glenshimmeroch`,
//   `Gordonbush`,
//   `Greenburn`,
//   `Griffin Wind`,
//   `Hadyard Hill`,
//   `Harestanes`,
//   `Hartlepool`,
//   `Heathland`,
//   `hesta head`,
//   `hopsrig collector`,
//   `Invergarry`,
//   `Kennoxhead`,
//   `Kergord`,
//   `Kilgallioch`,
//   `Kilmarnock BESS`,
//   `Kilmorack`,
//   `Kings Lynn`,
//   `kirkton`,
//   `Kype Muir`,
//   `Lairg`,
//   `Langage`,
//   `lethans`,
//   `Limekilns`,
//   `Lochay`,
//   `Lorg`,
//   `Luichart`,
//   `Marchwood`,
//   `Mark Hill`,
//   `melvich`,
//   `Middle Muir`,
//   `Middleton`,
//   `Millennium South`,
//   `Millennium Wind `,
//   `Mossford`,
//   `mossy hill`,
//   `Nant`,
//   `Necton`,
//   `north lowther energy initiative`,
//   `old forest of ae`,
//   `overhill`,
//   `quantans hill`,
//   `Rawhills`,
//   `Rhigos`,
//   `Rocksavage`,
//   `ryhall`,
//   `Saltend`,
//   `Sandy Knowe`,
//   `Sanquhar II`,
//   `Scoop Hill`,
//   `Shepherds rig`,
//   `South Humber Bank`,
//   `Spalding`,
//   `stornoway wind`,
//   `Stranoch`,
//   `Strathbrora`,
//   `Strathy`,
//   `Strathy Wind`,
//   `Strathy Wood`,
//   `Stronelairg`,
//   `teindland wind farm`,
//   `troston`,
//   `Wester Dod`,
//   `Whitelee`,
//   `Whitelee Extension`,
// ];

// export const TNUOS_ZONE_LIST: string[] = [
//   `North Scotland`,
//   `East Aberdeenshire`,
//   `Western Highlands`,
//   `Skye and Lochalsh`,
//   `Eastern Grampian and Tayside`,
//   `Central Grampian`,
//   `Argyll`,
//   `The Trossachs`,
//   `Stirlingshire and Fife`,
//   `South West Scotlands`,
//   `Lothian and Borders`,
//   `Solway and Cheviot`,
//   `North East England`,
//   `North Lancashire and The Lakes`,
//   `South Lancashire Yorkshire and Humber`,
//   `North Midlands and North Wales`,
//   `South Lincolnshire and North Norfolk`,
//   `Mid Wales and The Midlands`,
//   `Anglesey and Snowdon`,
//   `Pembrokeshire`,
//   `South Wales & Gloucester`,
//   `Cotswold`,
//   `Central London`,
//   `Essex and Kent`,
//   `Oxfordshire Surrey and Sussex`,
//   `Somerset and Wessex`,
//   `West Devon and Cornwall`,
// ];
// export const LOCAL_SUBSTATION_TYPE: string[] = [
//   `No redundancy & <1320 MW`,
//   `Redundancy & <1320 MW`,
//   `No redundancy & >=1320 MW`,
//   `Redundancy & >=1320 MW`,
// ];
// export const VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS: string[] = [
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
//   "Variable - EP13 - 1013",
//   "Fixed profile",
// ];

// export const INFLATION_LIST: string[] = [
//   `No inflation`,
//   `RPI`,
//   `CPI`,
//   `Tees rent high case`,
//   `FES to 2050 then nil`,
//   `FES constant from 2050`,
//   `CPI to 2050 then nil`,
//   `CPI with 2% collar and 5% cap`,
//   `CPI to 2060 then nil`,
// ];

// export const REGION_LIST: string[] = sortStrArr([
//   `Northern Scotland`,
//   `Southern Scotland`,
//   `Northern`,
//   `North West`,
//   `Yorkshire`,
//   `N Wales & Mersey`,
//   `East Midlands`,
//   `Midlands`,
//   `Eastern`,
//   `South Wales`,
//   `South East`,
//   `London`,
//   `Southern`,
//   `South Western`,
// ]);

// export const REGION_PARAMS: string[] = [
//   "Avg. Cycles per day",
//   "Wholesale Day Ahead Total Revenues",
//   "Wholesale Intraday Revenues",
//   "Balancing Mechanism Revenues",
//   "Capacity Market Revenues",
//   "Frequency Response Revenues",
//   "Balancing Reserve Revenues",
//   "TNUoS Revenues",
//   "Total Revenues",
// ];
// export const AFRY_PARAMS: string[] = [
//   "Avg. Cycles per day",
//   "Day Ahead Sell Revenue",
//   "Day Ahead Buy Costs",
//   "Intra-Day Sell Revenue",
//   "Intra-Day Buy Costs",
//   "Balancing Mechanism Offer Revenues",
//   "Balancing Mechanism Bid Costs",
//   "Capacity Price",
//   "Response Availability Revenue",
//   "Response SoE Costs",
//   "Reserve Availablility Revenue",
// ];

// export const PAYMENT_PROFILE_LIST: string[] = [
//   "BESS profile",
//   "Tx profile",
//   "Balance of Plant profile",
//   "Worset Lane - BESS profile",
//   "Worset Lane - Tx profile",
//   "Worset Lane - Balance of Plant profile",
//   "Bramley SSEN payment profile",
//   "Development fee payment profile",
//   "Fully consented 100% payment profile",
// ];

// export const STRATEGY_LIST: string[] = ["Ancillaries Focus", "Merchant Focus"];
export const EMARINE_INFLATION_LIST: string[] = [
  "No inflation",
  "RPI (OBR)",
  "CPI (OBR)",
  "Tees rent high case",
  "CPI +1%",
  "Europe--Spain",
  "Europe--Netherlands",
  "Europe--Belgium",
  "Europe--Croatia",
  "Africa--Libya",
  "Europe--Germany",
  "Europe--Greece",
  "Africa--Tunisia",
  "Africa--Egypt",
  "Europe--Sweden",
  "Europe--Norway",
  "Europe--U.K.",
  "Europe--France",
  "Europe--Poland",
  "Europe--Republic of Ireland",
  "Europe--Finland",
  "Europe--Italy",
  "Europe--Denmark",
  "Europe--Portugal",
  "Europe--Cyprus",
  "Africa--Algeria",
  "Africa--Morocco",
  "Europe--Slovenia",
  "Middle East--Israel",
  "Europe--Gibraltar",
  "Middle East--Turkiye",
  "Europe--Croatia",
  "Europe--Montenegro",
  "Europe--Latvia",
  "Europe--Lithuania",
  "Europe--Estonia",
  "Europe--Albania",
  "North America-East Coast-U.S.A.",
  "North America-East Coast-Canada",
  "North America-Gulf of Mexico and Caribbean-Panama",
  "North America-Gulf of Mexico and Caribbean-Jamaica",
  "North America-Gulf of Mexico and Caribbean-Cayman Islands",
  "North America-Gulf of Mexico and Caribbean-Dominican Republic",
  "North America-Gulf of Mexico and Caribbean-Dominica",
  "South America--Curacao",
  "North America-Gulf of Mexico and Caribbean-Puerto Rico",
  "North America-Gulf of Mexico and Caribbean-Honduras",
  "North America-Gulf of Mexico and Caribbean-Haiti",
  "North America-Gulf of Mexico and Caribbean-Bahamas",
  "North America-Gulf of Mexico and Caribbean-Belize",
  "North America-Gulf of Mexico and Caribbean-Aruba",
  "North America-Gulf of Mexico and Caribbean-Costa Rica",
  "North America-Gulf of Mexico and Caribbean-Bermuda",
  "North America-Gulf of Mexico and Caribbean-Nicaragua",
  "CPI (BoE)",
  "CPI (average OBR and BoE)",
  "Afry inflation",
  "RPI (+ 2.28% until 2040)",
];
export const ONE_OFF_CAPEX_ITEM_LIST: string[] = [
  "1-Heysham-Capex - Marine-Grid Connection cost from DNO to marine site",
  "1-Heysham-Capex - Marine-Grid connection within the DNO system",
  "1-Heysham-Capex - BESS-BESS From BYD quotation 8MWh",
  "1-Heysham-Capex - BESS-EPC-BESS Construction",
  "2-Heysham-Capex - BESS-BESS PSC",
  "2-Heysham-Capex - BESS-EPC-BESS Construction",
  "2-Heysham-Capex - BESS-EPC-BESS Construction",
  "1-Heysham-Capex - Marine-ehouse (incl. shipment and tax)",
  "1-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
  "2-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) ",
  "2-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
  "3-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) ",
  "3-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
  "1-Heysham-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)",
  "1-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
  "1-Heysham-Capex - Marine-EPC-Marine Cables",
  "2-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
  "2-Heysham-Capex - Marine-EPC-Marine Cables",
  "3-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
  "3-Heysham-Capex - Marine-EPC-Marine Cables",
];
export const PHASE_AND_COST = ONE_OFF_CAPEX_ITEM_LIST.flatMap((_, index) => [
  `phase_incurred_${index + 1}`,
  `cost_${index + 1}`,
]);
export const PHASE_ONE_CAPEX: string[] = [
  "1-Capex - Marine-ehouse (incl. shipment and tax)",
  "1-Capex - Marine-CMS (incl. shipment and tax)",
  "1-Capex - Marine-EPC-Marine ehouse",
  "1-Capex - Marine-EPC-Marine CMS",
  "",
];
export const PHASE_TWO_CAPEX: string[] = [
  "2-Capex - Marine-ehouse (incl. shipment and tax)",
  "2-Capex - Marine-CMS (incl. shipment and tax)",
  "2-Capex - Marine-EPC-Marine ehouse",
  "2-Capex - Marine-EPC-Marine CMS",
  "",
];
export const PHASE_THREE_CAPEX: string[] = [
  "3-Capex - Marine-ehouse (incl. shipment and tax)",
  "3-Capex - Marine-CMS (incl. shipment and tax)",
  "3-Capex - Marine-EPC-Marine ehouse",
  "3-Capex - Marine-EPC-Marine CMS",
  "",
];
export const EMARINE_VALUATION_POINT_LIST: string[] = [
  "Phase 1 - Development start date",
  "Phase 1 - COD and operating start date",
  "Phase 2 - Development start date",
  "Phase 2 - Operations start date",
  "Phase 3 - Development start date",
  "Phase 3 - Operations start date",
  "Valuation date",
];
export const PROPULSION_NM_LIST: string[] = [
  "CRUISE - Propulsion first + Last nm requirements to run on electric power",
  "FERRY - Propulsion first + Last nm requirements to run on electric power",
  "CONTAINER - Propulsion first + Last nm requirements to run on electric power",
  "CAR CARRIER - Propulsion first + Last nm requirements to run on electric power",
  "CHEMICAL - Propulsion first + Last nm requirements to run on electric power",
  "CARGO - Propulsion first + Last nm requirements to run on electric power",
  "Offhore Construction Vessle - Propulsion first + Last nm requirements to run on electric power",
  "Stena - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "XX% acceseration Stena Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
  "1 CLDN - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "XX% acceseration CLDN Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
  "1 IOMSP - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "XX% acceseration IOMSP Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
  "1 Stena - 9.2MWh (12nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "Stena - 40MWh (60nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "Stena - 92MWh (120nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
  "Stena cold-iron only - Heysham - Propulsion first + Last nm requirements to run on electric power",
];
export const ALL_CAPEX_PAYMENT_PROFILE_LIST: string[] = [
  `OPS Generic S curve (Phase 1)`,
  `OPS Generic S curve (Phase 2)`,
  `OPS Generic S curve (Phase 3)`,
  `BESS Generic S curve`,
  ``,
  `1-Capex - Marine-Grid Connection cost from DNO to marine site`,
  `1-Capex - Marine-Grid connection within the DNO system`,
  `1-Capex - Marine-ehouse (incl. shipment and tax)`,
  `1-Capex - Marine-CMS (incl. shipment and tax)`,
  `1-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)`,
  `1-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `1-Capex - Marine-EPC-Marine ehouse`,
  `1-Capex - Marine-EPC-Marine CMS`,
  `1-Capex - Marine-EPC-Marine Cables`,
  `1-Capex - BESS-BESS From BYD quotation`,
  `1-Capex - BESS-EPC-BESS Construction`,
  ``,
  `2-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
  `2-Capex - Marine-CMS (incl. shipment and tax)`,
  `2-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `2-Capex - Marine-EPC-Marine ehouse`,
  `2-Capex - Marine-EPC-Marine CMS`,
  `2-Capex - Marine-EPC-Marine Cables`,
  `2-Capex - BESS-BESS  2x£0.544m=£1m for MC cube (incl. shipment and tax)`,
  `2-Capex - BESS-BESS  £0.6m for PSC (2.7MW/10MWh) (incl. shipment and tax)`,
  `2-Capex - BESS-EPC-BESS Construction`,
  ``,
  `3-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
  `3-Capex - Marine-CMS (incl. shipment and tax)`,
  `3-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `3-Capex - Marine-EPC-Marine ehouse`,
  `3-Capex - Marine-EPC-Marine CMS`,
  `3-Capex - Marine-EPC-Marine Cables`,
  `3-Capex - BESS-BESS. None1`,
  `3-Capex - BESS-BESS. None2`,
  ``,
  ``,
  `1-Heysham-Capex - Marine-Grid Connection cost from DNO to marine site`,
  `1-Heysham-Capex - Marine-Grid connection within the DNO system`,
  `1-Heysham-Capex - Marine-ehouse (incl. shipment and tax)`,
  `1-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
  `1-Heysham-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)`,
  `1-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `1-Heysham-Capex - Marine-EPC-Marine ehouse`,
  `1-Heysham-Capex - Marine-EPC-Marine CMS`,
  `1-Heysham-Capex - Marine-EPC-Marine Cables`,
  `1-Heysham-Capex - BESS-BESS From BYD quotation 8MWh`,
  `1-Heysham-Capex - BESS-EPC-BESS Construction`,
  ``,
  `2-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
  `2-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
  `2-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `2-Heysham-Capex - Marine-EPC-Marine ehouse`,
  `2-Heysham-Capex - Marine-EPC-Marine CMS`,
  `2-Heysham-Capex - Marine-EPC-Marine Cables`,
  `2-Heysham-Capex - BESS-BESS MC Cube`,
  `2-Heysham-Capex - BESS-BESS PSC`,
  `2-Heysham-Capex - BESS-EPC-BESS Construction`,
  ``,
  `3-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
  `3-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
  `3-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
  `3-Heysham-Capex - Marine-EPC-Marine ehouse`,
  `3-Heysham-Capex - Marine-EPC-Marine CMS`,
  `3-Heysham-Capex - Marine-EPC-Marine Cables`,
  `3-Heysham-Capex - BESS-BESS. None1`,
  `3-Heysham-Capex - BESS-BESS. None2`,
];
export const MARINE_PARAM_TYPE = {
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
    // ~~~eMarine
    OWNERSHIP: "choice_ownership",
    VERTICAL_TYPE: "choice_vertical_type",
    ADOPTION_CURVE: "choice_adoption_curve",
    GROWTH_FACTORS: "choice_growth_factors",
    MARKET_SHARE_CURVE: "choice_market_share_curve",
    LOCATION_TYPE: "choice_location_type",
    ENTITY: "choice_entity",
    VERTICAL_SEASONALITY_PROFILE: "choice_vertical_seasonality_profile",
    MONTH_NAME: "choice_month_name",
    AMORT_PAY_TIMING: "choice_amort_pay_timing",
    SPECIFY_CLIENT: "choice_specify_client",
    PRICING_STRATEGY: "choice_pricing_strategy",
    MARGIN_CHOICE: "choice_margin_choice",
    DEBT_STRATEGY: "choice_debt_strategy",
    MARINE_DEVEX_PROFILE: "choice_marine_devex_profile",
    ALL_CAPEX_PAYMENT_PROFILE: "choice_all_capex_payment_profile",
    SD_REPAYMENT_TYPE: "choice_sd_repayment_type",
    // ~~~eMarine
    PROVIDER_REGION: "choice_provider_region",
    AFRY_REGION: "choice_afry_region",
    MODO_REGION: "choice_modo_region",
    BARINGA_REGION: "choice_baringa_region",
    TECH: "choice_tech",
    CURRENCY: "choice_currency",
    EMARINE_CURRENCY: "choice_emarine_currency",
    EMARINE_PEAK_PROFILE: "choice_emarine_peak_profile",
    EMARINE_CURRENCY_REVENUE: "choice_emarine_currency_revenue",
    EMARINE_PEAK_DAY_SPLIT_PROFILE: "choice_emarine_peak_day_split_profile",

    EMARINE_VALUATION_POINT: "choice_emarine_valuation_point",
    EMARINE_COUNTRY: "choice_emarine_country",
    EMARINE_DAY_COST_TYPE: "choice_emarine_day_cost_type",

    SELL_OUT_PRICE_METHOD: "choice_sell_out_price_method",
    PHASES: "choice_phases",
    PLUGS: "choice_plugs",
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
    ONE_OFF_CAPEX_ITEM: "choice_one_off_capex_item",
    EMARINE_INFLATION: "choice_emarine_inflation",
    ANNUAL_CONCESSION_FEE_PROFIILE: "choice_annual_concession_fee",
    PROPULSION_NM_LIST: "choice_propulsion_nm_list",
    WS_MARKET_CURVE: "choice_ws_market_curve",
    NON_WHOLESALE_COST: "choice_non_wholesale_cost",
    STEVEDORE_COST_METHOD: "choice_stevedore_cost_method",
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
  },
};

export const SWITCH_DATA = {
  [MARINE_PARAM_TYPE.SWITCH.EFFICIENCY]: {
    FIXED: { id: 0, label: "Fixed" },
    FORECAST: { id: 1, label: "Forecaset" },
  },
  [MARINE_PARAM_TYPE.SWITCH.ONOFF]: {
    OFF: { id: 0, label: "Off" },
    ON: { id: 1, label: "On" },
  },
  [MARINE_PARAM_TYPE.SWITCH.YESNO]: {
    NO: { id: 0, label: "No" },
    YES: { id: 1, label: "Yes" },
  },
};

export const CHOICE_DATA: Record<
  string,
  { id: number; label: string | number; disabled?: boolean }[]
> = {
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
  [MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE]: [
    { id: 1, label: "Oil tankers" },
    { id: 2, label: "Chemical/product" },
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
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE]: [
    { id: 1, label: "Profile 1" },
    { id: 2, label: "Profile 2" },
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
  [MARINE_PARAM_TYPE.CHOICE.OWNERSHIP]: [
    { id: 1, label: "Full stack" },
    { id: 2, label: "JV" },
    { id: 3, label: "Affiliate" },
    { id: 4, label: "Roaming" },
  ],
  // [MARINE_PARAM_TYPE.CHOICE.MODO_REGION]: REGION_LIST.map((r, index) => ({
  //   id: index + 1,
  //   label: r,
  // })),
  [MARINE_PARAM_TYPE.CHOICE.AFRY_REGION]: [
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
  [MARINE_PARAM_TYPE.CHOICE.BARINGA_REGION]: [
    { id: 1, label: "B2" },
    { id: 2, label: "B4" },
    { id: 3, label: "B6" },
    { id: 4, label: "B7a" },
    { id: 5, label: "B8" },
    { id: 6, label: "EC5" },
    { id: 7, label: "SC1" },
    { id: 8, label: "X" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ASSET]: [
    { id: 1, label: "EP1 - Upsall Central (Hag Lane) - base case" },
    { id: 2, label: "[spare] - base case" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.FORECAST]: [
    { id: 1, label: "Afry low" },
    { id: 2, label: "Afry central" },
    { id: 3, label: "Afry high" },
    { id: 4, label: "Bespoke" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.SUPPLIER]: [
    { id: 1, label: "BYD latest" },
    { id: 2, label: "BYD - July inputs(KKA)" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.RELATIVE_FORECAST]: [
    { id: 1, label: "Afry low" },
    { id: 2, label: "Afry central" },
    { id: 3, label: "Afry high" },
    { id: 4, label: "Bespoke" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ABSOLUTE_FORECAST]: [
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
  // [MARINE_PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST]: TNUOS_ZONE_LIST.map(
  //   (t, index) => ({
  //     id: index + 1,
  //     label: t,
  //   })
  // ),
  // [MARINE_PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE]: LOCAL_CIRCUITS_ZONE.map(
  //   (t, index) => ({
  //     id: index + 1,
  //     label: t,
  //   })
  // ),
  // [MARINE_PARAM_TYPE.CHOICE.SUBSTATION_TYPE]: LOCAL_SUBSTATION_TYPE.map(
  //   (t, index) => ({
  //     id: index + 1,
  //     label: t,
  //   })
  // ),

  // [MARINE_PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY]:
  //   VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS.map((pr, index) => ({
  //     id: index + 1,
  //     label: pr,
  //   })),
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY]: [
    { id: 1, label: "Local currency" },
    { id: 2, label: "USD" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.DEVEX_PROFILE]: [
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
  [MARINE_PARAM_TYPE.CHOICE.SECURITY]: [
    { id: 1, label: "Letter of credit" },
    { id: 2, label: "Parent Company Guarnatee" },
    { id: 3, label: "Bond" },
    { id: 4, label: "Escrow account" },
  ],
  // [MARINE_PARAM_TYPE.CHOICE.PAYMENT_PROFILE]: PAYMENT_PROFILE_LIST.map(
  //   (d, index) => ({
  //     id: index + 1,
  //     label: d,
  //   })
  // ),
  [MARINE_PARAM_TYPE.CHOICE.CURRENCY]: [
    { id: 1, label: "GBP" },
    { id: 2, label: "EUR" },
    { id: 3, label: "USD" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: "Upside value at P90" },
    { id: 2, label: "Upside value at P50" },
    { id: 3, label: "Upside value at P25" },
    { id: 4, label: "Upside value at P10" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE]: [
    { id: 1, label: "<132 kV" },
    { id: 2, label: "132 kV" },
    { id: 3, label: "275 kV" },
    { id: 4, label: "400 kV" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: "Upside value at P90" },
    { id: 2, label: "Upside value at P50" },
    { id: 3, label: "Upside value at P25" },
    { id: 4, label: "Upside value at P10" },
  ],
  // [MARINE_PARAM_TYPE.CHOICE.DNO]: REGION_LIST.map((r, index) => ({
  //   id: index + 1,
  //   label: r,
  // })),
  // [MARINE_PARAM_TYPE.CHOICE.STRATEGY]: STRATEGY_LIST.map((r, index) => ({
  //   id: index + 1,
  //   label: r,
  // })),
  // [MARINE_PARAM_TYPE.CHOICE.TECH]: [
  //   { id: 1, label: "BESS" },
  //   { id: 2, label: "Substation", disabled: true },
  //   { id: 3, label: "Solar", disabled: true },
  //   { id: 4, label: "Onshore wind", disabled: true },
  //   { id: 5, label: "Offshore wind", disabled: true },
  //   { id: 6, label: "Ev charging", disabled: true },
  // ],
  // [MARINE_PARAM_TYPE.CHOICE.REGION]: REGION_LIST.map((r, index) => ({
  //   id: index + 1,
  //   label: r,
  // })),
  [MARINE_PARAM_TYPE.CHOICE.FORECAST_PROVIDER]: [
    { id: 1, label: "Modo" },
    { id: 2, label: "Afry" },
    { id: 3, label: "Baringa" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.STAGES]: [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
  ],
  [MARINE_PARAM_TYPE.CHOICE.CARRY_BASIS]: [
    { id: 1, label: "cashflows including capex" },
    { id: 2, label: "cashflows excluding capex" },
    { id: 3, label: "profit after tax" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS]: [
    { id: 1, label: "quarterly in advance" },
    { id: 2, label: "annually in advance" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.LAND_RENT_BASIS]: [
    { id: 1, label: "per acre" },
    { id: 2, label: "per MW" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.ACRES]: [{ id: 1, label: 75 }],
  [MARINE_PARAM_TYPE.CHOICE.DURATION]: [
    { id: 1, label: 2 },
    { id: 2, label: 4 },
    { id: 3, label: 8 },
  ],
  // [MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION]: INFLATION_LIST.map((i, index) => ({
  //   id: index + 1,
  //   label: i,
  // })),
  [MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION]: EMARINE_INFLATION_LIST.map(
    (i, index) => ({
      id: index + 1,
      label: i,
    })
  ),

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
  [MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE]: [
    { id: 1, label: "Cash sweep" },
    { id: 2, label: "Bullet" },
    { id: 3, label: "Amortisation" },
  ],
  [MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST]: [
    { id: 1, label: "Stena + CLDN +IOMSP non-wholesale cost contract 1" },
    { id: 2, label: "Stena + CLDN +IOMSP non-wholesale cost contract 2" },
    { id: 3, label: "Peel Ports General - non-wholesale cost contract 1" },
    { id: 4, label: "Peel Ports General - non-wholesale cost contract 2" },
  ],
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
  NM_PER_CALL: {
    id: "nm per call",
    label: "nm per call",
  },
  PA_PER_PLUG: {
    id: "pa per plug",
    label: "# p.a. per plug",
  },
  MWH_PER_NM: {
    id: "mwh per nm",
    label: "MWH/nm",
  },
  MWH_PER_DAY: {
    id: "mwh per day",
    label: "MWH/day",
  },
  MWH_YEAR: {
    id: "mwh year",
    label: "MWH p.a.",
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
  GBP_PRO_1000_PER_YEAR: {
    id: "gbp_pro_1000_per_year",
    label: "£'000 p.a.",
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
  GBP_PER_HOUR: {
    id: "gbp_per_hour",
    label: "£/hour",
  },
  KM: {
    id: "km",
    label: "km",
  },
  KW_PER_HOUR: {
    id: "kw_per_hour",
    label: "kW/hr",
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

export const defaultCurrency = CURRENCY_LIST[2];

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

export const MARINE_INPUT_PARAMS: IInputParameter[] = [
  {
    id: "basic_inputs",
    title: "Basic Project Inputs",
    datum: [],
    children: [
      {
        id: "basic_info",
        title: "Basic Information",
        datum: [
          {
            id: "port_business",
            title: "Port/Business",
            type: MARINE_PARAM_TYPE.TEXT,
          },
          {
            id: "terminal_name",
            title: "Terminal Name",
            type: MARINE_PARAM_TYPE.TEXT,
          },
          {
            id: "terminal_number",
            title: "Terminal Number",
            type: MARINE_PARAM_TYPE.INTEGER,
            minValue: 1,
          },
          {
            id: "vertical_type",
            title: "Type of Vertical",
            type: MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE,
          },
          {
            id: "location_type",
            title: "Location Type",
            type: MARINE_PARAM_TYPE.CHOICE.LOCATION_TYPE,
          },
          // {
          //   id: "entity",
          //   title: "Entity",
          //   type: MARINE_PARAM_TYPE.CHOICE.ENTITY,
          // },
          {
            id: "sheet_name",
            title: "Sheet Name",
            type: MARINE_PARAM_TYPE.TEXT,
            uniqueness: true,
          },
          {
            id: "include_in_aggregation",
            title: "Include in Aggregation",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
        ],
      },
      {
        id: "location_information",
        title: "Location Information",
        datum: [
          {
            id: "country",
            title: "Country",
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_COUNTRY,
          },
          {
            id: "local_currency",
            title: "Local Currency",
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY_REVENUE,
          },
          {
            id: "ownership_type",
            title: "Ownership Type",
            type: MARINE_PARAM_TYPE.CHOICE.OWNERSHIP,
            unit: PARAM_UNIT.MW,
          },
          {
            id: "percentage_owned_by_natpower_marine",
            title: "Percentage Owned by NatPower Marine",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "number_of_phases",
            title: "Number of Phases",
            type: MARINE_PARAM_TYPE.CHOICE.PHASES,
          },
          {
            id: "plug_capacity",
            title: "Plug Capacity",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "plug_capacity",
                title: "Plug Capacity",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MW,
              },
            ],
          },
          {
            id: "adoption_curve",
            title: "Adoption Curve Year Advance(delay)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              // {
              //   id: "no_cli_cold_iron_advance",
              //   title:
              //     "No specified client - Cold-ironing adoption curve year advance",
              //   type: MARINE_PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.YEAR,
              // },
              // {
              //   id: "no_cli_propulsion_advance",
              //   title:
              //     "No specified client - Propulsion adoption curve year advance",
              //   type: MARINE_PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.YEARS,
              // },
              ...[...new Array(4).fill(0)]
                .map((_, index) => [
                  {
                    id: `cold_iron_advance_cli_${index}`,
                    title: `${
                      index == 0 ? "No Specified Client" : `Client ${index}`
                    } - Cold-ironing Adoption Curve Year Advance(delay)`,
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.YEARS,
                  },
                  {
                    id: `propulsion_advance_cli_${index}`,
                    title: `${
                      index == 0 ? "No Specified Client" : `Client ${index}`
                    } - Propulsion Adoption Curve Year Advance(delay)`,
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.YEARS,
                  },
                ])
                .flat(),
            ],
          },
        ],
      },
      {
        id: "project_timing",
        title: "Project Timing",
        datum: [
          // {
          //   id: "phase_switch",
          //   title: "Phase switch",
          //   type: MARINE_PARAM_TYPE.GROUP,
          //   children: [
          //     {
          //       id: "number_of_phases",
          //       title: "Number of phases",
          //       type: MARINE_PARAM_TYPE.NUMBER,
          //       required: "Must",
          //       maxValue: 3,
          //     },
          //   ],
          // },
          ...[...new Array(3)].map((_, index) => ({
            id:
              // index == 0
              // 	? "capex_forecast_scenario_data"
              // 	: "capex_forecast_scenario_data1",
              `phase_${index + 1}_dates`,
            title: `Phase ${index + 1} dates`,
            type: MARINE_PARAM_TYPE.GROUP,
            isShow: {
              params: {
                global: [],
                local: [],
              },
              fn: () => true,
            },
            children: [
              {
                id: `dev_start_date_${index + 1}`,
                title: `Development Start Date`,
                type: MARINE_PARAM_TYPE.DATE,
                required: "Must",
              },
              {
                id: `dev_start_period_${index + 1}`,
                title: `Development Start Period`,
                type: MARINE_PARAM_TYPE.TEXT,
                renderValue: {
                  params: {
                    local: [
                      `dev_start_date_${index + 1}`,
                      `dev_length_${index + 1}`,
                    ],
                    global: [],
                  },
                  fn: ({
                    dev_start_date_1,
                    dev_start_date_2,
                    dev_start_date_3,
                  }: {
                    dev_start_date_1: string;
                    dev_start_date_2: string;
                    dev_start_date_3: string;
                  }) => {
                    if (index == 0 && dev_start_date_1)
                      return getMonthNumberFromModelStartDate(
                        "2023-01-01",
                        dev_start_date_1
                      );
                    else if (index == 1 && dev_start_date_2)
                      return getMonthNumberFromModelStartDate(
                        "2023-01-01",
                        dev_start_date_2
                      );
                    else if (index == 2 && dev_start_date_3)
                      return getMonthNumberFromModelStartDate(
                        "2023-01-01",
                        dev_start_date_3
                      );
                    else return "-";
                  },
                },
              },
              {
                id: `dev_length_${index + 1}`,
                title: `Length of Development`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                required: "Must",
                maxValue: 24,
              },
              {
                id: `rtb_date_${index + 1}`,
                title: `RtB Date`,
                type: MARINE_PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    local: [
                      `dev_start_date_${index + 1}`,
                      `dev_length_${index + 1}`,
                      "number_of_phases",
                    ],
                    global: [],
                  },
                  fn: ({
                    dev_start_date_1,
                    dev_length_1,
                    dev_start_date_2,
                    dev_length_2,
                    dev_start_date_3,
                    dev_length_3,
                  }: {
                    dev_start_date_1: string;
                    dev_length_1: number;
                    dev_start_date_2: string;
                    dev_length_2: number;
                    dev_start_date_3: string;
                    dev_length_3: number;
                  }) => {
                    return index + 1 == 1
                      ? dev_start_date_1 && dev_length_1
                        ? moment(dev_start_date_1)
                            .add(dev_length_1, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 2
                      ? dev_start_date_2 && dev_length_2
                        ? moment(dev_start_date_2)
                            .add(dev_length_2, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 3
                      ? dev_start_date_3 && dev_length_3
                        ? moment(dev_start_date_3)
                            .add(dev_length_3, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : "";
                  },
                },
              },
              {
                id: `rtb_to_cons_${index + 1}`,
                title: `Time between RtB and Construction Start`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                required: "Must",
                maxValue: 24,
              },
              {
                id: `const_date_${index + 1}`,
                title: `Construction Start Date`,
                type: MARINE_PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    local: [
                      `dev_start_date_${index + 1}`,
                      `rtb_to_cons_${index + 1}`,
                      `dev_length_${index + 1}`,
                      "number_of_phases",
                    ],
                    global: [],
                  },
                  fn: ({
                    dev_start_date_1,
                    dev_length_1,
                    dev_start_date_2,
                    dev_length_2,
                    dev_start_date_3,
                    dev_length_3,
                    rtb_to_cons_1 = 0,
                    rtb_to_cons_2 = 0,
                    rtb_to_cons_3 = 0,
                  }: {
                    dev_start_date_1: string;
                    dev_length_1: number;
                    dev_start_date_2: string;
                    dev_length_2: number;
                    dev_start_date_3: string;
                    dev_length_3: number;
                    rtb_to_cons_1: number;
                    rtb_to_cons_2: number;
                    rtb_to_cons_3: number;
                  }) => {
                    return index + 1 == 1
                      ? dev_start_date_1 && dev_length_1
                        ? moment(dev_start_date_1)
                            .add(dev_length_1 * 1 + rtb_to_cons_1 * 1, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 2
                      ? dev_start_date_2 && dev_length_2
                        ? moment(dev_start_date_2)
                            .add(dev_length_2 * 1 + rtb_to_cons_2 * 1, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 3
                      ? dev_start_date_3 && dev_length_3
                        ? moment(dev_start_date_3)
                            .add(dev_length_3 * 1 + rtb_to_cons_3 * 1, "month")
                            .format(DATE_FORMAT)
                        : ""
                      : "";
                  },
                },
              },
              {
                id: `cons_length_${index + 1}`,
                title: `Length of Construction`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                required: "Must",
                maxValue: 24,
              },
              {
                id: `operation_start_${index + 1}`,
                title: `${
                  index == 0
                    ? "COD and Operating"
                    : `Phase ${index + 1} - Operation`
                } Start Date`,
                type: MARINE_PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    local: [
                      `dev_start_date_${index + 1}`,
                      `rtb_to_cons_${index + 1}`,
                      `dev_length_${index + 1}`,
                      "number_of_phases",
                      `cons_length_${index + 1}`,
                    ],
                    global: [],
                  },
                  fn: ({
                    dev_start_date_1,
                    dev_length_1,
                    dev_start_date_2,
                    dev_length_2,
                    dev_start_date_3,
                    dev_length_3,
                    rtb_to_cons_1 = 0,
                    rtb_to_cons_2 = 0,
                    rtb_to_cons_3 = 0,
                    cons_length_1 = 0,
                    cons_length_2 = 0,
                    cons_length_3 = 0,
                  }: {
                    dev_start_date_1: string;
                    dev_length_1: number;
                    dev_start_date_2: string;
                    dev_length_2: number;
                    dev_start_date_3: string;
                    dev_length_3: number;
                    rtb_to_cons_1: number;
                    rtb_to_cons_2: number;
                    rtb_to_cons_3: number;
                    cons_length_1: number;
                    cons_length_2: number;
                    cons_length_3: number;
                  }) => {
                    return index + 1 == 1
                      ? dev_start_date_1 && dev_length_1
                        ? moment(dev_start_date_1)
                            .add(
                              dev_length_1 * 1 +
                                rtb_to_cons_1 * 1 +
                                cons_length_1 * 1,
                              "month"
                            )
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 2
                      ? dev_start_date_2 && dev_length_2
                        ? moment(dev_start_date_2)
                            .add(
                              dev_length_2 * 1 +
                                rtb_to_cons_2 * 1 +
                                cons_length_2 * 1,
                              "month"
                            )
                            .format(DATE_FORMAT)
                        : ""
                      : index + 1 == 3
                      ? dev_start_date_3 && dev_length_3
                        ? moment(dev_start_date_3)
                            .add(
                              dev_length_3 * 1 +
                                rtb_to_cons_3 * 1 +
                                cons_length_3 * 1,
                              "month"
                            )
                            .format(DATE_FORMAT)
                        : ""
                      : "";
                  },
                },
              },
            ],
          })),
          {
            id: "asset_life",
            title: "End of Asset Life",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "bess_end_of_operations",
                title: "End of BESS Operations",
                type: MARINE_PARAM_TYPE.DATE,
                required: "Must",
              },
              {
                id: "end_of_operations",
                title: "End of Operations",
                type: MARINE_PARAM_TYPE.DATE,
                required: "Must",
              },
              // {
              //   id: `end_quara_num`,
              //   title: `End of operations period`,
              //   type: MARINE_PARAM_TYPE.TEXT,
              //   renderValue: {
              //     params: {
              //       local: ["end_of_operations"],
              //       global: [],
              //     },
              //     fn: ({
              //       end_of_operations,
              //     }: {
              //       end_of_operations: string;
              //     }) => {
              //       if (end_of_operations)
              //         return getMonthNumberFromModelStartDate(
              //           "2023-01-01",
              //           end_of_operations
              //         );
              //       else return "-";
              //     },
              //   },
              // },
              {
                id: "length_of_decommissioning",
                title: "Length of Decommissioning",
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
                required: "Must",
              },
              {
                id: "end_of_decommissioning",
                title: "End of Decommissioning",
                type: MARINE_PARAM_TYPE.DATE,
                renderValue: {
                  params: {
                    local: ["end_of_operations", "length_of_decommissioning"],
                    global: [],
                  },
                  fn: ({
                    end_of_operations,
                    length_of_decommissioning,
                  }: {
                    end_of_operations: string;
                    length_of_decommissioning: number;
                  }) => {
                    return end_of_operations && length_of_decommissioning
                      ? moment(end_of_operations)
                          .add(length_of_decommissioning, "months")
                          .endOf("month")
                          .format(DATE_FORMAT)
                      : "";
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "calc_method",
        title: "Calculation Method",
        children: [
          // {
          //   id: "client_contract",
          //   title: "Specify client contract",
          //   datum: [
          //     {
          //       id: "client_contract",
          //       title: "Calculation method selection",
          //       type: MARINE_PARAM_TYPE.CHOICE.SPECIFY_CLIENT,
          //     },
          //   ],
          // },
          {
            id: "sell_out_pricing_strategy",
            title: "Sell-out Pricing Strategy",
            datum: [
              {
                id: "pricing_strategy",
                title: "Pricing Strategy",
                type: MARINE_PARAM_TYPE.CHOICE.PRICING_STRATEGY,
              },
              {
                id: "margin_choice",
                title: "Margin Choice",
                type: MARINE_PARAM_TYPE.CHOICE.MARGIN_CHOICE,
              },
              {
                id: "inflation_index",
                title: "Inflation Index",
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: "base_year",
                title: "Base Year",
                type: MARINE_PARAM_TYPE.YEAR,
              },
              {
                id: "costs_switch_for_tracking",
                title: "Costs to be Included in Tracking Energy Costs",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "electricity_standing_charge",
                    title: "Electricity Standing Charge (Location Specific)",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "parasitic_load",
                    title: "Parasitic Load",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  // {
                  //   id: "intercompany_costs",
                  //   title: "Intercompany costs",
                  //   type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  // },
                  {
                    id: "stevedore",
                    title: "Stevedore",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "fixed_concession_fee",
                    title: "Concession fee (fixed)",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "metering",
                    title: "Metering",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "o_m",
                    title: "O&M cost",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "asset_management_cost",
                    title: "Asset management cost",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "insurance",
                    title: "Insurance",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "extended_warranty",
                    title: "Extended warranty",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "easement_costs",
                    title: "Easement costs",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "legal_costs",
                    title: "Legal costs (not capitalised)",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "land_rent",
                    title: "Land rent",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "community_benefit",
                    title: "Community benefit",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "water_rates",
                    title: "Water rates",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "business_rates",
                    title: "Business rates",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "site_security",
                    title: "Site security",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "other_admin_costs",
                    title: "Other administrative costs",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "service_charge",
                    title: "Service charge",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "uos_charge",
                    title: "UOS charge to port (if permanent)",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "server_rent",
                    title: "Server rent",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                ],
                // isShow: {
                //   params: {
                //     global: [],
                //     local: ["pricing_strategy"],
                //   },
                //   fn: ({ pricing_strategy }: { pricing_strategy: number }) =>
                //     pricing_strategy == 2,
                // },
              },
            ],
          },
          {
            id: "currency_choice",
            title: "Currency choice",
            datum: [
              {
                id: "revenue_currency_choice",
                title: "Currency choice for revenue",
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
              },
            ],
          },
          {
            id: "power_price",
            title: "Power price",
            datum: [
              {
                id: "fixed_contract_1",
                title: "Fixed term supply contract 1",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "fixed_start_1",
                    title: "Start date of the first rolling contract",
                    type: MARINE_PARAM_TYPE.DATE,
                  },
                  {
                    id: "duration_fixed_contract_1",
                    title: "Duration of the rolling contract in months",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "fixed_end_1",
                    title: "First contract end date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: ["fixed_start_1", "duration_fixed_contract_1"],
                    //     global: [],
                    //   },
                    //   fn: ({
                    //     fixed_start_1,
                    //     duration_fixed_contract_1,
                    //   }: {
                    //     fixed_start_1: string;
                    //     duration_fixed_contract_1: number;
                    //   }) => {
                    //     return fixed_start_1
                    //       ? moment(fixed_start_1)
                    //           .add(duration_fixed_contract_1, "months")
                    //           .endOf("month")
                    //           .format(DATE_FORMAT)
                    //       : "";
                    //   },
                    // },
                  },
                  {
                    id: "day_cost_type_1",
                    title: "Day cost type",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_DAY_COST_TYPE,
                  },
                  {
                    id: "non_wholesale_cost_1",
                    title: "Non-wholesale cost profile",
                    type: MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST,
                  },
                  {
                    id: "peak_profile_1",
                    title: "Peak/Off-peak profile",
                    type: MARINE_PARAM_TYPE.CHOICE
                      .EMARINE_PEAK_DAY_SPLIT_PROFILE,
                  },
                  {
                    id: "inflation_profile_1",
                    title: "Inflation choice",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
                  },
                  {
                    id: "inflation_base_year_1",
                    title: "Inflation base year",
                    type: MARINE_PARAM_TYPE.YEAR,
                    unit: PARAM_UNIT.YEAR,
                  },
                  {
                    id: "uplift_cost_charged_by_port_1",
                    title:
                      "Uplift on cost charged by port(wholesale & non-wholesale)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                  {
                    id: "initial_wholesale_price_1",
                    title: "Wholesale market price at initial contract date",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PER_MWH,
                  },
                ],
              },
              {
                id: "fixed_contract_2",
                title: "Fixed term supply contract 2",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "fixed_start_2",
                    title: "Start date of the first rolling contract",
                    type: MARINE_PARAM_TYPE.DATE,
                  },
                  {
                    id: "duration_fixed_contract_2",
                    title: "Duration of the rolling contract in months",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "fixed_end_2",
                    title: "First contract end date",
                    type: MARINE_PARAM_TYPE.DATE,
                  },
                  {
                    id: "day_cost_type_2",
                    title: "Day cost type",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_DAY_COST_TYPE,
                  },
                  {
                    id: "non_wholesale_cost_2",
                    title: "Non-wholesale cost profile",
                    type: MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST,
                  },

                  {
                    id: "peak_profile_2",
                    title: "Peak/Off-peak profile",
                    type: MARINE_PARAM_TYPE.CHOICE
                      .EMARINE_PEAK_DAY_SPLIT_PROFILE,
                  },
                  {
                    id: "inflation_profile_2",
                    title: "Inflation choice",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
                  },
                  {
                    id: "inflation_base_year_2",
                    title: "Inflation base year",
                    type: MARINE_PARAM_TYPE.YEAR,
                    unit: PARAM_UNIT.YEAR,
                  },
                  {
                    id: "non_wholesale_market",
                    title: "Non wholesale market element",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PER_MWH,
                  },
                  {
                    id: "uplift_cost_charged_by_port_2",
                    title: "Uplift on cost cost for fix term supply contract",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                  {
                    id: "initial_wholesale_price_2",
                    title: "Wholesale market price at initial contract date",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PER_MWH,
                  },
                ],
              },
              {
                id: "peak_price_data",
                title: "Peak price profile (£/MWh)",
                type: MARINE_PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[
                      MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE
                    ].map((c) => c?.label),
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push([""]);
                    for (
                      let i = MODEL_START_YEAR;
                      i < INFLATION_END_YEAR + 1;
                      i++
                    ) {
                      result.push([i]);
                    }
                    return result;
                  },
                },
              },
              {
                id: "off_peak_price_data",
                title: "Off-peak price profile (£/MWh)",
                type: MARINE_PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[
                      MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE
                    ].map((c) => c?.label),
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push([""]);
                    for (
                      let i = MODEL_START_YEAR;
                      i < INFLATION_END_YEAR + 1;
                      i++
                    ) {
                      result.push([i]);
                    }
                    return result;
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "volume_sold_revenue",
    title: "Volume Sold & Revenue",
    datum: [],
    children: [
      {
        id: "setup",
        title: "Setup",
        datum: [
          // {
          //   id: "client_contract",
          //   title: "Specify client contract",
          //   type: MARINE_PARAM_TYPE.CHOICE.SPECIFY_CLIENT,
          // },
          // {
          //   id: "pricing_strategy",
          //   title: "Pricing strategy",
          //   type: MARINE_PARAM_TYPE.CHOICE.PRICING_STRATEGY,
          // },
          // {
          //   id: "inflation_index",
          //   title: "Inflation index",
          //   type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          // },
          // {
          //   id: "base_year",
          //   title: "Base year",
          //   type: MARINE_PARAM_TYPE.YEAR,
          // },
          // {
          //   id: "currency_choice",
          //   title: "Currency choice",
          //   type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
          // },
          // {
          //   id: "costs_switch_for_tracking",
          //   title: "Costs to be included in tracking energy costs",
          //   type: MARINE_PARAM_TYPE.GROUP,
          //   children: [
          //     {
          //       id: "electricity_standing_charge",
          //       title: "Electricity standing charge (location specific)",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "parasitic_load",
          //       title: "Parasitic load",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "intercompany_costs",
          //       title: "Intercompany costs",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "stevedore",
          //       title: "Stevedore",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "fixed_concession_fee",
          //       title: "Concession fee (fixed)",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "metering",
          //       title: "Metering",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "o_m",
          //       title: "O&M cost",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "asset_management_cost",
          //       title: "Asset management cost",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "insurance",
          //       title: "Insurance",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "extended_warranty",
          //       title: "Extended warranty",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "easement_costs",
          //       title: "Easement costs",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "legal_costs",
          //       title: "Legal costs (not capitalised)",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "land_rent",
          //       title: "Land rent",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "community_benefit",
          //       title: "Community benefit",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "water_rates",
          //       title: "Water rates",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "business_rates",
          //       title: "Business rates",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "site_security",
          //       title: "Site security",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "other_admin_costs",
          //       title: "Other administrative costs",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "service_charge",
          //       title: "Service charge",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "uos_charge",
          //       title: "UOS charge to port (if permanent)",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //     {
          //       id: "server_rent",
          //       title: "Server rent",
          //       type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          //     },
          //   ],
          //   // isShow: {
          //   //   params: {
          //   //     global: [],
          //   //     local: ["pricing_strategy"],
          //   //   },
          //   //   fn: ({ pricing_strategy }: { pricing_strategy: number }) =>
          //   //     pricing_strategy == 2,
          //   // },
          // },
          {
            id: "wholesale_market_price",
            title: "Wholesale Market Price",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "ws_market_curve_profile",
                title: "Wholesale Market Price Curve",
                type: MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE,
              },
              {
                id: "ws_market_curve_data",
                title: "Wholesale Market Curve (£/MWh)",
                type: MARINE_PARAM_TYPE.TABLE,
                stickyCols: {
                  type: "function",
                  params: [],
                  fn: () =>
                    CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE].map(
                      (c) => c?.label
                    ),
                },
                stickyRows: {
                  type: "function",
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push([""]);
                    for (
                      let i = MODEL_START_YEAR;
                      i < INFLATION_END_YEAR + 1;
                      i++
                    ) {
                      result.push([i]);
                    }
                    return result;
                  },
                },
              },
              {
                id: "ws_market_curve_currency",
                title: "Currency",
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
              },
              {
                id: "ws_market_curve_inflation_profile",
                title: "Inflation Index",
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: "ws_market_curve_inflation_base_year",
                title: "Inflation Base Year",
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          // {
          //   id: "power_price",
          //   title: "Power price",
          //   type: MARINE_PARAM_TYPE.GROUP,
          //   children: [
          //     {
          //       id: "fixed_contract_1",
          //       title: "Fixed term supply contract 1",
          //       type: MARINE_PARAM_TYPE.GROUP,
          //       children: [
          //         {
          //           id: "fixed_start_1",
          //           title: "Start date of the first rolling contract",
          //           type: MARINE_PARAM_TYPE.DATE,
          //         },
          //         {
          //           id: "duration_fixed_contract_1",
          //           title: "Duration of the rolling contract in months",
          //           type: MARINE_PARAM_TYPE.INTEGER,
          //           unit: PARAM_UNIT.MONTHS,
          //         },
          //         {
          //           id: "fixed_end_1",
          //           title: "First contract end date",
          //           type: MARINE_PARAM_TYPE.DATE,
          //           renderValue: {
          //             params: {
          //               local: ["fixed_start_1", "duration_fixed_contract_1"],
          //               global: [],
          //             },
          //             fn: ({
          //               fixed_start_1,
          //               duration_fixed_contract_1,
          //             }: {
          //               fixed_start_1: string;
          //               duration_fixed_contract_1: number;
          //             }) => {
          //               return fixed_start_1 && duration_fixed_contract_1
          //                 ? moment(fixed_start_1)
          //                     .add(duration_fixed_contract_1, "months")
          //                     .endOf("month")
          //                     .format(DATE_FORMAT)
          //                 : "";
          //             },
          //           },
          //         },
          //         {
          //           id: "non_wholesale_cost_1",
          //           title: "Non-wholesale cost profile",
          //           type: MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST,
          //         },
          //         {
          //           id: "inflation_profile_1",
          //           title: "Inflation choice",
          //           type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          //         },
          //         {
          //           id: "inflation_base_year_1",
          //           title: "Inflation base year",
          //           type: MARINE_PARAM_TYPE.YEAR,
          //           unit: PARAM_UNIT.YEAR,
          //         },
          //         {
          //           id: "uplift_cost_charged_by_port_1",
          //           title:
          //             "Uplift on cost charged by port(wholesale & non-wholesale)",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.PERCENTAGE,
          //         },
          //         {
          //           id: "initial_wholesale_price_1",
          //           title: "Wholesale market price at initial contract date",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "initial_contracted_buy_in_price_1",
          //           title: "Initial contracted buy-in price",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "initial_cold_ironing_price_1",
          //           title:
          //             "Initial sell-out price(cold-ironing) - no client contract specified",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },

          //         {
          //           id: "initial_propulsion_price_1",
          //           title:
          //             "Initial sell-out price(propulsion) - no client contract specified",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //       ],
          //     },
          //     {
          //       id: "fixed_contract_2",
          //       title: "Fixed term supply contract 2",
          //       type: MARINE_PARAM_TYPE.GROUP,
          //       children: [
          //         {
          //           id: "fixed_start_2",
          //           title: "Start date of the first rolling contract",
          //           type: MARINE_PARAM_TYPE.DATE,
          //         },
          //         {
          //           id: "duration_fixed_contract_2",
          //           title: "Duration of the rolling contract in months",
          //           type: MARINE_PARAM_TYPE.INTEGER,
          //           unit: PARAM_UNIT.MONTHS,
          //         },
          //         {
          //           id: "fixed_end_2",
          //           title: "First contract end date",
          //           type: MARINE_PARAM_TYPE.DATE,
          //           renderValue: {
          //             params: {
          //               local: ["fixed_start_2", "duration_fixed_contract_2"],
          //               global: [],
          //             },
          //             fn: ({
          //               fixed_start_2,
          //               duration_fixed_contract_2,
          //             }: {
          //               fixed_start_2: string;
          //               duration_fixed_contract_2: number;
          //             }) => {
          //               return fixed_start_2 && duration_fixed_contract_2
          //                 ? moment(fixed_start_2)
          //                     .add(duration_fixed_contract_2, "months")
          //                     .endOf("month")
          //                     .format(DATE_FORMAT)
          //                 : "";
          //             },
          //           },
          //         },
          //         {
          //           id: "non_wholesale_cost_2",
          //           title: "Non-wholesale cost",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "inflation_profile_2",
          //           title: "Inflation choice",
          //           type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          //         },
          //         {
          //           id: "inflation_base_year_2",
          //           title: "Inflation base year",
          //           type: MARINE_PARAM_TYPE.YEAR,
          //           unit: PARAM_UNIT.YEAR,
          //         },
          //         {
          //           id: "non_wholesale_market",
          //           title: "Non wholesale market element",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "uplift_cost_charged_by_port_2",
          //           title: "Uplift on cost cost for fix term supply contract",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.PERCENTAGE,
          //         },
          //         {
          //           id: "initial_wholesale_price_2",
          //           title: "Wholesale market price at initial contract date",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "initial_contracted_buy_in_price_2",
          //           title: "Initial contracted buy-in price",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //         {
          //           id: "initial_cold_ironing_price_2",
          //           title:
          //             "Initial sell-out price(cold-ironing) - no client contract specified",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },

          //         {
          //           id: "initial_propulsion_price_2",
          //           title:
          //             "Initial sell-out price(propulsion) - no client contract specified",
          //           type: MARINE_PARAM_TYPE.NUMBER,
          //           unit: PARAM_UNIT.GBP_PER_MWH,
          //         },
          //       ],
          //     },
          //   ],
          // },
          {
            id: "non_wholesale_cost_data",
            title: "Non-wholesale Cost Profile Data (£/MWh)",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST].map(
                  (c) => c?.label
                ),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = MODEL_START_YEAR;
                  i < INFLATION_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
        ],
      },
      {
        id: "arbitrage_revenue",
        title: "Arbitrage Revenue",
        datum: [
          {
            id: "usage_percentage_of_propulsion",
            title: "Arbitrage Usage as a % of Propulsion Volume",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "margin_percentage",
            title: "Arbitrage Margin",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
        ],
      },
      ...[...new Array(3)].map((client, index) => ({
        id: `client_${index + 1}`,
        title: `Client ${index + 1}`,
        datum: [],
        children: [
          {
            id: `client_info_${index + 1}`,
            title: "Client Info",
            datum: [
              {
                id: `client_name`,
                title: `Client Name`,
                type: MARINE_PARAM_TYPE.TEXT,
              },
              {
                id: `client_switch`,
                title: `Client Switch`,
                type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: `client_start_phase`,
                title: `Client Start Phase`,
                type: MARINE_PARAM_TYPE.CHOICE.PHASES,
              },
              {
                id: `plugs_contracted`,
                title: `Number of Plugs Contracted`,
                type: MARINE_PARAM_TYPE.CHOICE.PHASES,
              },
              {
                id: `volume_peak_split`,
                title: `Volume Peak/Off-Peak Split`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE,
              },
            ],
          },
          {
            id: `volume_sold_${index + 1}`,
            title: `Volume Sold`,
            datum: [
              {
                id: `number_of_calls_at_plug_per_year`,
                title: `Number of Calls at Plug Per Year (as of Contract Start Year)`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.PA_PER_PLUG,
                maxValue: 100000,
              },
              {
                id: `seasonality_profile`,
                title: `Vertical Seasonality Profile`,
                type: MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE,
              },
              {
                id: `ci_adoption_curve_profile`,
                title: `Adoption Curve - Cold-ironing`,
                type: MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE,
              },
              {
                id: `propulsion_adoption_curve_profile`,
                title: `Adoption Curve - Propulsion`,
                type: MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE,
              },
              // {
              //   id: `ci_adoption_delay`,
              //   title: `Cold-ironing adoption curve year advance (delay)`,
              //   type: MARINE_PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.YEARS,
              // },
              // {
              //   id: `propulsion_adoption_delay`,
              //   title: `Propulsion adoption curve year advance (delay)`,
              //   type: MARINE_PARAM_TYPE.INTEGER,
              //   unit: PARAM_UNIT.YEARS,
              // },
              {
                id: `growth_factoer_profile`,
                title: `Growth Factor`,
                type: MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS,
              },
              {
                id: `market_share_curve_profile`,
                title: `Market Share Curve`,
                type: MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE,
              },
            ],
          },
          {
            id: `utilisation_${index + 1}`,
            title: `Utilisation`,
            datum: [
              {
                id: `cold_ironing`,
                title: `Cold Ironing`,
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: `ci_usage_during_dwell_time`,
                    title: `Cold-ironing Power Usage Dwell Time (for a Single Vertical)`,
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.MW,
                  },
                  {
                    id: `dwell_time_per_stay`,
                    title: `Dwell Time per Stay`,
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.HOUR,
                  },
                  {
                    id: `handling_time_per_stay`,
                    title: `Handling Time per Stay (Time During Stay not Using Energy)`,
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.HOUR,
                  },
                ],
              },
              {
                id: `propulsion`,
                title: `Propulsion Utilisation`,
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: `vertical_type`,
                    title: `Type of Vertical`,
                    type: MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE,
                  },
                  {
                    id: `nautical_miles_requirement`,
                    title: `First and Last Nautical Miles Requirement on Electric Power per Vessel`,
                    type: MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST,
                    unit: PARAM_UNIT.NM_PER_CALL,
                  },
                  {
                    id: `energy_consumption_per_nm`,
                    title: `Energy Consumption per nm`,
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.MWH_PER_NM,
                  },
                  {
                    id: `energy_consumption_per_plug`,
                    title: `Service Tug - Energy Consumption per Plug`,
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MWH_PER_DAY,
                    maxValue: 1000000,
                  },
                ],
              },
            ],
          },
          {
            id: `sell_out_price_${index + 1}`,
            title: `Initial Sell-out Price`,
            datum: [
              {
                id: `method`,
                title: `Initial Sell-out Price Method`,
                type: MARINE_PARAM_TYPE.CHOICE.SELL_OUT_PRICE_METHOD,
              },
              {
                id: `ci_price`,
                title: `Initial Sell-out Price (Cold-ironing)`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_MWH,
              },
              {
                id: `propulsion_price`,
                title: `Initial Sell-out Price (Propulsion)`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_MWH,
              },
              {
                id: `ci_percentage`,
                title: `Initial Sell-out Price (Cold-ironing)`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: `propulsion_percentage`,
                title: `Initial Sell-out Price (Propulsion)`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
        ],
      })),
      {
        id: "forecast_data",
        title: "Forecast Data",
        datum: [
          {
            id: "seasonality_profile_data",
            title: "Vertical Seasonality Profile (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            valueRange: "percentage",
            minValue: 0,
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[
                  MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE
                ].map((c) => c?.label),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (let i = 0; i < 12; i++) {
                  result.push([
                    CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MONTH_NAME][i].label
                      .toString()
                      .slice(0, 3),
                  ]);
                }
                return result;
              },
            },
          },
          {
            id: "adoption_curve_data",
            title: "Adoption Curve Data (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            valueRange: "percentage",
            minValue: 0,
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE].map(
                  (c) => c?.label
                ),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = EMARINE_MODEL_START_YEAR;
                  i < EMARINE_MODEL_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
          {
            id: "growth_factors_data",
            title: "Growth Factors Data",
            type: MARINE_PARAM_TYPE.TABLE,
            minValue: 0,
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS].map(
                  (c) => c?.label
                ),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = EMARINE_MODEL_START_YEAR;
                  i < EMARINE_MODEL_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
          {
            id: "market_share_data",
            title: "Market Share Data (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            minValue: 0,
            valueRange: "percentage",
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE].map(
                  (c) => c?.label
                ),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = EMARINE_MODEL_START_YEAR;
                  i < EMARINE_MODEL_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
          {
            id: "nautical_miles_requirement_data",
            title:
              "Propulsion - First and Last Nautical Milies Requirement on Electric Power per Vessel (nm per Call)",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [""],
              fn: () =>
                CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST].map(
                  (c) => c?.label
                ),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push("");
                for (
                  let i = INFLATION_START_YEAR;
                  i < INFLATION_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
          {
            id: "peak_daily_split_data",
            title: "Peak/off-peak Daily Split (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            minValue: 0,
            valueRange: "percentage",
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                CHOICE_DATA[
                  MARINE_PARAM_TYPE.CHOICE.EMARINE_PEAK_DAY_SPLIT_PROFILE
                ].map((c) => c?.label),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = EMARINE_MODEL_START_YEAR;
                  i < EMARINE_MODEL_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
        ],
      },
      // {
      //   id: "intercompany",
      //   title: "Intercompany",
      //   datum: [],
      //   children: [
      //     {
      //       id: "revenue",
      //       title: "Intercompany revenue",
      //       datum: [
      //         ...[...new Array(3).fill(0)].map((_, idx) => ({
      //           id: `annual_revenue_${idx + 1}`,
      //           title: `Annual revenue - phase${idx + 1}`,
      //           unit: PARAM_UNIT.GBP_PRO_1000,
      //           type: MARINE_PARAM_TYPE.NUMBER,
      //         })),
      //         {
      //           id: "target_pre_tax_unlevered_irr",
      //           title: "Target pre-tax unlevered IRR",
      //           type: MARINE_PARAM_TYPE.NUMBER,
      //           unit: PARAM_UNIT.PERCENTAGE,
      //         },
      //         {
      //           id: "target_gross_margin",
      //           title: "Target gross margin",
      //           type: MARINE_PARAM_TYPE.NUMBER,
      //           unit: PARAM_UNIT.PERCENTAGE,
      //         },
      //         {
      //           id: "gross_margin",
      //           title: "Gross margin - live",
      //           type: MARINE_PARAM_TYPE.NUMBER,
      //           unit: PARAM_UNIT.PERCENTAGE,
      //         },
      //         {
      //           id: "inflation_profile",
      //           title: "Inflation index",
      //           type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
      //         },
      //         {
      //           id: "inflation_base_year",
      //           title: "Base year",
      //           type: MARINE_PARAM_TYPE.YEAR,
      //           unit: PARAM_UNIT.YEAR,
      //         },
      //       ],
      //     },
      //     {
      //       id: "cost",
      //       title: "Intercompany cost",
      //       datum: [
      //         {
      //           id: "exc_bess",
      //           title: "Annual cost excluding BESS",
      //           type: MARINE_PARAM_TYPE.GROUP,
      //           children: [
      //             ...[...new Array(3).fill(0)].map((_, idx) => ({
      //               id: `cost_exc_bess_${idx + 1}`,
      //               title: `Phase ${idx + 1}`,
      //               type: MARINE_PARAM_TYPE.NUMBER,
      //               unit: PARAM_UNIT.GBP_PRO_1000,
      //             })),
      //           ],
      //         },
      //         {
      //           id: "bess",
      //           title: "Annual cost BESS",
      //           type: MARINE_PARAM_TYPE.GROUP,
      //           children: [
      //             {
      //               id: "bess_oper_end",
      //               title: "End of operations for BESS",
      //               type: MARINE_PARAM_TYPE.DATE,
      //             },
      //             ...[...new Array(3).fill(0)].map((_, idx) => ({
      //               id: `cost_bess_${idx + 1}`,
      //               title: `Phase ${idx + 1}`,
      //               type: MARINE_PARAM_TYPE.NUMBER,
      //               unit: PARAM_UNIT.GBP_PRO_1000,
      //             })),
      //           ],
      //         },
      //         {
      //           id: "currency_for_costs",
      //           title: "Currency for costs",
      //           type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
      //         },
      //         {
      //           id: "inflation_profile",
      //           title: "Inflation index",
      //           type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
      //         },
      //         {
      //           id: "inflation_base_year",
      //           title: "Inflation base year",
      //           type: MARINE_PARAM_TYPE.YEAR,
      //           unit: MARINE_PARAM_TYPE.YEAR,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  {
    id: "costs",
    title: "Costs",
    datum: [],
    children: [
      {
        id: "currency_for_costs",
        title: "Currency for Costs",
        type: MARINE_PARAM_TYPE.GROUP,
        datum: [
          {
            id: "currency_choice",
            title: "Currency Used for Costs",
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
          },
        ],
      },
      {
        id: "parasitic_load",
        title: "Parasitic Load",
        datum: [
          ...[...new Array(3)].map((_, index) => ({
            id: `phase_${index + 1}`,
            title: `Parasitic Load as % of Power Purchase Cost - Phase ${
              index + 1
            }`,
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          })),
        ],
      },
      {
        id: "electricity_standing_charge",
        title: "Electricity Standing Charge(Location Specific)",
        datum: [
          {
            id: `annual_costs`,
            title: `Annual Costs per Plug`,
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
          },
          {
            id: `inflation_profile`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      },
      {
        id: "one_off_concession_fee",
        title: "One-off Concession Fee",
        datum: [
          {
            id: "number_of_cost_line",
            title: "Number of Cost Line",
            type: MARINE_PARAM_TYPE.INTEGER,
            minValue: 0,
            maxValue: 10,
          },
          {
            id: "cost_line_alert",
            title: "Cost Line Alert",
            type: MARINE_PARAM_TYPE.TEXT,
            isShow: {
              params: {
                global: [],
                local: ["number_of_cost_line"],
              },
              fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
                !number_of_cost_line || number_of_cost_line == 0,
            },
            renderValue: {
              params: {
                local: ["number_of_cost_line"],
                global: [],
              },
              fn: ({
                number_of_cost_line,
              }: {
                number_of_cost_line: number;
              }) => {
                return number_of_cost_line && number_of_cost_line != 0
                  ? "OK"
                  : "Cost Lines not Provided";
              },
            },
          },
          ...[...new Array(10)].map((_, index) => ({
            id: `cost_line_${index + 1}`,
            title: `Cost Line ${index + 1}`,
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `name_${index + 1}`,
                title: `One off Concession Fee ${index + 1}`,
                type: MARINE_PARAM_TYPE.TEXT,
              },
              {
                id: `cost_${index + 1}`,
                title: `Cost`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `date_incurred_${index + 1}`,
                title: `Period Incurred`,
                type: MARINE_PARAM_TYPE.DATE,
              },
              {
                id: `inflation_${index + 1}`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year_${index + 1}`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
            isShow: {
              params: {
                global: [],
                local: ["number_of_cost_line"],
              },
              fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
                index < number_of_cost_line,
            },
          })),
        ],
      },
      {
        id: "annual_concession_fee",
        title: "Annual Concession Fee",
        datum: [
          {
            id: "number_of_cost_line",
            title: "Number of Cost Line",
            type: MARINE_PARAM_TYPE.INTEGER,
            minValue: 0,
            maxValue: 3,
          },
          {
            id: "profile_data",
            title: "Annual Concession Fee Profile Data (£'000 p.a.)",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [""],
              fn: () =>
                CHOICE_DATA[
                  MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE
                ].map((c) => c?.label),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push("");
                for (
                  let i = INFLATION_START_YEAR;
                  i < INFLATION_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
          },
          {
            id: "cost_line_alert",
            title: "Cost Line Alert",
            type: MARINE_PARAM_TYPE.TEXT,
            isShow: {
              params: {
                global: [],
                local: ["number_of_cost_line"],
              },
              fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
                !number_of_cost_line || number_of_cost_line == 0,
            },
            renderValue: {
              params: {
                local: ["number_of_cost_line"],
                global: [],
              },
              fn: ({
                number_of_cost_line,
              }: {
                number_of_cost_line: number;
              }) => {
                return number_of_cost_line && number_of_cost_line != 0
                  ? "OK"
                  : "Cost Lines Not Provided";
              },
            },
          },
          ...[...new Array(3)].map((_, index) => ({
            id: `cost_line_${index + 1}`,
            title: `Cost Line ${index + 1}`,
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `profile_${index + 1}`,
                title: `Annual Concession Cost ${index + 1}`,
                type: MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE,
              },
              {
                id: `payment_month_${index + 1}`,
                title: `Month of Payment`,
                type: MARINE_PARAM_TYPE.CHOICE.MONTH_NAME,
              },
              {
                id: `inflation_${index + 1}`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year_${index + 1}`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
              // {
              //   id: `currency_${index + 1}`,
              //   title: `Currency`,
              //   type: MARINE_PARAM_TYPE.CHOICE.CURRENCY,
              //   unit: PARAM_UNIT.YEAR,
              // },
            ],
            isShow: {
              params: {
                global: [],
                local: ["number_of_cost_line"],
              },
              fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
                index < number_of_cost_line,
            },
          })),
        ],
      },
      {
        id: "stevedore",
        title: "Stevedore",
        datum: [
          {
            id: "cost_method",
            title: "Cost Method",
            type: MARINE_PARAM_TYPE.CHOICE.STEVEDORE_COST_METHOD,
          },
          {
            id: "hourly_rate",
            title: "Hourly Rate",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PER_HOUR,
          },
          ...[...new Array(3)].map((_, index) => ({
            id: `cost_${index + 1}`,
            title: `Annual Stevedore Cost Phase ${index + 1}`,
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
          })),
          {
            id: `inflation_profile`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      },
      // {
      //   id: "fixed_concession",
      //   title: "Concession annual fee(fixed)",
      //   datum: [
      //     {
      //       id: `fee`,
      //       title: `Concession annual fee(fixed)`,
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
      //     },
      //     {
      //       id: `inflation`,
      //       title: `Inflation index`,
      //       type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
      //     },
      //     {
      //       id: `inflation_year`,
      //       title: `Inflation base year`,
      //       type: MARINE_PARAM_TYPE.YEAR,
      //       unit: PARAM_UNIT.YEAR,
      //     },
      //   ],
      // },
      {
        id: "concession_fee_annual",
        title: "Concession Fee - Annual",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "metering",
        title: "Metering",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "o_m_cost",
        title: "O&M Cost",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "asset_management",
        title: "Asset Management Cost",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "insurance",
        title: "Insurance",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "extended_warranty",
        title: "Extended Warranty",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "easement_costs",
        title: "Easement Costs",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "legal_costs",
        title: "Legal Costs(not Capitalised)",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "land_rent",
        title: "Land Rent",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `annual_costs_per_plug`,
                title: `Annual Costs per Plug`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "annual_costs_per_plug_bess",
                title: "Annual Costs per Plug",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "community_benefit",
        title: "Community Benefit",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "water_rates",
        title: "Water Rates",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "business_rates",
        title: "Business Rates",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },

      {
        id: "site_security",
        title: "Site Security",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },

      {
        id: "other_admin_costs",
        title: "Other Administrative Costs",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "service_charge",
        title: "Service Charge",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },

      {
        id: "uos_charge_to_port",
        title: "UOS Charge to Port(if Permanent)",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
          },
        ],
      },
      {
        id: "server_rent",
        title: "Server Rent",
        datum: [
          {
            id: "excl_bess",
            title: "Operating Costs (excl.BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `inflation`,
                title: `Inflation Index`,
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_year`,
                title: `Inflation Base Year`,
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
          {
            id: "bess",
            title: "Operating Costs (BESS)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "fixed_annual_costs_bess",
                title: "Fixed Annual Costs",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
            ],
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
        id: "switch",
        title: "Devex Switch",
        type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
      },
      ...[...new Array(3)].map((_, index) => ({
        id: `phase_${index + 1}`,
        title: `Phase ${index + 1}`,
        type: MARINE_PARAM_TYPE.GROUP,
        children: [
          {
            id: `profile_${index + 1}`,
            title: `Devex Profile`,
            type: MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE,
          },
          {
            id: `inflation_profile_${index + 1}`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year_${index + 1}`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
          {
            id: `bess_profile_${index + 1}`,
            title: `Bess Devex Profile`,
            type: MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE,
          },
          {
            id: `bess_inflation_profile_${index + 1}`,
            title: `Bess Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `bess_inflation_base_year_${index + 1}`,
            title: `Bess Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      })),
      {
        id: "devex_profile_data",
        title: "Devex Profile Data (£'000)",
        type: MARINE_PARAM_TYPE.TABLE,
        stickyCols: {
          type: "function",
          params: [],
          fn: () =>
            CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE].map(
              (c) => c?.label
            ),
        },
        stickyRows: {
          type: "function",
          params: [],
          fn: () => {
            const result = [];
            result.push("");
            for (let i = 0; i < 24; i++) {
              result.push([`Month ${i + 1}`]);
            }
            return result;
          },
        },
      },
    ],
    children: [],
  },
  {
    id: "capex",
    title: "Capex",
    datum: [
      // ...[...new Array(3)].map((_, index) => ({
      //   id: `phase_${index + 1}`,
      //   title: `Phase ${index + 1}`,
      //   type: MARINE_PARAM_TYPE.GROUP,
      //   children: [
      //     {
      //       id: `profile_${index + 1}`,
      //       title: `Devex profile`,
      //       type: MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE,
      //     },
      //     {
      //       id: `inflation_profile_${index + 1}`,
      //       title: `Inflation index`,
      //       type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
      //     },
      //     {
      //       id: `inflation_base_year_${index + 1}`,
      //       title: `Inflation base year`,
      //       type: MARINE_PARAM_TYPE.YEAR,
      //       unit: PARAM_UNIT.YEAR,
      //     },
      //   ],
      // })),
    ],
    children: [
      {
        id: "setup",
        title: "Setup",
        datum: [
          {
            id: "currency_choice",
            title: "Currency Used for Choice",
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
          },
          // {
          //   id: "recycle_percentage",
          //   title: "Percentage of capex recovered from sale of fixed assets",
          //   type: MARINE_PARAM_TYPE.NUMBER,
          //   unit: PARAM_UNIT.PERCENTAGE,
          // },
        ],
      },
      {
        id: "one_off_capex",
        title: `One-off Capex(don't require replacement)`,

        children: [
          {
            id: "excl_bess",
            title: "Excluding BESS",
            datum: [
              ...[...ONE_OFF_CAPEX_ITEM_LIST].map((item, index) => ({
                id: `item_${index + 1}`,
                title: `Item ${index + 1}`,
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: `item_${index + 1}`,
                    title: `Item Name`,
                    type: MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM,
                    // renderValue: {
                    //   params: {
                    //     global: [],
                    //     local: [],
                    //   },
                    //   fn: () => item,
                    // },
                  },
                  {
                    id: `phase_incurred_${index + 1}`,
                    title: "Phase Incurred",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    minValue: 1,
                    maxValue: 3,
                  },
                  {
                    id: `cost_${index + 1}`,
                    title: "Item Cost",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000,
                  },
                ],
              })),
              ...[...new Array(3)].map((_, index) => ({
                id: `phase_${index + 1}`,
                title: `Phase ${index + 1}`,
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  // {
                  //   id: `cost_sum_${index + 1}`,
                  //   title:'Cost summary',
                  //   type:MARINE_PARAM_TYPE.NUMBER,
                  //   unit:PARAM_UNIT.GBP_PRO_1000
                  // },
                  {
                    id: `payment_profile_${index + 1}`,
                    title: "Payment Profile",
                    type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
                    // unit:PARAM_UNIT.GBP_PRO_1000
                  },
                  {
                    id: `inflation_profile_${index + 1}`,
                    title: "Inflation Index",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
                  },
                  {
                    id: `inflation_base_year_${index + 1}`,
                    title: "Inflation Base Year",
                    type: MARINE_PARAM_TYPE.YEAR,
                    unit: PARAM_UNIT.YEAR,
                  },
                  {
                    id: `cost_sum_${index + 1}`,
                    title: "Cost Summary",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000,
                    renderValue: {
                      params: {
                        global: [],
                        local: PHASE_AND_COST,
                      },
                      fn: ({
                        phase_incurred_1,
                        cost_1,
                        phase_incurred_2,
                        cost_2,
                        phase_incurred_3,
                        cost_3,
                        phase_incurred_4,
                        cost_4,
                        phase_incurred_5,
                        cost_5,
                        phase_incurred_6,
                        cost_6,
                        phase_incurred_7,
                        cost_7,
                        phase_incurred_8,
                        cost_8,
                        phase_incurred_9,
                        cost_9,
                        phase_incurred_10,
                        cost_10,
                        phase_incurred_11,
                        cost_11,
                        phase_incurred_12,
                        cost_12,
                        phase_incurred_13,
                        cost_13,
                        phase_incurred_14,
                        cost_14,
                        phase_incurred_15,
                        cost_15,
                        phase_incurred_16,
                        cost_16,
                        phase_incurred_17,
                        cost_17,
                        phase_incurred_18,
                        cost_18,
                        phase_incurred_19,
                        cost_19,
                        phase_incurred_20,
                        cost_20,
                      }: {
                        phase_incurred_1: number;
                        cost_1: number;
                        phase_incurred_2: number;
                        cost_2: number;
                        phase_incurred_3: number;
                        cost_3: number;
                        phase_incurred_4: number;
                        cost_4: number;
                        phase_incurred_5: number;
                        cost_5: number;
                        phase_incurred_6: number;
                        cost_6: number;
                        phase_incurred_7: number;
                        cost_7: number;
                        phase_incurred_8: number;
                        cost_8: number;
                        phase_incurred_9: number;
                        cost_9: number;
                        phase_incurred_10: number;
                        cost_10: number;
                        phase_incurred_11: number;
                        cost_11: number;
                        phase_incurred_12: number;
                        cost_12: number;
                        phase_incurred_13: number;
                        cost_13: number;
                        phase_incurred_14: number;
                        cost_14: number;
                        phase_incurred_15: number;
                        cost_15: number;
                        phase_incurred_16: number;
                        cost_16: number;
                        phase_incurred_17: number;
                        cost_17: number;
                        phase_incurred_18: number;
                        cost_18: number;
                        phase_incurred_19: number;
                        cost_19: number;
                        phase_incurred_20: number;
                        cost_20: number;
                      }) => {
                        const phases = [
                          phase_incurred_1,
                          phase_incurred_2,
                          phase_incurred_3,
                          phase_incurred_4,
                          phase_incurred_5,
                          phase_incurred_6,
                          phase_incurred_7,
                          phase_incurred_8,
                          phase_incurred_9,
                          phase_incurred_10,
                          phase_incurred_11,
                          phase_incurred_12,
                          phase_incurred_13,
                          phase_incurred_14,
                          phase_incurred_15,
                          phase_incurred_16,
                          phase_incurred_17,
                          phase_incurred_18,
                          phase_incurred_19,
                          phase_incurred_20,
                        ];
                        const costs = [
                          cost_1,
                          cost_2,
                          cost_3,
                          cost_4,
                          cost_5,
                          cost_6,
                          cost_7,
                          cost_8,
                          cost_9,
                          cost_10,
                          cost_11,
                          cost_12,
                          cost_13,
                          cost_14,
                          cost_15,
                          cost_16,
                          cost_17,
                          cost_18,
                          cost_19,
                          cost_20,
                        ];
                        let phasesCost = [0, 0, 0];

                        for (let i = 0; i < 20; i++) {
                          if (phases[i]) {
                            const phaseNum = phases[i];
                            if (costs[i])
                              phasesCost[phaseNum - 1] =
                                phasesCost[phaseNum - 1] * 1 + costs[i] * 1;
                          }
                        }

                        return index == 0
                          ? phasesCost[0]
                          : index == 1
                          ? phasesCost[1]
                          : phasesCost[2];
                      },
                    },
                  },
                ],
              })),
              // {
              //   id: "capex_item_list",
              //   title: "One-off capex item list",
              //   type: MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM,
              // },
            ],
          },
          {
            id: "bess",
            title: "BESS",
            datum: [
              ...[...ONE_OFF_CAPEX_ITEM_LIST].map((item, index) => ({
                id: `item_${index + 1}`,
                title: `Item ${index + 1}`,
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: `item_${index + 1}`,
                    title: `Item Name`,
                    type: MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM,
                    // renderValue: {
                    //   params: {
                    //     global: [],
                    //     local: [],
                    //   },
                    //   fn: () => item,
                    // },
                  },
                  // {
                  //   id: `phase_incurred_${index + 1}`,
                  //   title: "Phase incurred",
                  //   type: MARINE_PARAM_TYPE.INTEGER,
                  //   minValue: 1,
                  //   maxValue: 3,
                  // },
                  {
                    id: `cost_${index + 1}`,
                    title: "Item Cost",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000,
                  },
                ],
              })),
              {
                id: `cost_sum`,
                title: "Cost Summary",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
                renderValue: {
                  params: {
                    global: [],
                    local: PHASE_AND_COST,
                  },
                  fn: ({
                    cost_1,
                    cost_2,
                    cost_3,
                    cost_4,
                    cost_5,
                    cost_6,
                    cost_7,
                    cost_8,
                    cost_9,
                    cost_10,
                    cost_11,
                    cost_12,
                    cost_13,
                    cost_14,
                    cost_15,
                    cost_16,
                    cost_17,
                    cost_18,
                    cost_19,
                    cost_20,
                  }: {
                    cost_1: number;
                    cost_2: number;
                    cost_3: number;
                    cost_4: number;
                    cost_5: number;
                    cost_6: number;
                    cost_7: number;
                    cost_8: number;
                    cost_9: number;
                    cost_10: number;
                    cost_11: number;
                    cost_12: number;
                    cost_13: number;
                    cost_14: number;
                    cost_15: number;
                    cost_16: number;
                    cost_17: number;
                    cost_18: number;
                    cost_19: number;
                    cost_20: number;
                  }) => {
                    const costs = [
                      cost_1,
                      cost_2,
                      cost_3,
                      cost_4,
                      cost_5,
                      cost_6,
                      cost_7,
                      cost_8,
                      cost_9,
                      cost_10,
                      cost_11,
                      cost_12,
                      cost_13,
                      cost_14,
                      cost_15,
                      cost_16,
                      cost_17,
                      cost_18,
                      cost_19,
                      cost_20,
                    ];
                    let totalCost = 0;
                    for (let i = 0; i < 20; i++) {
                      if (costs[i]) totalCost += costs[i] * 1;
                    }
                    return totalCost;
                  },
                },
              },
              {
                id: `payment_profile`,
                title: "Payment Profile",
                type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
                // unit:PARAM_UNIT.GBP_PRO_1000
              },
              {
                id: `inflation_profile`,
                title: "Inflation Index",
                type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
              },
              {
                id: `inflation_base_year`,
                title: "Inflation Base Year",
                type: MARINE_PARAM_TYPE.YEAR,
                unit: PARAM_UNIT.YEAR,
              },
            ],
          },
        ],
      },
      {
        id: `phase_1_capex`,
        title: "Phase 1 Capex",
        datum: [
          ...[...PHASE_ONE_CAPEX].map((comp, index) => ({
            id: `component_${index + 1}`,
            title: `Component ${index + 1}`,
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `profile_${index + 1}`,
                title: `Component Name`,
                type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
              },
              {
                id: `cost_${index + 1}`,
                title: `Capex Size`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `uel_${index + 1}`,
                title: `Useful Economic Life (UEL)`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
              },
            ],
          })),
          {
            id: `inflation_profile`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      },
      {
        id: `phase_2_capex`,
        title: "Phase 2 Capex",
        datum: [
          ...[...PHASE_TWO_CAPEX].map((comp, index) => ({
            id: `component_${index + 1}`,
            title: `Component ${index + 1}`,
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `profile_${index + 1}`,
                title: `Component Name`,
                type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
              },
              {
                id: `cost_${index + 1}`,
                title: `Capex Size`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `uel_${index + 1}`,
                title: `Useful Economic Life (UEL)`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
              },
            ],
          })),
          {
            id: `inflation_profile`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      },
      {
        id: `phase_3_capex`,
        title: "Phase 3 Capex",
        datum: [
          ...[...PHASE_THREE_CAPEX].map((comp, index) => ({
            id: `component_${index + 1}`,
            title: `Component ${index + 1}`,
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: `profile_${index + 1}`,
                title: `Component Name`,
                type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
              },
              {
                id: `cost_${index + 1}`,
                title: `Capex Size`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },
              {
                id: `uel_${index + 1}`,
                title: `Useful Economic Life (UEL)`,
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.YEARS,
              },
            ],
          })),
          {
            id: `inflation_profile`,
            title: `Inflation Index`,
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
          },
          {
            id: `inflation_base_year`,
            title: `Inflation Base Year`,
            type: MARINE_PARAM_TYPE.YEAR,
            unit: PARAM_UNIT.YEAR,
          },
        ],
      },
      {
        id: "fixed_asset_disposal",
        title: "Fixed Asset Disposal",
        datum: [
          {
            id: "bess_uel",
            title: "Bess Useful Economic Year",
            type: MARINE_PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.YEARS,
          },
          {
            id: "recovery_percentage_excl_bess",
            title:
              "Percentage of Capex Recovered from Sale of Fixed Assets (excl.BESS)",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "recovery_percentage_bess",
            title:
              "Percentage of Capex Recovered from Sale of Fixed Assets (BESS)",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
        ],
      },
      {
        id: "payment_profile",
        title: "Capex Payment Profile Data",
        datum: [
          {
            id: "payment_profile_data",
            title: "Payment Profile Data (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [],
              fn: () =>
                ALL_CAPEX_PAYMENT_PROFILE_LIST.map((profile) => profile),
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push("");
                for (let i = 24; i > 0; i--) {
                  result.push([`Month - ${i}`]);
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
    id: "other_inputs",
    title: "Other Inputs",
    datum: [],
    children: [
      {
        id: "vat",
        title: "VAT",
        datum: [
          {
            id: "vat_rate",
            title: "VAT Rate",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 20,
          },
          {
            id: "percentage_of_revenue_subject_to_vat",
            title: "Percentage of Revenue Subject to VAT",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          {
            id: "percentage_of_cost_subject_to_vat",
            title: "Percentage of Cost Subject to VAT",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          {
            id: "percentage_of_capex_subject_to_vat",
            title: "Percentage of Cost Capex Subject to VAT",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          {
            id: "percentage_of_devex_subject_to_vat",
            title: "Percentage of Cost Devex subject to VAT",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100,
          },
          {
            id: "monthly_payments_on_account",
            title: "Monthly Payments on Account",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
          },
        ],
      },
      {
        id: "working_capital",
        title: "Working Capital",
        datum: [
          {
            id: "debtor_days",
            title: "Debtor Days Assumption (up to 120 days)",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            maxValue: 120,
            minValue: 0,
          },
          {
            id: "creditor_days",
            title: "Creditor Days Assumption (up to 120 days)",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            maxValue: 120,
            minValue: 0,
          },
        ],
      },
      {
        id: "capex_reserve_account",
        title: "Capex Reserve Account",
        datum: [
          {
            id: "reserve_length",
            title: "Length of Reserve",
            type: MARINE_PARAM_TYPE.INTEGER,
            unit: PARAM_UNIT.QUARTERS,
          },
        ],
      },
      {
        id: "corporation_tax",
        title: "Corporation Tax",
        datum: [
          {
            id: "small_profits_tax_rate",
            title: "Small Profits Tax Rate",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 19,
          },
          {
            id: "main_rate_of_tax",
            title: "Main Rate of Tax",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 25,
          },
          {
            id: "profit_threshold_for_small_profits",
            title: "Profit Threshold for Small Profits",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 50,
          },
          {
            id: "aia",
            title: "AIA",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1000,
          },
          // {
          //   id: "rate_for_capital_allowances_main_pool",
          //   title: "Rate for capital allowances main pool",
          //   type: MARINE_PARAM_TYPE.NUMBER,
          //   unit: PARAM_UNIT.PERCENTAGE,
          //   defaultValue: 6,
          // },
          {
            id: "rate_for_capital_allowances_special_pool",
            title: "Rate for Capital Allowances Special Pool",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 6,
          },
          {
            id: "small_pool_allowances_threshold",
            title: "Small Pool Allowance Threshold",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1,
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
                type: MARINE_PARAM_TYPE.SWITCH.YESNO,
              },
              {
                id: "minimum_cash_balance",
                title: "Fixed Minimum Cash Balance",
                type: MARINE_PARAM_TYPE.NUMBER,
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
                title: "Cash Requirement Look-forward Restriction",
                type: MARINE_PARAM_TYPE.INTEGER,
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
            ],
          },
          {
            id: "gearing",
            title: "Gearing",
            datum: [
              {
                id: "gearing_ratio",
                title: "Gearing Ratio",
                type: MARINE_PARAM_TYPE.NUMBER,
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
                id: "assumption",
                title: "Assumption",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "senior_debt_strategy",
                    title: "Senior Debt Drawdown/Repayment Strategy",
                    type: MARINE_PARAM_TYPE.CHOICE.DEBT_STRATEGY,
                  },
                  {
                    id: "senior_debt_interest",
                    title: "Senior Debt Interest Rate",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE_PA,
                    defaultValue: 8.25,
                    minValue: 0,
                    maxValue: 100,
                  },
                  {
                    id: "senior_debt_repayment_type",
                    title: "Repayment Type",
                    type: MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE,
                  },
                  {
                    id: "cash_sweep_percentage",
                    title:
                      "Cash Sweep % of Available Cash (Senior Debt Repayment Profile)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 100,
                  },
                  {
                    id: "bullet_minimum_facility_length",
                    title: "Bullet Minimum Facility Length",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "bullet_selected_facility_length",
                    title: "Bullet Selected Facility Length",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "arrangement_fee",
                    title: "Arrangement Fee",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                  {
                    id: "amort_min_facility_length",
                    title: "Amortisation Minimum Facility Length From COD",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "amort_payment_timing",
                    title: "Amortisation Payment Timing",
                    type: MARINE_PARAM_TYPE.CHOICE.AMORT_PAY_TIMING,
                  },
                  {
                    id: "amort_payment_timing_manual_input",
                    title:
                      "Amortisation Payment Timing - Manual Input of Payment Month",
                    type: MARINE_PARAM_TYPE.CHOICE.MONTH_NAME,
                  },
                  {
                    id: "amort_len_from_cod",
                    title: "Amortisation Length (start from COD)",
                    type: MARINE_PARAM_TYPE.INTEGER,
                    unit: PARAM_UNIT.MONTHS,
                  },
                  {
                    id: "amort_interest_payment_frequency",
                    title:
                      "Amortisation Interest Payment Frequency(months after first drawdown)",
                    type: MARINE_PARAM_TYPE.TEXT,
                    // unit: PARAM_UNIT.MONTHS,
                  },
                ],
              },

              {
                id: "dscr",
                title: "DSCR",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "minimum_allowed_dscr_half_yearly",
                    title: "Minimum Allowed DSCR (half-yearly)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "minimum_allowed_dscr_annual",
                    title: "Minimum Allowed DSCR (annual)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "dscr_check_switch",
                    title: "Minimum Allowed DSCR Check On",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                ],
              },
              {
                id: "llcr",
                title: "LLCR",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "minimum_allowed_llcr_half_yearly",
                    title: "Minimum Allowed LLCR (half-yearly)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "minimum_allowed_llcr_annual",
                    title: "Minimum Allowed LLCR (annual)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "llcr_check_switch",
                    title: "Minimum Allowed LLCR Check On",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "llcr_discount_rate",
                    title: "LLCR Discount Rate",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                ],
              },
              {
                id: "plcr",
                title: "PLCR",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "minimum_allowed_plcr_half_yearly",
                    title: "Minimum Allowed PLCR (half-yearly)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "minimum_allowed_plcr_annual",
                    title: "Minimum Allowed PLCR (annual)",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                    defaultValue: 0,
                  },
                  {
                    id: "plcr_check_switch",
                    title: "Minimum Allowed PLCR Check On",
                    type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
                  },
                  {
                    id: "plcr_discount_rate",
                    title: "PLCR Discount Rate",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.PERCENTAGE,
                  },
                ],
              },
            ],
          },
          {
            id: "equity",
            title: "Equity",
            datum: [
              {
                id: "shareholder_loan_interest",
                title: "Shareholder Loan Interest",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                defaultValue: 8,
                minValue: 0,
                maxValue: 100,
              },

              {
                id: "equity_split_to_sharholder_loan",
                title: "Equity Split to Shareholder Loan",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "equity_split_to_share_capital",
                title: "Equity Split to Share Capital",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                // renderValue: {
                //   params: {
                //     global: [],
                //     local: ["equity_split_to_sharholder_loan"],
                //   },
                //   fn: ({
                //     equity_split_to_sharholder_loan,
                //   }: {
                //     equity_split_to_sharholder_loan: number;
                //   }) => {
                //     if (equity_split_to_sharholder_loan)
                //       return 100 - equity_split_to_sharholder_loan;
                //     else return "-";
                //   },
                // },
              },
              // {
              //   id: "shareholder_loan_interest_switch",
              //   title: "Shareholder Loan Interest Active",
              //   type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
              // },
              // {
              //   id: "shareholder_loan_interest_for_calculations",
              //   title: "Shareholder Loan Interest to Use in Calculations",
              //   type: MARINE_PARAM_TYPE.TEXT,
              //   unit: PARAM_UNIT.PERCENTAGE_PA,
              //   renderValue: {
              //     params: {
              //       local: [
              //         "shareholder_loan_interest",
              //         "shareholder_loan_interest_switch",
              //       ],
              //       global: [],
              //     },
              //     fn: ({
              //       shareholder_loan_interest,
              //       shareholder_loan_interest_switch,
              //     }: {
              //       shareholder_loan_interest: number;
              //       shareholder_loan_interest_switch: number;
              //     }) => {
              //       return shareholder_loan_interest &&
              //         shareholder_loan_interest_switch
              //         ? shareholder_loan_interest *
              //             shareholder_loan_interest_switch
              //         : 0;
              //     },
              //   },
              // },
              {
                id: "shl_cash_sweep_percentage",
                title: "Shareholder Loan Cash Sweep % of Available Cash",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100,
              },
              {
                id: "sc_cash_sweep_percentage",
                title: "Share Capital Cash Sweep % of Available Cash",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "live",
                title: "Live",
                type: MARINE_PARAM_TYPE.GROUP,
                children: [
                  {
                    id: "initial_capital_investment",
                    title: "Initial Capital Investment",
                    type: MARINE_PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000,
                  },
                  {
                    id: "initial_investment_date",
                    title: "Initial Capital Investment Date",
                    type: MARINE_PARAM_TYPE.DATE,
                  },
                  {
                    id: "dev_start_date_1",
                    title: "Phase 1 - Development Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_dev_start_date_1`],
                    //   },
                    //   fn: ({
                    //     emarine_dev_start_date_1,
                    //     dev_start_date_2,
                    //     dev_start_date_3,
                    //   }: {
                    //     emarine_dev_start_date_1: string;
                    //     dev_start_date_2: string;
                    //     dev_start_date_3: string;
                    //   }) => {
                    //     if (emarine_dev_start_date_1)
                    //       return emarine_dev_start_date_1;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "oper_start_date_1",
                    title: "Phase 1 - COD and Operating Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_oper_start_date_1`],
                    //   },
                    //   fn: ({
                    //     emarine_oper_start_date_1,
                    //   }: {
                    //     emarine_oper_start_date_1: string;
                    //   }) => {
                    //     if (emarine_oper_start_date_1)
                    //       return emarine_oper_start_date_1;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "dev_start_date_2",
                    title: "Phase 2 - Development Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_dev_start_date_2`],
                    //   },
                    //   fn: ({
                    //     emarine_dev_start_date_2,
                    //   }: {
                    //     emarine_dev_start_date_2: string;
                    //     dev_start_date_2: string;
                    //     dev_start_date_3: string;
                    //   }) => {
                    //     if (emarine_dev_start_date_2)
                    //       return emarine_dev_start_date_2;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "oper_start_date_2",
                    title: "Phase 2 - Operations Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_oper_start_date_2`],
                    //   },
                    //   fn: ({
                    //     emarine_oper_start_date_2,
                    //   }: {
                    //     emarine_oper_start_date_2: string;
                    //   }) => {
                    //     if (emarine_oper_start_date_2)
                    //       return emarine_oper_start_date_2;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "dev_start_date_3",
                    title: "Phase 3 - Development Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_dev_start_date_3`],
                    //   },
                    //   fn: ({
                    //     emarine_dev_start_date_3,
                    //   }: {
                    //     emarine_dev_start_date_3: string;
                    //     dev_start_date_2: string;
                    //     dev_start_date_3: string;
                    //   }) => {
                    //     if (emarine_dev_start_date_3)
                    //       return emarine_dev_start_date_3;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "oper_start_date_3",
                    title: "Phase 3 - Operations Start Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_oper_start_date_3`],
                    //   },
                    //   fn: ({
                    //     emarine_oper_start_date_3,
                    //   }: {
                    //     emarine_oper_start_date_3: string;
                    //   }) => {
                    //     if (emarine_oper_start_date_3)
                    //       return emarine_oper_start_date_3;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "valuation_date_for_selection",
                    title: "Date to Use for Valuation Date",
                    type: MARINE_PARAM_TYPE.CHOICE.EMARINE_VALUATION_POINT,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_live_valuation_date_for_selection`],
                    //   },
                    //   fn: ({
                    //     emarine_live_valuation_date_for_selection,
                    //   }: {
                    //     emarine_live_valuation_date_for_selection: number;
                    //   }) => {
                    //     if (emarine_live_valuation_date_for_selection)
                    //       return EMARINE_VALUATION_POINT_LIST[
                    //         emarine_live_valuation_date_for_selection - 1
                    //       ];
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "valuation_date",
                    title: "Valuation Date",
                    type: MARINE_PARAM_TYPE.DATE,
                    // renderValue: {
                    //   params: {
                    //     local: [],
                    //     global: [`emarine_live_valuation_date`],
                    //   },
                    //   fn: ({
                    //     emarine_live_valuation_date,
                    //   }: {
                    //     emarine_live_valuation_date: string;
                    //   }) => {
                    //     if (emarine_live_valuation_date)
                    //       return emarine_live_valuation_date;
                    //     else return "Not set";
                    //   },
                    // },
                  },
                  {
                    id: "valuation_date_end",
                    title: "Valuation Date (end of month)",
                    type: MARINE_PARAM_TYPE.DATE,
                  },
                  {
                    id: "dates_relation_check",
                    title:
                      "Check if Initial Capital Investment Date is Before Valuation Date",
                    type: MARINE_PARAM_TYPE.CHECKBOX,
                    // renderValue: {
                    //   params: {
                    //     local: ["initial_investment_date"],
                    //     global: [`emarine_live_valuation_date`],
                    //   },
                    //   fn: ({
                    //     emarine_live_valuation_date,
                    //     initial_investment_date,
                    //   }: {
                    //     emarine_live_valuation_date: string;
                    //     initial_investment_date: string;
                    //   }) => {
                    //     if (
                    //       emarine_live_valuation_date >= initial_investment_date
                    //     )
                    //       return true;
                    //     else return false;
                    //   },
                    // },
                  },
                ],
              },
            ],
          },
          {
            id: "intercom_loan",
            title: "Intercompany Loan",
            datum: [
              {
                id: "amount",
                title: "Loan Amount",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
              },

              {
                id: "start_date",
                title: "Loan Start Date",
                type: MARINE_PARAM_TYPE.DATE,
              },
              {
                id: "end_date",
                title: "Loan End Date",
                type: MARINE_PARAM_TYPE.DATE,
              },
              {
                id: "interest_rate",
                title: "Interest",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
              {
                id: "repay_type",
                title: "Repayment Type",
                type: MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE,
              },
              {
                id: "cash_sweep_percentage",
                title: "Cash Sweep % of Available Cash",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ],
          },
          {
            id: "dividends",
            title: "Dividends",
            datum: [
              {
                id: "dividends_cash_sweep_percentage",
                title: "Dividends Cash Sweep % of Available Cash",
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0,
              },
            ],
          },
        ],
      },
      {
        id: "sensitivity",
        title: "Sensitivities",
        datum: [
          {
            id: "power_price_switch",
            title: "Power Price Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "power_price_percentage",
            title: "Power Price Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "adoption_switch",
            title: "Adoption Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "adoption_percentage",
            title: "Adoption Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "capex_switch",
            title: "Capex Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "capex_percentage",
            title: "Capex Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "cold_ironing_switch",
            title: "Cold Ironing Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "cold_ironing_percentage",
            title: "Cold Ironing Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "propulsion_switch",
            title: "Propulsion Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "propulsion_percentage",
            title: "Propulsion Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          ...[...new Array(3).fill(0)]
            .map((_, index) => [
              {
                id: `cold_iron_switch_cli_${index + 1}`,
                title: `Client ${index + 1} Cold Ironing Switch`,
                type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: `cold_iron_percentage_cli_${index + 1}`,
                title: `Client ${index + 1} Cold Ironing Magnitude`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ])
            .flat(),
          ...[...new Array(3).fill(0)]
            .map((_, index) => [
              {
                id: `propulsion_switch_cli_${index + 1}`,
                title: `Client ${index + 1} Propulsion Switch`,
                type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
              },
              {
                id: `propulsion_percentage_cli_${index + 1}`,
                title: `Client ${index + 1} Propulsion Magnitude`,
                type: MARINE_PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
              },
            ])
            .flat(),
          {
            id: "sell_out_price_switch",
            title: "Sell-out Price Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "sell_out_price_percentage",
            title: "Sell-out Price Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },

          {
            id: "sell_out_price_switch_cli_1",
            title: "Client 1 Sell-out Price Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "sell_out_price_percentage_cli_1",
            title: "Client 1 Sell-out Price Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "sell_out_price_switch_cli_2",
            title: "Client 2 Sell-out Price Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "sell_out_price_percentage_cli_2",
            title: "Client 2 Sell-out Price Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "sell_out_price_switch_cli_3",
            title: "Client 3 Sell-out Price Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "sell_out_price_percentage_cli_3",
            title: "Client 3 Sell-out Price Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "arbitrage_switch",
            title: "Arbitrage Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "arbitrage_percentage",
            title: "Arbitrage Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "inercompany_revenue_switch",
            title: "Intercompany Revenue Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "inercompany_revenue_percentage",
            title: "Intercompany Revenue Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "annual_concession_fee_switch",
            title: "Annual Concession Fee Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "annual_concession_fee_percentage",
            title: "Annual Concession Fee Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "opex_switch",
            title: "Opex Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "opex_percentage",
            title: "Opex Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "inflation_switch",
            title: "Inflation Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "inflation_percentage",
            title: "Inflation Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "short_fx_switch",
            title: "Short-term FX Rates Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "short_fx_percentage",
            title: "Short-term FX Rates Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },

          {
            id: "long_fx_switch",
            title: "Long-term FX Rates Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "long_fx_percentage",
            title: "Long-term FX Rates Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "all_fx_switch",
            title: "All FX Rates Switch",
            type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
          },
          {
            id: "all_fx_percentage",
            title: "All FX Rates Magnitude",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
        ],
      },
      {
        id: "inflation_rate_data",
        title: "Inflation Rate Data",
        datum: [
          // {
          //   id: "inflation_start_year",
          //   title: "Inflation Start Year",
          //   type: PARAM_TYPE.NUMBER,
          //   defaultValue: 2021,
          // },
          {
            id: "emarine_inflation_index_table",
            title: "Inflation Index Table (%)",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [],
              fn: () => EMARINE_INFLATION_LIST,
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                const result = [];
                result.push([""]);
                for (
                  let i = INFLATION_START_YEAR;
                  i < INFLATION_END_YEAR + 1;
                  i++
                ) {
                  result.push([i]);
                }
                return result;
              },
            },
            valueRange: "percentage",
          },
        ],
      },
      {
        id: "exchange_rate_table",
        title: "Exchange Rate Data",
        datum: [
          // {
          //   id: "inflation_start_year",
          //   title: "Inflation Start Year",
          //   type: PARAM_TYPE.NUMBER,
          //   defaultValue: 2021,
          // },
          {
            id: "exchange_rate",
            title: "FX Rates Table",
            type: MARINE_PARAM_TYPE.TABLE,
            stickyCols: {
              type: "function",
              params: [],
              fn: () => ["USD ($/$)", "GBP (£/$)", "EURO (€/$)"],
            },
            stickyRows: {
              type: "function",
              params: [],
              fn: () => {
                // const result = [];
                // result.push([""]);
                // for (
                //   let i = INFLATION_START_YEAR;
                //   i < INFLATION_END_YEAR + 1;
                //   i++
                // ) {
                //   result.push([i]);
                // }
                const modelStartDate = "2023-01-01";
                return [
                  ["Period", "Start date", "End date"],
                  ...[...new Array(200)].map((d, index) => [
                    index + 1,
                    moment(modelStartDate)
                      .add(index * 3, "month")
                      .format("D-MMM-YY"),
                    moment(modelStartDate)
                      .add(index * 3 + 2, "month")
                      .endOf("month")
                      .format("D-MMM-YY"),
                  ]),
                ];
              },
            },
            valueRange: "percentage",
          },
        ],
      },
      {
        id: "checks",
        title: "Checks",
        datum: [
          {
            id: "negative_gross_pl",
            title: "Negative Gross Profit / (Loss)",
            type: MARINE_PARAM_TYPE.GROUP,
            children: [
              {
                id: "months_to_check_pl",
                title:
                  "Months to Check Gross Profit / (Loss) from after Operation Starts",
                type: MARINE_PARAM_TYPE.INTEGER,
                unit: PARAM_UNIT.MONTHS,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "valuation",
    title: "Valuation",
    children: [
      {
        id: "live_valuation_inputs",
        title: "Live Valuation Inputs",
        datum: [
          {
            id: "valuation_date_selection",
            title: "Date to Use for Valuation Date",
            type: MARINE_PARAM_TYPE.CHOICE.EMARINE_VALUATION_POINT,
          },
          {
            id: "valuation_date",
            title: "Valuation Date",
            type: MARINE_PARAM_TYPE.DATE,
          },
          {
            id: "unlevered_discount_rate",
            title: "Discount Rate Unlevered",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "levered_discount_rate",
            title: "Discount Rate Levered",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "ev",
            title: "EV",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
          },
        ],
      },
      {
        id: "aggre_valuation_inputs",
        title: "Aggregated Valuation Inputs",
        datum: [
          {
            id: "valuation_date",
            title: "Valuation Date",
            type: MARINE_PARAM_TYPE.DATE,
          },
          {
            id: "unlevered_discount_rate",
            title: "Discount Rate Unlevered",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "levered_discount_rate",
            title: "Discount Rate Levered",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
          },
          {
            id: "ev",
            title: "EV",
            type: MARINE_PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
          },
        ],
      },
      // {
      //   id: "infra_valuation_inputs",
      //   title: "NPM Infrastructure valuation inputs",
      //   datum: [
      //     {
      //       id: "valuation_date",
      //       title: "Valuation date",
      //       type: MARINE_PARAM_TYPE.DATE,
      //     },
      //     {
      //       id: "unlevered_discount_rate",
      //       title: "Discount rate unlevered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "levered_discount_rate",
      //       title: "Discount rate levered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "ev",
      //       title: "EV",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.GBP_PRO_1000,
      //     },
      //   ],
      // },
      // {
      //   id: "cpo_valuation_inputs",
      //   title: "NPM CPO valuation inputs",
      //   datum: [
      //     {
      //       id: "valuation_date",
      //       title: "Valuation date",
      //       type: MARINE_PARAM_TYPE.DATE,
      //     },
      //     {
      //       id: "unlevered_discount_rate",
      //       title: "Discount rate unlevered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "levered_discount_rate",
      //       title: "Discount rate levered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "ev",
      //       title: "EV",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.GBP_PRO_1000,
      //     },
      //   ],
      // },
      // {
      //   id: "shipping_valuation_inputs",
      //   title: "NPM e-Shipping Service Provider valuation inputs",
      //   datum: [
      //     {
      //       id: "valuation_date",
      //       title: "Valuation date",
      //       type: MARINE_PARAM_TYPE.DATE,
      //     },
      //     {
      //       id: "unlevered_discount_rate",
      //       title: "Discount rate unlevered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "levered_discount_rate",
      //       title: "Discount rate levered",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.PERCENTAGE,
      //     },
      //     {
      //       id: "ev",
      //       title: "EV",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.GBP_PRO_1000,
      //     },
      //   ],
      // },
      // {
      //   id: "cpo_fixed_asset",
      //   title: "CPO level fixed asset",
      //   datum: [
      //     {
      //       id: "cpo_fixed_asset",
      //       title: "CPO level fixed asset",
      //       type: MARINE_PARAM_TYPE.NUMBER,
      //       unit: PARAM_UNIT.GBP,
      //     },
      //   ],
      // },
    ],
  },
];
