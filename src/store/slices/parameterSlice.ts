import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../hooks/store";
import parameterService from "../../services/parameter.service";
import { IParameter } from "../../utils/types";
import {
  CreateParam,
  CreateParamInfo,
  DeleteParam,
  Parameter,
  ParamState,
  UpdateParamInfo,
  UserParamSetting,
} from "../types/types";
import { logoutAsync } from "./authSlice";
import { objectSum } from "../../calculation/calculates/utils";

const initialState: ParamState = {
  parameters: [],
  currentParameterId: null,
  parameterInfos: [],
  fixedParam: null,
  fixedParameterInfos: [],
  timingParam: null,
  timingParameterInfos: [],
  saveValue: true,
  balanceSheetData: {},
  currentProjectType: "",
  model_type: "",
  emarineCalculationResults: {},
  emarineSheetNames: [],
};

export const projectCreateAsync = createAsyncThunk<
  {
    params: Array<Parameter>;
    param_setting: any;
    current_project_type: string;
  },
  CreateParam
>("parameter/create", async (paramInfo: CreateParam, thunkApi) => {
  try {
    const response = await parameterService.create(
      paramInfo.clone_id,
      paramInfo.title,
      paramInfo.description,
      paramInfo.project_type
    );
    return response;
  } catch (_error) {
    const error = _error as Error | AxiosError<any>;
    if (axios.isAxiosError(error)) {
      const resp = error.response?.data;
      console.log("error.message", error.response?.data.detail.message);
      toast.error(resp?.detail?.message);
      return thunkApi.rejectWithValue(resp?.detail?.message || resp?.detail);
    }
    return thunkApi.rejectWithValue(error.message);
  }
});
export const projectDeleteAsync = createAsyncThunk<
  {
    params: Array<Parameter>;
    param_setting: any;
  },
  DeleteParam
>("parameter/delete", async (paramInfo: DeleteParam, thunkApi) => {
  try {
    const response = await parameterService.delete(
      paramInfo.id
      // paramInfo.user_id
    );
    return response;
  } catch (_error) {
    const error = _error as Error | AxiosError<any>;
    if (axios.isAxiosError(error)) {
      const resp = error.response?.data;
      return thunkApi.rejectWithValue(resp?.detail?.message || resp?.detail);
    }
    return thunkApi.rejectWithValue(error.message);
  }
});

export const projectInfoUpdateAsync = createAsyncThunk<
  {
    params: Array<Parameter>;
    param_setting: any;
  },
  IParameter
>("parameter/update", async (paramInfo: IParameter, thunkApi) => {
  try {
    const response = await parameterService.update(
      paramInfo.id as number,
      paramInfo.title,
      paramInfo.description as string
    );
    return response;
  } catch (_error) {
    const error = _error as Error | AxiosError<any>;
    if (axios.isAxiosError(error)) {
      const resp = error.response?.data;
      console.log("error.message", error.response?.data.detail.message);
      toast.error(resp?.detail?.message);
      return thunkApi.rejectWithValue(resp?.detail?.message || resp?.detail);
    }
    return thunkApi.rejectWithValue(error.message);
  }
});

// export const projectDeleteAsync = createAsyncThunk<
//   {
//     params: Array<Parameter>;
//     param_setting: any;
//   },
//   IParameter
// >('parameter/delete', async (paramInfo: IParameter, thunkApi) => {
//   try {
//     const response = await parameterService.update(
//       paramInfo.id as number,
//       paramInfo.title,
//       paramInfo.description as string
//     );
//     return response;
//   } catch (_error) {
//     const error = _error as Error | AxiosError<any>;
//     if (axios.isAxiosError(error)) {
//       const resp = error.response?.data;
//       return thunkApi.rejectWithValue(resp?.detail?.message || resp?.detail);
//     }
//     return thunkApi.rejectWithValue(error.message);
//   }
// });

export const inputsCreateAsync = createAsyncThunk<
  Array<UpdateParamInfo>,
  CreateParamInfo
>("parameter/info/create", async (paramInfo: CreateParamInfo) => {
  try {
    const response = await parameterService.createParamInfo(
      paramInfo.parameter_id,
      paramInfo.param_index,
      paramInfo.value
    );
    const realResult = objectSum(response);
    return realResult;
  } catch (_error) {
    // const error = _error as Error | AxiosError<any>;
  }
});

export const inputsUpdateAsync = createAsyncThunk<
  Array<UpdateParamInfo>,
  UpdateParamInfo
>("parameter/info/update", async (paramInfo: UpdateParamInfo) => {
  try {
    const response = await parameterService.updateParamInfo(
      // paramInfo.id,
      paramInfo.parameter_id,
      paramInfo.param_index,
      paramInfo.value
    );
    return response;
  } catch (_error) {
    // const error = _error as Error | AxiosError<any>;
  }
});

export const allInputsGetAsync = createAsyncThunk<
  Array<UpdateParamInfo>,
  number
>("parameter/info/get-all", async (parameter_id: number) => {
  try {
    const response = await parameterService.getParamInfo(parameter_id);
    const realResult = objectSum(response);

    return realResult;
  } catch (_error) {
    // const error = _error as Error | AxiosError<any>;
  }
});
export const paramGetAsync = createAsyncThunk<{
  params: Array<Parameter>;
  param_setting: any;
  model_type: string;
}>("parameter/get-by-user-id", async () => {
  // string
  try {
    const response = await parameterService.getByUserId();
    return response;
  } catch (_error) {
    // const error = _error as Error | AxiosError<any>;
  }
});

export const paramSettingUpdateAsync = createAsyncThunk<any, UserParamSetting>(
  "parameter/update-user",
  async (paramInfo: any, thunkApi) => {
    try {
      const response = await parameterService.updateUserParamSetting(
        paramInfo.parameter_id
      );
      return response;
    } catch (_error) {
      const error = _error as Error | AxiosError<any>;
      if (axios.isAxiosError(error)) {
        const resp = error.response?.data;
        if (error.response?.status == 403) {
          thunkApi.dispatch(logoutAsync());
        }
        return thunkApi.rejectWithValue(resp?.detail?.message || resp?.detail);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getEmarineAllResultValues = createAsyncThunk<
  Array<UpdateParamInfo>,
  number
>("emarine/getAllResults", async (paramId: number) => {
  try {
    const response = await parameterService.getEmarineAllResults(paramId);
    // console.log("emarine response", response);
    return response;
  } catch (_error) {
    const error = _error as Error | AxiosError<any>;
  }
});
export const getEmarineSheetNames = createAsyncThunk<
  Array<UpdateParamInfo>,
  number
>("emarine/sheetNames", async (paramId: number) => {
  console.log("slice called");

  try {
    const response = await parameterService.emarineSheetNames(paramId);
    return response;
  } catch (_error) {
    const error = _error as Error | AxiosError<any>;
  }
});

export const paramSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setFixedParam: (state, action: PayloadAction<number>) => {
      state.fixedParam = action.payload;
    },
    setSaveValue: (state, action: PayloadAction<any>) => {
      state.saveValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectCreateAsync.fulfilled, (state, { payload }) => {
        state.parameters = payload.params;
        state.currentParameterId = payload.param_setting;
        state.currentProjectType = payload.current_project_type;
        toast.success("New project created!");
      })
      .addCase(projectCreateAsync.rejected, (state, { payload }) => {
        toast.error("Error!");
      })
      .addCase(projectInfoUpdateAsync.fulfilled, (state, { payload }) => {
        state.parameters = payload.params;
        state.currentParameterId = payload.param_setting;
        toast.success("Project information updated successfully!");
      })

      // .addCase(projectInfoUpdateAsync.rejected, (state, { payload }) => {
      // 	console.log("param update reject", payload);
      // })
      .addCase(paramGetAsync.fulfilled, (state, { payload }) => {
        state.parameters = payload?.params;
        state.currentParameterId = payload?.param_setting;
        state.currentProjectType = payload?.model_type;
      })
      .addCase(projectDeleteAsync.fulfilled, (state, { payload }) => {
        state.parameters = payload.params;
        state.saveValue = true;
        payload.params.length
          ? (state.currentParameterId = payload.param_setting)
          : (state.currentParameterId = 0);
        state.currentParameterId = payload.param_setting;
        toast.success("Project deleted successfully!");
      })
      .addCase(projectDeleteAsync.rejected, (state, { payload }) => {
        toast.error("Couldn' t delete default project!");
      })
      .addCase(paramGetAsync.rejected, (state) => {
        state.parameters = [];
      })
      .addCase(paramSettingUpdateAsync.fulfilled, (state, { payload }) => {
        state.currentParameterId = payload.parameter_id;
        state.currentProjectType = payload?.parameter_type;

        console.log("payload", payload);
        toast.success("Selected project is available for use!");
      })
      .addCase(paramSettingUpdateAsync.rejected, (state) => {
        state.currentParameterId = null;
      })
      .addCase(allInputsGetAsync.fulfilled, (state, { payload }) => {
        state.parameterInfos = payload;
      })
      .addCase(allInputsGetAsync.rejected, (state) => {
        state.parameterInfos = [];
      })
      // .addCase(projectDeleteAsync.rejected, (state) => {
      //   state.parameterInfos = [];
      // })
      // .addCase(projectInfoUpdateAsync.rejected, (state) => {
      //   state.parameterInfos = [];
      // })
      .addCase(inputsUpdateAsync.fulfilled, (state, { payload }) => {
        state.parameterInfos = payload;
        state.saveValue = true;
      })
      .addCase(inputsUpdateAsync.rejected, (state) => {
        state.parameterInfos = [];
      })
      .addCase(inputsCreateAsync.fulfilled, (state, { payload }) => {
        state.parameterInfos = payload;
        state.saveValue = true;
      })
      .addCase(inputsCreateAsync.rejected, (state, { payload }) => {
        console.log("create error", payload);

        state.parameterInfos = [];
      })
      .addCase(getEmarineAllResultValues.fulfilled, (state, { payload }) => {
        state.emarineCalculationResults = payload;
      })
      .addCase(getEmarineSheetNames.fulfilled, (state, { payload }) => {
        state.emarineSheetNames = payload;
      });
  },
});

export const { setFixedParam, setSaveValue } = paramSlice.actions;

export const selectParam = (state: RootState) => state.param;
export default paramSlice.reducer;
