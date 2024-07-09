import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/UI/Hero";
import UserCards from "./components/UI/UserCards";
import WhyloveUs from "./components/UI/WhyLoveUs";
import Counter from "./components/UI/Counter";
import AboutMain from "./components/UI/About";
import Footer from "./components/Footer/Footer";
import CompanyLogin from "./components/Login/CompanyLogin";
import RecruiterLogin from "./components/Login/RecruiterLogin";
import ApplicantLogin from "./components/Login/ApplicantLogin";
import CompanyRegister from "./components/Register/CompanyRegister";
import RecruiterRegister from "./components/Register/RecruiterRegister";
import ApplicantRegister from "./components/Register/ApplicantRegister";
import CompanyProfile from "./components/Profile/CompanyProfile";
import RecruitProfile from "./components/Profile/RecruiterProfile";
import ApplicantProfile from "./components/Profile/ApplicantProfile";
import CD from "./components/Dashboard/CD";
import RD from "./components/Dashboard/RD";
import AD from "./components/Dashboard/AD";
import RP from "./components/MainProfile/RP";
import AP from "./components/MainProfile/AP";
import JobSearch from "./components/Jobs/jobSearch";
import ResetPassword from "./components/Common/ResetPassword";
import Contact from "./components/UI/Contact";
import NewJob from "./components/Jobs/NewJob";
import NewPost from "./components/Posts/NewPost";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const App = () => {
  const [theme, setTheme] = useState("dark-theme");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light-theme" ? "dark-theme" : "light-theme"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const Home = () => (
    <>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <UserCards />
      <WhyloveUs />
      <Counter />
      <Footer />
    </>
  );

  const About = () => (
    <div className="about-page">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <AboutMain />
      <Footer />
    </div>
  );

  const ContactUs = () => (
    <div className="contact-page">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Contact />
      <Footer />
    </div>
  );

  return (
    <ThemeProvider theme={theme === "light-theme" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/register" element={<CompanyRegister />} />
            <Route path="/company/completeprofile" element={<CompanyProfile />} />
            <Route path="/company/dashboard" element={<CD />} />
            <Route path="/recruiter/dashboard" element={<RD />} />
            <Route path="/applicant/dashboard" element={<AD />} />
            <Route path="/applicant/profile" element={<AP />} />
            <Route path="/recruiter/profile" element={<RP />} />
            <Route path="/recruiter/login" element={<RecruiterLogin />} />
            <Route path="/recruiter/register" element={<RecruiterRegister />} />
            <Route path="/recruiter/completeprofile" element={<RecruitProfile />} />
            <Route path="/applicant/login" element={<ApplicantLogin />} />
            <Route path="/applicant/register" element={<ApplicantRegister />} />
            <Route path="/applicant/completeprofile" element={<ApplicantProfile />} />
            <Route path="/applicant/jobs" element={<JobSearch />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/UserCards" element={<UserCards />} />
            <Route path="/add-newJob/:role" element={<NewJob />}/>
            <Route path="/add-newPost/:role" element={<NewPost />}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    transition: background-color 0.3s ease;
    font-family: Verdana, Geneva, Tahoma, sans-serif !important;
  }
`;

const lightTheme = {
  bg: "#FFFFFF",
  button: "#EEEEEE",
  primaryText: "#687890",
  secondaryText: "#687890",
  lightShadow: "rgba(255, 255, 255, 0.8) -5px -5px -15px",
  darkShadow: "rgba(136, 160, 183, 0.8) 5px 5px 15px",
};

const darkTheme = {
  bg: "#2C2F33",
  button: "#25CEDE",
  primaryText: "#EEEEEE",
  secondaryText: "#687890",
  lightShadow: "rgba(59, 68, 81, 0.8) -5px -5px -15px",
  darkShadow: "rgba(0, 0, 0, 0.8) 5px 5px 15px",
};

export default App;