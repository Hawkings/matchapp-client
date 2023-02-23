import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useJoinGroupId } from "../../join-group-context";
import { useSession } from "../../lib/session-context";
import Loader from "../loader";

export default function GroupPicker() {
	const { t } = useTranslation();
	const { joinGroupId, setJoinGroupId } = useJoinGroupId();
	const groupCodeRef = useRef<HTMLInputElement>();
	const [joinError, setJoinError] = useState(false);
	const helperText = joinError ? t("group_picker.invalid_group_code") : undefined;
	const session = useSession();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	function joinGroup() {
		if (groupCodeRef.current?.value) {
			session.joinGroup(groupCodeRef.current.value);
		} else {
			setJoinError(true);
		}
	}

	function createGroup() {
		session.createGroup();
	}

	useEffect(() => {
		if (joinGroupId) {
			session.joinGroup(joinGroupId);
			setJoinGroupId("");
		}
		if (!session.user) {
			navigate("/");
		}
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<Stack spacing={1}>
			<Typography variant="body1">{t("group_picker.join_a_group")}</Typography>
			<TextField
				label={t("group_picker.group_code")}
				variant="outlined"
				inputRef={groupCodeRef}
				error={joinError}
				onKeyDown={e => {
					if (e.key === "Enter") {
						joinGroup();
					}
				}}
				onInput={() => setJoinError(false)}
				helperText={helperText}
				defaultValue={joinGroupId}
			/>
			<Button variant="contained" onClick={joinGroup}>
				{t("group_picker.join_button")}
			</Button>
			<Box py={4}>
				<Typography variant="body1" mx="auto" width="max-content">
					{t("group_picker.or")}
				</Typography>
			</Box>
			<Button variant="contained" onClick={createGroup}>
				{t("group_picker.new_group_button")}
			</Button>
		</Stack>
	);
}
