import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from './Slices/Authentication';
import staticContentReducer from './Slices/StaticContent';
import rootReducer from './Slices/Role';
import subAdminReducer from './Slices/SubAdmin';
import profileReducer from './Slices/Profile';
import farmerReducer from './Slices/Farmer';
import onlineServiceProviderReducer from './Slices/OnlineServiceProvider';
import manufactureReducer from './Slices/Manufacture'
import verificationReducer from './Slices/VerificationManagement'

const rootReducer = combineReducers({
    authentication :authenticationReducer,
    staticContent: staticContentReducer,
    role: rootReducer,
    subAdmin: subAdminReducer,
    profile: profileReducer,
    farmer : farmerReducer,
    onlineServiceProvider : onlineServiceProviderReducer,
    manufacture: manufactureReducer,
    verification: verificationReducer
})

export default rootReducer