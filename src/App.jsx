import "./App.css";
import "./assets/css/custom.css";
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./Components/Authentication/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import SideNavBar from "./Components/Common/SideNavBar";
import LoginSuccess from "./Components/Authentication/LoginSuccess";
import SubscriptionListing from "./Components/Subscriptions/SubscriptionListing";
import PersonalDetails from "./Components/Profile/Personal Details/PersonalDetails";
import Profile from "./Components/Profile/Profile";
import NotificationListing from "./Components/Notifications/NotificationListing";
import ReportPage from "./Components/Reports/ReportPage";
import RoleListings from "./Components/Sub Admin Managements/Role Management/RoleListings";
import RoleListing from "./Components/Sub Admin Managements/Sub-Admin Management/SubAdminListing";
import StaticContentListing from "./Components/Static Content/StaticContentListing";
import StaticContentEdit from "./Components/Static Content/StaticContentEdit";
import TabSwitching from "./Components/Sub Admin Managements/Tab Management/TabSwitching";
import SubAdminView from "./Components/Sub Admin Managements/Sub-Admin Management/SubAdminView";
import FarmerListing from "./Components/User Management/Farmers/FarmerListing";
import VerificationManagement from "./Components/Verification Management/VerificationManagement";
import VerificationIndiaMart from "./Components/Verification Management/India Mart/VerificationIndiaMart";
import VerificationJustDial from "./Components/Verification Management/Just Dial/VerificationJustDial";
import VerificationJSDetails from "./Components/Verification Management/Just Dial/VerificationJDDetails";
import OnlineServiceProvidersListing from "./Components/User Management/Online Service Providers/OnlineServiceProvidersListing";
import OnlineServiceProvidersView from "./Components/User Management/Online Service Providers/OnlineServiceProvidersView";
import ServicesViewDetails from "./Components/User Management/Online Service Providers/ServicesViewDetails";
import ManufacuresListing from "./Components/User Management/Manufactures B2B/ManufacuresListing";
import JustDialView from "./Components/User Management/Manufactures B2B/Just Dial/JustDialView";
import IndiaMartView from "./Components/User Management/Manufactures B2B/India Mart/IndiaMartView";
import ComplaintsListings from "./Components/Complaints Management/Complaints/ComplaintsListings";
import FarmerView from "./Components/User Management/Farmers/FarmerView";
import FarmLocationdetail from "./Components/User Management/Farmers/FarmLocationdetail";
// import EditFarmer from "./Components/User Management/Farmers/EditFarmer";
import VerificationIMDetail from "./Components/Verification Management/India Mart/VerificationIMDetail";
import OtpVerification from "./Components/Authentication/OtpVerification";
import Resetpassword from "./Components/Authentication/Resetpassword";
import ResetSuccess from "./Components/Authentication/ResetSuccess";
import VerificationJDDetails from "./Components/Verification Management/Just Dial/VerificationJDDetails";
import IndiaMartDetail from "./Components/User Management/Manufactures B2B/India Mart/IndiaMartDetail"
import JustDialDetail from "./Components/User Management/Manufactures B2B/Just Dial/JustDialDetail";

function Layout() {
  return (
    <div>
      <SideNavBar />
      <Outlet />
    </div>
  );
}

function App() {
  const basename = import.meta.env.VITE_BASENAME;
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-forgot" element={<ForgotPassword />} />

        <Route path="/otpverify" element={<OtpVerification />} />
        <Route path="/resetPassword" element={<Resetpassword />} />
        <Route path="/resetSuccess" element={<ResetSuccess />} />
        <Route path="/loginSuccess" element={<LoginSuccess />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/subscription-listing"
              element={<SubscriptionListing />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/notification-listing"
              element={<NotificationListing />}
            />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/role-listing" element={<RoleListings />} />
            <Route path="/role-list" element={<RoleListing />} />
            <Route path="/static-content" element={<StaticContentListing />} />
            <Route
              path="/static-content-edit"
              element={<StaticContentEdit />}
            />
            <Route path="/tabSwitch" element={<TabSwitching />} />
            <Route path="/viewSubAdmin" element={<SubAdminView />} />
            <Route path="/farmerListing" element={<FarmerListing />} />
            <Route path="/farmerListing/farmerView" element={<FarmerView />} />
            <Route path="/verification" element={<VerificationManagement />} />
            <Route
              path="/verification/verificationIm"
              element={<VerificationIndiaMart />}
            />
            <Route
              path="/verification/verificationJD"
              element={<VerificationJustDial />}
            />
            <Route
              path="/verificationJDDetail"
              element={<VerificationJSDetails />}
            />
            <Route
              path="/onlineServiceProvider"
              element={<OnlineServiceProvidersListing />}
            />
            <Route
              path="/onlineServiceProvider/onlineServiceProviderView"
              element={<OnlineServiceProvidersView />}
            />
            <Route
              path="/onlineServiceProvider/serviceViewDetail"
              element={<ServicesViewDetails />}
            />
            <Route path="/manufactureList" element={<ManufacuresListing />} />
            <Route
              path="/manufactureList/justdialview"
              element={<JustDialView />}
            />
            <Route
              path="/manufactureList/indiamartview"
              element={<IndiaMartView />}
            />
            <Route path="/complain" element={<ComplaintsListings />} />
            <Route
              path="/farmerListing/farmlocationdetail"
              element={<FarmLocationdetail />}
            />
            {/* <Route path="/farmerListing/editfarmer" element={<EditFarmer />} /> */}
            <Route
              path="/verification/verificationIm/viewDetailIM"
              element={<VerificationIMDetail />}
            />
            <Route
              path="/verification/verificationJD/viewDetailJD"
              element={<VerificationJDDetails />}
            />
            <Route
              path="/manufactureList/indiamartview/IMDetail"
              element={<IndiaMartDetail />}
            />
            <Route
              path="/manufactureList/justdialview/JSDetail"
              element={<JustDialDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
