import { useMutation, useSubscription } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { User, Group } from "../__generated__/graphql";
import { ConnectionStatus, useConnection } from "./connection";
import { gql } from "../__generated__";
import { useNavigate } from "react-router-dom";

export interface Session {
	user?: User | null;
	group?: Group | null;
	createUser: (name: string) => Promise<boolean>;
	createGroup: () => void;
	joinGroup: (groupId: string) => void;
	leaveGroup: () => void;
	logout: () => void;
	markUserReady: (ready: boolean) => void;
	submitAnswer: (index: number) => void;
}

const SessionContext = React.createContext<Session>({} as Session);

export function SessionProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<User | undefined>();
	const [group, setGroup] = useState<Group | undefined>();
	const [createUser] = useMutation(CREATE_USER);
	const [createGroup, createGroupResponse] = useMutation(CREATE_GROUP);
	const [joinGroup, joinGroupResponse] = useMutation(JOIN_GROUP);
	const [leaveGroup] = useMutation(LEAVE_GROUP);
	const [logout] = useMutation(LOGOUT);
	const [markUserReady] = useMutation(MARK_USER_READY);
	const [submitAnswer] = useMutation(SUBMIT_ANSWER);
	const groupUpdated = useSubscription(GROUP_UPDATED, {
		skip: !user,
	});
	const connection = useConnection();
	const navigate = useNavigate();
	useEffect(() => {
		if (groupUpdated.data?.groupUpdated) {
			setGroup(groupUpdated.data.groupUpdated as unknown as Group);
		} else if (createGroupResponse.data?.createGroup) {
			setGroup(createGroupResponse.data.createGroup as unknown as Group);
		} else if (joinGroupResponse.data?.joinGroup) {
			setGroup(joinGroupResponse.data.joinGroup as unknown as Group);
		} else {
			setGroup(undefined);
		}
	}, [
		groupUpdated.data?.groupUpdated,
		createGroupResponse.data?.createGroup,
		joinGroupResponse.data?.joinGroup,
	]);

	useEffect(() => {
		if (connection.connectionStatus === ConnectionStatus.FATAL_ERROR) {
			setUser(undefined);
			setGroup(undefined);
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connection.connectionStatus]);

	const session: Session = {
		user,
		group,
		async createUser(name: string) {
			const result = await createUser({ variables: { name } });
			if (result.errors || !result.data) {
				console.error(result.errors);
				return false;
			}
			connection.setToken(result.data.createUser.token);
			setUser(result.data.createUser.user);
			localStorage.setItem("userName", name);
			return true;
		},
		async createGroup() {
			const result = await createGroup();
			if (result.data?.createGroup?.id) {
				setGroup(result.data.createGroup as unknown as Group);
				navigate(`/game/${result.data.createGroup.id}`);
			} else {
				setGroup(undefined);
				setUser(undefined);
				connection.setToken(undefined);
				navigate("/");
			}
		},
		async joinGroup(groupId: string) {
			const result = await joinGroup({ variables: { groupId } });
			if (result.data?.joinGroup?.id) {
				setGroup(result.data.joinGroup as unknown as Group);
				navigate(`/game/${result.data.joinGroup.id}`);
			}
		},
		async leaveGroup() {
			const result = await leaveGroup();
			if (!result.errors) {
				setGroup(undefined);
				navigate("/pickgroup");
			}
		},
		logout,
		async markUserReady(ready) {
			markUserReady({ variables: { ready } });
		},
		async submitAnswer(index) {
			submitAnswer({ variables: { answerIndex: index } });
		},
	};

	return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
	return useContext(SessionContext);
}

const CREATE_USER = gql(/* GraphQL */ `
	mutation CreateUser($name: String!) {
		createUser(name: $name) {
			token
			user {
				id
				name
			}
		}
	}
`);

const JOIN_GROUP = gql(`
	mutation JoinGroup($groupId: ID!) {
		joinGroup(groupId: $groupId) {
			id
			question {
				id
				round
				type
				end
				answers {
					index
					scoreDelta
					text
					users {
						id
					}
				}
			}
			state
			users {
				id
				name
				score
			}
		}
	}
`);

const CREATE_GROUP = gql(`
	mutation CreateGroup {
		createGroup {
			id
			question {
				id
				round
				type
				end
				answers {
					index
					scoreDelta
					text
					users {
						id
					}
				}
			}
			state
			users {
				id
				name
				score
			}
		}
	}
`);

const LEAVE_GROUP = gql(`
	mutation LeaveGroup {
		leaveGroup
	}
`);

const LOGOUT = gql(`
	mutation Logout {
		logout
	}
`);

const MARK_USER_READY = gql(`
	mutation MarkUserReady($ready: Boolean!) {
		markUserReady(ready: $ready)
	}
`);

const SUBMIT_ANSWER = gql(`
	mutation SubmitAnswer($answerIndex: Int!) {
		submitAnswer(answerIndex: $answerIndex)
	}
`);

const GROUP_UPDATED = gql(`
	subscription OnGroupUpdated {
		groupUpdated {
			id
			question {
				id
				round
				type
				end
				answers {
					index
					scoreDelta
					text
					users {
						id
					}
				}
			}
			state
			users {
				id
				name
				score
				ready
			}
		}
	} 
`);
