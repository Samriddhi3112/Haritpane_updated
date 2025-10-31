import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reduxToolkit/Slices/Authentication";
import StaticContentReducer from "./Slices/StaticContent";
import roleReducer from "./Slices/Role";
import subAdminReducer from "./Slices/SubAdmin";
import profileReducer from "./Slices/Profile";
import farmerReducer from "./Slices/Farmer";
import onlineServiceProviderReducer from "./Slices/OnlineServiceProvider";
import manufactureReducer from "./Slices/Manufacture";
import verificationReducer from "./Slices/VerificationManagement";

const store = configureStore({
  reducer: {
    auth: authReducer,
    staticData: StaticContentReducer,
    role: roleReducer,
    subAdmin: subAdminReducer,
    profile: profileReducer,
    farmer: farmerReducer,
    onlineServiceProvider: onlineServiceProviderReducer,
    manufacture: manufactureReducer,
    verification: verificationReducer,
  },
});

export default store;
