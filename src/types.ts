import SeamlessImmutable from 'seamless-immutable';
import { Channel } from './channel';
import { AxiosRequestConfig } from 'axios';

/**
 * Utility Types
 */

export type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;

export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type UnknownType = Record<string, unknown>;

/**
 * Response Types
 */

export type APIResponse = {
  duration: string;
};

export type AppSettingsAPIResponse = APIResponse & {
  app?: {
    channel_configs: {
      automod?: ChannelConfigAutomod;
      automod_behavior?: ChannelConfigAutomodBehavior;
      commands?: CommandVariants[];
      connect_events?: boolean;
      created_at?: string;
      max_message_length?: number;
      message_retention?: string;
      mutes?: boolean;
      name?: string;
      reactions?: boolean;
      read_events?: boolean;
      replies?: boolean;
      search?: boolean;
      typing_events?: boolean;
      updated_at?: string;
      uploads?: boolean;
      url_enrichment?: boolean;
    };
    disable_auth_checks?: boolean;
    disable_permissions_checks?: boolean;
    name?: string;
    organization?: string;
    policies?: Record<string, Policy[]>;
    push_notifications?: {
      apn?: APNConfig;
      firebase?: FirebaseConfig;
    };
    suspended?: boolean;
    suspended_explanation?: string;
    webhook_url?: string;
  };
};

export type ChannelResponse<
  ChannelType = UnknownType,
  UserType = UnknownType
> = ChannelType & {
  cid: string;
  frozen: boolean;
  id: string;
  type: string;
  config?: ChannelConfigWithInfo;
  created_at?: string;
  created_by?: UserResponse<UserType>;
  created_by_id?: string;
  deleted_at?: string;
  image?: string;
  invites?: string[];
  last_message_at?: string;
  member_count?: number;
  members?: ChannelMemberResponse<UserType>[];
  name?: string;
  team?: string;
  updated_at?: string;
};

export type ChannelAPIResponse<
  ChannelType = UnknownType,
  AttachmentType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType>;
  members: ChannelMemberResponse<UserType>[];
  messages: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>[];
  membership?: ChannelMembership<UserType>;
  read?: ReadResponse<UserType>[];
  watcher_count?: number;
  watchers?: UserResponse<UserType>[];
};

export type ChannelMemberAPIResponse<UserType = UnknownType> = APIResponse & {
  members: ChannelMemberResponse<UserType>[];
};

export type ChannelMemberResponse<UserType = UnknownType> = {
  created_at?: string;
  invite_accepted_at?: string;
  invite_rejected_at?: string;
  invited?: boolean;
  is_moderator?: boolean;
  role?: string;
  updated_at?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type CheckPushResponse = APIResponse & {
  device_errors?: {
    error_message?: string;
    provider?: string;
  };
  general_errors?: string[];
  rendered_apn_template?: string;
  rendered_firebase_template?: string;
};

export type CommandResponse = {
  args?: string;
  description?: string;
  name?: string;
  set?: string;
};

export type ConnectAPIResponse<UserType = UnknownType> = Promise<void | ConnectionOpen<
  UserType
>>;

export type CreateChannelResponse = Omit<GetChannelTypeResponse, 'commands'>;

export type DeleteChannelAPIResponse<
  ChannelType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType>;
};

export type EventAPIResponse<
  EventType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  event: Event<
    EventType,
    AttachmentType,
    ChannelType,
    MessageType,
    ReactionType,
    UserType
  >;
};

export type FlagMessageResponse<UserType> = {
  duration: string;
  flag: {
    created_at: string;
    created_by_automod: boolean;
    target_message_id: string;
    target_user: UserResponse<UserType>;
    updated_at: string;
    user: UserResponse<UserType>;
    approved_at?: string;
    rejected_at?: string;
    reviewed_at?: string;
    reviewed_by?: string;
  };
};

export type GetChannelTypeResponse = Omit<
  CreateChannelOptions,
  'client_id' | 'connect_events' | 'connection_id'
> & {
  created_at: string;
  duration: string;
  updated_at: string;
};

export type GetMultipleMessagesAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  messages: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>[];
};

export type GetReactionsAPIResponse<ReactionType, UserType> = APIResponse & {
  reactions: ReactionResponse<ReactionType, UserType>[];
};

export type GetRepliesAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  messages: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>[];
};

export type ImmutableMessageResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = SeamlessImmutable.Immutable<
  Omit<
    MessageResponse<MessageType, AttachmentType, ReactionType, UserType>,
    'created_at' | 'updated_at' | 'status'
  > & {
    __html: string;
    created_at: Date;
    status: string;
    updated_at: Date;
  }
>;

export type ListChannelResponse = {
  channel_types: Omit<CreateChannelOptions, 'client_id' | 'connection_id'> & {
    created_at: string;
    updated_at: string;
  };
  duration: string;
};

export type MuteChannelAPIResponse<
  AttachmentType,
  ChannelType,
  EventType,
  MessageType,
  ReactionType,
  UserType
> = APIResponse & {
  channel_mute: ChannelMute<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >;
  channel_mutes: ChannelMute<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >[];
  mute: MuteResponse<UserType>;
  own_user: OwnUserResponse<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >;
};

export type MessageResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = MessageBase<MessageType, AttachmentType> & {
  command?: string;
  created_at?: string;
  deleted_at?: string;
  latest_reactions?: ReactionResponse<ReactionType, UserType>[];
  mentioned_users?: UserResponse<UserType>[];
  own_reactions?: ReactionResponse<ReactionType, UserType>[];
  reaction_counts?: { [key: string]: number };
  reaction_scores?: { [key: string]: number };
  reply_count?: number;
  silent?: boolean;
  status?: string;
  type?: string;
  updated_at?: string;
  user?: UserResponse<UserType>;
};

export type MuteResponse<UserType> = {
  user: UserResponse<UserType>;
  created_at?: string;
  target?: UserResponse<UserType>;
  updated_at?: string;
};

export type MuteUserResponse<UserType> = {
  duration: string;
  mute: MuteResponse<UserType>;
  mutes: Array<Mute<UserType>>;
  own_user: UserResponse<UserType>;
};

export type OwnUserResponse<
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  EventType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = UserResponse<UserType> & {
  channel_mutes: ChannelMute<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >[];
  devices: Device<UserType>[];
  mutes: Mute<UserType>[];
  total_unread_count: number;
  unread_channels: number;
  unread_count: number;
};

export type ReactionAPIResponse<
  ReactionType = UnknownType,
  AttachmentType = UnknownType,
  MessageType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  message: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
  reaction: ReactionResponse<ReactionType, UserType>;
};

export type ReactionResponse<ReactionType, UserType> = Reaction<
  ReactionType,
  UserType
> & {
  created_at: string;
  updated_at: string;
};

export type ReadResponse<UserType> = {
  last_read: string;
  user: UserResponse<UserType>;
};

export type SearchAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  results: {
    message: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
  }[];
};

export type SendEventAPIResponse<T = string> = APIResponse & {
  event: Event<T>;
};

export type SendFileAPIResponse = SendImageAPIResponse;

export type SendImageAPIResponse = APIResponse & { file: string };

export type SendMessageAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  message: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
};

export type TruncateChannelAPIResponse<
  ChannelType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType>;
};

export type UpdateChannelAPIResponse<
  ChannelType,
  AttachmentType,
  MessageType,
  ReactionType,
  UserType
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType>;
  members: ChannelMemberResponse<UserType>[];
  message?: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
};

export type UserResponse<T> = User<T> & {
  created_at?: string;
  deactivated_at?: string;
  deleted_at?: string;
  last_active?: string;
  online?: boolean;
  updated_at?: string;
};

export type UpdateChannelResponse = Omit<
  CreateChannelOptions,
  'client_id' | 'connection_id'
> & {
  created_at: string;
  duration: string;
  updated_at: string;
};

/**
 * Option Types
 */

export type BanUserOptions<UserType> = UnBanUserOptions & {
  reason?: string;
  timeout?: number;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type ChannelOptions = {
  last_message_ids?: { [key: string]: string };
  limit?: number;
  message_limit?: number;
  offset?: number;
  presence?: boolean;
  recovery?: boolean;
  state?: boolean;
  watch?: boolean;
};

export type CreateChannelOptions = {
  automod?: ChannelConfigAutomod;
  automod_behavior?: ChannelConfigAutomodBehavior;
  client_id?: string;
  commands?: CommandVariants[];
  connect_events?: boolean;
  connection_id?: string;
  max_message_length?: number;
  message_retention?: string;
  mutes?: boolean;
  name?: string;
  permissions?: PermissionObject[];
  reactions?: boolean;
  read_events?: boolean;
  replies?: boolean;
  search?: boolean;
  typing_events?: boolean;
  uploads?: boolean;
  url_enrichment?: boolean;
};

export type CustomPermissionOptions = {
  name: string;
  resource: string;
  condition?: string;
  owner?: boolean;
  same_team?: boolean;
};

export type ChannelQueryOptions<ChannelType, UserType> = {
  client_id?: string;
  connection_id?: string;
  data?: ChannelResponse<ChannelType, UserType>;
  members?: PaginationOptions;
  messages?: PaginationOptions;
  presence?: boolean;
  state?: boolean;
  watch?: boolean;
  watchers?: PaginationOptions;
};

export type FlagMessageOptions<UserType> = {
  client_id?: string;
  connection_id?: string;
  created_by?: string;
  target_message_id?: string;
  target_user_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type InviteOptions<
  AttachmentType,
  ChannelType,
  MessageType,
  ReactionType,
  UserType
> = {
  accept_invite?: boolean;
  add_members?: string[];
  add_moderators?: string[];
  client_id?: string;
  connection_id?: string;
  data?: Omit<ChannelResponse<ChannelType, UserType>, 'id' | 'cid'>;
  demote_moderators?: string[];
  invites?: string[];
  message?: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
  reject_invite?: boolean;
  remove_members?: string[];
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MarkAllReadOptions<UserType> = {
  client_id?: string;
  connection_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MarkReadOptions<UserType> = {
  client_id?: string;
  connection_id?: string;
  message_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MuteUserOptions<UserType> = {
  client_id?: string;
  connection_id?: string;
  id?: string;
  reason?: string;
  target_user_id?: string;
  timeout?: number;
  type?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type PaginationOptions = {
  id_gt?: number;
  id_gte?: number;
  id_lt?: number;
  id_lte?: number;
  limit?: number;
  offset?: number;
};

export type SearchOptions = {
  limit?: number;
  offset?: number;
};

export type StreamChatOptions = AxiosRequestConfig & {
  browser?: boolean;
  logger?: Logger;
};

export type UnBanUserOptions = {
  client_id?: string;
  connection_id?: string;
  id?: string;
  target_user_id?: string;
  type?: string;
};

export type UpdateChannelOptions = Omit<CreateChannelOptions, 'name'> & {
  created_at?: string;
  updated_at?: string;
};

export type UserOptions = {
  limit?: number;
  offset?: number;
  presence?: boolean;
};

/**
 * Event Types
 */

export type ConnectionChangeEvent = {
  type: EventTypes;
  online?: boolean;
};

export type Event<
  EventType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = EventType & {
  type: EventTypes;
  channel?: ChannelResponse<ChannelType, UserType>;
  cid?: string;
  clear_history?: boolean;
  connection_id?: string;
  created_at?: string;
  me?: OwnUserResponse<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >;
  member?: ChannelMemberResponse<UserType>;
  message?: MessageResponse<MessageType, AttachmentType, ReactionType, UserType>;
  online?: boolean;
  reaction?: ReactionResponse<ReactionType, UserType>;
  received_at?: string | Date;
  unread_count?: number;
  user?: UserResponse<UserType>;
  user_id?: string;
  watcher_count?: number;
};

export type EventHandler<
  EventType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = (
  event: Event<
    EventType,
    AttachmentType,
    ChannelType,
    MessageType,
    ReactionType,
    UserType
  >,
) => void;

export type EventTypes =
  | 'all'
  | 'user.presence.changed'
  | 'user.watching.start'
  | 'user.watching.stop'
  | 'user.deleted'
  | 'user.updated'
  | 'user.banned'
  | 'user.unbanned'
  | 'typing.start'
  | 'typing.stop'
  | 'message.new'
  | 'message.updated'
  | 'message.deleted'
  | 'message.read'
  | 'reaction.new'
  | 'reaction.deleted'
  | 'reaction.updated'
  | 'member.added'
  | 'member.updated'
  | 'member.removed'
  | 'channel.created'
  | 'channel.updated'
  | 'channel.deleted'
  | 'channel.truncated'
  | 'channel.hidden'
  | 'channel.muted'
  | 'channel.unmuted'
  | 'channel.visible'
  | 'health.check'
  | 'notification.message_new'
  | 'notification.mark_read'
  | 'notification.invited'
  | 'notification.invite_accepted'
  | 'notification.added_to_channel'
  | 'notification.removed_from_channel'
  | 'notification.channel_deleted'
  | 'notification.channel_mutes_updated'
  | 'notification.channel_truncated'
  | 'notification.mutes_updated'
  | 'connection.changed'
  | 'connection.recovered';

/**
 * Filter Types
 */

export type AscDesc = 1 | -1;

export type ChannelFilters<
  ChannelType = UnknownType,
  UserType = UnknownType
> = QueryFilters<
  ContainsOperator<ChannelType> & {
    name?:
      | RequireOnlyOne<
          {
            $autocomplete?: ChannelResponse<ChannelType, UserType>['name'];
          } & QueryFilter<ChannelResponse<ChannelType, UserType>['name']>
        >
      | PrimitiveFilter<ChannelResponse<ChannelType, UserType>['name']>;
  } & {
      [Key in keyof Omit<ChannelResponse<{}, UserType>, 'name'>]:
        | RequireOnlyOne<QueryFilter<ChannelResponse<{}, UserType>[Key]>>
        | PrimitiveFilter<ChannelResponse<{}, UserType>[Key]>;
    }
>;

export type ContainsOperator<CustomType = {}> = {
  [Key in keyof CustomType]?: CustomType[Key] extends (infer ContainType)[]
    ?
        | RequireOnlyOne<
            {
              $contains?: ContainType extends object
                ? PrimitiveFilter<RequireAtLeastOne<ContainType>>
                : PrimitiveFilter<ContainType>;
            } & QueryFilter<PrimitiveFilter<ContainType>[]>
          >
        | PrimitiveFilter<PrimitiveFilter<ContainType>[]>
    : RequireOnlyOne<QueryFilter<CustomType[Key]>> | PrimitiveFilter<CustomType[Key]>;
};

export type MessageFilters<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = QueryFilters<
  ContainsOperator<MessageType> & {
    text?:
      | RequireOnlyOne<
          {
            $autocomplete?: MessageResponse<
              MessageType,
              AttachmentType,
              ReactionType,
              UserType
            >['text'];
            $q?: MessageResponse<
              MessageType,
              AttachmentType,
              ReactionType,
              UserType
            >['text'];
          } & QueryFilter<
            MessageResponse<MessageType, AttachmentType, ReactionType, UserType>['text']
          >
        >
      | PrimitiveFilter<
          MessageResponse<MessageType, AttachmentType, ReactionType, UserType>['text']
        >;
  } & {
      [Key in keyof Omit<
        MessageResponse<{}, AttachmentType, ReactionType, UserType>,
        'text'
      >]?:
        | RequireOnlyOne<
            QueryFilter<MessageResponse<{}, AttachmentType, ReactionType, UserType>[Key]>
          >
        | PrimitiveFilter<
            MessageResponse<{}, AttachmentType, ReactionType, UserType>[Key]
          >;
    }
>;

export type PrimitiveFilter<ObjectType> = ObjectType | null;

export type QueryFilter<ObjectType = string> = NonNullable<ObjectType> extends
  | string
  | number
  | boolean
  ? {
      $eq?: PrimitiveFilter<ObjectType>;
      $exists?: boolean;
      $gt?: PrimitiveFilter<ObjectType>;
      $gte?: PrimitiveFilter<ObjectType>;
      $in?: PrimitiveFilter<ObjectType>[];
      $lt?: PrimitiveFilter<ObjectType>;
      $lte?: PrimitiveFilter<ObjectType>;
      $ne?: PrimitiveFilter<ObjectType>;
      $nin?: PrimitiveFilter<ObjectType>[];
    }
  : {
      $eq?: PrimitiveFilter<ObjectType>;
      $exists?: boolean;
      $in?: PrimitiveFilter<ObjectType>[];
      $ne?: PrimitiveFilter<ObjectType>;
      $nin?: PrimitiveFilter<ObjectType>[];
    };

export type QueryFilters<Operators = {}> = {
  [Key in keyof Operators]?: Operators[Key];
} &
  QueryLogicalOperators<Operators>;

export type QueryLogicalOperators<Operators> = {
  $and?: ArrayOneOrMore<QueryFilters<Operators>>;
  $nor?: ArrayOneOrMore<QueryFilters<Operators>>;
  $or?: ArrayTwoOrMore<QueryFilters<Operators>>;
};

export type UserFilters<UserType = UnknownType> = QueryFilters<
  ContainsOperator<UserType> & {
    id?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['id'] } & QueryFilter<
            UserResponse<UserType>['id']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['id']>;
    name?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['name'] } & QueryFilter<
            UserResponse<UserType>['name']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['name']>;
    teams?:
      | RequireOnlyOne<{
          $contains?: PrimitiveFilter<string>;
          $eq?: PrimitiveFilter<UserResponse<UserType>['teams']>;
        }>
      | PrimitiveFilter<UserResponse<UserType>['teams']>;
    username?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['username'] } & QueryFilter<
            UserResponse<UserType>['username']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['username']>;
  } & {
      [Key in keyof Omit<UserResponse<{}>, 'id' | 'name' | 'teams' | 'username'>]?:
        | RequireOnlyOne<QueryFilter<UserResponse<{}>[Key]>>
        | PrimitiveFilter<UserResponse<{}>[Key]>;
    }
>;

/**
 * Sort Types
 */

export type ChannelSort<ChannelType = Record<string, unknown>> = Sort<ChannelType> & {
  created_at?: AscDesc;
  has_unread?: AscDesc;
  last_message_at?: AscDesc;
  last_updated?: AscDesc;
  member_count?: AscDesc;
  unread_count?: AscDesc;
  updated_at?: AscDesc;
};

export type Sort<T> = {
  [P in keyof T]?: AscDesc;
};

export type UserSort<UserType> = Sort<UserResponse<UserType>>;

/**
 * Base Types
 */

export type Action = {
  name?: string;
  style?: string;
  text?: string;
  type?: string;
  value?: string;
};

export type AnonUserType = {};

export type APNConfig = {
  auth_type?: string;
  bundle_id?: string;
  development?: boolean;
  enabled?: boolean;
  host?: string;
  key_id?: string;
  notification_template?: string;
  team_id?: string;
};

export type AppSettings = {
  firebase_config: {
    data_template?: string;
    notification_template?: string;
    server_key?: string;
  };
  apn_config?: {
    auth_key?: string;
    auth_type?: string;
    bundle_id?: string;
    development?: boolean;
    host?: string;
    key_id?: string;
    notification_template?: string;
    p12_cert?: string;
    team_id?: string;
  };
  disable_auth_checks?: boolean;
  disable_permissions_checks?: boolean;
  webhook_url?: string;
};

export type Attachment<T = UnknownType> = T & {
  actions?: Action[];
  asset_url?: string;
  author_icon?: string;
  author_link?: string;
  author_name?: string;
  color?: string;
  fallback?: string;
  fields?: Field[];
  footer?: string;
  footer_icon?: string;
  image_url?: string;
  og_scrape_url?: string;
  pretext?: string;
  text?: string;
  thumb_url?: string;
  title?: string;
  title_link?: string;
  type?: string;
};

export type ChannelConfig = ChannelConfigFields &
  ChannelConfigDBFields & {
    commands?: CommandVariants[];
  };

export type ChannelConfigAutomod = 'disabled' | 'simple' | 'AI';

export type ChannelConfigAutomodBehavior = 'flag' | 'block';

export type ChannelConfigDBFields = {
  created_at: string;
  updated_at: string;
};

export type ChannelConfigFields = {
  automod?: ChannelConfigAutomod;
  automod_behavior?: ChannelConfigAutomodBehavior;
  connect_events?: boolean;
  max_message_length?: number;
  message_retention?: string;
  mutes?: boolean;
  name?: string;
  reactions?: boolean;
  read_events?: boolean;
  replies?: boolean;
  search?: boolean;
  typing_events?: boolean;
  uploads?: boolean;
  url_enrichment?: boolean;
};

export type ChannelConfigWithInfo = ChannelConfigFields &
  ChannelConfigDBFields & {
    commands?: CommandResponse[];
  };

export type ChannelData<ChannelType = UnknownType> = ChannelType & {
  image?: string;
  members?: string[];
  name?: string;
};

export type ChannelMembership<UserType = UnknownType> = {
  created_at?: string;
  role?: string;
  updated_at?: string;
  user?: UserResponse<UserType>;
};

export type ChannelMute<
  AttachmentType,
  ChannelType,
  EventType,
  MessageType,
  ReactionType,
  UserType
> = {
  user: UserResponse<UserType>;
  channel?: Channel<
    AttachmentType,
    ChannelType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >;
  created_at?: string;
  expires?: string;
  updated_at?: string;
};

export type CheckPushInput<UserType> = {
  apn_template?: string;
  client_id?: string;
  connection_id?: string;
  firebase_data_template?: string;
  firebase_template?: string;
  message_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type CommandVariants =
  | 'all'
  | 'fun_set'
  | 'moderation_set'
  | 'giphy'
  | 'imgur'
  | 'flag'
  | 'ban'
  | 'unban'
  | 'mute'
  | 'unmute';

export type Configs = {
  [channel_type: string]: ChannelConfigWithInfo | undefined;
};

export type ConnectionOpen<UserType> = {
  connection_id: string;
  cid?: string;
  created_at?: string;
  me?: {
    created_at?: string;
    devices?: Device<UserType>[];
    id?: string;
    image?: string;
    invisible?: boolean;
    last_active?: string;
    mutes?: Mute<UserType>[];
    name?: string;
    online?: boolean;
    role?: string;
    total_unread_count?: number;
    unread_count?: number;
    updated_at?: string;
  };
};

export type Device<UserType> = DeviceFields & {
  provider?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type DeviceFields = {
  id?: string;
  push_providers?: 'apn' | 'firebase';
};

export type Field = {
  short?: boolean;
  title?: string;
  value?: string;
};

export type FirebaseConfig = {
  data_template?: string;
  enabled?: boolean;
  notification_template?: string;
};

export type Logger = (
  logLevel: 'info' | 'error' | 'warn',
  message: string,
  extraData?: Record<string, unknown>,
) => void;

export type Message<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  UserType = UnknownType
> = MessageBase<MessageType, AttachmentType> & {
  mentioned_users?: string[];
  user?: UserResponse<UserType>;
};

export type MessageBase<
  MessageType = UnknownType,
  AttachmentType = UnknownType
> = MessageType & {
  attachments?: Attachment<AttachmentType>[];
  html?: string;
  id?: string;
  parent_id?: string;
  show_in_channel?: boolean;
  text?: string;
  user_id?: string;
};

export type Mute<UserType> = {
  created_at: string;
  target: UserResponse<UserType>;
  updated_at: string;
  user: UserResponse<UserType>;
};

export type PermissionObject = {
  action?: 'Deny' | 'Allow';
  name?: string;
  owner?: boolean;
  priority?: number;
  resources?: string[];
  roles?: string[];
};

export type Policy = {
  action?: 0 | 1;
  created_at?: string;
  name?: string;
  owner?: boolean;
  priority?: number;
  resources?: string[];
  roles?: string[];
  updated_at?: string;
};

export type Reaction<
  ReactionType = UnknownType,
  UserType = UnknownType
> = ReactionType & {
  type: string;
  message_id?: string;
  score?: number;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type SearchPayload<
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType
> = SearchOptions & {
  client_id?: string;
  connection_id?: string;
  filter_conditions?: ChannelFilters<ChannelType, UserType>;
  message_filter_conditions?: MessageFilters<
    MessageType,
    AttachmentType,
    ReactionType,
    UserType
  >;
  query?: string;
};

export type TestPushDataInput = {
  apnTemplate?: string;
  firebaseDataTemplate?: string;
  firebaseTemplate?: string;
  messageID?: string;
};

export type TokenOrProvider = string | TokenProvider | null | undefined;

export type TokenProvider = () => Promise<string>;

export type User<T = UnknownType> = T & {
  id: string;
  anon?: boolean;
  name?: string;
  role?: string;
  teams?: string[];
  username?: string;
};