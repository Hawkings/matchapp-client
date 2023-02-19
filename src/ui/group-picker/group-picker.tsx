import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "../../lib/session-context";

export default function GroupPicker() {
	const { t } = useTranslation();
	const groupCodeRef = useRef<HTMLInputElement>();
	const [joinError, setJoinError] = useState(false);
	const helperText = joinError ? t("group_picker.invalid_group_code") : undefined;
	const { setGroup } = useSession();

	function joinGroup() {
		if (groupCodeRef.current?.value) {
			setGroup({
				id: "1",
			});
		} else {
			setJoinError(true);
		}
	}

	function createGroup() {
		setGroup({
			id: "2",
		});
	}

	return (
		<Stack>
			<Typography variant="h4">{t("group_picker.join_a_group")}</Typography>
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
			/>
			<Button variant="contained" onClick={joinGroup}>
				{t("group_picker.join_button")}
			</Button>
			<Typography variant="h4">{t("group_picker.or")}</Typography>
			<Button variant="contained" onClick={createGroup}>
				{t("group_picker.new_group_button")}
			</Button>
		</Stack>
	);
}
