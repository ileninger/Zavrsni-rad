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

import PodaciZaObracunePregled from "./pages/podacizaobracune/PodaciZaObracunePregled"
import PodaciZaObracuneDodaj from "./pages/podacizaobracune/PodaciZaObracuneDodaj"
import PodaciZaObracunePromjeni from "./pages/podacizaobracune/PodaciZaObracunePromjeni"

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element ={<Pocetna/>} />

        <Route path={RoutesNames.RADNICI_PREGLED} element ={<RadniciPregled/>} />
        <Route path={RoutesNames.RADNICI_DODAJ} element ={<RadniciDodaj/>} />
        <Route path={RoutesNames.RADNICI_PROMJENI} element ={<RadniciPomjeni/>} />

        <Route path={RoutesNames.PODACIZAOBRACUNE_PREGLED} element ={<PodaciZaObracunePregled/>} />
        <Route path={RoutesNames.PODACIZAOBRACUNE_DODAJ} element ={<PodaciZaObracuneDodaj/>} />
        <Route path={RoutesNames.PODACIZAOBRACUNE_PROMJENI} element ={<PodaciZaObracunePromjeni/>} />


      </Routes>
    </>
  )
}

export default App
