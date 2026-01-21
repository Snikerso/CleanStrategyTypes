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
  categoryId?: string;
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

export interface IStats extends Record<string, Record<string, number>> {}

export interface ICategory {
  id: string;
  name: string;
  spaceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum SpaceEventTypes {
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  VOTE = "VOTE",
  DELETE_VOTE = "DELETE_VOTE",
  RESET_VOTES = "RESET_VOTES",
  START_ROUND = "START_ROUND",
  PLAYER_ADDED = "PLAYER_ADDED",
  PLAYER_REMOVED = "PLAYER_REMOVED",
  TASK_CREATED = "TASK_CREATED",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_DELETED = "TASK_DELETED",
  TASK_CREATION_ERROR = "TASK_CREATION_ERROR",
  TASK_UPDATE_ERROR = "TASK_UPDATE_ERROR",
  TASK_DELETE_ERROR = "TASK_DELETE_ERROR",
  CATEGORY_CREATED = "CATEGORY_CREATED",
  CATEGORY_DELETED = "CATEGORY_DELETED",
  ASSING_TASK_TO_CATEGORY = "ASSING_TASK_TO_CATEGORY",
  REMOVE_TASK_FROM_CATEGORY = "REMOVE_TASK_FROM_CATEGORY",
  SPACE_ERROR = "SPACE_ERROR",
  CREATE_TASK = "CREATE_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  CREATE_CATEGORY = "CREATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}
//

// RequestMessage

export type VoteMessageBody = {
  type: "minus" | "plus";
  taskId: string;
  currentUserId: string;
};

export type VoteDeleteMessageBody = {
  voteId: string;
};

export type CreateTaskMessageBody = {
  title: string;
  description: string;
  value: number;
  categoryId?: string;
};

export type UpdateTaskMessageBody = {
  taskId: string;
  title: string;
  description: string;
  value: number;
};

export type DeleteTaskMessageBody = {
  taskId: string;
};

export type CreateCategoryMessageBody = {
  category: { name: string };
  taskIDs?: string[];
};

export type AssignTaskToCategoryMessageBody = {
  taskId: string;
  categoryId: string;
};

export type RemoveTaskFromCategoryMessageBody = {
  taskId: string;
  categoryId: string;
};

export type DeleteCategoryMessageBody = {
  categoryId: string;
};

// HTTP DTOs (shared)
export type CreateSpaceDto = {
  spaceName: string;
  taskTemplateId?: string;
  taskTemplate?: string;
};

export type InviteSpaceDto = {
  email: string;
};

export type CreatePlayerDto = {
  displayName: string;
};

export type UpdatePlayerDto = {
  displayName?: string;
};

export type SaveNotificationTokenDto = {
  token: string;
};

export type UpdateDisplayNameDto = {
  displayName: string;
};

export type SendPushNotificationDto = {
  pushToken: string;
  title: string;
  body: string;
  data?: Record<string, any>;
};

export type SendMultiplePushNotificationDto = {
  pushTokens: string[];
  title: string;
  body: string;
  data?: Record<string, any>;
};

export type GetReceiptsDto = {
  receiptIds: string[];
};

export type SpaceStatisticsQueryDto = {
  startDate: string; // ISO8601
  endDate: string; // ISO8601
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
  categories?: ICategory[];
};

export type ResetVotesMessageResponse = ResponseMessageBase & {
  votes: IVote[];
};

export type StartRoundMessageResponse = ResponseMessageBase & {
  round?: IRound;
};

export type PlayerAddedMessageResponse = ResponseMessageBase & {
  player: {
    id: string;
    displayName: string;
    userId?: string;
    email?: string;
  };
};

export type PlayerRemovedMessageResponse = ResponseMessageBase & {
  playerId: string;
};

export type TaskCreatedMessageResponse = ResponseMessageBase & {
  task: ITask;
};

export type TaskUpdatedMessageResponse = ResponseMessageBase & {
  task: ITask;
};

export type TaskDeletedMessageResponse = ResponseMessageBase & {
  taskId: string;
};

export type TaskCreationErrorMessageResponse = ResponseMessageBase & {
  message: string;
};

export type TaskUpdateErrorMessageResponse = ResponseMessageBase & {
  message: string;
};

export type TaskDeleteErrorMessageResponse = ResponseMessageBase & {
  message: string;
};

export type CategoryCreatedMessageResponse = ResponseMessageBase & {
  category: ICategory;
  updatedTaskIDs?: string[];
};

export type CategoryDeletedMessageResponse = ResponseMessageBase & {
  categoryId: string;
  tasks: ITask[];
};

export type AssignTaskToCategoryMessageResponse = ResponseMessageBase & {
  taskId: string;
  categoryId: string;
};

export type RemoveTaskFromCategoryMessageResponse = ResponseMessageBase & {
  taskId: string;
  categoryId: string;
};

export type SpaceErrorMessageResponse = ResponseMessageBase & {
  message: string;
};

export interface GameServerToClientEvents {
  [SpaceEventTypes.CONNECT]: (message: ConnectMessageResponse) => void;
  [SpaceEventTypes.DISCONNECT]: (message: any) => void;
  [SpaceEventTypes.START_ROUND]: (message: StartRoundMessageResponse) => void;
  [SpaceEventTypes.VOTE]: (message: VoteMessageResponse) => void;
  [SpaceEventTypes.DELETE_VOTE]: (message: VoteDeleteMessageResponse) => void;
  [SpaceEventTypes.RESET_VOTES]: (message: ResetVotesMessageResponse) => void;
  [SpaceEventTypes.PLAYER_ADDED]: (message: PlayerAddedMessageResponse) => void;
  [SpaceEventTypes.PLAYER_REMOVED]: (message: PlayerRemovedMessageResponse) => void;
  [SpaceEventTypes.TASK_CREATED]: (message: TaskCreatedMessageResponse) => void;
  [SpaceEventTypes.TASK_UPDATED]: (message: TaskUpdatedMessageResponse) => void;
  [SpaceEventTypes.TASK_DELETED]: (message: TaskDeletedMessageResponse) => void;
  [SpaceEventTypes.TASK_CREATION_ERROR]: (message: TaskCreationErrorMessageResponse) => void;
  [SpaceEventTypes.TASK_UPDATE_ERROR]: (message: TaskUpdateErrorMessageResponse) => void;
  [SpaceEventTypes.TASK_DELETE_ERROR]: (message: TaskDeleteErrorMessageResponse) => void;
  [SpaceEventTypes.CATEGORY_CREATED]: (message: CategoryCreatedMessageResponse) => void;
  [SpaceEventTypes.CATEGORY_DELETED]: (message: CategoryDeletedMessageResponse) => void;
  [SpaceEventTypes.ASSING_TASK_TO_CATEGORY]: (message: AssignTaskToCategoryMessageResponse) => void;
  [SpaceEventTypes.REMOVE_TASK_FROM_CATEGORY]: (message: RemoveTaskFromCategoryMessageResponse) => void;
  [SpaceEventTypes.SPACE_ERROR]: (message: SpaceErrorMessageResponse) => void;
}

export interface GameClientToServerEvents {
  [SpaceEventTypes.CONNECT]: (message: any) => void;
  [SpaceEventTypes.START_ROUND]: (message: any) => void;
  [SpaceEventTypes.VOTE]: (message: VoteMessageBody) => void;
  [SpaceEventTypes.DELETE_VOTE]: (message: VoteDeleteMessageBody) => void;
  [SpaceEventTypes.RESET_VOTES]: (message: any) => void;
  [SpaceEventTypes.CREATE_TASK]: (message: CreateTaskMessageBody) => void;
  [SpaceEventTypes.UPDATE_TASK]: (message: UpdateTaskMessageBody) => void;
  [SpaceEventTypes.DELETE_TASK]: (message: DeleteTaskMessageBody) => void;
  [SpaceEventTypes.CREATE_CATEGORY]: (message: CreateCategoryMessageBody) => void;
  [SpaceEventTypes.ASSING_TASK_TO_CATEGORY]: (message: AssignTaskToCategoryMessageBody) => void;
  [SpaceEventTypes.REMOVE_TASK_FROM_CATEGORY]: (message: RemoveTaskFromCategoryMessageBody) => void;
  [SpaceEventTypes.DELETE_CATEGORY]: (message: DeleteCategoryMessageBody) => void;
}
