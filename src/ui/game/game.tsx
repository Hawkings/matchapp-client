import { Button, Stack } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJoinGroupId } from "../../join-group-context";
import { useSession } from "../../lib/session-context";
import { GroupState } from "../../__generated__/graphql";
import Loader from "../loader";
import Lobby from "../lobby";
import Play from "../play";
import Results from "../results";
import Share from "../share/share";

function assumeExhaustive(_: never) {}

export default function Game() {
	const params = useParams();
	const { user, group, leaveGroup } = useSession();
	const joinGroupId = useJoinGroupId();
	const [returnToLobby, setReturnToLobby] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			if (params.groupId) {
				joinGroupId.setJoinGroupId(params.groupId);
			}
			navigate("/");
		} else if (!group) {
			navigate("/pickgroup");
		}
		if (returnToLobby && group?.state !== GroupState.FinalResults) {
			setReturnToLobby(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [!!user, params.groupId, !!group, group?.state, returnToLobby]);
	if (!group) {
		return <Loader />;
	}
	function renderMainAction() {
		if (returnToLobby && group!.state === GroupState.FinalResults) {
			return <Lobby />;
		}
		switch (group!.state) {
			case GroupState.WaitingForPlayers:
				return <Lobby />;
			case GroupState.InProgress:
				return <Play />;
			case GroupState.ShowingResults:
			case GroupState.FinalResults:
				return <Results returnToLobby={() => setReturnToLobby(true)} />;
			default:
				assumeExhaustive(group!.state);
		}
	}
	return (
		<Stack spacing={4}>
			<Share groupId={group.id} />
			{renderMainAction()}
			<Button onClick={leaveGroup}>{t("game.leaveGroupButton")}</Button>
		</Stack>
	);
}
