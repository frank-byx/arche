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
  DateTime: any;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
};


export type QueryRecipeArgs = {
  where: RecipeWhereUniqueInput;
};


export type QueryRecipesArgs = {
  where?: Maybe<RecipeWhereInput>;
  orderBy?: Maybe<Array<RecipeOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<RecipeWhereUniqueInput>;
  after?: Maybe<RecipeWhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneRecipe: Recipe;
  deleteOneRecipe?: Maybe<Recipe>;
  updateOneRecipe?: Maybe<Recipe>;
};


export type MutationCreateOneRecipeArgs = {
  data: RecipeCreateInput;
};


export type MutationDeleteOneRecipeArgs = {
  where: RecipeWhereUniqueInput;
};


export type MutationUpdateOneRecipeArgs = {
  data: RecipeUpdateInput;
  where: RecipeWhereUniqueInput;
};


export type RecipeWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type RecipeWhereInput = {
  AND?: Maybe<Array<RecipeWhereInput>>;
  OR?: Maybe<Array<RecipeWhereInput>>;
  NOT?: Maybe<Array<RecipeWhereInput>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  body?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type RecipeOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type RecipeCreateInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  body: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RecipeUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
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

export type RecipeSearchQueryVariables = Exact<{
  contains: Scalars['String'];
}>;


export type RecipeSearchQuery = (
  { __typename?: 'Query' }
  & { recipes: Array<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'title'>
  )> }
);

export type RecipeInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RecipeInfoQuery = (
  { __typename?: 'Query' }
  & { recipe?: Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'title' | 'body' | 'createdAt' | 'updatedAt'>
  )> }
);


export const RecipeSearchDocument = gql`
    query recipeSearch($contains: String!) {
  recipes(where: {title: {contains: $contains}}, orderBy: {updatedAt: desc}) {
    id
    title
  }
}
    `;

export function useRecipeSearchQuery(options: Omit<Urql.UseQueryArgs<RecipeSearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecipeSearchQuery>({ query: RecipeSearchDocument, ...options });
};
export const RecipeInfoDocument = gql`
    query recipeInfo($id: String!) {
  recipe(where: {id: $id}) {
    id
    title
    body
    createdAt
    updatedAt
  }
}
    `;

export function useRecipeInfoQuery(options: Omit<Urql.UseQueryArgs<RecipeInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecipeInfoQuery>({ query: RecipeInfoDocument, ...options });
};