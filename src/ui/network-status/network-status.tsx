import React from "react";
import { ReactComponent as ConnectionOkIcon } from "./connection-ok.svg";
import { ReactComponent as ConnectionErrorIcon } from "./connection-error.svg";
import { ConnectionStatus, useConnection } from "../../lib/connection";
import styled, { css } from "styled-components";

const iconStyles = css`
	width: 32px;
	height: 32px;
`;

const OkIcon = styled(ConnectionOkIcon)`
	${iconStyles}
	color: green;
`;

const ErrorIcon = styled(ConnectionErrorIcon)`
	${iconStyles}
	color: red;
`;

const IconContainer = styled("div")`
	position: fixed;
	top: 20px;
	left: 20px;
`;

export default function NetworkStatus() {
	const connection = useConnection();
	return (
		<IconContainer className="fixed">
			{connection.connectionStatus === ConnectionStatus.CONNECTED ? <OkIcon /> : <ErrorIcon />}
		</IconContainer>
	);
}
