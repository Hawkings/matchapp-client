import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { t } from "i18next";
import React from "react";
import { useSession } from "../../lib/session-context";
import { GroupState, User } from "../../__generated__/graphql";

interface ResultsProps {
	returnToLobby: () => void;
}

export default function Results({ returnToLobby }: ResultsProps) {
	const session = useSession();
	const users = session.group!.users.slice();
	users.sort(compareUsers);
	return (
		<Stack>
			<Typography variant="h4" gutterBottom>
				{session.group!.question!.round}/10
			</Typography>
			{users.map(user => (
				<Typography variant="h3" gutterBottom key={user.id}>
					{user.name} {user.score || 0}
				</Typography>
			))}
			{session.group?.state === GroupState.FinalResults ? (
				<Button onClick={returnToLobby}>{t("results.playAgainButton")}</Button>
			) : null}
		</Stack>
	);
}

function compareUsers(a: User, b: User) {
	if (typeof a.score === "number" && typeof b.score === "number" && a.score !== b.score) {
		return b.score - a.score;
	} else {
		return b.name.localeCompare(a.name);
	}
}
