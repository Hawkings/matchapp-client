import { Stack, Typography } from "@mui/material";
import React from "react";
import { useSession } from "../../lib/session-context";
import { User } from "../../__generated__/graphql";

export default function() {
	const session = useSession();
	const users = session.group!.users.slice();
	users.sort(compareUsers);
	return (
		<Stack>
			<Typography variant="h4" gutterBottom>
				{session.group!.question!.round}/10
			</Typography>
			{users.map(user => (
				<Typography variant="h3" gutterBottom>
					{user.name} {user.score || 0}
				</Typography>
			))}
		</Stack>
	);
}

function compareUsers(a: User, b: User) {
	if (typeof a.score === "number" && typeof b.score === "number" && a.score != b.score) {
		return b.score - a.score;
	} else {
		return b.name.localeCompare(a.name);
	}
}
