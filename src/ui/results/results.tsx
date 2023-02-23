import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { t } from "i18next";
import React from "react";
import { useSession } from "../../lib/session-context";
import { Answer, GroupState, User } from "../../__generated__/graphql";
import styled from "styled-components";

const UserName = styled.span`
	font-weight: bold;
	margin-right: 8px;
`;

interface ResultsProps {
	returnToLobby: () => void;
}

export default function Results({ returnToLobby }: ResultsProps) {
	const session = useSession();
	const users = session.group!.users.slice();
	users.sort(compareUsers);
	const userAnswers = new Map<string, Answer>();
	for (const answer of session.group!.question!.answers) {
		for (const answerUser of answer.users!) {
			userAnswers.set(answerUser!.id, answer);
		}
	}
	return (
		<Stack>
			<Typography variant="h4" gutterBottom mb={2}>
				{t("results.round")} {session.group!.question!.round}/10
			</Typography>
			{users.map(user => (
				<Typography fontSize={24} gutterBottom my={1} key={user.id}>
					<UserName>{user.name}</UserName> {user.score || 0} - {userAnswers.get(user.id)?.text} (+
					{userAnswers.get(user.id)?.scoreDelta})
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
