import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ViewAthlete from "./pages/view-athlete";
import AddAthlete from "./pages/add-athlete";
import Activities from "./pages/activities";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import EditAthlete from "./pages/edit-athlete";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicHome from "./pages/public/home";
import SearchPage from "./pages/search";



function App() {
	return (
		<Routes>
			<Route path="/" element={<PublicHome />}>
				<Route index element={<SearchPage />} />
				<Route path="activities" element={<Activities />} />
			</Route>
			<Route path="/admin" element={<ProtectedRoute children={<Home />} />}>
				<Route index element={<ViewAthlete />} />
				<Route path="add" element={<AddAthlete />} />
				<Route path="activities" element={<Activities />} />
				<Route path="edit/:id" element={<EditAthlete />} />
				<Route path="search" element={<SearchPage />} />
			</Route>
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/reset-password" element={<ResetPassword />} />
		</Routes>
	);
}

export default App;
