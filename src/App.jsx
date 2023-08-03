import { useState } from "react";
import "./App.css";
import MainResults from "./components/MainResults";
import Sidebar from "./components/Sidebar";
import WeatherSearch from "./components/WeatherSearch";
import { DataProvider } from "./context/dataContext";
// import {DataProvider} from './context/DataContext'

function App() {

  return (
    <DataProvider>
      <WeatherSearch />
      <div className="md:flex">
        <Sidebar/>
        <MainResults />
      </div>
    </DataProvider>
  );
}

export default App;
