import React, { createContext, useContext, useState } from "react";

export interface JoinGroup {
	joinGroupId: string;
	setJoinGroupId: (groupId: string) => void;
}

const JoinGroupContext = createContext<JoinGroup>({} as JoinGroup);

export function JoinGroupProvider({ children }: React.PropsWithChildren) {
	const [joinGroupId, setJoinGroupId] = useState<string>("");
	const joinGroup = {
		joinGroupId,
		setJoinGroupId,
	};
	return <JoinGroupContext.Provider value={joinGroup}>{children}</JoinGroupContext.Provider>;
}

export function useJoinGroupId() {
	return useContext(JoinGroupContext);
}
