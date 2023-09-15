/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type Answer = {
  __typename?: 'Answer';
  index?: Maybe<Scalars['Int']>;
  scoreDelta?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type AuthInfo = {
  __typename?: 'AuthInfo';
  token: Scalars['String'];
  user: User;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  question?: Maybe<Question>;
  state: GroupState;
  users: Array<User>;
};

export enum GroupState {
  FinalResults = 'FINAL_RESULTS',
  InProgress = 'IN_PROGRESS',
  ShowingResults = 'SHOWING_RESULTS',
  WaitingForPlayers = 'WAITING_FOR_PLAYERS'
}

export type Mutation = {
  __typename?: 'Mutation';
  createGroup?: Maybe<Group>;
  createUser: AuthInfo;
  joinGroup?: Maybe<Group>;
  leaveGroup?: Maybe<Scalars['Void']>;
  logout?: Maybe<Scalars['Void']>;
  markUserReady?: Maybe<Scalars['Void']>;
  submitAnswer?: Maybe<Scalars['Void']>;
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  groupId: Scalars['ID'];
};


export type MutationMarkUserReadyArgs = {
  ready: Scalars['Boolean'];
};


export type MutationSubmitAnswerArgs = {
  answerIndex: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  groupById?: Maybe<Group>;
};


export type QueryGroupByIdArgs = {
  id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Answer>;
  end: Scalars['String'];
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  round: Scalars['Int'];
  type: QuestionType;
};

export enum QuestionType {
  Agree = 'AGREE',
  Disagree = 'DISAGREE'
}

export type Subscription = {
  __typename?: 'Subscription';
  groupUpdated?: Maybe<Group>;
};

export type User = {
  __typename?: 'User';
  groupId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  ready?: Maybe<Scalars['Boolean']>;
  score?: Maybe<Scalars['Int']>;
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthInfo', token: string, user: { __typename?: 'User', id: string, name: string } } };

export type JoinGroupMutationVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', joinGroup?: { __typename?: 'Group', id: string, state: GroupState, question?: { __typename?: 'Question', id: string, round: number, type: QuestionType, end: string, answers: Array<{ __typename?: 'Answer', index?: number | null, scoreDelta?: number | null, text: string, users?: Array<{ __typename?: 'User', id: string } | null> | null }> } | null, users: Array<{ __typename?: 'User', id: string, name: string, score?: number | null, ready?: boolean | null }> } | null };

export type CreateGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup?: { __typename?: 'Group', id: string, state: GroupState, question?: { __typename?: 'Question', id: string, round: number, type: QuestionType, end: string, answers: Array<{ __typename?: 'Answer', index?: number | null, scoreDelta?: number | null, text: string, users?: Array<{ __typename?: 'User', id: string } | null> | null }> } | null, users: Array<{ __typename?: 'User', id: string, name: string, score?: number | null }> } | null };

export type LeaveGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup?: any | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: any | null };

export type MarkUserReadyMutationVariables = Exact<{
  ready: Scalars['Boolean'];
}>;


export type MarkUserReadyMutation = { __typename?: 'Mutation', markUserReady?: any | null };

export type SubmitAnswerMutationVariables = Exact<{
  answerIndex: Scalars['Int'];
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer?: any | null };

export type OnGroupUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnGroupUpdatedSubscription = { __typename?: 'Subscription', groupUpdated?: { __typename?: 'Group', id: string, state: GroupState, question?: { __typename?: 'Question', id: string, round: number, type: QuestionType, end: string, answers: Array<{ __typename?: 'Answer', index?: number | null, scoreDelta?: number | null, text: string, users?: Array<{ __typename?: 'User', id: string } | null> | null }> } | null, users: Array<{ __typename?: 'User', id: string, name: string, score?: number | null, ready?: boolean | null }> } | null };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const JoinGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"scoreDelta"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"ready"}}]}}]}}]}}]} as unknown as DocumentNode<JoinGroupMutation, JoinGroupMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"scoreDelta"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const LeaveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveGroup"}}]}}]} as unknown as DocumentNode<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MarkUserReadyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkUserReady"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ready"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markUserReady"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ready"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ready"}}}]}]}}]} as unknown as DocumentNode<MarkUserReadyMutation, MarkUserReadyMutationVariables>;
export const SubmitAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"answerIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerIndex"}}}]}]}}]} as unknown as DocumentNode<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const OnGroupUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnGroupUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"round"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"scoreDelta"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"ready"}}]}}]}}]}}]} as unknown as DocumentNode<OnGroupUpdatedSubscription, OnGroupUpdatedSubscriptionVariables>;