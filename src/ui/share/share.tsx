import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";

export interface ShareProps {
	groupId: string;
}

const CAN_SHARE =
	navigator.canShare &&
	navigator.canShare({
		url: "https://emojis.hawkings.dev/game/12",
	});

export default function Share({ groupId }: ShareProps) {
	function share() {
		navigator.share({
			url: `https://emojis.hawkings.dev/game/${groupId}`,
		});
	}
	if (CAN_SHARE) {
		return (
			<Button variant="outlined" onClick={share}>
				{t("share.shareButton")}
			</Button>
		);
	} else {
		return (
			<Typography>
				{t("share.gameCode", { groupId })}.
				<Button variant="outlined" href={`https://emojis.hawkings.dev/game/${groupId}`}>
					{t("share.copyButton")}
				</Button>
			</Typography>
		);
	}
}
