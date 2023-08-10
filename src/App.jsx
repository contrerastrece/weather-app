import "./App.css";
import MainResults from "./components/MainResults";
import Sidebar from "./components/Sidebar";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <DataProvider>      
      <div className="md:flex">
        <Sidebar/>
        <MainResults />
      </div>
    </DataProvider>
  );
}

export default App;
