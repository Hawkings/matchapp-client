import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSession } from "../../lib/session-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

enum Status {
	DEFAULT,
	VALIDATING,
	ERROR_MISSING_USERNAME,
	SERVER_ERROR,
}

function isErrorStatus(status: Status) {
	switch (status) {
		case Status.SERVER_ERROR:
		case Status.ERROR_MISSING_USERNAME:
			return true;
		default:
			return false;
	}
}

export default function UserPicker() {
	const { t } = useTranslation();
	const userField = useRef<HTMLInputElement>(null);
	const [status, setStatus] = useState(Status.DEFAULT);
	const [shouldFocusInput, setShouldFocusInput] = useState(false);
	const session = useSession();
	const navigate = useNavigate();
	const helperText =
		status === Status.SERVER_ERROR ? t("user_picker.error_creating_user") : undefined;

	useEffect(() => {
		if (shouldFocusInput) {
			userField.current?.focus();
			setShouldFocusInput(false);
		}
	}, [shouldFocusInput]);

	async function validate() {
		if (userField.current?.value) {
			const username = userField.current.value;
			setStatus(Status.VALIDATING);
			const result = await session.createUser(username);
			if (!result) {
				setStatus(Status.SERVER_ERROR);
				setShouldFocusInput(true);
			} else {
				navigate("/pickgroup");
			}
		} else {
			setStatus(Status.ERROR_MISSING_USERNAME);
		}
	}

	return (
		<Stack spacing={4}>
			<TextField
				inputRef={userField}
				label={t("user_picker.username")}
				variant="outlined"
				defaultValue={localStorage.getItem("userName") || ""}
				error={isErrorStatus(status)}
				disabled={status === Status.VALIDATING}
				onInput={() => setStatus(Status.DEFAULT)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						validate();
					}
				}}
				helperText={helperText}
				autoFocus
				style={{ marginTop: "32px" }}
			/>
			<Button
				variant="contained"
				type="submit"
				onClick={() => validate()}
				disabled={status === Status.VALIDATING}
			>
				{t("user_picker.continue")}
			</Button>
		</Stack>
	);
}
