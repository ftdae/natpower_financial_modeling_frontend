import { toast } from "react-toastify";
import { User } from "../store/types/types";
import http from "./http";
import tokenService from "./token.service";
///////////////// ajeitar /////////
const user: User = tokenService.getUser();
class ParamService {
  async create(
    clone_id: number,
    title: string,
    description: string,
    project_type: string
  ) {
    return http
      .post(
        "/parameter/",
        {
          clone_id,
          user_id: user.id,
          title,
          description,
          project_type,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Ensure you have the token
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.detail.message);
        console.error("Error:", error, error.response.data); // Log the error response for debugging
      });
  }
  async delete(id: number) {
    return http
      .delete(`/parameter/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Ensure you have the token
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  async update(id: number, title: string, description: string) {
    return http
      .put(
        `/parameter/${id}`,
        {
          id,
          user_id: user.id,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Ensure you have the token
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }
  async getByUserId() {
    return http
      .get(`/parameter/get-by-user-id/${user.id}`, {
        headers: {
          Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Ensure you have the token
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  // async delete(id: number, title: string, description: string) {
  //   return http
  //     .delete(`/parameter/${id}`, {
  //       id,
  //       user_id: user.id,
  //       title,
  //       description
  //     })
  //     .then((response) => {
  //       return response.data;
  //     });
  // }

  async updateUserParamSetting(parameter_id: number) {
    return http
      .put(
        `/parameter/update-user/${user.id}`,
        { parameter_id },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`, // Ensure you have the token
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  }
  // async deleteParamInfo(
  //   id: number,
  //   parameter_id: number,
  //   param_index: string,
  //   value: object
  // ) {
  //   return http
  //     .delete(`/parameter/${parameter_id}`, {
  //       parameter_id,
  //       // param_index,
  //       // value
  //     })
  //     .then((response) => {
  //       return response.data;
  //     });
  // }
  async createParamInfo(
    parameter_id: number,
    param_index: string,
    value: object
  ) {
    return http
      .post("/parameter/info", {
        parameter_id,
        param_index,
        value,
      })
      .then((response) => {
        return response.data;
      });
  }

  async updateParamInfo(
    parameter_id: number,
    param_index: string,
    value: object
  ) {
    return http
      .put(`/parameter/info/`, {
        parameter_id,
        param_index,
        value,
      })
      .then((response) => {
        return response.data;
      });
  }

  async getParamInfo(parameter_id: number) {
    return http
      .get(`/parameter/info/get-all?parameter_id=${parameter_id}`)
      .then((response) => {
        return response.data;
      });
  }

  async getBalanceSheetData(parameter_id: number) {
    return http
      .get(`/test/getBalanceSheet?parameter_id=${parameter_id}`)
      .then((response) => {
        return response.data;
      });
  }
  async getEmarineAllResults(parameter_id: number) {
    return http
      .get(`emarine/allResults/project_id=${parameter_id}_user_id=${user.id}`)
      .then((response) => {
        return response.data;
      });
  }
  async emarineSheetNames(paramId: number) {
    return http
      .get(`emarine/sheetNames/project_id=${paramId}_user_id=${user.id}`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new ParamService();
