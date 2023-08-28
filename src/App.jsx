import { useEffect} from "react";
import "./App.css";
import MainResults from "./components/MainResults";
import Sidebar from "./components/Sidebar";
import { useWeather } from "./context/WeatherContext";
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const { setUbicacion, setBuscarPorCoordenadas } =
    useWeather();

  useEffect(() => {
         // Solicitar autorización para acceder a la ubicación del usuario
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Aquí puedes actualizar el contexto con las coordenadas obtenidas
            setUbicacion({ lat: latitude, lon: longitude });
           // Indicar que la búsqueda se basa en coordenadas
            setBuscarPorCoordenadas(true);
          },
          (error) => {
            // Manejar errores, por ejemplo, si el usuario niega la autorización
            console.error("Error al obtener la ubicación:", error.message);
            if(error.code===1){
              alert("El acceso del GPS fue denegado")
            }else{
              console.error("Error al obtener la ubicacion "+error.message)
            }
          }
        );
      } else {
        // El navegador no admite geolocalización
        console.error("El navegador no admite la geolocalización.");        
      }
  }, []);
 

  return (
      <div className="md:flex">      
          <Sidebar/>
          <MainResults />        
      </div>
  );
}

export default App;
