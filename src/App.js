import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HorsePage from "./pages/HorsePage";
import StatisticPage from "./pages/StatisticPage";
import ResultsPage from "./pages/ResultsPage";
import LogInComp from "./components/LogInComp";
import SignUpComp from "./components/SignUpComp";
import GamePage from "./pages/GamePage";
import MyProfilePage from "./pages/MyProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ShopPage from "./pages/ShopPage";
import LogOutPage from "./pages/LogOutPage";
import DesktopNavbar from "./components/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar";
// import Footer from "./components/Footer";
import AuthContextProvider from "./contexts/AuthContext";
import ShopContextProvider from "./contexts/ShopContext";
import HorseContextProvider from "./contexts/HorseContext";
import styled from "@emotion/styled";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const Main = styled.div({
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  "@media screen and (min-width: 600px)": {
    marginLeft: "25vw",
    width: "75vw",
  },
  "@media screen and (min-width: 1024px)": {
    marginLeft: "20vw",
    width: "80vw",
  },
  "@media screen and (min-width: 1224px)": {
    marginLeft: "15vw",
    width: "85vw",
  },
});
const IsMobile = styled.div({
  "@media screen and (min-width: 600px)": {
    display: "none",
  },
});
const IsDesktop = styled.div({
  display: "none",
  "@media screen and (min-width: 600px)": {
    display: "block",
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 4,
    },
  },
});
const App = () => {
  return (
    <div id="app">
      <Router>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <AuthContextProvider>
            <HorseContextProvider>
              <ShopContextProvider>
                <IsMobile>
                  <MobileNavbar />
                </IsMobile>
                <IsDesktop>
                  <DesktopNavbar />
                </IsDesktop>
                <Main>
                  <Switch>
                    <Route exact path="/">
                      <HomePage />
                    </Route>
                    <Route exact path="/horses">
                      <HorsePage />
                    </Route>
                    <Route exact path="/statistic">
                      <StatisticPage />
                    </Route>
                    <Route exact path="/results">
                      <ResultsPage />
                    </Route>
                    <Route exact path="/login">
                      <LogInComp />
                    </Route>
                    <Route exact path="/signup">
                      <SignUpComp />
                    </Route>
                    <Route exact path="/game">
                      <GamePage />
                    </Route>
                    <Route exact path="/myprofile">
                      <MyProfilePage />
                    </Route>
                    <Route exact path="/myprofile/orderhistory">
                      <OrderHistoryPage />
                    </Route>
                    <Route exact path="/shop">
                      <ShopPage />
                    </Route>
                    <Route exact path="/logout">
                      <LogOutPage />
                    </Route>
                  </Switch>
                  {/* <Footer /> */}
                </Main>
              </ShopContextProvider>
            </HorseContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
};

export default App;
