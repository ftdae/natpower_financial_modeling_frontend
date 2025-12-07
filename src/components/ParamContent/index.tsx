import moment from "moment";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addDate } from "../../store/slices/dateSlice";
import {
  getEmarineAllResultValues,
  inputsCreateAsync,
  inputsUpdateAsync,
  selectParam,
  setSaveValue,
} from "../../store/slices/parameterSlice";
import { CreateParamInfo, UpdateParamInfo } from "../../store/types/types";
import { PARAM_TYPE } from "../../utils/constant";
import { checkEqualObject } from "../../utils/funtions";
import { IInputParameter } from "../../utils/types";
import { DATE_FORMAT } from "../../utils/usePrameter";
import CardItem from "./CardItem";

const Content: FC<any> = ({
  items,
  handleChange,
  currentValue,
  getIsShowProps,
  getRenderValue,
  getIsDisabled,
  assetManagementDate,
  ppaDate,
  setTableUpdated,
  requiredFieldError,
  setRequiredFieldError,
  uniqueFieldError,
  setUniqueFieldError
}) => {
  return (
    <>
      {items?.map((item: any, index: number) => {
        const rV = getRenderValue({ item });
        const disabledValue = getIsDisabled({ item });
        const value =
          rV != null
            ? { [item?.id]: rV }
            : (currentValue as UpdateParamInfo)?.value;

        if (typeof getIsShowProps === "function" && !getIsShowProps({ item }))
          return null;
        if (item.type == PARAM_TYPE.GROUP) {
          return (
            <div className="border border-gray-300 rounded-lg p-4 m-2">
              <div className="text-left text-lg font-semibold" key={index}>
                {item.title}
              </div>
              <Content
                items={item.children} // Ensure this is correctly populated
                currentValue={currentValue}
                setTableUpdated={setTableUpdated}
                handleChange={handleChange}
                getIsShowProps={getIsShowProps}
                getRenderValue={getRenderValue}
                getIsDisabled={getIsDisabled}
                requiredFieldError={requiredFieldError}
                setRequiredFieldError={setRequiredFieldError}
                uniqueFieldError={uniqueFieldError}
                setUniqueFieldError={setUniqueFieldError}
                // basicProjectInputs={basicProjectInputs}
                assetManagementDate={assetManagementDate}
                ppaDate={ppaDate}
              />
            </div>
          );
        }

        return (
          <div key={index}>
            <CardItem
              disabled={rV != null || disabledValue}
              item={item}
              value={value}
              setTableUpdated={setTableUpdated}
              onChange={handleChange}
              requiredFieldError={requiredFieldError}
              setRequiredFieldError={setRequiredFieldError}
              // basicProjectInputs={basicProjectInputs}
              assetManagementDate={assetManagementDate}
              ppaDate={ppaDate}
              uniqueFieldError={uniqueFieldError}
              setUniqueFieldError={setUniqueFieldError}
            />
          </div>
        );
      })}
    </>
  );
};

interface ParamContentProps {
  param: IInputParameter;
  parentId: string;
}

const ParamContent: FC<ParamContentProps> = ({ param, parentId }) => {
  const dispatch = useAppDispatch();
  const { currentParameterId, parameterInfos, saveValue, currentProjectType, emarineCalculationResults } =
    useAppSelector(selectParam);
  const { emarineSheetNames } =
    useAppSelector(selectParam);
  const items = useMemo(() => {
    return param?.datum || [];
  }, [param]);

  const ID = useMemo(() => {
    return parentId !== "" ? `${parentId}@${param?.id}` : param?.id;
  }, [param, parentId]);

  const valueRef = useRef<UpdateParamInfo>();
  const [tableUpdated, setTableUpdated] = useState(false);
  const [currentValue, setCurrentValue] = useState<UpdateParamInfo>();
  const [requiredFieldError, setRequiredFieldError] = useState([]);
  const [uniqueFieldError, setUniqueFieldError] = useState([]);
  useEffect(() => {
    setUniqueFieldError([])
  }, [param])
  // const [basicProjectInputs, setBasicProjectInputs] = useState<{
  //   [key: string]: string | null;
  // }>({
  //   development_start_date: null,
  //   grid_secured_date_offer_accepted: null,
  //   land_secured_date: null,
  //   investor_closing_date: null,
  //   closing_of_dbt_agreement_date: null,
  //   grid_connection_date: null,
  // });

  const [assetManagementDate, setAssetManagementDate] = useState<{
    [key: string]: string | null;
  }>({
    start_date_period_1: null,
    end_date_period_1: null,
    start_date_period_2: null,
    end_date_period_2: null,
  });

  const [ppaDate, setPpaManagementDate] = useState<{
    [key: string]: string | null;
  }>({
    ppa_start_date_1: null,
    ppa_end_date_1: null,
    ppa_start_date_2: null,
    ppa_end_date_2: null,
  });

  useEffect(() => {
    const assetManagementModule = "asset_management";
    if (param.id === assetManagementModule) {
      parameterInfos.forEach((paramInfo) => {
        if (paramInfo.param_index.includes(assetManagementModule)) {
          for (const key in assetManagementDate) {
            if (paramInfo.value[key]) {
              setAssetManagementDate((prevState) => {
                return { ...prevState, [key]: paramInfo.value[key] };
              });
            }
          }
        }
      });
    }
  }, [param]);

  useEffect(() => {
    if (isChanged && tableUpdated) {
      handleSave();
      setTableUpdated(false);
    }
  }, [currentValue, tableUpdated, saveValue]);

  useEffect(() => {
    if (Array.isArray(parameterInfos)) {
      const pp = parameterInfos?.find(
        (i) => i?.param_index === ID && i?.parameter_id === currentParameterId
      ) as UpdateParamInfo;
      valueRef.current = pp;
      setCurrentValue(pp);
    }
  }, [parameterInfos, ID]);
  const isChanged = useMemo(() => {
    return !checkEqualObject(currentValue, valueRef.current);
  }, [currentValue]);

  const getIsShowProps = useCallback(
    ({ item }: { item: any }) => {
      if (!item.isShow) return true;
      if (!item.isShow.fn) return true;
      const show: Record<string, any> = {};
      if (item.isShow.params.local && currentValue !== undefined) {
        item.isShow.params.local.forEach((l: string) => {
          show[l] = (currentValue as UpdateParamInfo)?.value[l]?.data;
        });
      }
      if (item.isShow.params.global) {
        item.isShow.params.global.forEach((l: string) => {
          if (l == "battery_duration")
            show[l] =
              parameterInfos.find(
                (parameter) =>
                  parameter?.param_index ==
                  "battery_assumption@starting_assumption"
              )?.value?.battery_duration?.data || 0;
          if (l == "forecast_provider")
            show[l] = parameterInfos.find(
              (parameter) => parameter?.param_index == "revenue@setup"
            )?.value?.forecast_provider?.data;
          if (l == "region_for_modo")
            show[l] = parameterInfos.find(
              (parameter) => parameter?.param_index == "revenue@setup"
            )?.value?.region_for_modo?.data;
          if (l == "region_for_afry")
            show[l] = parameterInfos.find(
              (parameter) => parameter?.param_index == "revenue@setup"
            )?.value?.region_for_afry?.data;
          if (l == "region_for_baringa")
            show[l] = parameterInfos.find(
              (parameter) => parameter?.param_index == "revenue@setup"
            )?.value?.region_for_baringa?.data;
          if (l == "trading_strategy")
            show[l] = parameterInfos.find(
              (parameter) => parameter?.param_index == "revenue@setup"
            )?.value?.trading_strategy?.data;
        });
      }
      return item.isShow.fn(show);
    },
    [currentValue, parameterInfos]
  );

  const getIsDisabled = useCallback(
    ({ item }: { item: any }) => {
      if (!item.isDisabled) return false;
      if (!item.isDisabled.fn) return false;
      const show: Record<string, any> = {};
      if (item.isDisabled.params.local && currentValue !== undefined) {
        item.isDisabled.params.local.forEach((l: string) => {
          show[l] = (currentValue as UpdateParamInfo).value[l];
        });
      }
      return item.isDisabled.fn(show);
    },
    [currentValue]
  );

  const getRenderValue = useCallback(
    ({ item }: { item: any }) => {
      if (!item.renderValue) return null;
      if (!item.renderValue.fn) return null;
      const props: Record<string, any> = {};
      if (item.renderValue.params.local && currentValue !== undefined) {
        item.renderValue.params.local.forEach((l: string) => {
          props[l] = (currentValue as UpdateParamInfo).value[l]?.data;
        });
      }
      if (item.renderValue.params.global) {
        item.renderValue.params.global.forEach((l: string) => {
          const basicProjectInputs = parameterInfos?.find(
            (parameter) => parameter?.param_index == "basic_project_inputs"
          )?.value;
          if (l == "battery_duration")
            props[l] = parameterInfos?.find(
              (parameter) =>
                parameter?.param_index ==
                "battery_assumption@starting_assumption"
            )?.value?.battery_duration?.data;
          if (l == "initial_capacity")
            props[l] = parameterInfos?.find(
              (parameter) => parameter?.param_index == "basic_project_inputs"
            )?.value?.grid_connection_capacity?.data;
          if (l == "grid_secured_date")
            props[l] = parameterInfos?.find(
              (parameter) => parameter?.param_index == "basic_project_inputs"
            )?.value?.grid_secured_date_offer_accepted?.data;
          // "gearing", "cost_of_debt", "tax_rate";
          if (l == "land_secured_date")
            props[l] = parameterInfos?.find(
              (parameter) => parameter?.param_index == "basic_project_inputs"
            )?.value?.land_secured_date?.data;
          if (l == "gearing")
            props[l] =
              (parameterInfos?.find(
                (parameter) =>
                  parameter?.param_index ==
                  "other_inputs@financing@gearing_by_capex_type"
              )?.value?.excludingBatteries?.data || 0) / 100;
          if (l == "cost_of_debt")
            (props[l] =
              parameterInfos?.find(
                (parameter) =>
                  parameter?.param_index == "other_inputs@financing@senior_debt"
              )?.value?.seniorDebtInterst?.data || 0) / 100;
          if (l == "tax_rate")
            (props[l] =
              parameterInfos?.find(
                (parameter) =>
                  parameter?.param_index == "other_inputs@corporation_tax"
              )?.value?.mainRateOfTax?.data || 0) / 100;
          if (l == "fully_consented_date") {
            props[l] =
              basicProjectInputs?.development_start_date &&
                basicProjectInputs?.time_between_development_start_date_and_planning_permission_granted?.data
                ? moment(
                  parameterInfos?.find(
                    (parameter) =>
                      parameter?.param_index == "basic_project_inputs"
                  )?.value?.development_start_date?.data
                )
                  .add(
                    parameterInfos?.find(
                      (parameter) =>
                        parameter?.param_index == "basic_project_inputs"
                    )?.value
                      ?.time_between_development_start_date_and_planning_permission_granted?.data,
                    "month"
                  )
                  .format(DATE_FORMAT)
                : "-";
          }
          if (l == "enterprise_value_switch") {
            props[l] =
              parameterInfos?.find(
                (parameter) =>
                  parameter?.param_index ==
                  "capex@excluding_batteries@enterprise_value"
              )?.value?.enterprise_value_switch?.data || 0;
          }
          if (l == "tolling_percentage") {
            props[l] =
              parameterInfos?.find(
                (parameter) => parameter?.param_index == "revenue@tolling"
              )?.value?.tolling_switch?.data || 0;
          }
          if (l == "vertical_type") {
            props[l] =
              parameterInfos?.find(
                (parameter) => parameter?.param_index == "basic_inputs@basic_info"
              )?.value?.vertical_type?.data || 0;
          }
          if (l == "emarine_dev_start_date_1") {
            props[l] =
              parameterInfos?.find(
                (parameter) => parameter?.param_index == "basic_inputs@project_timing"
              )?.value?.dev_start_date_1?.data || '';
          }
          if (l == "emarine_oper_start_date_1") {
            const emarineOperStartOne = emarineCalculationResults?.project_timing?.operation_start[0]
            props[l] =
              emarineOperStartOne || '';
          }
          if (l == "emarine_dev_start_date_2") {
            const emarineDevStartTwo = emarineCalculationResults?.project_timing?.dev_start_date[1]
            props[l] =
              emarineDevStartTwo || '';
          }
          if (l == "emarine_oper_start_date_2") {
            const emarineOperStartTwo = emarineCalculationResults?.project_timing?.operation_start[1]
            props[l] =
              emarineOperStartTwo || '';
          }
          if (l == "emarine_dev_start_date_3") {
            const emarineDevStartThree = emarineCalculationResults?.project_timing?.dev_start_date[2]
            props[l] =
              emarineDevStartThree || '';
          }
          if (l == "emarine_oper_start_date_3") {
            const emarineOperStartThree = emarineCalculationResults?.project_timing?.operation_start[2]
            props[l] =
              emarineOperStartThree || '';
          }
          if (l == "emarine_live_valuation_date_for_selection") {
            const selectionValue = emarineCalculationResults?.live_valuation_settings?.valuation_date_selection
            props[l] =
              selectionValue || 0;
          }
          if (l == "emarine_live_valuation_date") {
            const selectionValue = emarineCalculationResults?.live_valuation_settings?.valuation_date
            props[l] =
              selectionValue || '';
          }

        });
      }

      return item.renderValue.fn(props);
    },
    [currentValue, parameterInfos, emarineCalculationResults]
  );

  const handleChange = (name: string, val: any, inputType?: string) => {
    const newVal = { ...currentValue };
    newVal.value = {
      ...newVal.value,
      [name]: {
        data: val,
        type: inputType
      },
    };

    // if (Object.keys(basicProjectInputs).includes(name)) {
    //   setBasicProjectInputs({ ...basicProjectInputs, [name]: val });
    // }
    if (Object.keys(assetManagementDate).includes(name)) {
      setAssetManagementDate({ ...assetManagementDate, [name]: val });
    } else if (Object.keys(ppaDate).includes(name)) {
      setPpaManagementDate({ ...ppaDate, [name]: val });
    } else if (name.includes("date")) {
      dispatch(addDate({ key: name, value: val }));
    }
    setCurrentValue(newVal as UpdateParamInfo);
  };

  const handleSave = useCallback(() => {
    // Find all Must fields
    const mustFields = items.filter((item) => item.required === "Must");
    const missingFields = mustFields.filter((field) => {
      const value = currentValue?.value?.[field.id];
      return !value; // Check if value is missing
    });

    let doubledSheetNameProjectIndex = -1;
    if (currentValue.param_index == 'basic_inputs@basic_info') {
      const currentEmarineSheetName = currentValue?.value?.sheet_name?.data
      if (currentEmarineSheetName != '')
        doubledSheetNameProjectIndex = emarineSheetNames.findIndex((sheet) => sheet?.sheet_name == currentEmarineSheetName)

    }

    if (missingFields.length > 0) {
      setRequiredFieldError(missingFields.map((item) => item.id));
      return;
    }
    if (doubledSheetNameProjectIndex != -1) {
      if (currentValue?.value?.sheet_name?.data != "") {

        setUniqueFieldError((prev) =>
          ['sheet_name']
        );
      }
      return
    }

    dispatch(setSaveValue(false));
    // if (currentValue?.id) {
    //   dispatch(inputsUpdateAsync(currentValue as UpdateParamInfo));

    // } else {
    //   const payload = {
    //     parameter_id: currentParameterId as number,
    //     param_index: ID,
    //     value: currentValue?.value,
    //   };
    //   dispatch(inputsCreateAsync(payload as CreateParamInfo))

    // }
    // if (currentProjectType == 'emarine') {
    //   dispatch(getEmarineAllResultValues(currentParameterId));
    // }
    if (currentValue?.id) {
      // Dispatch the update action and wait for it to complete
      dispatch(inputsUpdateAsync(currentValue as UpdateParamInfo))
        .unwrap()
        .then(() => {
          // This block runs after inputsUpdateAsync completes successfully
          if (currentProjectType === 'emarine') {
            dispatch(getEmarineAllResultValues(currentParameterId));
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during inputsUpdateAsync
          console.error("Error updating inputs:", error);
        });
    } else {
      // Create a new input and wait for it to complete
      const payload = {
        parameter_id: currentParameterId as number,
        param_index: ID,
        value: currentValue?.value,
      };

      dispatch(inputsCreateAsync(payload as CreateParamInfo))
        .unwrap()
        .then(() => {
          // This block runs after inputsCreateAsync completes successfully
          if (currentProjectType === 'emarine') {
            dispatch(getEmarineAllResultValues(currentParameterId));
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during inputsCreateAsync
          console.error("Error creating inputs:", error);
        });
    }
  }, [currentValue, items]);

  useEffect(() => {
    setPpaManagementDate({
      ppa_start_date_1: null,
      ppa_end_date_1: null,
      ppa_start_date_2: null,
      ppa_end_date_2: null,
    });
  }, [param.title]);

  return (
    <div className="m-2 p-4 border border-gray-300 rounded-lg flex flex-col w-full justify-between max-w-[40vw] h-full min-h-[25vh]">
      <div className="w-full">
        <h4 className="text-2xl font-bold">{param?.title}</h4>
        <hr className="my-2" />
        <Content
          title={param?.title}
          items={items}
          setTableUpdated={setTableUpdated}
          handleChange={handleChange}
          currentValue={currentValue}
          getIsShowProps={getIsShowProps}
          getRenderValue={getRenderValue}
          getIsDisabled={getIsDisabled}
          requiredFieldError={requiredFieldError}
          setRequiredFieldError={setRequiredFieldError}
          uniqueFieldError={uniqueFieldError}
          setUniqueFieldError={setUniqueFieldError}
          // basicProjectInputs={basicProjectInputs}
          assetManagementDate={assetManagementDate}
          ppaDate={ppaDate}
        />
      </div>
      <div className="flex justify-end px-4">
        <button
          className={`px-4 py-2 font-semibold text-white rounded-lg ${isChanged
            ? "bg-main hover:bg-gray-700"
            : "bg-gray-300 cursor-not-allowed"
            }`}
          disabled={!isChanged}
          onClick={handleSave}
        >
          {saveValue ? "Save" : "Saving..."}
        </button>
      </div>
    </div>
  );
};

export default ParamContent;
