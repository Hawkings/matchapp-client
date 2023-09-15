import { Button, Stack, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";
import { useSession } from "../../lib/session-context";
import { User } from "../../__generated__/graphql";
import { ConnectionStatus, useConnection } from "../../lib/connection";

export default function Lobby() {
	const [ready, setReady] = useState(false);
	const theme = useTheme();
	const session = useSession();
	const connection = useConnection();

	const sortedUsers = session.group!.users;
	sortedUsers.sort(compareUsers);
	const playerList = sortedUsers.map(user => (
		<Typography
			fontSize={24}
			key={user.id}
			color={user.ready ? theme.palette.primary.light : theme.palette.error.light}
		>
			{user.name} {user.ready ? "✔" : "⌛"}
		</Typography>
	));

	if (ready) {
		return (
			<Stack spacing={2}>
				<Typography fontSize={24}>{t("lobby.waiting")}</Typography>
				<Button
					variant="contained"
					onClick={() => {
						setReady(false);
						session.markUserReady(false);
					}}
					disabled={connection.status !== ConnectionStatus.CONNECTED}
				>
					{t("lobby.notReadyButton")}
				</Button>
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
					disabled={connection.status !== ConnectionStatus.CONNECTED}
				>
					{t("lobby.readyButton")}
				</Button>
				{playerList}
			</Stack>
		);
	}
}

function compareUsers(a: User, b: User) {
	if (a.ready) {
		return b.ready ? 0 : 1;
	} else {
		return b.ready ? -1 : 0;
	}
}
