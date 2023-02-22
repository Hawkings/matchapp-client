import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "../../lib/session-context";
import { QuestionType } from "../../__generated__/graphql";

export default function Play() {
	const { t } = useTranslation();
	const [voted, setVoted] = useState(false);
	const session = useSession();
	const question = session.group?.question!;
	function select(index: number) {
		session.submitAnswer(index);
		setVoted(true);
	}
	const text =
		session.group?.question?.type === QuestionType.Agree ? t("game.agree") : t("game.disagree");
	if (voted) {
		return (
			<Stack>
				<Typography variant="h2">{t("game.wait")}</Typography>
			</Stack>
		);
	} else {
		return (
			<Stack>
				<Typography variant="h2">{text}</Typography>
				<Stack direction="row">
					{question.answers.map((answer, i) => (
						<Button key={answer.text} variant="outlined" onClick={() => select(i)}>
							{answer.text}
						</Button>
					))}
				</Stack>
			</Stack>
		);
	}
}
