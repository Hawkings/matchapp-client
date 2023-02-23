import { Button, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";
import { useSession } from "../../lib/session-context";

export default function Lobby() {
	const [ready, setReady] = useState(false);
	const session = useSession();

	const playerList = session.group!.users.map(user => (
		<Typography fontSize={24} key={user.id}>
			{user.name}
		</Typography>
	));

	if (ready) {
		return (
			<Stack spacing={2}>
				<Typography fontSize={24}>{t("lobby.waiting")}</Typography>
				{playerList}
			</Stack>
		);
	} else {
		return (
			<Stack spacing={2}>
				<Typography fontSize={24}>{t("lobby.getReady")}</Typography>
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
