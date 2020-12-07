import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: any;
  DateTime: any;
};

export type RecipeLog = {
  __typename?: 'RecipeLog';
  id: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['Json'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  render?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  recipeLog?: Maybe<RecipeLog>;
  recipeLogs: Array<RecipeLog>;
};


export type QueryRecipeLogArgs = {
  where: RecipeLogWhereUniqueInput;
};


export type QueryRecipeLogsArgs = {
  where?: Maybe<RecipeLogWhereInput>;
  orderBy?: Maybe<Array<RecipeLogOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<RecipeLogWhereUniqueInput>;
  after?: Maybe<RecipeLogWhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneRecipeLog: RecipeLog;
  deleteOneRecipeLog?: Maybe<RecipeLog>;
  updateOneRecipeLog?: Maybe<RecipeLog>;
};


export type MutationCreateOneRecipeLogArgs = {
  data: RecipeLogCreateInput;
};


export type MutationDeleteOneRecipeLogArgs = {
  where: RecipeLogWhereUniqueInput;
};


export type MutationUpdateOneRecipeLogArgs = {
  data: RecipeLogUpdateInput;
  where: RecipeLogWhereUniqueInput;
};



export type RecipeLogWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type RecipeLogWhereInput = {
  AND?: Maybe<Array<RecipeLogWhereInput>>;
  OR?: Maybe<Array<RecipeLogWhereInput>>;
  NOT?: Maybe<Array<RecipeLogWhereInput>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type RecipeLogOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type RecipeLogCreateInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  body: Scalars['Json'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RecipeLogUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  body?: Maybe<Scalars['Json']>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type RecipeLogSearchQueryVariables = Exact<{
  contains: Scalars['String'];
}>;


export type RecipeLogSearchQuery = (
  { __typename?: 'Query' }
  & { recipeLogs: Array<(
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id' | 'title'>
  )> }
);

export type RecipeLogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RecipeLogQuery = (
  { __typename?: 'Query' }
  & { recipeLog?: Maybe<(
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id' | 'title' | 'body' | 'createdAt' | 'updatedAt'>
  )> }
);

export type RenderRecipeLogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RenderRecipeLogQuery = (
  { __typename?: 'Query' }
  & { recipeLog?: Maybe<(
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id' | 'render'>
  )> }
);

export type UpdateRecipeLogMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['Json'];
}>;


export type UpdateRecipeLogMutation = (
  { __typename?: 'Mutation' }
  & { updateOneRecipeLog?: Maybe<(
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id' | 'updatedAt'>
  )> }
);

export type CreateRecipeLogMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['Json'];
}>;


export type CreateRecipeLogMutation = (
  { __typename?: 'Mutation' }
  & { createOneRecipeLog: (
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id' | 'createdAt'>
  ) }
);

export type DeleteRecipeLogMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRecipeLogMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneRecipeLog?: Maybe<(
    { __typename?: 'RecipeLog' }
    & Pick<RecipeLog, 'id'>
  )> }
);


export const RecipeLogSearchDocument = gql`
    query recipeLogSearch($contains: String!) {
  recipeLogs(where: {title: {contains: $contains}}, orderBy: {updatedAt: desc}) {
    id
    title
  }
}
    `;

export function useRecipeLogSearchQuery(options: Omit<Urql.UseQueryArgs<RecipeLogSearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecipeLogSearchQuery>({ query: RecipeLogSearchDocument, ...options });
};
export const RecipeLogDocument = gql`
    query recipeLog($id: String!) {
  recipeLog(where: {id: $id}) {
    id
    title
    body
    createdAt
    updatedAt
  }
}
    `;

export function useRecipeLogQuery(options: Omit<Urql.UseQueryArgs<RecipeLogQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecipeLogQuery>({ query: RecipeLogDocument, ...options });
};
export const RenderRecipeLogDocument = gql`
    query renderRecipeLog($id: String!) {
  recipeLog(where: {id: $id}) {
    id
    render
  }
}
    `;

export function useRenderRecipeLogQuery(options: Omit<Urql.UseQueryArgs<RenderRecipeLogQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RenderRecipeLogQuery>({ query: RenderRecipeLogDocument, ...options });
};
export const UpdateRecipeLogDocument = gql`
    mutation updateRecipeLog($id: String!, $title: String!, $body: Json!) {
  updateOneRecipeLog(where: {id: $id}, data: {title: {set: $title}, body: $body}) {
    id
    updatedAt
  }
}
    `;

export function useUpdateRecipeLogMutation() {
  return Urql.useMutation<UpdateRecipeLogMutation, UpdateRecipeLogMutationVariables>(UpdateRecipeLogDocument);
};
export const CreateRecipeLogDocument = gql`
    mutation createRecipeLog($title: String!, $body: Json!) {
  createOneRecipeLog(data: {title: $title, body: $body}) {
    id
    createdAt
  }
}
    `;

export function useCreateRecipeLogMutation() {
  return Urql.useMutation<CreateRecipeLogMutation, CreateRecipeLogMutationVariables>(CreateRecipeLogDocument);
};
export const DeleteRecipeLogDocument = gql`
    mutation deleteRecipeLog($id: String!) {
  deleteOneRecipeLog(where: {id: $id}) {
    id
  }
}
    `;

export function useDeleteRecipeLogMutation() {
  return Urql.useMutation<DeleteRecipeLogMutation, DeleteRecipeLogMutationVariables>(DeleteRecipeLogDocument);
};