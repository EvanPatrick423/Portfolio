import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, ProjectModel, ContactSubmissionModel } from '../src/types/models';
import { Context } from '../src/types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
};

export type ContactInput = {
  email: Scalars['EmailAddress']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export enum ContactStatus {
  Pending = 'PENDING',
  Processed = 'PROCESSED',
  Replied = 'REPLIED'
}

export type ContactSubmission = {
  __typename?: 'ContactSubmission';
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: ContactStatus;
  subject: Scalars['String']['output'];
  submittedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  deleteProject: Scalars['Boolean']['output'];
  submitContact: ContactSubmission;
  updateContactStatus: ContactSubmission;
  updateProfile: User;
  updateProject: Project;
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitContactArgs = {
  input: ContactInput;
};


export type MutationUpdateContactStatusArgs = {
  id: Scalars['ID']['input'];
  status: ContactStatus;
};


export type MutationUpdateProfileArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  resumeUrl?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: ProjectInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  featured: Scalars['Boolean']['output'];
  githubUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  liveUrl?: Maybe<Scalars['String']['output']>;
  technologies: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ProjectInput = {
  description: Scalars['String']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  githubUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  liveUrl?: InputMaybe<Scalars['String']['input']>;
  technologies: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  contact?: Maybe<ContactSubmission>;
  contacts: Array<ContactSubmission>;
  featuredProjects: Array<Project>;
  me?: Maybe<User>;
  ping: Scalars['String']['output'];
  project?: Maybe<Project>;
  projects: Array<Project>;
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type SocialLinks = {
  __typename?: 'SocialLinks';
  github?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  contactSubmitted: ContactSubmission;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  resumeUrl?: Maybe<Scalars['String']['output']>;
  skills: Array<Scalars['String']['output']>;
  socialLinks?: Maybe<SocialLinks>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ContactInput: ContactInput;
  ContactStatus: ContactStatus;
  ContactSubmission: ResolverTypeWrapper<ContactSubmissionModel>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<ProjectModel>;
  ProjectInput: ProjectInput;
  Query: ResolverTypeWrapper<{}>;
  SocialLinks: ResolverTypeWrapper<SocialLinks>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  ContactInput: ContactInput;
  ContactSubmission: ContactSubmissionModel;
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Project: ProjectModel;
  ProjectInput: ProjectInput;
  Query: {};
  SocialLinks: SocialLinks;
  String: Scalars['String']['output'];
  Subscription: {};
  User: UserModel;
}>;

export type ContactSubmissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ContactSubmission'] = ResolversParentTypes['ContactSubmission']> = ResolversObject<{
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ContactStatus'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submittedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  submitContact?: Resolver<ResolversTypes['ContactSubmission'], ParentType, ContextType, RequireFields<MutationSubmitContactArgs, 'input'>>;
  updateContactStatus?: Resolver<ResolversTypes['ContactSubmission'], ParentType, ContextType, RequireFields<MutationUpdateContactStatusArgs, 'id' | 'status'>>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateProfileArgs>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'id' | 'input'>>;
}>;

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  githubUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  technologies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  contact?: Resolver<Maybe<ResolversTypes['ContactSubmission']>, ParentType, ContextType, RequireFields<QueryContactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['ContactSubmission']>, ParentType, ContextType>;
  featuredProjects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
}>;

export type SocialLinksResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SocialLinks'] = ResolversParentTypes['SocialLinks']> = ResolversObject<{
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  contactSubmitted?: SubscriptionResolver<ResolversTypes['ContactSubmission'], "contactSubmitted", ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resumeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  socialLinks?: Resolver<Maybe<ResolversTypes['SocialLinks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  ContactSubmission?: ContactSubmissionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SocialLinks?: SocialLinksResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

