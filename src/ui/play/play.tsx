import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSession } from "../../lib/session-context";
import { QuestionType } from "../../__generated__/graphql";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

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
	const theme = useTheme();
	const question = session.group?.question!;
	function select(index: number) {
		session.submitAnswer(index);
		setVoted(true);
	}
	if (voted) {
		return (
			<Stack>
				<Typography fontSize={30}>{t("play.wait")}</Typography>
			</Stack>
		);
	} else {
		return (
			<Stack>
				<Typography fontSize={30} mb={4}>
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
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-evenly"
					flexWrap="wrap"
					mb={6}
					gap={4}
				>
					{question.answers.map((answer, i) => (
						<Button
							sx={{ backgroundColor: theme.palette.grey[200], fontSize: 40 }}
							key={answer.text}
							variant="outlined"
							onClick={() => select(i)}
						>
							{answer.text}
						</Button>
					))}
				</Stack>
			</Stack>
		);
	}
}
