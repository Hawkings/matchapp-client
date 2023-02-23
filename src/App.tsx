import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import UserPicker from "./ui/user-picker";
import { Route, Routes } from "react-router-dom";
import GroupPicker from "./ui/group-picker";
import Game from "./ui/game";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<CssBaseline />
			<Routes>
				<Route index element={<UserPicker />} />
				<Route path="game/:groupId" element={<Game />} />
				<Route path="pickgroup" element={<GroupPicker />} />
			</Routes>
		</Container>
	);
}

export default App;
