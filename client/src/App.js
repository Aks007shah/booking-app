import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navabr from "./components/Navabr";
import HomeStatic from "./pages/HomeStatic";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./pages/Account";
import BookingScreen from "./pages/BookingScreen";
import ProfileScreen from "./pages/ProfileScreen";
import AdminScreen from "./pages/AdminScreen";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navabr />
      <Routes>
        <Route path="/home" element={<HomeStatic />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute><AdminScreen /></ProtectedRoute> } />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/bookingscreen/:roomid/:fromdate/:todate" element={<BookingScreen />} />
        <Route path="/account" element={<Account />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
