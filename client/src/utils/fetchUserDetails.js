import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";
import { createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response.data;
  } catch (error) {}
};

export default fetchUserDetails;
