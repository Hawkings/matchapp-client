import { Button, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";
import { useSession } from "../../lib/session-context";

export default function Lobby() {
	const [ready, setReady] = useState(false);
	const session = useSession();

	const playerList = session.group!.users.map(user => (
		<Typography variant="h4" gutterBottom key={user.id}>
			{user.name}
		</Typography>
	));

	if (ready) {
		return (
			<Stack>
				<Typography variant="h3" gutterBottom>
					{t("lobby.waiting")}
				</Typography>
				{playerList}
			</Stack>
		);
	} else {
		return (
			<Stack>
				<Typography variant="h3" gutterBottom>
					{t("lobby.getReady")}
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						setReady(true);
						session.markUserReady(true);
					}}
				>
					{t("lobby.readyButton")}
				</Button>
				{playerList}
			</Stack>
		);
	}
}
