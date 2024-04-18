import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Radnici from "./pages/radnici/RadniciPregled"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import RadniciDodaj from "./pages/radnici/RadniciDodaj"
import RadniciPomjeni from "./pages/radnici/RadniciPomjeni"
import RadniciPregled from "./pages/radnici/RadniciPregled"
import RadniciDetaljnije from "./pages/radnici/RadniciDetaljnije"

import PodaciZaObracunePregled from "./pages/podacizaobracune/PodaciZaObracunePregled"
import PodaciZaObracuneDodaj from "./pages/podacizaobracune/PodaciZaObracuneDodaj"
import PodaciZaObracunePromjeni from "./pages/podacizaobracune/PodaciZaObracunePromjeni"



import ObracunskoRazdobljePregled from "./pages/obracunskorazdoblje/ObracunskoRazdobljePregled"
import ObracunskoRazdobljeDodaj from "./pages/obracunskorazdoblje/ObracunskoRazdobljeDodaj"
import ObracunskoRazdobljePromjeni from "./pages/obracunskorazdoblje/ObracunskoRazdobljePromjeni"


import PlacaPregled from "./pages/placa/PlacaPregled"
import PlacaDodaj from "./pages/placa/PlacaDodaj"
import PlacaPomjeni from "./pages/placa/PlacaPomjeni"
import PlacaDetaljnije from "./pages/placa/PlacaDetaljnije"

import Login from "./pages/Login"
import useAuth from "./hooks/useAuth"
import LoadingSpinner from "./components/LoadingSpinner"

function App() {

  const { isLoggedIn } = useAuth();

  return (
    <>
      <LoadingSpinner/>
      <NavBar />
      <Routes>
      <Route path={RoutesNames.HOME} element={<Pocetna />} />
      {isLoggedIn ? (
        <>
        <Route path={RoutesNames.HOME} element ={<Pocetna/>} />

        <Route path={RoutesNames.RADNICI_PREGLED} element ={<RadniciPregled/>} />
        <Route path={RoutesNames.RADNICI_DODAJ} element ={<RadniciDodaj/>} />
        <Route path={RoutesNames.RADNICI_PROMJENI} element ={<RadniciPomjeni/>} />
        <Route path={RoutesNames.RADNICI_DETALJNIJE} element ={<RadniciDetaljnije/>} />

        <Route path={RoutesNames.PODACIZAOBRACUNE_PREGLED} element ={<PodaciZaObracunePregled/>} />
        <Route path={RoutesNames.PODACIZAOBRACUNE_DODAJ} element ={<PodaciZaObracuneDodaj/>} />
        <Route path={RoutesNames.PODACIZAOBRACUNE_PROMJENI} element ={<PodaciZaObracunePromjeni/>} />
        


        <Route path={RoutesNames.OBRACUNSKORAZDOBLJE_PREGLED} element ={<ObracunskoRazdobljePregled/>} />
        <Route path={RoutesNames.OBRACUNSKORAZDOBLJE_DODAJ} element ={<ObracunskoRazdobljeDodaj/>} />
        <Route path={RoutesNames.OBRACUNSKORAZDOBLJE_PROMJENI} element ={<ObracunskoRazdobljePromjeni/>} />

        <Route path={RoutesNames.PLACA_PREGLED} element ={<PlacaPregled/>} />
        <Route path={RoutesNames.PLACA_DODAJ} element ={<PlacaDodaj/>} />
        <Route path={RoutesNames.PLACA_PROMJENI} element ={<PlacaPomjeni/>} />
        <Route path={RoutesNames.PLACA_DETALJNIJE} element ={<PlacaDetaljnije/>} />

        </>
        ) : (
          <>
            <Route path={RoutesNames.LOGIN} element={<Login />} />
          </>
        )}

      </Routes>
    </>
  )
}

export default App
