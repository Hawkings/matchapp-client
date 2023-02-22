import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSession } from "../../lib/session-context";
import { QuestionType } from "../../__generated__/graphql";
import styled from "styled-components";

const GreenText = styled.span`
	color: #9ccc65;
	font-weight: bold;
`;

const RedText = styled.span`
	color: #ef5350;
	font-weight: bold;
`;

export default function Play() {
	const { t } = useTranslation();
	const [voted, setVoted] = useState(false);
	const session = useSession();
	const question = session.group?.question!;
	function select(index: number) {
		session.submitAnswer(index);
		setVoted(true);
	}
	if (voted) {
		return (
			<Stack>
				<Typography variant="h2">{t("play.wait")}</Typography>
			</Stack>
		);
	} else {
		return (
			<Stack>
				<Typography variant="h2">
					{session.group?.question?.type === QuestionType.Agree ? (
						<Trans i18nKey="play.questionAgree">
							Pick the option you think will be the <GreenText>most</GreenText> voted
						</Trans>
					) : (
						<Trans i18nKey="play.questionDisagree">
							Pick the option you think will be the <RedText>least</RedText> voted
						</Trans>
					)}
				</Typography>
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
