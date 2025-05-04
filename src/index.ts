export interface IVote {
  id: string;
  roundId: string;
  userId: string;
  taskId: string;
  count?: number;
  spaceId: string;
  createdAt: Date;
}

export type ITask = {
  id: string;
  title: string;
  value: number;
};

export type ISpace = {
  id: string;
  name: string;
  roles: string[];
};

export interface ICurrentUser {
  id: string;
  displayName: string;
  email: string;
  deviceId: string;
  tenants: ISpace[];
}

export interface IUser {
  id: string;
  displayName: string;
}

export interface IRound {
  id: string;
  order: number;
  spaceId: string;
  endDate: Date;
  status?: "finished" | "active";
}

export interface IStats extends Record<string, {
  userId: number;
}> {}

export enum SpaceEventTypes {
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  VOTE = "VOTE",
  DELETE_VOTE = "DELETE_VOTE",
  RESET_VOTES = "RESET_VOTES",
  START_ROUND = "START_ROUND",
}

// RequestMessage

export type VoteMessageBody = {
  type: "minus" | "plus";
  taskId: string;
  currentUserId: string;
};

export type VoteDeleteMessageBody = {
  voteId: string;
};

// ResponseMessage
type ResponseMessageBase = {
  errorMessages?: { type: string; message: string }[];
};

export type VoteMessageResponse = ResponseMessageBase & {
  vote: IVote;
};

export type VoteDeleteMessageResponse = ResponseMessageBase & {
  voteId: string;
};

export type StartRoundResponseMessage = ResponseMessageBase & {
  round: IRound;
};

export type ConnectMessageResponse = ResponseMessageBase & {
  votes: IVote[];
  tasks: ITask[];
  users: IUser[];
  currentPeriod: IRound;
  stats: IStats;
};

export type ResetVotesMessageResponse = ResponseMessageBase & {
  votes: IVote[];
};

export type StartRoundMessageResponse = ResponseMessageBase & {
  round?: IRound;
};

export interface GameServerToClientEvents {
  [SpaceEventTypes.CONNECT]: (message: ConnectMessageResponse) => void;
  [SpaceEventTypes.DISCONNECT]: (message: any) => void;
  [SpaceEventTypes.START_ROUND]: (message: StartRoundMessageResponse) => void;
  [SpaceEventTypes.VOTE]: (message: VoteMessageResponse) => void;
  [SpaceEventTypes.DELETE_VOTE]: (message: VoteDeleteMessageResponse) => void;
  [SpaceEventTypes.RESET_VOTES]: (message: ResetVotesMessageResponse) => void;
}

export interface GameClientToServerEvents {
  [SpaceEventTypes.CONNECT]: (message: any) => void;
  [SpaceEventTypes.START_ROUND]: (message: any) => void;
  [SpaceEventTypes.VOTE]: (message: VoteMessageBody) => void;
  [SpaceEventTypes.DELETE_VOTE]: (message: VoteDeleteMessageBody) => void;
  [SpaceEventTypes.RESET_VOTES]: (message: any) => void;
}
