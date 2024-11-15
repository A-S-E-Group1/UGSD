import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ViewAthlete from "./pages/view-athlete";
import AddAthlete from "./pages/add-athlete";
import Activities from "./pages/calendar";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import EditAthlete from "./pages/edit-athlete";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicHome from "./pages/public/home";
import SearchPage from "./pages/search";
import CalendarComponent from "./components/calendar/calendar";
import PublicCalendar from "./components/calendar/publicCalender";

function App() {
  return (
    <Routes>
      {/* Public routes accessible to all users */}
      <Route path="/" element={<PublicHome />}>
        <Route index element={<SearchPage />} />
        {/* Public calendar accessible via the /activities path */}
        <Route path="activities" element={<PublicCalendar />} />
      </Route>

      {/* Admin routes protected with authentication */}
      <Route path="/admin" element={<ProtectedRoute children={<Home />} />}>
        <Route index element={<ViewAthlete />} />
        <Route path="add" element={<AddAthlete />} />
        <Route path="activities" element={<Activities />} />
        <Route path="edit/:id" element={<EditAthlete />} />
        <Route path="search" element={<SearchPage />} />
        {/* Admin calendar under /admin/calendar */}
        <Route path="calendar" element={<CalendarComponent />} />
      </Route>

      {/* Public routes */}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
