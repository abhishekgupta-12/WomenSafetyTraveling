import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"
import Newsapp from "./News/Newsapp";
import HelpWidget from "./widgets/HelpWidget";

import Frontpage from './FIR/frontpage/Frontpage';
import Userlogin from "./FIR/Loginpages/Userlogin";
import UserSignUp from "./FIR/Signuppages/UserSignUp";
import PoliceLogin from "./FIR/Loginpages/PoliceLogin";
import PoliceSignUp from "./FIR/Signuppages/PoliceSignUp";
import Logincards from "./FIR/logincards/Logincards";
import Missingperson from "./FIR/missingpersonpage/Missingperson";
import Firpage from "./FIR/firepage/Firpage";
import Userpage from "./FIR/userpage/Userpage";
import Policepage from "./FIR/policepage/Policepage";
import Searchmissingpol from "./FIR/searchmissingpol/Searchmissingpol";
import Searchfir from "./FIR/searchfirpage/Searchfir";
import Reportacrime from "./FIR/reportacrime/Reportacrime";
import Searchfirp from "./FIR/policepastfir/Searchfirp";
import VerifyOtpUser from './FIR/verifyotppage/VerifyOtpUser';
import Searchmissing from "./FIR/searchmissing/Searchmissing";
import SafetyMap from "./components/SafetyMap";
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={() => <Navigate to="/posts" />} />
          <Route path="/posts" exact Component={Home} />
          <Route path="/newsapp" exact Component={Newsapp} />
          <Route path="/help" exact Component={HelpWidget} />
          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" exact Component={PostDetails} />
          <Route path="/map" exact Component={SafetyMap} />
          <Route
            path="/auth"
            exact
            Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
          />

          {/* FIR Routes */}



          <Route path='/fir' element={<Frontpage />} />
          <Route path='/signin/users/login/' element={<Userlogin />} />
          <Route path='/signin/users/login/users/register' element={<UserSignUp />} />
          <Route path='/signin/police/login' element={<PoliceLogin />} />
          <Route path='/signin/police/login/police/register' element={<PoliceSignUp />} />
          <Route path='/signin/users/login/verifyOtp' element={<VerifyOtpUser />} />
          <Route path='/signin' element={<Logincards />} />
          <Route path='/signin/police/login/missingpersonbureau' element={<Missingperson />} />
          <Route path='/signin/police/login/fir' element={<Firpage />} />
          <Route path='/signin/users/login/verifyOtp/userspage' element={<Userpage />} />
          <Route path='/signin/police/login/policepage' element={<Policepage />} />
          <Route path='/signin/users/searchmissing' element={<Searchmissing />} />
          <Route path='/signin/police/searchmissingpol' element={<Searchmissingpol />} />
          <Route path='/signin/users/searchfir' element={<Searchfir />} />
          <Route path='/signin/users/reportacrime' element={<Reportacrime />} />

          <Route path='/signin/police/searchfirp' element={<Searchfirp />} />

        </Routes>

      </Container>
    </BrowserRouter>
  );
};

export default App;