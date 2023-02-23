/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\tmutation CreateUser($name: String!) {\n\t\tcreateUser(name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tmutation JoinGroup($groupId: ID!) {\n\t\tjoinGroup(groupId: $groupId) {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n": types.JoinGroupDocument,
    "\n\tmutation CreateGroup {\n\t\tcreateGroup {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n": types.CreateGroupDocument,
    "\n\tmutation LeaveGroup {\n\t\tleaveGroup\n\t}\n": types.LeaveGroupDocument,
    "\n\tmutation Logout {\n\t\tlogout\n\t}\n": types.LogoutDocument,
    "\n\tmutation MarkUserReady($ready: Boolean!) {\n\t\tmarkUserReady(ready: $ready)\n\t}\n": types.MarkUserReadyDocument,
    "\n\tmutation SubmitAnswer($answerIndex: Int!) {\n\t\tsubmitAnswer(answerIndex: $answerIndex)\n\t}\n": types.SubmitAnswerDocument,
    "\n\tsubscription OnGroupUpdated {\n\t\tgroupUpdated {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t\tready\n\t\t\t}\n\t\t}\n\t} \n": types.OnGroupUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateUser($name: String!) {\n\t\tcreateUser(name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($name: String!) {\n\t\tcreateUser(name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation JoinGroup($groupId: ID!) {\n\t\tjoinGroup(groupId: $groupId) {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation JoinGroup($groupId: ID!) {\n\t\tjoinGroup(groupId: $groupId) {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateGroup {\n\t\tcreateGroup {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateGroup {\n\t\tcreateGroup {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LeaveGroup {\n\t\tleaveGroup\n\t}\n"): (typeof documents)["\n\tmutation LeaveGroup {\n\t\tleaveGroup\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Logout {\n\t\tlogout\n\t}\n"): (typeof documents)["\n\tmutation Logout {\n\t\tlogout\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation MarkUserReady($ready: Boolean!) {\n\t\tmarkUserReady(ready: $ready)\n\t}\n"): (typeof documents)["\n\tmutation MarkUserReady($ready: Boolean!) {\n\t\tmarkUserReady(ready: $ready)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SubmitAnswer($answerIndex: Int!) {\n\t\tsubmitAnswer(answerIndex: $answerIndex)\n\t}\n"): (typeof documents)["\n\tmutation SubmitAnswer($answerIndex: Int!) {\n\t\tsubmitAnswer(answerIndex: $answerIndex)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tsubscription OnGroupUpdated {\n\t\tgroupUpdated {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t\tready\n\t\t\t}\n\t\t}\n\t} \n"): (typeof documents)["\n\tsubscription OnGroupUpdated {\n\t\tgroupUpdated {\n\t\t\tid\n\t\t\tquestion {\n\t\t\t\tid\n\t\t\t\tround\n\t\t\t\ttype\n\t\t\t\tend\n\t\t\t\tanswers {\n\t\t\t\t\tindex\n\t\t\t\t\tscoreDelta\n\t\t\t\t\ttext\n\t\t\t\t\tusers {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tstate\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tscore\n\t\t\t\tready\n\t\t\t}\n\t\t}\n\t} \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;