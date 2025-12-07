// import moment from "moment";
// import { IInputParameter } from "../utils/types";
// import { DATE_FORMAT } from "../utils/usePrameter";
// import { PARAM_TYPE } from "../utils/constant";

// export const INPUT_TYPES = {};
// export const INFLATION_START_YEAR = 2023;
// export const INFLATION_END_YEAR = 2072;

// export const MODEL_START_YEAR = 2023;
// export const EMARINE_MODEL_START_YEAR = 2023;
// export const EMARINE_MODEL_END_YEAR = 2072;

// export const sortStrArr = (arr: string[]) => {
//   return arr?.sort((a, b) => a.localeCompare(b));
// };
// // export const LOCAL_CIRCUITS_ZONE: string[] = [
// //   `Not applicable`,
// //   `Aberarder`,
// //   `Aberdeen Bay`,
// //   `Achruach`,
// //   `Aigas`,
// //   `An Suidhe`,
// //   `Arecleoch`,
// //   `Arecleoch extension`,
// //   `Ayrshire grid collector`,
// //   `beaw field`,
// //   `Beinneun Wind Farm`,
// //   `Benbrack`,
// //   `Bhlaraidh Wind Farm`,
// //   `Black Hill`,
// //   `Black Law`,
// //   `BlackCraig Wind Farm`,
// //   `BlackLaw Extension`,
// //   `Blarghour`,
// //   `Branxton`,
// //   `Broken Cross`,
// //   `carrick`,
// //   `Chirmorie`,
// //   `Clash Gour`,
// //   `Clauchrie`,
// //   `Cloiche`,
// //   `Clyde (North)`,
// //   `Clyde (South)`,
// //   `Coalburn BESS`,
// //   `Coire Glas`,
// //   `Connagill`,
// //   `Corriegarth`,
// //   `Corriemoillie`,
// //   `Coryton`,
// //   `costa head`,
// //   `Craig Watch Wind Farm`,
// //   `CREAG RIABHACH`,
// //   `Cruachan`,
// //   `culham jet`,
// //   `Culligran`,
// //   `Cumberhead Collector`,
// //   `Cumberhead West`,
// //   `daer`,
// //   `Deanie`,
// //   `Dersalloch`,
// //   `Dinorwig`,
// //   `Dorenell`,
// //   `Douglas North`,
// //   `Dumnaglass`,
// //   `Dunhill`,
// //   `Dunlaw Extension`,
// //   `Edinbane`,
// //   `elchies`,
// //   `energy isles wind farm`,
// //   `Enoch Hill`,
// //   `euchanhead`,
// //   `Ewe Hill`,
// //   `Fallago`,
// //   `Farr`,
// //   `Faw Side`,
// //   `Fernoch`,
// //   `Ffestiniogg`,
// //   `Fife Grid Services`,
// //   `Finlarig`,
// //   `Foyers`,
// //   `Friston`,
// //   `Galawhistle`,
// //   `Gills Bay`,
// //   `Glen Kyllachy`,
// //   `Glen Ullinish`,
// //   `Glendoe`,
// //   `Glenglass`,
// //   `glenmuckloch hydro pumped storage`,
// //   `glenshimmeroch`,
// //   `Gordonbush`,
// //   `Greenburn`,
// //   `Griffin Wind`,
// //   `Hadyard Hill`,
// //   `Harestanes`,
// //   `Hartlepool`,
// //   `Heathland`,
// //   `hesta head`,
// //   `hopsrig collector`,
// //   `Invergarry`,
// //   `Kennoxhead`,
// //   `Kergord`,
// //   `Kilgallioch`,
// //   `Kilmarnock BESS`,
// //   `Kilmorack`,
// //   `Kings Lynn`,
// //   `kirkton`,
// //   `Kype Muir`,
// //   `Lairg`,
// //   `Langage`,
// //   `lethans`,
// //   `Limekilns`,
// //   `Lochay`,
// //   `Lorg`,
// //   `Luichart`,
// //   `Marchwood`,
// //   `Mark Hill`,
// //   `melvich`,
// //   `Middle Muir`,
// //   `Middleton`,
// //   `Millennium South`,
// //   `Millennium Wind `,
// //   `Mossford`,
// //   `mossy hill`,
// //   `Nant`,
// //   `Necton`,
// //   `north lowther energy initiative`,
// //   `old forest of ae`,
// //   `overhill`,
// //   `quantans hill`,
// //   `Rawhills`,
// //   `Rhigos`,
// //   `Rocksavage`,
// //   `ryhall`,
// //   `Saltend`,
// //   `Sandy Knowe`,
// //   `Sanquhar II`,
// //   `Scoop Hill`,
// //   `Shepherds rig`,
// //   `South Humber Bank`,
// //   `Spalding`,
// //   `stornoway wind`,
// //   `Stranoch`,
// //   `Strathbrora`,
// //   `Strathy`,
// //   `Strathy Wind`,
// //   `Strathy Wood`,
// //   `Stronelairg`,
// //   `teindland wind farm`,
// //   `troston`,
// //   `Wester Dod`,
// //   `Whitelee`,
// //   `Whitelee Extension`,
// // ];

// // export const TNUOS_ZONE_LIST: string[] = [
// //   `North Scotland`,
// //   `East Aberdeenshire`,
// //   `Western Highlands`,
// //   `Skye and Lochalsh`,
// //   `Eastern Grampian and Tayside`,
// //   `Central Grampian`,
// //   `Argyll`,
// //   `The Trossachs`,
// //   `Stirlingshire and Fife`,
// //   `South West Scotlands`,
// //   `Lothian and Borders`,
// //   `Solway and Cheviot`,
// //   `North East England`,
// //   `North Lancashire and The Lakes`,
// //   `South Lancashire Yorkshire and Humber`,
// //   `North Midlands and North Wales`,
// //   `South Lincolnshire and North Norfolk`,
// //   `Mid Wales and The Midlands`,
// //   `Anglesey and Snowdon`,
// //   `Pembrokeshire`,
// //   `South Wales & Gloucester`,
// //   `Cotswold`,
// //   `Central London`,
// //   `Essex and Kent`,
// //   `Oxfordshire Surrey and Sussex`,
// //   `Somerset and Wessex`,
// //   `West Devon and Cornwall`,
// // ];
// // export const LOCAL_SUBSTATION_TYPE: string[] = [
// //   `No redundancy & <1320 MW`,
// //   `Redundancy & <1320 MW`,
// //   `No redundancy & >=1320 MW`,
// //   `Redundancy & >=1320 MW`,
// // ];
// // export const VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS: string[] = [
// //   "Variable - EP1 - 1001",
// //   "Variable - EM9 - 1609",
// //   "Variable - EA23 - 1323",
// //   "Variable - EA1 - 1301",
// //   "Variable - EA16 - 1316",
// //   "Variable - EA29 - 1329",
// //   "Variable - EP5 - 1005",
// //   "Variable - EP14 - 1014",
// //   "Variable - EP18 - 1018",
// //   "Variable - EA26 - 1326",
// //   "Variable - EP11 - 1011",
// //   "Variable - EP16 - 1016",
// //   "Variable - EA7 - 1307",
// //   "Variable - EA29 - 1329",
// //   "Variable - EA24 - 1324",
// //   "Variable - EP13 - 1013",
// //   "Fixed profile",
// // ];

// // export const INFLATION_LIST: string[] = [
// //   `No inflation`,
// //   `RPI`,
// //   `CPI`,
// //   `Tees rent high case`,
// //   `FES to 2050 then nil`,
// //   `FES constant from 2050`,
// //   `CPI to 2050 then nil`,
// //   `CPI with 2% collar and 5% cap`,
// //   `CPI to 2060 then nil`,
// // ];

// // export const REGION_LIST: string[] = sortStrArr([
// //   `Northern Scotland`,
// //   `Southern Scotland`,
// //   `Northern`,
// //   `North West`,
// //   `Yorkshire`,
// //   `N Wales & Mersey`,
// //   `East Midlands`,
// //   `Midlands`,
// //   `Eastern`,
// //   `South Wales`,
// //   `South East`,
// //   `London`,
// //   `Southern`,
// //   `South Western`,
// // ]);

// // export const REGION_PARAMS: string[] = [
// //   "Avg. Cycles per day",
// //   "Wholesale Day Ahead Total Revenues",
// //   "Wholesale Intraday Revenues",
// //   "Balancing Mechanism Revenues",
// //   "Capacity Market Revenues",
// //   "Frequency Response Revenues",
// //   "Balancing Reserve Revenues",
// //   "TNUoS Revenues",
// //   "Total Revenues",
// // ];
// // export const AFRY_PARAMS: string[] = [
// //   "Avg. Cycles per day",
// //   "Day Ahead Sell Revenue",
// //   "Day Ahead Buy Costs",
// //   "Intra-Day Sell Revenue",
// //   "Intra-Day Buy Costs",
// //   "Balancing Mechanism Offer Revenues",
// //   "Balancing Mechanism Bid Costs",
// //   "Capacity Price",
// //   "Response Availability Revenue",
// //   "Response SoE Costs",
// //   "Reserve Availablility Revenue",
// // ];

// // export const PAYMENT_PROFILE_LIST: string[] = [
// //   "BESS profile",
// //   "Tx profile",
// //   "Balance of Plant profile",
// //   "Worset Lane - BESS profile",
// //   "Worset Lane - Tx profile",
// //   "Worset Lane - Balance of Plant profile",
// //   "Bramley SSEN payment profile",
// //   "Development fee payment profile",
// //   "Fully consented 100% payment profile",
// // ];

// // export const STRATEGY_LIST: string[] = ["Ancillaries Focus", "Merchant Focus"];
// export const EMARINE_INFLATION_LIST: string[] = [
//   "No inflation",
//   "RPI (OBR)",
//   "CPI (OBR)",
//   "Tees rent high case",
//   "CPI +1%",
//   "Europe--Spain",
//   "Europe--Netherlands",
//   "Europe--Belgium",
//   "Europe--Croatia",
//   "Africa--Libya",
//   "Europe--Germany",
//   "Europe--Greece",
//   "Africa--Tunisia",
//   "Africa--Egypt",
//   "Europe--Sweden",
//   "Europe--Norway",
//   "Europe--U.K.",
//   "Europe--France",
//   "Europe--Poland",
//   "Europe--Republic of Ireland",
//   "Europe--Finland",
//   "Europe--Italy",
//   "Europe--Denmark",
//   "Europe--Portugal",
//   "Europe--Cyprus",
//   "Africa--Algeria",
//   "Africa--Morocco",
//   "Europe--Slovenia",
//   "Middle East--Israel",
//   "Europe--Gibraltar",
//   "Middle East--Turkiye",
//   "Europe--Croatia",
//   "Europe--Montenegro",
//   "Europe--Latvia",
//   "Europe--Lithuania",
//   "Europe--Estonia",
//   "Europe--Albania",
//   "North America-East Coast-U.S.A.",
//   "North America-East Coast-Canada",
//   "North America-Gulf of Mexico and Caribbean-Panama",
//   "North America-Gulf of Mexico and Caribbean-Jamaica",
//   "North America-Gulf of Mexico and Caribbean-Cayman Islands",
//   "North America-Gulf of Mexico and Caribbean-Dominican Republic",
//   "North America-Gulf of Mexico and Caribbean-Dominica",
//   "South America--Curacao",
//   "North America-Gulf of Mexico and Caribbean-Puerto Rico",
//   "North America-Gulf of Mexico and Caribbean-Honduras",
//   "North America-Gulf of Mexico and Caribbean-Haiti",
//   "North America-Gulf of Mexico and Caribbean-Bahamas",
//   "North America-Gulf of Mexico and Caribbean-Belize",
//   "North America-Gulf of Mexico and Caribbean-Aruba",
//   "North America-Gulf of Mexico and Caribbean-Costa Rica",
//   "North America-Gulf of Mexico and Caribbean-Bermuda",
//   "North America-Gulf of Mexico and Caribbean-Nicaragua",
//   "CPI (BoE)",
//   "CPI (average OBR and BoE)",
//   "Afry inflation",
//   "RPI (+ 2.28% until 2040)",
// ];
// export const ONE_OFF_CAPEX_ITEM_LIST: string[] = [
//   "1-Heysham-Capex - Marine-Grid Connection cost from DNO to marine site",
//   "1-Heysham-Capex - Marine-Grid connection within the DNO system",
//   "1-Heysham-Capex - BESS-BESS From BYD quotation 8MWh",
//   "1-Heysham-Capex - BESS-EPC-BESS Construction",
//   "2-Heysham-Capex - BESS-BESS PSC",
//   "2-Heysham-Capex - BESS-EPC-BESS Construction",
//   "2-Heysham-Capex - BESS-EPC-BESS Construction",
//   "1-Heysham-Capex - Marine-ehouse (incl. shipment and tax)",
//   "1-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
//   "2-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) ",
//   "2-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
//   "3-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) ",
//   "3-Heysham-Capex - Marine-CMS (incl. shipment and tax)",
//   "1-Heysham-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)",
//   "1-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
//   "1-Heysham-Capex - Marine-EPC-Marine Cables",
//   "2-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
//   "2-Heysham-Capex - Marine-EPC-Marine Cables",
//   "3-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)",
//   "3-Heysham-Capex - Marine-EPC-Marine Cables",
// ];
// export const PHASE_ONE_CAPEX: string[] = [
//   "1-Capex - Marine-ehouse (incl. shipment and tax)",
//   "1-Capex - Marine-CMS (incl. shipment and tax)",
//   "1-Capex - Marine-EPC-Marine ehouse",
//   "1-Capex - Marine-EPC-Marine CMS",
//   "",
// ];
// export const PHASE_TWO_CAPEX: string[] = [
//   "2-Capex - Marine-ehouse (incl. shipment and tax)",
//   "2-Capex - Marine-CMS (incl. shipment and tax)",
//   "2-Capex - Marine-EPC-Marine ehouse",
//   "2-Capex - Marine-EPC-Marine CMS",
//   "",
// ];
// export const PHASE_THREE_CAPEX: string[] = [
//   "3-Capex - Marine-ehouse (incl. shipment and tax)",
//   "3-Capex - Marine-CMS (incl. shipment and tax)",
//   "3-Capex - Marine-EPC-Marine ehouse",
//   "3-Capex - Marine-EPC-Marine CMS",
//   "",
// ];
// export const PROPULSION_NM_LIST: string[] = [
//   "CRUISE - Propulsion first + Last nm requirements to run on electric power",
//   "FERRY - Propulsion first + Last nm requirements to run on electric power",
//   "CONTAINER - Propulsion first + Last nm requirements to run on electric power",
//   "CAR CARRIER - Propulsion first + Last nm requirements to run on electric power",
//   "CHEMICAL - Propulsion first + Last nm requirements to run on electric power",
//   "CARGO - Propulsion first + Last nm requirements to run on electric power",
//   "Offhore Construction Vessle - Propulsion first + Last nm requirements to run on electric power",
//   "Stena - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "XX% acceseration Stena Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
//   "1 CLDN - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "XX% acceseration CLDN Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
//   "1 IOMSP - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "XX% acceseration IOMSP Specific FERRY - Propulsion first + Last nm requirements to run on electric power",
//   "1 Stena - 9.2MWh (12nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "Stena - 40MWh (60nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "Stena - 92MWh (120nm) in 2030 - Heysham - Propulsion first + Last nm requirements to run on electric power",
//   "Stena cold-iron only - Heysham - Propulsion first + Last nm requirements to run on electric power",
// ];
// export const ALL_CAPEX_PAYMENT_PROFILE_LIST: string[] = [
//   `OPS Generic S curve (Phase 1)`,
//   `OPS Generic S curve (Phase 2)`,
//   `OPS Generic S curve (Phase 3)`,
//   `BESS Generic S curve`,
//   ``,
//   `1-Capex - Marine-Grid Connection cost from DNO to marine site`,
//   `1-Capex - Marine-Grid connection within the DNO system`,
//   `1-Capex - Marine-ehouse (incl. shipment and tax)`,
//   `1-Capex - Marine-CMS (incl. shipment and tax)`,
//   `1-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)`,
//   `1-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `1-Capex - Marine-EPC-Marine ehouse`,
//   `1-Capex - Marine-EPC-Marine CMS`,
//   `1-Capex - Marine-EPC-Marine Cables`,
//   `1-Capex - BESS-BESS From BYD quotation`,
//   `1-Capex - BESS-EPC-BESS Construction`,
//   ``,
//   `2-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
//   `2-Capex - Marine-CMS (incl. shipment and tax)`,
//   `2-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `2-Capex - Marine-EPC-Marine ehouse`,
//   `2-Capex - Marine-EPC-Marine CMS`,
//   `2-Capex - Marine-EPC-Marine Cables`,
//   `2-Capex - BESS-BESS  2x£0.544m=£1m for MC cube (incl. shipment and tax)`,
//   `2-Capex - BESS-BESS  £0.6m for PSC (2.7MW/10MWh) (incl. shipment and tax)`,
//   `2-Capex - BESS-EPC-BESS Construction`,
//   ``,
//   `3-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
//   `3-Capex - Marine-CMS (incl. shipment and tax)`,
//   `3-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `3-Capex - Marine-EPC-Marine ehouse`,
//   `3-Capex - Marine-EPC-Marine CMS`,
//   `3-Capex - Marine-EPC-Marine Cables`,
//   `3-Capex - BESS-BESS. None1`,
//   `3-Capex - BESS-BESS. None2`,
//   ``,
//   ``,
//   `1-Heysham-Capex - Marine-Grid Connection cost from DNO to marine site`,
//   `1-Heysham-Capex - Marine-Grid connection within the DNO system`,
//   `1-Heysham-Capex - Marine-ehouse (incl. shipment and tax)`,
//   `1-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
//   `1-Heysham-Capex - Marine-Cable from sub to ehouse (incl. shipment and tax)`,
//   `1-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `1-Heysham-Capex - Marine-EPC-Marine ehouse`,
//   `1-Heysham-Capex - Marine-EPC-Marine CMS`,
//   `1-Heysham-Capex - Marine-EPC-Marine Cables`,
//   `1-Heysham-Capex - BESS-BESS From BYD quotation 8MWh`,
//   `1-Heysham-Capex - BESS-EPC-BESS Construction`,
//   ``,
//   `2-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
//   `2-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
//   `2-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `2-Heysham-Capex - Marine-EPC-Marine ehouse`,
//   `2-Heysham-Capex - Marine-EPC-Marine CMS`,
//   `2-Heysham-Capex - Marine-EPC-Marine Cables`,
//   `2-Heysham-Capex - BESS-BESS MC Cube`,
//   `2-Heysham-Capex - BESS-BESS PSC`,
//   `2-Heysham-Capex - BESS-EPC-BESS Construction`,
//   ``,
//   `3-Heysham-Capex - Marine-eHouse upgrades (incl. shipment and tax) `,
//   `3-Heysham-Capex - Marine-CMS (incl. shipment and tax)`,
//   `3-Heysham-Capex - Marine-Cable from ehouse to berth (incl. shipment and tax)`,
//   `3-Heysham-Capex - Marine-EPC-Marine ehouse`,
//   `3-Heysham-Capex - Marine-EPC-Marine CMS`,
//   `3-Heysham-Capex - Marine-EPC-Marine Cables`,
//   `3-Heysham-Capex - BESS-BESS. None1`,
//   `3-Heysham-Capex - BESS-BESS. None2`,
// ];
// export const MARINE_PARAM_TYPE = {
//   YEAR: "year",
//   TEXT: "text",
//   NUMBER: "number",
//   INTEGER: "integer",
//   DATE: "date",
//   TABLE: "table",
//   GROUP: "group",
//   SWITCH: {
//     EFFICIENCY: "switch_efficiency",
//     ONOFF: "switch_onoff",
//     YESNO: "switch_yesno",
//   },
//   CHOICE: {
//     // ~~~eMarine
//     OWNERSHIP: "choice_ownership",
//     VERTICAL_TYPE: "choice_vertical_type",
//     ADOPTION_CURVE: "choice_adoption_curve",
//     GROWTH_FACTORS: "choice_growth_factors",
//     MARKET_SHARE_CURVE: "choice_market_share_curve",
//     LOCATION_TYPE: "choice_location_type",
//     ENTITY: "choice_entity",
//     VERTICAL_SEASONALITY_PROFILE: "choice_vertical_seasonality_profile",
//     MONTH_NAME: "choice_month_name",
//     AMORT_PAY_TIMING: "choice_amort_pay_timing",
//     SPECIFY_CLIENT: "choice_specify_client",
//     PRICING_STRATEGY: "choice_pricing_strategy",
//     DEBT_STRATEGY: "choice_debt_strategy",
//     MARINE_DEVEX_PROFILE: "choice_marine_devex_profile",
//     ALL_CAPEX_PAYMENT_PROFILE: "choice_all_capex_payment_profile",
//     SD_REPAYMENT_TYPE: "choice_sd_repayment_type",
//     // ~~~eMarine
//     PROVIDER_REGION: "choice_provider_region",
//     AFRY_REGION: "choice_afry_region",
//     MODO_REGION: "choice_modo_region",
//     BARINGA_REGION: "choice_baringa_region",
//     TECH: "choice_tech",
//     CURRENCY: "choice_currency",
//     EMARINE_CURRENCY: "choice_emarine_currency",
//     ASSET: "choice_asset",
//     REGION: "choice_region",
//     STRATEGY: "choice_strategy",
//     ACRES: "choice_acres",
//     DURATION: "choice_duration",
//     ABSOLUTE_FORECAST: "choice_absolute_forecast",
//     RELATIVE_FORECAST: "choice_relative_forecast",
//     STAGES: "choice_stage",
//     CARRY_BASIS: "choice_carry_basis",
//     FORECAST_PROVIDER: "choice_forecast_provider",
//     INFLATION: "choice_inflation",
//     ONE_OFF_CAPEX_ITEM: "choice_one_off_capex_item",
//     EMARINE_INFLATION: "choice_emarine_inflation",
//     ANNUAL_CONCESSION_FEE_PROFIILE: "choice_annual_concession_fee",
//     PROPULSION_NM_LIST: "choice_propulsion_nm_list",
//     WS_MARKET_CURVE: "choice_ws_market_curve",
//     NON_WHOLESALE_COST: "choice_non_wholesale_cost",
//     STEVEDORE_COST_METHOD: "choice_stevedore_cost_method",
//     UPSIDE: "choice_upside",
//     DNO: "choice_dno",
//     // LOCALSUBSTATION: 'local_substation_type',
//     SUBSTATION_TYPE: "choice_substation_type",
//     GRID_CONNECTION_VOLTAGE: "choice_grid_connection_voltage",
//     SECURITY: "choice_security",
//     DEVEX_PROFILE: "choice_devex_profile",
//     ATTRIBUTABLE_SECURITY: "choice_attributable_security",
//     PAYMENT_PROFILE: "choice_payment_profile",
//     FORECAST: "choice_forecast",
//     SUPPLIER: "choice_supplier",
//     TNUOS_ZONE_LIST: "choice_tnuos_zone_list",
//     LOCAL_CIRCUITS_ZONE: "choice_local_circuits_zone",
//     LAND_RENT_PAYMENT_TERMS: "choice_land_rent_payment_terms",
//     LAND_RENT_BASIS: "choice_land_rent_basis",
//   },
// };

// export const SWITCH_DATA = {
//   [MARINE_PARAM_TYPE.SWITCH.EFFICIENCY]: {
//     FIXED: { id: 0, label: "Fixed" },
//     FORECAST: { id: 1, label: "Forecaset" },
//   },
//   [MARINE_PARAM_TYPE.SWITCH.ONOFF]: {
//     OFF: { id: 0, label: "Off" },
//     ON: { id: 1, label: "On" },
//   },
//   [MARINE_PARAM_TYPE.SWITCH.YESNO]: {
//     NO: { id: 0, label: "No" },
//     YES: { id: 1, label: "Yes" },
//   },
// };

// export const CHOICE_DATA: Record<
//   string,
//   { id: number; label: string | number; disabled?: boolean }[]
// > = {
//   [MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE]: [
//     { id: 1, label: "Even profile" },
//     { id: 2, label: "Seasonality - CRUISE" },
//     { id: 3, label: "Seasonality - FERRY" },
//     { id: 4, label: "Seasonality - SERVICE TUG" },
//     { id: 5, label: "Seasonality - CONTAINER" },
//     { id: 6, label: "Seasonality - CAR CARRIER" },
//     { id: 7, label: "Seasonality - CHEMICAL" },
//     { id: 8, label: "Seasonality - CARGO" },
//     { id: 9, label: "Seasonality (Stena Specific)" },
//     { id: 10, label: "Seasonality (CLDNN Specific)" },
//     { id: 11, label: "Seasonality (IOMSP Specific)" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE]: [
//     { id: 1, label: "Oil tankers" },
//     { id: 2, label: "Chemical/product" },
//     { id: 3, label: "Gas tankers" },
//     { id: 4, label: "Bulk carriers" },
//     { id: 5, label: "General cargo" },
//     { id: 6, label: "Container vessels" },
//     { id: 7, label: "Ro-Ro automotive" },
//     { id: 8, label: "Ro-Pax vessels" },
//     { id: 9, label: "Cruise ships" },
//     { id: 10, label: "Offshore supply vessels" },
//     { id: 11, label: "Fishing vessels" },
//     { id: 12, label: "CRUISE" },
//     { id: 13, label: "FERRY" },
//     { id: 14, label: "SERVICE TUG" },
//     { id: 15, label: "CONTAINER" },
//     { id: 16, label: "CAR CARRIER" },
//     { id: 17, label: "CHEMICAL" },
//     { id: 18, label: "CARGO" },
//     { id: 19, label: "Offshore Constructor" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST]: PROPULSION_NM_LIST.map(
//     (t, index) => ({
//       id: index + 1,
//       label: t,
//     })
//   ),
//   [MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE]: [
//     { id: 1, label: "1 - Infra Marine - Heysham - First Plug - Devex GBP" },
//     { id: 2, label: "2 - Infra Marine - Heysham - Second Plug - Devex GBP" },
//     { id: 3, label: "3 - Infra Marine - Heysham - Third Plug - Devex GBP" },
//     { id: 4, label: "1 - Infra BESS - Heysham - First Plug - Devex GBP" },
//     { id: 5, label: "2 - Infra BESS - Heysham - Second Plug - Devex GBP" },
//     { id: 6, label: "3 - Infra BESS - Heysham - Third Plug - Devex GBP" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE]: [
//     { id: 1, label: "Generic Annual Concession Cost (flat $500k/pa)" },
//     { id: 2, label: "Teesworks - Option Fee" },
//     { id: 3, label: "Teesworks - Concession Fee" },
//     { id: 4, label: "Heysham Annual Concession " },
//     { id: 5, label: "Teesworks - Concession Premium" },
//     { id: 6, label: "Teesworks - OPTION / EXCLUSIVITY" },
//     { id: 7, label: "Teesworks - CONCESSION" },
//     { id: 8, label: "Teesworks - CONNECTION FEE" },
//     { id: 9, label: "" },
//     { id: 10, label: "Phase 1 Heysham  - E.House and Protection v2" },
//     { id: 11, label: "Phase 2 Heysham  - E.House and Protection v2" },
//     { id: 12, label: "Phase 3 Heysham  - E.House and Protection v2" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE]: [
//     { id: 1, label: "CRUISE - COld-Ironing(% of vessels at berth)" },
//     { id: 2, label: "FERRY - COld-Ironing(% of vessels at berth)" },
//     { id: 3, label: "SERVICE TUG - COld-Ironing(% of vessels at berth)" },
//     { id: 4, label: "CONTAINER - COld-Ironing(% of vessels at berth)" },
//     { id: 5, label: "CAR CARRIER - COld-Ironing(% of vessels at berth)" },
//     { id: 6, label: "CHEMICAL - COld-Ironing(% of vessels at berth)" },
//     { id: 7, label: "CARGO - COld-Ironing(% of vessels at berth)" },
//     {
//       id: 8,
//       label: "Offshore Construction - COld-Ironing(% of vessels at berth)",
//     },
//     {
//       id: 9,
//       label:
//         "CRUISE - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 10,
//       label:
//         "FERRY - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 11,
//       label:
//         "SERVICE TUG - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 12,
//       label:
//         "CONTAINER - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 13,
//       label:
//         "CAR CARRIER - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 14,
//       label:
//         "CHEMICAL - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 15,
//       label:
//         "CARGO - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 16,
//       label:
//         "Offshore Construction - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 17,
//       label: "IOMSP - Heysham - Cold-Ironing(% of vessles at berth)",
//     },

//     {
//       id: 18,
//       label: "CLDN - Heysham - Cold-Ironing(% of vessles at berth)",
//     },
//     {
//       id: 19,
//       label: "Stena - Heysham - Cold-Ironing(% of vessles at berth)",
//     },
//     {
//       id: 20,
//       label:
//         "IOMSP - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },

//     {
//       id: 21,
//       label:
//         "CLDN - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//     {
//       id: 22,
//       label:
//         "Stena - Heysham - Propulsion Adoption Rates as % of total trafic(% of Hybrid/fill electric Ships at berth)",
//     },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.MONTH_NAME]: [
//     { id: 1, label: "January" },
//     { id: 2, label: "February" },
//     { id: 3, label: "March" },
//     { id: 4, label: "April" },
//     { id: 5, label: "May" },
//     { id: 6, label: "June" },
//     { id: 7, label: "July" },
//     { id: 8, label: "August" },
//     { id: 9, label: "September" },
//     { id: 10, label: "October" },
//     { id: 11, label: "Novemeber" },
//     { id: 12, label: "December" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS]: [
//     { id: 1, label: "Growth profile 1 for traffic at one berth" },
//     { id: 2, label: "Growth profile 2" },
//     { id: 3, label: "Growth profile 3" },
//     { id: 4, label: "Growth profile 4" },
//     { id: 5, label: "Growth profile 5" },
//     { id: 6, label: "Growth profile 6" },
//     { id: 7, label: "Growth profile 7" },
//     { id: 8, label: "Growth profile 8" },
//     { id: 9, label: "Growth profile 9" },
//     { id: 10, label: "Growth profile 10" },
//     { id: 11, label: "Growth profile 11" },
//     { id: 12, label: "Growth profile 12" },
//     { id: 13, label: "Growth profile 13" },
//     { id: 14, label: "Growth profile 14" },
//     { id: 15, label: "Growth profile 15" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE]: [
//     {
//       id: 1,
//       label:
//         "Offshore Construction Vessel - Teesworks (Seah Wind) - All traffic at the berth where the charger is located",
//     },

//     { id: 2, label: "CRUISE" },
//     { id: 3, label: "FERRY" },
//     { id: 4, label: "SERVICE TUG" },
//     { id: 5, label: "CONTAINER" },
//     { id: 6, label: "CAR CARRIER" },
//     { id: 7, label: "CHEMICAL" },
//     { id: 8, label: "CARGO" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.OWNERSHIP]: [
//     { id: 1, label: "Full stack" },
//     { id: 2, label: "JV" },
//     { id: 3, label: "Affiliate" },
//     { id: 4, label: "Roaming" },
//   ],
//   // [MARINE_PARAM_TYPE.CHOICE.MODO_REGION]: REGION_LIST.map((r, index) => ({
//   //   id: index + 1,
//   //   label: r,
//   // })),
//   [MARINE_PARAM_TYPE.CHOICE.AFRY_REGION]: [
//     { id: 1, label: "GB without zones" },
//     { id: 2, label: "East EC5" },
//     { id: 3, label: "London LE1" },
//     { id: 4, label: "Midlands unconstrained" },
//     { id: 5, label: "North B8" },
//     { id: 6, label: "South SC1" },
//     { id: 7, label: "Swales SW1" },
//     { id: 8, label: "Thames SC3" },
//     { id: 9, label: "UpperNorth B7a" },
//     { id: 10, label: "SHETL N B2" },
//     { id: 11, label: "SHETL S B4" },
//     { id: 12, label: "SPT B6" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.BARINGA_REGION]: [
//     { id: 1, label: "B2" },
//     { id: 2, label: "B4" },
//     { id: 3, label: "B6" },
//     { id: 4, label: "B7a" },
//     { id: 5, label: "B8" },
//     { id: 6, label: "EC5" },
//     { id: 7, label: "SC1" },
//     { id: 8, label: "X" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.ASSET]: [
//     { id: 1, label: "EP1 - Upsall Central (Hag Lane) - base case" },
//     { id: 2, label: "[spare] - base case" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.FORECAST]: [
//     { id: 1, label: "Afry low" },
//     { id: 2, label: "Afry central" },
//     { id: 3, label: "Afry high" },
//     { id: 4, label: "Bespoke" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.SUPPLIER]: [
//     { id: 1, label: "BYD latest" },
//     { id: 2, label: "BYD - July inputs(KKA)" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.RELATIVE_FORECAST]: [
//     { id: 1, label: "Afry low" },
//     { id: 2, label: "Afry central" },
//     { id: 3, label: "Afry high" },
//     { id: 4, label: "Bespoke" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.ABSOLUTE_FORECAST]: [
//     { id: 1, label: "NREL low" },
//     { id: 2, label: "NREL central" },
//     { id: 3, label: "NREL high" },
//     {
//       id: 4,
//       label:
//         "Afry KKA case with 15% uplift for all vintages (make sure to switch off augmentation uplift else double counted)",
//     },
//     {
//       id: 5,
//       label:
//         "Afry KKA case with no uplift (if augmentation uplift is required enter this separately)",
//     },
//   ],
//   // [MARINE_PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST]: TNUOS_ZONE_LIST.map(
//   //   (t, index) => ({
//   //     id: index + 1,
//   //     label: t,
//   //   })
//   // ),
//   // [MARINE_PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE]: LOCAL_CIRCUITS_ZONE.map(
//   //   (t, index) => ({
//   //     id: index + 1,
//   //     label: t,
//   //   })
//   // ),
//   // [MARINE_PARAM_TYPE.CHOICE.SUBSTATION_TYPE]: LOCAL_SUBSTATION_TYPE.map(
//   //   (t, index) => ({
//   //     id: index + 1,
//   //     label: t,
//   //   })
//   // ),

//   // [MARINE_PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY]:
//   //   VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS.map((pr, index) => ({
//   //     id: index + 1,
//   //     label: pr,
//   //   })),
//   [MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY]: [
//     { id: 1, label: "Local currency" },
//     { id: 2, label: "USD" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.DEVEX_PROFILE]: [
//     { id: 1, label: "EP1 - 1001 - Upsall Central (Hag Lane)" },
//     { id: 2, label: "EP5 - 1005 - Upsall North Dugdale (Mowbray)" },
//     { id: 3, label: "EA26 - 1326 - Connahs Quay" },
//     { id: 4, label: "EP11 - 1011 - Enderby to Patford" },
//     { id: 5, label: "EP16 - 1016 - Harker to Hutton " },
//     { id: 6, label: "EM9 - 1609 - Teesside" },
//     { id: 7, label: "EA29 - 1329 - Hawthorn Pit" },
//     { id: 8, label: "EP14 - 1014 - Cottam to Ryhall" },
//     { id: 9, label: "EP18 - 1018 - Grendon to Staythorpe (Kinoulton)" },
//     { id: 10, label: "EA1 - 1301 - Fleet (NatG)" },
//     { id: 11, label: "EA7 - 1307 - Hartmoor (Whangdon Farm)" },
//     { id: 12, label: "EA16 - 1316 - Bramley sub" },
//     { id: 13, label: "EA23 - 1323 - Gwyddelwern (Tyn Celyn)" },
//     { id: 14, label: "EM13 - 1613 - Medway Group" },
//     { id: 15, label: "EA24 - 1324 - Navenby" },
//     { id: 16, label: "EP13 - 1013 - Legacy to Ironbridge" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.SECURITY]: [
//     { id: 1, label: "Letter of credit" },
//     { id: 2, label: "Parent Company Guarnatee" },
//     { id: 3, label: "Bond" },
//     { id: 4, label: "Escrow account" },
//   ],
//   // [MARINE_PARAM_TYPE.CHOICE.PAYMENT_PROFILE]: PAYMENT_PROFILE_LIST.map(
//   //   (d, index) => ({
//   //     id: index + 1,
//   //     label: d,
//   //   })
//   // ),
//   [MARINE_PARAM_TYPE.CHOICE.CURRENCY]: [
//     { id: 1, label: "GBP" },
//     { id: 2, label: "EUR" },
//     { id: 3, label: "USD" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.UPSIDE]: [
//     { id: 1, label: "Upside value at P90" },
//     { id: 2, label: "Upside value at P50" },
//     { id: 3, label: "Upside value at P25" },
//     { id: 4, label: "Upside value at P10" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE]: [
//     { id: 1, label: "<132 kV" },
//     { id: 2, label: "132 kV" },
//     { id: 3, label: "275 kV" },
//     { id: 4, label: "400 kV" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.UPSIDE]: [
//     { id: 1, label: "Upside value at P90" },
//     { id: 2, label: "Upside value at P50" },
//     { id: 3, label: "Upside value at P25" },
//     { id: 4, label: "Upside value at P10" },
//   ],
//   // [MARINE_PARAM_TYPE.CHOICE.DNO]: REGION_LIST.map((r, index) => ({
//   //   id: index + 1,
//   //   label: r,
//   // })),
//   // [MARINE_PARAM_TYPE.CHOICE.STRATEGY]: STRATEGY_LIST.map((r, index) => ({
//   //   id: index + 1,
//   //   label: r,
//   // })),
//   // [MARINE_PARAM_TYPE.CHOICE.TECH]: [
//   //   { id: 1, label: "BESS" },
//   //   { id: 2, label: "Substation", disabled: true },
//   //   { id: 3, label: "Solar", disabled: true },
//   //   { id: 4, label: "Onshore wind", disabled: true },
//   //   { id: 5, label: "Offshore wind", disabled: true },
//   //   { id: 6, label: "Ev charging", disabled: true },
//   // ],
//   // [MARINE_PARAM_TYPE.CHOICE.REGION]: REGION_LIST.map((r, index) => ({
//   //   id: index + 1,
//   //   label: r,
//   // })),
//   [MARINE_PARAM_TYPE.CHOICE.FORECAST_PROVIDER]: [
//     { id: 1, label: "Modo" },
//     { id: 2, label: "Afry" },
//     { id: 3, label: "Baringa" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.STAGES]: [
//     { id: 1, label: 1 },
//     { id: 2, label: 2 },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.CARRY_BASIS]: [
//     { id: 1, label: "cashflows including capex" },
//     { id: 2, label: "cashflows excluding capex" },
//     { id: 3, label: "profit after tax" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.LAND_RENT_PAYMENT_TERMS]: [
//     { id: 1, label: "quarterly in advance" },
//     { id: 2, label: "annually in advance" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.LAND_RENT_BASIS]: [
//     { id: 1, label: "per acre" },
//     { id: 2, label: "per MW" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.ACRES]: [{ id: 1, label: 75 }],
//   [MARINE_PARAM_TYPE.CHOICE.DURATION]: [
//     { id: 1, label: 2 },
//     { id: 2, label: 4 },
//     { id: 3, label: 8 },
//   ],
//   // [MARINE_PARAM_TYPE.CHOICE.INFLATION]: INFLATION_LIST.map((i, index) => ({
//   //   id: index + 1,
//   //   label: i,
//   // })),
//   [MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION]: EMARINE_INFLATION_LIST.map(
//     (i, index) => ({
//       id: index + 1,
//       label: i,
//     })
//   ),

//   [MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE]: [
//     { id: 1, label: "Afry Q4 2023 wholesale - Central" },
//     { id: 2, label: "Afry Q4 2023 wholesale - High" },
//     { id: 3, label: "Afry Q4 2023 wholesale - Low" },
//     {
//       id: 4,
//       label: "Baringa 4h day-ahead market average received (Q4 2023 Real)",
//     },
//     { id: 5, label: "Baringa 4h day-ahead market average paid (Q4 2023 Real)" },
//     {
//       id: 6,
//       label:
//         "Baringa 4h day-ahead market average  received/paid (Q4 2023 Real)",
//     },
//     { id: 7, label: "Modo (20240606 central run)" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE]: [
//     { id: 1, label: "Cash sweep" },
//     { id: 2, label: "Bullet" },
//     { id: 3, label: "Amortisation" },
//   ],
//   [MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST]: [
//     { id: 1, label: "Stena + CLDN +IOMSP non-wholesale cost contract 1" },
//     { id: 2, label: "Stena + CLDN +IOMSP non-wholesale cost contract 2" },
//   ],
// };

// export const PARAM_UNIT = {
//   MW: {
//     id: "mw",
//     label: "MW",
//   },
//   DATE: {
//     id: "date",
//     label: "Date",
//   },
//   ACRES: {
//     id: "acres",
//     label: "Acres",
//   },
//   DAYS: {
//     id: "days",
//     label: "Days",
//   },
//   MONTH: {
//     id: "month",
//     label: "Month",
//   },
//   MONTHS: {
//     id: "months",
//     label: "Months",
//   },
//   QUARTERS: {
//     id: "quarters",
//     label: "Quarters",
//   },
//   YEAR: {
//     id: "year",
//     label: "Year",
//   },
//   YEARS: {
//     id: "years",
//     label: "Years",
//   },
//   HOUR: {
//     id: "hour",
//     label: "Hours",
//   },
//   NM_PER_CALL: {
//     id: "nm per call",
//     label: "nm per call",
//   },
//   MWH_PER_NM: {
//     id: "mwh per nm",
//     label: "MWH/nm",
//   },
//   MWH_PER_DAY: {
//     id: "mwh per day",
//     label: "MWH/day",
//   },
//   PERCENTAGE: {
//     id: "percentage",
//     label: "%",
//   },
//   PERCENTAGE_PA: {
//     id: "percentage_pa",
//     label: "% p.a",
//   },
//   MWH: {
//     id: "mwh",
//     label: "MWh",
//   },
//   GBP_PER_MWH: {
//     id: "gbp_per_mwh",
//     label: "£/MWh",
//   },
//   GBP_PER_KW_YEAR: {
//     id: "gbp_per_kwy",
//     label: "£/kW/year",
//   },
//   GBP_PER_KW: {
//     id: "gbp_per_kw",
//     label: "£/kW",
//   },
//   GBP_PRO_1000: {
//     id: "gbp_pro_1000",
//     label: "£'000",
//   },
//   GBP_PRO_1000_PER_YEAR: {
//     id: "gbp_pro_1000_per_year",
//     label: "£'000 p.a.",
//   },
//   GBP_PRO_1000_PER_MW: {
//     id: "gbp_pro_1000_per_mw",
//     label: "£'000/MW",
//   },
//   GBP_PRO_1000_PER_KM: {
//     id: "gbp_pro_1000_per_km",
//     label: "£'000/km",
//   },
//   GBP_PRO_1000_PER_KM_PER_HOUR: {
//     id: "gbp_pro_1000_per_mw_per_hour",
//     label: "£'000/MW/hour",
//   },
//   GBP_PER_HOUR: {
//     id: "gbp_per_hour",
//     label: "£/hour",
//   },
//   KM: {
//     id: "km",
//     label: "km",
//   },
//   KW_PER_HOUR: {
//     id: "kw_per_hour",
//     label: "kW/hr",
//   },
//   EUR: {
//     id: "eur",
//     label: "€",
//   },
//   GBP: {
//     id: "gbp",
//     label: "£",
//   },
//   USD: {
//     id: "usd",
//     label: "$",
//   },
//   GBP_PER_GBP: {
//     id: "gbp_per_gbp",
//     label: "£/£",
//   },
//   EUR_PER_GBP: {
//     id: "eur_per_gbp",
//     label: "€/£",
//   },
//   USD_PER_GBP: {
//     id: "usd_per_gbp",
//     label: "$/£",
//   },
// };

// export interface ICurrency {
//   id: "usd" | "eur" | "gbp";
//   unit: { id: string; label: string };
//   label: "USD" | "EUR" | "GBP";
// }

// export const CURRENCY_LIST: ICurrency[] = [
//   { id: "usd", unit: PARAM_UNIT.USD, label: "USD" },
//   { id: "eur", unit: PARAM_UNIT.EUR, label: "EUR" },
//   { id: "gbp", unit: PARAM_UNIT.GBP, label: "GBP" },
// ];

// export const defaultCurrency = CURRENCY_LIST[2];

// export interface ITABLE_PARAMETER {
//   title: string;
//   type: string;
//   unit: { id: string; label: string } | null;
//   stickyCols:
//     | {
//         type: string;
//         params: string[];
//         fn: any;
//       }
//     | undefined
//     | null;
//   stickyRows:
//     | {
//         type: string;
//         params: string[];
//         fn: any;
//       }
//     | undefined
//     | null;
// }

// export const MARINE_INPUT_PARAMS: IInputParameter[] = [
//   {
//     id: "basic_inputs",
//     title: "Basic Project Inputs",
//     datum: [],
//     children: [
//       {
//         id: "basic_info",
//         title: "Basic Information",
//         datum: [
//           {
//             id: "port_business",
//             title: "Port/Business",
//             type: MARINE_PARAM_TYPE.TEXT,
//           },
//           {
//             id: "terminal_name",
//             title: "Terminal name",
//             type: MARINE_PARAM_TYPE.TEXT,
//           },
//           {
//             id: "vertical_type",
//             title: "Type of vertical",
//             type: MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE,
//           },
//           {
//             id: "location_type",
//             title: "Location type",
//             type: MARINE_PARAM_TYPE.CHOICE.LOCATION_TYPE,
//           },
//           {
//             id: "entity",
//             title: "Entity",
//             type: MARINE_PARAM_TYPE.CHOICE.ENTITY,
//           },
//           {
//             id: "country",
//             title: "Country",
//             type: MARINE_PARAM_TYPE.TEXT,
//           },
//           {
//             id: "ownership_type",
//             title: "Ownership type",
//             type: MARINE_PARAM_TYPE.CHOICE.OWNERSHIP,
//             unit: PARAM_UNIT.MW,
//           },
//           {
//             id: "percentage_owned_by_natpower_marine",
//             title: "Percentage owned by NatPower Marine",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "plug_capacity",
//             title: "Plug capacity",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "plug_capacity",
//                 title: "Plug capacity",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.MW,
//               },
//             ],
//           },
//           {
//             id: "adoption_curve",
//             title: "Adoption curve year advance(delay)",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               // {
//               //   id: "no_cli_cold_iron_advance",
//               //   title:
//               //     "No specified client - Cold-ironing adoption curve year advance",
//               //   type: MARINE_PARAM_TYPE.INTEGER,
//               //   unit: PARAM_UNIT.YEAR,
//               // },
//               // {
//               //   id: "no_cli_propulsion_advance",
//               //   title:
//               //     "No specified client - Propulsion adoption curve year advance",
//               //   type: MARINE_PARAM_TYPE.INTEGER,
//               //   unit: PARAM_UNIT.YEARS,
//               // },
//               ...[...new Array(4).fill(0)]
//                 .map((_, index) => [
//                   {
//                     id: `cold_iron_advance_cli_${index + 1}`,
//                     title: `${
//                       index == 0 ? "No specified client" : `Client ${index + 1}`
//                     } - Cold-ironing adoption curve year advance(delay)`,
//                     type: MARINE_PARAM_TYPE.INTEGER,
//                     unit: PARAM_UNIT.YEARS,
//                   },
//                   {
//                     id: `propulsion_advance_cli_${index + 1}`,
//                     title: `${
//                       index == 0 ? "No specified client" : `Client ${index + 1}`
//                     } - Propulsion adoption curve year advance(delay)`,
//                     type: MARINE_PARAM_TYPE.INTEGER,
//                     unit: PARAM_UNIT.YEARS,
//                   },
//                 ])
//                 .flat(),
//             ],
//           },
//         ],
//       },
//       {
//         id: "project_timing",
//         title: "Project Timing",
//         datum: [
//           {
//             id: "phase_switch",
//             title: "Phase switch",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "number_of_phases",
//                 title: "Number of phases",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 required: "Must",
//                 maxValue: 3,
//               },
//             ],
//           },
//           ...[...new Array(3)].map((_, index) => ({
//             id:
//               // index == 0
//               // 	? "capex_forecast_scenario_data"
//               // 	: "capex_forecast_scenario_data1",
//               `phase_${index + 1}_dates`,
//             title: `Phase ${index + 1} dates`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["number_of_phases"],
//               },
//               fn: ({ number_of_phases }: { number_of_phases: number }) =>
//                 number_of_phases >= index + 1,
//             },
//             children: [
//               {
//                 id: `dev_start_date_${index + 1}`,
//                 title: `Development start date`,
//                 type: MARINE_PARAM_TYPE.DATE,
//                 required: "Must",
//               },
//               {
//                 id: `dev_length_${index + 1}`,
//                 title: `Length of development`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//                 required: "Must",
//                 maxValue: 24,
//               },
//               {
//                 id: `rtb_date_${index + 1}`,
//                 title: `RtB date`,
//                 type: MARINE_PARAM_TYPE.DATE,
//                 renderValue: {
//                   params: {
//                     local: [
//                       `dev_start_date_${index + 1}`,
//                       `dev_length_${index + 1}`,
//                       "number_of_phases",
//                     ],
//                     global: [],
//                   },
//                   fn: ({
//                     dev_start_date_1,
//                     dev_length_1,
//                     dev_start_date_2,
//                     dev_length_2,
//                     dev_start_date_3,
//                     dev_length_3,
//                   }: {
//                     dev_start_date_1: string;
//                     dev_length_1: number;
//                     dev_start_date_2: string;
//                     dev_length_2: number;
//                     dev_start_date_3: string;
//                     dev_length_3: number;
//                   }) => {
//                     return index + 1 == 1
//                       ? dev_start_date_1 && dev_length_1
//                         ? moment(dev_start_date_1)
//                             .add(dev_length_1, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 2
//                       ? dev_start_date_2 && dev_length_2
//                         ? moment(dev_start_date_2)
//                             .add(dev_length_2, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 3
//                       ? dev_start_date_3 && dev_length_3
//                         ? moment(dev_start_date_3)
//                             .add(dev_length_3, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : "";
//                   },
//                 },
//               },
//               {
//                 id: `rtb_to_cons_${index + 1}`,
//                 title: `Time between RtB and construction start`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//                 required: "Must",
//                 maxValue: 24,
//               },
//               {
//                 id: `const_date_${index + 1}`,
//                 title: `Construction start date`,
//                 type: MARINE_PARAM_TYPE.DATE,
//                 renderValue: {
//                   params: {
//                     local: [
//                       `dev_start_date_${index + 1}`,
//                       `rtb_to_cons_${index + 1}`,
//                       `dev_length_${index + 1}`,
//                       "number_of_phases",
//                     ],
//                     global: [],
//                   },
//                   fn: ({
//                     dev_start_date_1,
//                     dev_length_1,
//                     dev_start_date_2,
//                     dev_length_2,
//                     dev_start_date_3,
//                     dev_length_3,
//                     rtb_to_cons_1 = 0,
//                     rtb_to_cons_2 = 0,
//                     rtb_to_cons_3 = 0,
//                   }: {
//                     dev_start_date_1: string;
//                     dev_length_1: number;
//                     dev_start_date_2: string;
//                     dev_length_2: number;
//                     dev_start_date_3: string;
//                     dev_length_3: number;
//                     rtb_to_cons_1: number;
//                     rtb_to_cons_2: number;
//                     rtb_to_cons_3: number;
//                   }) => {
//                     return index + 1 == 1
//                       ? dev_start_date_1 && dev_length_1
//                         ? moment(dev_start_date_1)
//                             .add(dev_length_1 * 1 + rtb_to_cons_1 * 1, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 2
//                       ? dev_start_date_2 && dev_length_2
//                         ? moment(dev_start_date_2)
//                             .add(dev_length_2 * 1 + rtb_to_cons_2 * 1, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 3
//                       ? dev_start_date_3 && dev_length_3
//                         ? moment(dev_start_date_3)
//                             .add(dev_length_3 * 1 + rtb_to_cons_3 * 1, "month")
//                             .format(DATE_FORMAT)
//                         : ""
//                       : "";
//                   },
//                 },
//               },
//               {
//                 id: `cons_length_${index + 1}`,
//                 title: `Length of construction`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//                 required: "Must",
//                 maxValue: 24,
//               },
//               {
//                 id: `operation_start_${index + 1}`,
//                 title: `${
//                   index == 0
//                     ? "COD and operating"
//                     : `Phasse ${index + 1} - Operation`
//                 } start date`,
//                 type: MARINE_PARAM_TYPE.DATE,
//                 renderValue: {
//                   params: {
//                     local: [
//                       `dev_start_date_${index + 1}`,
//                       `rtb_to_cons_${index + 1}`,
//                       `dev_length_${index + 1}`,
//                       "number_of_phases",
//                       `cons_length_${index + 1}`,
//                     ],
//                     global: [],
//                   },
//                   fn: ({
//                     dev_start_date_1,
//                     dev_length_1,
//                     dev_start_date_2,
//                     dev_length_2,
//                     dev_start_date_3,
//                     dev_length_3,
//                     rtb_to_cons_1 = 0,
//                     rtb_to_cons_2 = 0,
//                     rtb_to_cons_3 = 0,
//                     cons_length_1 = 0,
//                     cons_length_2 = 0,
//                     cons_length_3 = 0,
//                   }: {
//                     dev_start_date_1: string;
//                     dev_length_1: number;
//                     dev_start_date_2: string;
//                     dev_length_2: number;
//                     dev_start_date_3: string;
//                     dev_length_3: number;
//                     rtb_to_cons_1: number;
//                     rtb_to_cons_2: number;
//                     rtb_to_cons_3: number;
//                     cons_length_1: number;
//                     cons_length_2: number;
//                     cons_length_3: number;
//                   }) => {
//                     return index + 1 == 1
//                       ? dev_start_date_1 && dev_length_1
//                         ? moment(dev_start_date_1)
//                             .add(
//                               dev_length_1 * 1 +
//                                 rtb_to_cons_1 * 1 +
//                                 cons_length_1 * 1,
//                               "month"
//                             )
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 2
//                       ? dev_start_date_2 && dev_length_2
//                         ? moment(dev_start_date_2)
//                             .add(
//                               dev_length_2 * 1 +
//                                 rtb_to_cons_2 * 1 +
//                                 cons_length_2 * 1,
//                               "month"
//                             )
//                             .format(DATE_FORMAT)
//                         : ""
//                       : index + 1 == 3
//                       ? dev_start_date_3 && dev_length_3
//                         ? moment(dev_start_date_3)
//                             .add(
//                               dev_length_3 * 1 +
//                                 rtb_to_cons_3 * 1 +
//                                 cons_length_3 * 1,
//                               "month"
//                             )
//                             .format(DATE_FORMAT)
//                         : ""
//                       : "";
//                   },
//                 },
//               },
//             ],
//           })),
//           {
//             id: "asset_life",
//             title: "End of asset life",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "end_of_operations",
//                 title: "End of operations",
//                 type: MARINE_PARAM_TYPE.DATE,
//                 required: "Must",
//               },
//               {
//                 id: "length_of_decommissioning",
//                 title: "Length of decommissioning",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//                 required: "Must",
//               },
//               {
//                 id: "end_of_decommissioning",
//                 title: "End of decommissioning",
//                 type: MARINE_PARAM_TYPE.DATE,
//                 renderValue: {
//                   params: {
//                     local: ["end_of_operations", "length_of_decommissioning"],
//                     global: [],
//                   },
//                   fn: ({
//                     end_of_operations,
//                     length_of_decommissioning,
//                   }: {
//                     end_of_operations: string;
//                     length_of_decommissioning: number;
//                   }) => {
//                     return end_of_operations && length_of_decommissioning
//                       ? moment(end_of_operations)
//                           .add(length_of_decommissioning, "months")
//                           .endOf("month")
//                           .format(DATE_FORMAT)
//                       : "";
//                   },
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "volume_sold_revenue",
//     title: "Volume sold & Revenue",
//     datum: [],
//     children: [
//       {
//         id: "setup",
//         title: "Setup",
//         datum: [
//           {
//             id: "client_contract",
//             title: "Specify client contract",
//             type: MARINE_PARAM_TYPE.CHOICE.SPECIFY_CLIENT,
//           },
//           {
//             id: "pricing_strategy",
//             title: "Pricing strategy",
//             type: MARINE_PARAM_TYPE.CHOICE.PRICING_STRATEGY,
//           },
//           {
//             id: "inflation_index",
//             title: "Inflation index",
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: "base_year",
//             title: "Base year",
//             type: MARINE_PARAM_TYPE.YEAR,
//           },
//           {
//             id: "currency_choice",
//             title: "Currency choice",
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
//           },
//           {
//             id: "costs_switch_for_tracking",
//             title: "Costs to be included in tracking energy costs",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "electricity_standing_charge",
//                 title: "Electricity standing charge (location specific)",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "parasitic_load",
//                 title: "Parasitic load",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "intercompany_costs",
//                 title: "Intercompany costs",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "stevedore",
//                 title: "Stevedore",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "fixed_concession_fee",
//                 title: "Concession fee (fixed)",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "metering",
//                 title: "Metering",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "o_m",
//                 title: "O&M cost",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "asset_management_cost",
//                 title: "Asset management cost",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "insurance",
//                 title: "Insurance",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "extended_warranty",
//                 title: "Extended warranty",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "easement_costs",
//                 title: "Easement costs",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "legal_costs",
//                 title: "Legal costs (not capitalised)",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "land_rent",
//                 title: "Land rent",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "community_benefit",
//                 title: "Community benefit",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "water_rates",
//                 title: "Water rates",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "business_rates",
//                 title: "Business rates",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "site_security",
//                 title: "Site security",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "other_admin_costs",
//                 title: "Other administrative costs",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "service_charge",
//                 title: "Service charge",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "uos_charge",
//                 title: "UOS charge to port (if permanent)",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//               {
//                 id: "server_rent",
//                 title: "Server rent",
//                 type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               },
//             ],
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["pricing_strategy"],
//               },
//               fn: ({ pricing_strategy }: { pricing_strategy: number }) =>
//                 pricing_strategy == 2,
//             },
//           },
//           {
//             id: "wholesale_market_price",
//             title: "Wholesale market price",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "ws_market_curve_profile",
//                 title: "Wholesale market price curve",
//                 type: MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE,
//               },
//               {
//                 id: "ws_market_curve_data",
//                 title: "Wholesale market curve",
//                 type: MARINE_PARAM_TYPE.TABLE,
//                 stickyCols: {
//                   type: "function",
//                   params: [],
//                   fn: () =>
//                     CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.WS_MARKET_CURVE].map(
//                       (c) => c?.label
//                     ),
//                 },
//                 stickyRows: {
//                   type: "function",
//                   params: [],
//                   fn: () => {
//                     const result = [];
//                     result.push([""]);
//                     for (
//                       let i = MODEL_START_YEAR;
//                       i < INFLATION_END_YEAR + 1;
//                       i++
//                     ) {
//                       result.push([i]);
//                     }
//                     return result;
//                   },
//                 },
//               },
//               {
//                 id: "ws_market_curve_currency",
//                 title: "Currency",
//                 type: MARINE_PARAM_TYPE.CHOICE.CURRENCY,
//               },
//               {
//                 id: "ws_market_curve_inflation_profile",
//                 title: "Inflation index",
//                 type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//               },
//               {
//                 id: "ws_market_curve_inflation_base_year",
//                 title: "Inflation base year",
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: PARAM_UNIT.YEAR,
//               },
//             ],
//           },
//           {
//             id: "power_price",
//             title: "Power price",
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: "fixed_contract_1",
//                 title: "Fixed term supply contract 1",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "fixed_start_1",
//                     title: "Start date of the first rolling contract",
//                     type: MARINE_PARAM_TYPE.DATE,
//                   },
//                   {
//                     id: "duration_fixed_contract_1",
//                     title: "Duration of the rolling contract in months",
//                     type: MARINE_PARAM_TYPE.INTEGER,
//                     unit: PARAM_UNIT.MONTHS,
//                   },
//                   {
//                     id: "fixed_end_1",
//                     title: "First contract end date",
//                     type: MARINE_PARAM_TYPE.DATE,
//                     renderValue: {
//                       params: {
//                         local: ["fixed_start_1", "duration_fixed_contract_1"],
//                         global: [],
//                       },
//                       fn: ({
//                         fixed_start_1,
//                         duration_fixed_contract_1,
//                       }: {
//                         fixed_start_1: string;
//                         duration_fixed_contract_1: number;
//                       }) => {
//                         return fixed_start_1 && duration_fixed_contract_1
//                           ? moment(fixed_start_1)
//                               .add(duration_fixed_contract_1, "months")
//                               .endOf("month")
//                               .format(DATE_FORMAT)
//                           : "";
//                       },
//                     },
//                   },
//                   {
//                     id: "non_wholesale_cost_1",
//                     title: "Non-wholesale cost profile",
//                     type: MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST,
//                   },
//                   {
//                     id: "inflation_profile_1",
//                     title: "Inflation choice",
//                     type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//                   },
//                   {
//                     id: "inflation_base_year_1",
//                     title: "Inflation base year",
//                     type: MARINE_PARAM_TYPE.YEAR,
//                     unit: PARAM_UNIT.YEAR,
//                   },
//                   {
//                     id: "uplift_cost_charged_by_port_1",
//                     title:
//                       "Uplift on cost charged by port(wholesale & non-wholesale)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                   },
//                   {
//                     id: "initial_wholesale_price_1",
//                     title: "Wholesale market price at initial contract date",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "initial_contracted_buy_in_price_1",
//                     title: "Initial contracted buy-in price",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "initial_cold_ironing_price_1",
//                     title:
//                       "Initial sell-out price(cold-ironing) - no client contract specified",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },

//                   {
//                     id: "initial_propulsion_price_1",
//                     title:
//                       "Initial sell-out price(propulsion) - no client contract specified",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                 ],
//               },
//               {
//                 id: "fixed_contract_2",
//                 title: "Fixed term supply contract 2",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "fixed_start_2",
//                     title: "Start date of the first rolling contract",
//                     type: MARINE_PARAM_TYPE.DATE,
//                   },
//                   {
//                     id: "duration_fixed_contract_2",
//                     title: "Duration of the rolling contract in months",
//                     type: MARINE_PARAM_TYPE.INTEGER,
//                     unit: PARAM_UNIT.MONTHS,
//                   },
//                   {
//                     id: "fixed_end_2",
//                     title: "First contract end date",
//                     type: MARINE_PARAM_TYPE.DATE,
//                     renderValue: {
//                       params: {
//                         local: ["fixed_start_2", "duration_fixed_contract_2"],
//                         global: [],
//                       },
//                       fn: ({
//                         fixed_start_2,
//                         duration_fixed_contract_2,
//                       }: {
//                         fixed_start_2: string;
//                         duration_fixed_contract_2: number;
//                       }) => {
//                         return fixed_start_2 && duration_fixed_contract_2
//                           ? moment(fixed_start_2)
//                               .add(duration_fixed_contract_2, "months")
//                               .endOf("month")
//                               .format(DATE_FORMAT)
//                           : "";
//                       },
//                     },
//                   },
//                   {
//                     id: "non_wholesale_cost_2",
//                     title: "Non-wholesale cost",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "inflation_profile_2",
//                     title: "Inflation choice",
//                     type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//                   },
//                   {
//                     id: "inflation_base_year_2",
//                     title: "Inflation base year",
//                     type: MARINE_PARAM_TYPE.YEAR,
//                     unit: PARAM_UNIT.YEAR,
//                   },
//                   {
//                     id: "non_wholesale_market",
//                     title: "Non wholesale market element",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "uplift_cost_charged_by_port_2",
//                     title: "Uplift on cost cost for fix term supply contract",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                   },
//                   {
//                     id: "initial_wholesale_price_2",
//                     title: "Wholesale market price at initial contract date",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "initial_contracted_buy_in_price_2",
//                     title: "Initial contracted buy-in price",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                   {
//                     id: "initial_cold_ironing_price_2",
//                     title:
//                       "Initial sell-out price(cold-ironing) - no client contract specified",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },

//                   {
//                     id: "initial_propulsion_price_2",
//                     title:
//                       "Initial sell-out price(propulsion) - no client contract specified",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PER_MWH,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: "non_wholesale_cost_data",
//             title: "Non-wholesale cost profile data",
//             type: MARINE_PARAM_TYPE.TABLE,
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.NON_WHOLESALE_COST].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push([""]);
//                 for (
//                   let i = MODEL_START_YEAR;
//                   i < INFLATION_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//         ],
//       },
//       {
//         id: "no_client",
//         title: "No client specified",
//         datum: [],
//         children: [
//           {
//             id: "volume_sold",
//             title: "Volume sold",
//             datum: [
//               {
//                 id: "calls_phase_1",
//                 title: "Number of calls at plug per year - phase 1",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 minValue: 0,
//               },
//               {
//                 id: "calls_phase_2",
//                 title: "Number of calls at plug per year - phase 2",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 minValue: 0,
//               },
//               {
//                 id: "calls_phase_3",
//                 title: "Number of calls at plug per year - phase 3",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 minValue: 0,
//               },
//               {
//                 id: "vertical_seasonality_profile",
//                 title: "Vertical seasonality profile",
//                 type: MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE,
//                 minValue: 0,
//               },
//               {
//                 id: "adoption_curve",
//                 title: "Adoption curve",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "cold_ironing_adoption_curve",
//                     title: "Adoptive curve - cold-ironing",
//                     type: MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE,
//                   },
//                   {
//                     id: "propulsion_adoption_curve",
//                     title: "Adoptive curve - propulsion",
//                     type: MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE,
//                   },
//                 ],
//               },
//               {
//                 id: "growth_factors",
//                 title: "Growth factor",
//                 type: MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS,
//               },
//               {
//                 id: "market_share_curve",
//                 title: "Market share curve",
//                 type: MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE,
//               },
//             ],
//           },
//           {
//             id: "utilisation",
//             title: "Utilisation",
//             datum: [
//               {
//                 id: "cold_ironing_utilisation",
//                 title: "Cold-ironing utilisation",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "no_cli_cold_ironing_power_during_dwell",
//                     title:
//                       "Cold-ironing power usage during dwell time(for a single vertical)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.MW,
//                   },
//                   {
//                     id: "no_cli_dwell_time_per_stay",
//                     title: "Dwell time per stay",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.HOUR,
//                     minValue: 0,
//                   },
//                   {
//                     id: "no_cli_handling_time_per_stay",
//                     title: "Handling time per stay",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.HOUR,
//                     minValue: 0,
//                   },
//                 ],
//               },
//               {
//                 id: "propulstion_utilisation",
//                 title: "Propulsion utilisation",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "vertical_type",
//                     title: "Type of vertical",
//                     type: MARINE_PARAM_TYPE.TEXT,
//                     renderValue: {
//                       params: {
//                         local: [],
//                         global: ["vertical_type"],
//                       },
//                       fn: ({
//                         vertical_type = 0,
//                       }: {
//                         vertical_type: number;
//                       }) => {
//                         return vertical_type
//                           ? `${
//                               CHOICE_DATA[
//                                 MARINE_PARAM_TYPE.CHOICE.VERTICAL_TYPE
//                               ][vertical_type - 1].label
//                             }`
//                           : "Not selected";
//                       },
//                     },
//                   },
//                   {
//                     id: "fl_nautical_miles_requirement",
//                     title:
//                       "First and last nautical miles requirement on electric power per vessel",
//                     type: MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST,
//                   },
//                   {
//                     id: "energy_comsumption_per_nm",
//                     title: "Energy consumption per nm",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.MWH_PER_NM,
//                   },
//                   {
//                     id: "energy_consumption_per_plug",
//                     title: "Service tug - energy consumption per plug",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.MWH_PER_NM,
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "forecast_data",
//         title: "Forecast data",
//         datum: [
//           {
//             id: "seasonality_profile_data",
//             title: "Vertical seasonality profile",
//             type: MARINE_PARAM_TYPE.TABLE,
//             valueRange: "percentage",
//             minValue: 0,
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 CHOICE_DATA[
//                   MARINE_PARAM_TYPE.CHOICE.VERTICAL_SEASONALITY_PROFILE
//                 ].map((c) => c?.label),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push([""]);
//                 for (let i = 0; i < 12; i++) {
//                   result.push([
//                     CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MONTH_NAME][i].label
//                       .toString()
//                       .slice(0, 3),
//                   ]);
//                 }
//                 return result;
//               },
//             },
//           },
//           {
//             id: "adoption_curve_data",
//             title: "Adoption curve data",
//             type: MARINE_PARAM_TYPE.TABLE,
//             valueRange: "percentage",
//             minValue: 0,
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.ADOPTION_CURVE].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push([""]);
//                 for (
//                   let i = EMARINE_MODEL_START_YEAR;
//                   i < EMARINE_MODEL_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//           {
//             id: "growth_factors_data",
//             title: "Growth factors data",
//             type: MARINE_PARAM_TYPE.TABLE,
//             minValue: 0,
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.GROWTH_FACTORS].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push([""]);
//                 for (
//                   let i = EMARINE_MODEL_START_YEAR;
//                   i < EMARINE_MODEL_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//           {
//             id: "market_share_data",
//             title: "Market share data",
//             type: MARINE_PARAM_TYPE.TABLE,
//             minValue: 0,
//             valueRange: "percentage",
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MARKET_SHARE_CURVE].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push([""]);
//                 for (
//                   let i = EMARINE_MODEL_START_YEAR;
//                   i < EMARINE_MODEL_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//           {
//             id: "nautical_miles_requirement_data",
//             title:
//               "Propulsion - first and last nautical milies requirement on electric power per vessel",
//             type: MARINE_PARAM_TYPE.TABLE,
//             stickyCols: {
//               type: "function",
//               params: [""],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.PROPULSION_NM_LIST].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push("");
//                 for (
//                   let i = INFLATION_START_YEAR;
//                   i < INFLATION_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//         ],
//       },

//       {
//         id: "intercompany",
//         title: "Intercompany",
//         datum: [],
//         children: [
//           {
//             id: "revenue",
//             title: "Intercompany revenue",
//             datum: [
//               ...[...new Array(3).fill(0)].map((_, idx) => ({
//                 id: `annual_revenue_${idx + 1}`,
//                 title: `Annual revenue - phase${idx + 1}`,
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               })),
//               {
//                 id: "target_pre_tax_unlevered_irr",
//                 title: "Target pre-tax unlevered IRR",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               {
//                 id: "target_gross_margin",
//                 title: "Target gross margin",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               {
//                 id: "gross_margin",
//                 title: "Gross margin - live",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               {
//                 id: "inflation_profile",
//                 title: "Inflation index",
//                 type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//               },
//               {
//                 id: "inflation_base_year",
//                 title: "Base year",
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: PARAM_UNIT.YEAR,
//               },
//             ],
//           },
//           {
//             id: "cost",
//             title: "Intercompany cost",
//             datum: [
//               {
//                 id: "exc_bess",
//                 title: "Annual cost excluding BESS",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   ...[...new Array(3).fill(0)].map((_, idx) => ({
//                     id: `cost_exc_bess_${idx + 1}`,
//                     title: `Phase ${idx + 1}`,
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PRO_1000,
//                   })),
//                 ],
//               },
//               {
//                 id: "bess",
//                 title: "Annual cost BESS",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "bess_oper_end",
//                     title: "End of operations for BESS",
//                     type: MARINE_PARAM_TYPE.DATE,
//                   },
//                   ...[...new Array(3).fill(0)].map((_, idx) => ({
//                     id: `cost_bess_${idx + 1}`,
//                     title: `Phase ${idx + 1}`,
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.GBP_PRO_1000,
//                   })),
//                 ],
//               },
//               {
//                 id: "inflation_profile",
//                 title: "Inflation index",
//                 type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//               },
//               {
//                 id: "inflation_base_year",
//                 title: "Inflation base year",
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: MARINE_PARAM_TYPE.YEAR,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "costs",
//     title: "Costs",
//     datum: [],
//     children: [
//       {
//         id: "parasitic_load",
//         title: "Parasitic load",
//         datum: [
//           ...[...new Array(3)].map((_, index) => ({
//             id: `phase_${index + 1}`,
//             title: `Parasitic load as% of power purchase cost - phase ${
//               index + 1
//             }`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           })),
//         ],
//       },
//       {
//         id: "variable_concession_fee",
//         title: "Concession fee - variable",
//         datum: [
//           {
//             id: "fee_percentage_revenue",
//             title: "Fee to Port as a % of revenue",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "fee_percentage_energy_cost",
//             title: "Fee to Port as a % of energy cost",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//         ],
//       },
//       {
//         id: "one_off_concession_fee",
//         title: "One-off concession fee",
//         datum: [
//           {
//             id: "number_of_cost_line",
//             title: "Number of cost line",
//             type: MARINE_PARAM_TYPE.INTEGER,
//             minValue: 0,
//             maxValue: 10,
//           },
//           {
//             id: "cost_line_alert",
//             title: "Cost line alert",
//             type: MARINE_PARAM_TYPE.TEXT,
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["number_of_cost_line"],
//               },
//               fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
//                 !number_of_cost_line || number_of_cost_line == 0,
//             },
//             renderValue: {
//               params: {
//                 local: ["number_of_cost_line"],
//                 global: [],
//               },
//               fn: ({
//                 number_of_cost_line,
//               }: {
//                 number_of_cost_line: number;
//               }) => {
//                 return number_of_cost_line && number_of_cost_line != 0
//                   ? "OK"
//                   : "Cost lines not provided";
//               },
//             },
//           },
//           ...[...new Array(10)].map((_, index) => ({
//             id: `cost_line_${index + 1}`,
//             title: `Cost line ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `name_${index + 1}`,
//                 title: `One off concession fee ${index + 1}`,
//                 type: MARINE_PARAM_TYPE.TEXT,
//               },
//               {
//                 id: `cost_${index + 1}`,
//                 title: `Cost`,
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//               {
//                 id: `date_incurred_${index + 1}`,
//                 title: `Period incurred`,
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//               {
//                 id: `inflation_${index + 1}`,
//                 title: `Inflation index`,
//                 type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//               },
//               {
//                 id: `inflation_year_${index + 1}`,
//                 title: `Inflation base year`,
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: PARAM_UNIT.YEAR,
//               },
//             ],
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["number_of_cost_line"],
//               },
//               fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
//                 index < number_of_cost_line,
//             },
//           })),
//         ],
//       },
//       {
//         id: "annual_concession_fee",
//         title: "Annual concession fee",
//         datum: [
//           {
//             id: "number_of_cost_line",
//             title: "Number of cost line",
//             type: MARINE_PARAM_TYPE.INTEGER,
//             minValue: 0,
//             maxValue: 3,
//           },
//           {
//             id: "profile_data",
//             title: "Annual concession fee profile data(%)",
//             type: MARINE_PARAM_TYPE.TABLE,
//             stickyCols: {
//               type: "function",
//               params: [""],
//               fn: () =>
//                 CHOICE_DATA[
//                   MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE
//                 ].map((c) => c?.label),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push("");
//                 for (
//                   let i = INFLATION_START_YEAR;
//                   i < INFLATION_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//           },
//           {
//             id: "cost_line_alert",
//             title: "Cost line alert",
//             type: MARINE_PARAM_TYPE.TEXT,
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["number_of_cost_line"],
//               },
//               fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
//                 !number_of_cost_line || number_of_cost_line == 0,
//             },
//             renderValue: {
//               params: {
//                 local: ["number_of_cost_line"],
//                 global: [],
//               },
//               fn: ({
//                 number_of_cost_line,
//               }: {
//                 number_of_cost_line: number;
//               }) => {
//                 return number_of_cost_line && number_of_cost_line != 0
//                   ? "OK"
//                   : "Cost lines not provided";
//               },
//             },
//           },
//           ...[...new Array(3)].map((_, index) => ({
//             id: `cost_line_${index + 1}`,
//             title: `Cost line ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `profile_${index + 1}`,
//                 title: `Annual concession cost ${index + 1}`,
//                 type: MARINE_PARAM_TYPE.CHOICE.ANNUAL_CONCESSION_FEE_PROFIILE,
//               },
//               {
//                 id: `payment_month_${index + 1}`,
//                 title: `Month of payment`,
//                 type: MARINE_PARAM_TYPE.CHOICE.MONTH_NAME,
//               },
//               {
//                 id: `inflation_${index + 1}`,
//                 title: `Inflation index`,
//                 type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//               },
//               {
//                 id: `inflation_year_${index + 1}`,
//                 title: `Inflation base year`,
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: PARAM_UNIT.YEAR,
//               },
//               // {
//               //   id: `currency_${index + 1}`,
//               //   title: `Currency`,
//               //   type: MARINE_PARAM_TYPE.CHOICE.CURRENCY,
//               //   unit: PARAM_UNIT.YEAR,
//               // },
//             ],
//             isShow: {
//               params: {
//                 global: [],
//                 local: ["number_of_cost_line"],
//               },
//               fn: ({ number_of_cost_line }: { number_of_cost_line: number }) =>
//                 index < number_of_cost_line,
//             },
//           })),
//         ],
//       },
//       {
//         id: "stevedore",
//         title: "Stevedore",
//         datum: [
//           {
//             id: "cost_method",
//             title: "Cost method",
//             type: MARINE_PARAM_TYPE.CHOICE.STEVEDORE_COST_METHOD,
//           },
//           {
//             id: "hourly_rate",
//             title: "Hourly rate",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PER_HOUR,
//           },
//           ...[...new Array(3)].map((_, index) => ({
//             id: `cost_${index + 1}`,
//             title: `Annual stevedore cost phase ${index + 1}`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           })),
//           {
//             id: `inflation_profile`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_base_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "fixed_concession",
//         title: "Concession annual fee(fixed)",
//         datum: [
//           {
//             id: `fee`,
//             title: `Concession annual fee(fixed)`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "metering",
//         title: "Metering",
//         datum: [
//           {
//             id: `fee`,
//             title: `Metering`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "o_m_cost",
//         title: "O&M cost",
//         datum: [
//           {
//             id: `fee`,
//             title: `O&M cost`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "asset_management",
//         title: "Asset management cost",
//         datum: [
//           {
//             id: `fee`,
//             title: `Asset management`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "insurance",
//         title: "Insurance",
//         datum: [
//           {
//             id: `fee`,
//             title: `Insurance`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "community_benefit",
//         title: "Community benefit",
//         datum: [
//           {
//             id: `fee`,
//             title: `Community benefit`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "water_rates",
//         title: "Water rates",
//         datum: [
//           {
//             id: `fee`,
//             title: `Water rates`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "business_rates",
//         title: "Business rates",
//         datum: [
//           {
//             id: `fee`,
//             title: `Business rates`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "extended_warranty",
//         title: "Extended warranty",
//         datum: [
//           {
//             id: `fee`,
//             title: `Extended warranty`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "site_security",
//         title: "Site security",
//         datum: [
//           {
//             id: `fee`,
//             title: `Site security`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "easement_costs",
//         title: "Easement costs",
//         datum: [
//           {
//             id: `fee`,
//             title: `Easement costs`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "legal_costs",
//         title: "Legal costs(not capitalised)",
//         datum: [
//           {
//             id: `fee`,
//             title: `Legal costs(not capitalised)`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "other_admin_costs",
//         title: "Other administrative costs",
//         datum: [
//           {
//             id: `fee`,
//             title: `Other administrative costs`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "service_charge",
//         title: "Service charge",
//         datum: [
//           {
//             id: `fee`,
//             title: `Service charge`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "land_rent",
//         title: "Land rent",
//         datum: [
//           {
//             id: `fee`,
//             title: `Land rent`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "uos_charge_to_port",
//         title: "UOS charge to port(if permanent)",
//         datum: [
//           {
//             id: `fee`,
//             title: `UOS charge to port(if permanent)`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "server_rent",
//         title: "Server rent",
//         datum: [
//           {
//             id: `fee`,
//             title: `Server rent`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "electricity_standing_charge",
//         title: "Electricity standing charge(location specific)",
//         datum: [
//           {
//             id: `annual_costs`,
//             title: `Annual costs per plug`,
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000_PER_YEAR,
//           },
//           {
//             id: `inflation_profile`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.INFLATION,
//           },
//           {
//             id: `inflation_base_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "devex",
//     title: "Devex",
//     datum: [
//       {
//         id: "switch",
//         title: "Devex switch",
//         type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//       },
//       ...[...new Array(3)].map((_, index) => ({
//         id: `phase_${index + 1}`,
//         title: `Phase ${index + 1}`,
//         type: MARINE_PARAM_TYPE.GROUP,
//         children: [
//           {
//             id: `profile_${index + 1}`,
//             title: `Devex profile`,
//             type: MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE,
//           },
//           {
//             id: `inflation_profile_${index + 1}`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//           },
//           {
//             id: `inflation_base_year_${index + 1}`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       })),
//       {
//         id: "devex_profile_data",
//         title: "Devex profile data",
//         type: MARINE_PARAM_TYPE.TABLE,
//         stickyCols: {
//           type: "function",
//           params: [],
//           fn: () =>
//             CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE].map(
//               (c) => c?.label
//             ),
//         },
//         stickyRows: {
//           type: "function",
//           params: [],
//           fn: () => {
//             const result = [];
//             result.push("");
//             for (let i = 0; i < 24; i++) {
//               result.push([`Month ${i + 1}`]);
//             }
//             return result;
//           },
//         },
//       },
//     ],
//     children: [],
//   },
//   {
//     id: "capex",
//     title: "Capex",
//     datum: [
//       // ...[...new Array(3)].map((_, index) => ({
//       //   id: `phase_${index + 1}`,
//       //   title: `Phase ${index + 1}`,
//       //   type: MARINE_PARAM_TYPE.GROUP,
//       //   children: [
//       //     {
//       //       id: `profile_${index + 1}`,
//       //       title: `Devex profile`,
//       //       type: MARINE_PARAM_TYPE.CHOICE.MARINE_DEVEX_PROFILE,
//       //     },
//       //     {
//       //       id: `inflation_profile_${index + 1}`,
//       //       title: `Inflation index`,
//       //       type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//       //     },
//       //     {
//       //       id: `inflation_base_year_${index + 1}`,
//       //       title: `Inflation base year`,
//       //       type: MARINE_PARAM_TYPE.YEAR,
//       //       unit: PARAM_UNIT.YEAR,
//       //     },
//       //   ],
//       // })),
//     ],
//     children: [
//       {
//         id: "setup",
//         title: "Setup",
//         datum: [
//           {
//             id: "currency_choice",
//             title: "Currency choice",
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_CURRENCY,
//           },
//           {
//             id: "recycle_percentage",
//             title: "Percentage of capex recovered from sale of fixed assets",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//         ],
//       },
//       {
//         id: "one_off_capex",
//         title: `One-off Capex(don't require replacement)`,
//         datum: [
//           ...[...ONE_OFF_CAPEX_ITEM_LIST].map((item, index) => ({
//             id: `item_${index + 1}`,
//             title: `Item ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `item_${index + 1}`,
//                 title: `Item name`,
//                 type: MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM,
//                 // renderValue: {
//                 //   params: {
//                 //     global: [],
//                 //     local: [],
//                 //   },
//                 //   fn: () => item,
//                 // },
//               },
//               {
//                 id: `phase_incurred_${index + 1}`,
//                 title: "Phase incurred",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 minValue: 1,
//                 maxValue: 3,
//               },
//               {
//                 id: `cost_${index + 1}`,
//                 title: "Item cost",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//             ],
//           })),
//           ...[...new Array(3)].map((_, index) => ({
//             id: `phase_${index + 1}`,
//             title: `Phase ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               // {
//               //   id: `cost_sum_${index + 1}`,
//               //   title:'Cost summary',
//               //   type:MARINE_PARAM_TYPE.NUMBER,
//               //   unit:PARAM_UNIT.GBP_PRO_1000
//               // },
//               {
//                 id: `payment_profile_${index + 1}`,
//                 title: "Payment profile",
//                 type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
//                 // unit:PARAM_UNIT.GBP_PRO_1000
//               },
//               {
//                 id: `inflation_profile_${index + 1}`,
//                 title: "Inflation index",
//                 type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//               },
//               {
//                 id: `inflation_base_year_${index + 1}`,
//                 title: "Inflation base year",
//                 type: MARINE_PARAM_TYPE.YEAR,
//                 unit: PARAM_UNIT.YEAR,
//               },
//             ],
//           })),
//           {
//             id: "capex_item_list",
//             title: "One-off capex item list",
//             type: MARINE_PARAM_TYPE.CHOICE.ONE_OFF_CAPEX_ITEM,
//           },
//         ],
//       },
//       {
//         id: `phase_1_capex`,
//         title: "Phase 1 Capex",
//         datum: [
//           ...[...PHASE_ONE_CAPEX].map((comp, index) => ({
//             id: `component_${index + 1}`,
//             title: `Component ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `profile_${index + 1}`,
//                 title: `Component name`,
//                 type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
//               },
//               {
//                 id: `cost_${index + 1}`,
//                 title: `Capex size`,
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//               {
//                 id: `uel_${index + 1}`,
//                 title: `Useful economic life (UEL)`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.YEARS,
//               },
//             ],
//           })),
//           {
//             id: `inflation_profile`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//           },
//           {
//             id: `inflation_base_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: `phase_2_capex`,
//         title: "Phase 2 Capex",
//         datum: [
//           ...[...PHASE_TWO_CAPEX].map((comp, index) => ({
//             id: `component_${index + 1}`,
//             title: `Component ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `profile_${index + 1}`,
//                 title: `Component name`,
//                 type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
//               },
//               {
//                 id: `cost_${index + 1}`,
//                 title: `Capex size`,
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//               {
//                 id: `uel_${index + 1}`,
//                 title: `Useful economic life (UEL)`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.YEARS,
//               },
//             ],
//           })),
//           {
//             id: `inflation_profile`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//           },
//           {
//             id: `inflation_base_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: `phase_3_capex`,
//         title: "Phase 3 Capex",
//         datum: [
//           ...[...PHASE_THREE_CAPEX].map((comp, index) => ({
//             id: `component_${index + 1}`,
//             title: `Component ${index + 1}`,
//             type: MARINE_PARAM_TYPE.GROUP,
//             children: [
//               {
//                 id: `profile_${index + 1}`,
//                 title: `Component name`,
//                 type: MARINE_PARAM_TYPE.CHOICE.ALL_CAPEX_PAYMENT_PROFILE,
//               },
//               {
//                 id: `cost_${index + 1}`,
//                 title: `Capex size`,
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//               {
//                 id: `uel_${index + 1}`,
//                 title: `Useful economic life (UEL)`,
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.YEARS,
//               },
//             ],
//           })),
//           {
//             id: `inflation_profile`,
//             title: `Inflation index`,
//             type: MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION,
//           },
//           {
//             id: `inflation_base_year`,
//             title: `Inflation base year`,
//             type: MARINE_PARAM_TYPE.YEAR,
//             unit: PARAM_UNIT.YEAR,
//           },
//         ],
//       },
//       {
//         id: "payment_profile",
//         title: "Capex payment profile data",
//         datum: [
//           {
//             id: "payment_profile_data",
//             title: "Payment profile data (%)",
//             type: MARINE_PARAM_TYPE.TABLE,
//             stickyCols: {
//               type: "function",
//               params: [],
//               fn: () =>
//                 ALL_CAPEX_PAYMENT_PROFILE_LIST.map((profile) => profile),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push("");
//                 for (let i = 24; i > 0; i--) {
//                   result.push([`Month - ${i}`]);
//                 }
//                 return result;
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "other_inputs",
//     title: "Other inputs",
//     datum: [],
//     children: [
//       {
//         id: "vat",
//         title: "VAT",
//         datum: [
//           {
//             id: "vat_rate",
//             title: "VAT Rate",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 20,
//           },
//           {
//             id: "percentage_of_revenue_subject_to_vat",
//             title: "Percentage of revenue subject to VAT",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 100,
//           },
//           {
//             id: "percentage_of_cost_subject_to_vat",
//             title: "Percentage of cost subject to VAT",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 100,
//           },
//           {
//             id: "percentage_of_capex_subject_to_vat",
//             title: "Percentage of cost Capex subject to VAT",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 100,
//           },
//           {
//             id: "percentage_of_devex_subject_to_vat",
//             title: "Percentage of cost Devex subject to VAT",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 100,
//           },
//           {
//             id: "monthly_payments_on_account",
//             title: "Monthly payments on account",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000,
//           },
//         ],
//       },
//       {
//         id: "working_capital",
//         title: "Working Capital",
//         datum: [
//           {
//             id: "debtor_days",
//             title: "Debtor days assumption (up to 120 days)",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.DAYS,
//             maxValue: 120,
//             minValue: 0,
//           },
//           {
//             id: "creditor_days",
//             title: "Creditor days assumption (up to 120 days)",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.DAYS,
//             maxValue: 120,
//             minValue: 0,
//           },
//         ],
//       },
//       {
//         id: "capex_reserve_account",
//         title: "Capex reserve account",
//         datum: [
//           {
//             id: "reserve_length",
//             title: "Length of reserve",
//             type: MARINE_PARAM_TYPE.INTEGER,
//             unit: PARAM_UNIT.MONTHS,
//           },
//         ],
//       },
//       {
//         id: "corporation_tax",
//         title: "Corporation Tax",
//         datum: [
//           {
//             id: "small_profits_tax_rate",
//             title: "Small profits Tax Rate",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 19,
//           },
//           {
//             id: "main_rate_of_tax",
//             title: "Main rate of Tax",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 25,
//           },
//           {
//             id: "profit_threshold_for_small_profits",
//             title: "Profit threshold for small profits",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000,
//             defaultValue: 50,
//           },
//           {
//             id: "aia",
//             title: "AIA",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000,
//             defaultValue: 1000,
//           },
//           // {
//           //   id: "rate_for_capital_allowances_main_pool",
//           //   title: "Rate for capital allowances main pool",
//           //   type: MARINE_PARAM_TYPE.NUMBER,
//           //   unit: PARAM_UNIT.PERCENTAGE,
//           //   defaultValue: 6,
//           // },
//           {
//             id: "rate_for_capital_allowances_special_pool",
//             title: "Rate for capital allowances special Pool",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//             defaultValue: 6,
//           },
//           {
//             id: "small_pool_allowances_threshold",
//             title: "Small pool allowance threshold",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.GBP_PRO_1000,
//             defaultValue: 1,
//           },
//         ],
//       },
//       {
//         id: "financing",
//         title: "Financing",
//         datum: [],
//         children: [
//           {
//             id: "cash_requirements",
//             title: "Cash Requirements",
//             datum: [
//               {
//                 id: "minimum_cash_switch",
//                 title: "Minimum cash switch",
//                 type: MARINE_PARAM_TYPE.SWITCH.YESNO,
//               },
//               {
//                 id: "minimum_cash_balance",
//                 title: "Fixed minimum cash balance",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//                 defaultValue: 10,
//                 isShow: {
//                   params: {
//                     global: [],
//                     local: ["minimum_cash_switch"],
//                   },
//                   fn: ({
//                     minimum_cash_switch,
//                   }: {
//                     minimum_cash_switch: number;
//                   }) => minimum_cash_switch == 1,
//                 },
//               },
//               {
//                 id: "cash_requirement_look_forward_restriction",
//                 title: "Cash requirement look-forward restriction",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.QUARTERS,
//                 minValue: 0,
//                 maxValue: 4,
//                 isShow: {
//                   params: {
//                     global: [],
//                     local: ["minimum_cash_switch"],
//                   },
//                   fn: ({
//                     minimum_cash_switch,
//                   }: {
//                     minimum_cash_switch: number;
//                   }) => minimum_cash_switch == 1,
//                 },
//               },
//             ],
//           },
//           {
//             id: "gearing",
//             title: "Gearing",
//             datum: [
//               {
//                 id: "gearing_ratio",
//                 title: "Gearing ratio",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 defaultValue: 0,
//               },
//             ],
//           },
//           {
//             id: "senior_debt",
//             title: "Senior Debt",
//             datum: [
//               {
//                 id: "senior_debt_strategy",
//                 title: "Senior debt drawdown/repayment strategy",
//                 type: MARINE_PARAM_TYPE.CHOICE.DEBT_STRATEGY,
//               },
//               {
//                 id: "senior_debt_interest",
//                 title: "Senior debt interest rate",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE_PA,
//                 defaultValue: 8.25,
//                 minValue: 0,
//                 maxValue: 100,
//               },
//               {
//                 id: "senior_debt_repayment_type",
//                 title: "Senior debt repayment type",
//                 type: MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE,
//               },
//               {
//                 id: "cash_sweep_percentage",
//                 title:
//                   "Cash sweep % of available cash (Senior debt repayment profile)",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 defaultValue: 100,
//               },
//               {
//                 id: "minimum_facility_length",
//                 title: "Minimum facility length",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//               },
//               {
//                 id: "facility_length",
//                 title: "Facility length",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//               },
//               {
//                 id: "arrangement_fee",
//                 title: "Arrangement fee",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               // {
//               //   id: "amort_min_facility_length",
//               //   title: "Amortisation minimum facility length from COD",
//               //   type: MARINE_PARAM_TYPE.INTEGER,
//               //   unit: PARAM_UNIT.MONTHS,
//               // },
//               {
//                 id: "amort_payment_timing",
//                 title: "Amortisation payment timing",
//                 type: MARINE_PARAM_TYPE.CHOICE.AMORT_PAY_TIMING,
//               },
//               {
//                 id: "amort_payment_timing_manual_input",
//                 title:
//                   "Amortisation payment timing - manual input of payment month",
//                 type: MARINE_PARAM_TYPE.CHOICE.MONTH_NAME,
//               },
//               {
//                 id: "amort_len_from_cod",
//                 title: "Amortisation length (start from COD)",
//                 type: MARINE_PARAM_TYPE.INTEGER,
//                 unit: PARAM_UNIT.MONTHS,
//               },
//               {
//                 id: "amort_interest_payment_frequency",
//                 title:
//                   "Amortisation interest payment frequency(months after first drawdown)",
//                 type: MARINE_PARAM_TYPE.TEXT,
//                 // unit: PARAM_UNIT.MONTHS,
//               },
//               {
//                 id: "dscr",
//                 title: "DSCR",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "minimum_allowed_dscr_half_yearly",
//                     title: "Minimum allowed DSCR (half-yearly)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "minimum_allowed_dscr_annual",
//                     title: "Minimum allowed DSCR (annual)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "dscr_check_switch",
//                     title: "Minimum allowed DSCR check on",
//                     type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//                   },
//                 ],
//               },
//               {
//                 id: "llcr",
//                 title: "LLCR",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "minimum_allowed_llcr_half_yearly",
//                     title: "Minimum allowed LLCR (half-yearly)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "minimum_allowed_llcr_annual",
//                     title: "Minimum allowed LLCR (annual)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "llcr_check_switch",
//                     title: "Minimum allowed LLCR check on",
//                     type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//                   },
//                   {
//                     id: "llcr_discount_rate",
//                     title: "LLCR discount rate",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                   },
//                 ],
//               },
//               {
//                 id: "plcr",
//                 title: "PLCR",
//                 type: MARINE_PARAM_TYPE.GROUP,
//                 children: [
//                   {
//                     id: "minimum_allowed_plcr_half_yearly",
//                     title: "Minimum allowed PLCR (half-yearly)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "minimum_allowed_plcr_annual",
//                     title: "Minimum allowed PLCR (annual)",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                     defaultValue: 0,
//                   },
//                   {
//                     id: "plcr_check_switch",
//                     title: "Minimum allowed PLCR check on",
//                     type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//                   },
//                   {
//                     id: "plcr_discount_rate",
//                     title: "PLCR discount rate",
//                     type: MARINE_PARAM_TYPE.NUMBER,
//                     unit: PARAM_UNIT.PERCENTAGE,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: "equity",
//             title: "Equity",
//             datum: [
//               {
//                 id: "shareholder_loan_interest",
//                 title: "Shareholder loan interest",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE_PA,
//                 defaultValue: 8,
//                 minValue: 0,
//                 maxValue: 100,
//               },

//               {
//                 id: "equity_split_to_sharholder_loan",
//                 title: "Equity split to shareholder loan",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 defaultValue: 100,
//               },
//               {
//                 id: "equity_split_to_share_capital",
//                 title: "Equity split to share capital",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 renderValue: {
//                   params: {
//                     global: [],
//                     local: ["equity_split_to_sharholder_loan"],
//                   },
//                   fn: ({
//                     equity_split_to_sharholder_loan,
//                   }: {
//                     equity_split_to_sharholder_loan: number;
//                   }) => 100 - equity_split_to_sharholder_loan,
//                 },
//               },
//               // {
//               //   id: "shareholder_loan_interest_switch",
//               //   title: "Shareholder Loan Interest Active",
//               //   type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//               // },
//               // {
//               //   id: "shareholder_loan_interest_for_calculations",
//               //   title: "Shareholder Loan Interest to Use in Calculations",
//               //   type: MARINE_PARAM_TYPE.TEXT,
//               //   unit: PARAM_UNIT.PERCENTAGE_PA,
//               //   renderValue: {
//               //     params: {
//               //       local: [
//               //         "shareholder_loan_interest",
//               //         "shareholder_loan_interest_switch",
//               //       ],
//               //       global: [],
//               //     },
//               //     fn: ({
//               //       shareholder_loan_interest,
//               //       shareholder_loan_interest_switch,
//               //     }: {
//               //       shareholder_loan_interest: number;
//               //       shareholder_loan_interest_switch: number;
//               //     }) => {
//               //       return shareholder_loan_interest &&
//               //         shareholder_loan_interest_switch
//               //         ? shareholder_loan_interest *
//               //             shareholder_loan_interest_switch
//               //         : 0;
//               //     },
//               //   },
//               // },
//               {
//                 id: "shl_cash_sweep_percentage",
//                 title: "Shareholder loan cash sweep % of available cash",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 defaultValue: 100,
//               },
//               {
//                 id: "sc_cash_sweep_percentage",
//                 title: "Share capital cash sweep % of available cash",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               {
//                 id: "initial_capital_investment",
//                 title: "Initial capital investment",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },
//               {
//                 id: "initial_investment_date",
//                 title: "Initial capital investment date",
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//               {
//                 id: "valuation_date",
//                 title: "Date to use for valuation date",
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//               {
//                 id: "valuation_date_end",
//                 title: "Valuation date (end of month)",
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//             ],
//           },
//           {
//             id: "intercom_loan",
//             title: "Intercompany loan",
//             datum: [
//               {
//                 id: "amount",
//                 title: "Loan amount",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.GBP_PRO_1000,
//               },

//               {
//                 id: "start_date",
//                 title: "Loan start date",
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//               {
//                 id: "end_date",
//                 title: "Loan end date",
//                 type: MARINE_PARAM_TYPE.DATE,
//               },
//               {
//                 id: "interest_rate",
//                 title: "Interest",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//               {
//                 id: "repay_type",
//                 title: "Repayment type",
//                 type: MARINE_PARAM_TYPE.CHOICE.SD_REPAYMENT_TYPE,
//               },
//               {
//                 id: "cash_sweep_percentage",
//                 title: "Cash sweep % of available cash",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//               },
//             ],
//           },
//           {
//             id: "dividends",
//             title: "Dividends",
//             datum: [
//               {
//                 id: "dividends_cash_sweep_percentage",
//                 title: "Dividends cash sweep % of available cash",
//                 type: MARINE_PARAM_TYPE.NUMBER,
//                 unit: PARAM_UNIT.PERCENTAGE,
//                 defaultValue: 0,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "sensitivity",
//         title: "Sensitivities",
//         datum: [
//           {
//             id: "power_price_switch",
//             title: "Power price switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "power_price_percentage",
//             title: "Power price magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "adoption_switch",
//             title: "Adoption switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "adoption_percentage",
//             title: "Adoption magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "capex_switch",
//             title: "Capex switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "capex_percentage",
//             title: "Capex magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "cold_ironing_switch",
//             title: "Cold ironing switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "cold_ironing_percentage",
//             title: "Cold ironing magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "propulsion_switch",
//             title: "Propulsion switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "propulsion_percentage",
//             title: "Propulsion magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "sell_out_price_switch",
//             title: "Inflation switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "sell_out_price_percentage",
//             title: "Inflation magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "arbitrage_switch",
//             title: "Arbitrage switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "arbitrage_percentage",
//             title: "Arbitrage magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "inercompany_revenue_switch",
//             title: "Intercompany revenue switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "inercompany_revenue_percentage",
//             title: "Intercompany revenue magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "annual_concession_fee_switch",
//             title: "Annual concession fee switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "annual_concession_fee_percentage",
//             title: "Annual concession fee magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "opex_switch",
//             title: "Opex switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "opex_percentage",
//             title: "Opex magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//           {
//             id: "inflation_switch",
//             title: "Inflation switch",
//             type: MARINE_PARAM_TYPE.SWITCH.ONOFF,
//           },
//           {
//             id: "inflation_percentage",
//             title: "Inflation magnitude",
//             type: MARINE_PARAM_TYPE.NUMBER,
//             unit: PARAM_UNIT.PERCENTAGE,
//           },
//         ],
//       },
//       {
//         id: "inflation_rate_data",
//         title: "Inflation rate data",
//         datum: [
//           // {
//           //   id: "inflation_start_year",
//           //   title: "Inflation Start Year",
//           //   type: PARAM_TYPE.NUMBER,
//           //   defaultValue: 2021,
//           // },
//           {
//             id: "inflation_index_table",
//             title: "Inflation Index Table (%)",
//             type: MARINE_PARAM_TYPE.TABLE,
//             stickyCols: {
//               type: "function",
//               params: ["cyclesPerDay"],
//               fn: () =>
//                 CHOICE_DATA[MARINE_PARAM_TYPE.CHOICE.EMARINE_INFLATION].map(
//                   (c) => c?.label
//                 ),
//             },
//             stickyRows: {
//               type: "function",
//               params: [],
//               fn: () => {
//                 const result = [];
//                 result.push("");
//                 for (
//                   let i = INFLATION_START_YEAR;
//                   i < INFLATION_END_YEAR + 1;
//                   i++
//                 ) {
//                   result.push([i]);
//                 }
//                 return result;
//               },
//             },
//             valueRange: "percentage",
//           },
//         ],
//       },
//     ],
//   },
// ];
