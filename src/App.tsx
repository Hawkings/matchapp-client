import React, { useEffect } from "react";
import "./App.css";
import { Container } from "@mui/material";
import UserPicker from "./ui/user-picker";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loader from "./ui/loader";
import { useSession } from "./lib/session-context";
import GroupPicker from "./ui/group-picker";
import { GroupState } from "./__generated__/graphql";
import Game from "./ui/game";

function assumeExhaustive(_: never) {}

function App() {
	const { user, group } = useSession();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate("pickuser");
		} else if (!group) {
			navigate("pickgroup");
		} else {
			switch (group.state) {
				case GroupState.WaitingForPlayers:
					navigate("lobby");
					break;
				case GroupState.InProgress:
					navigate("game");
					break;
				case GroupState.ShowingResults:
				case GroupState.FinalResults:
					navigate("results");
					break;
				default:
					assumeExhaustive(group.state);
			}
		}
	}, [user, group?.state]);
	return (
		<Container>
			<Routes>
				<Route index element={<Loader />} />
				<Route path="pickuser" element={<UserPicker />} />
				<Route path="lobby" element={<GroupPicker />} />
				<Route path="game" element={<Game />} />
			</Routes>
		</Container>
	);
}

export default App;
