import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Health from './pages/Health';
import Expenses from './pages/Expenses';
import Assistant from './pages/Assistant';
import Alerts from './pages/Alerts';
import RegisterVehicle from './pages/RegisterVehicle';
import AddFuel from './pages/AddFuel';
import FuelHistory from './pages/FuelHistory';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/register" element={<RegisterVehicle />} />
          <Route path="/add-fuel" element={<AddFuel />} />
          <Route path="/fuel-history" element={<FuelHistory />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}