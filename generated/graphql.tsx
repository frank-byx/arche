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
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
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
};

export type RecipeOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
};

export type RecipeCreateInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  body: Scalars['String'];
};

export type RecipeUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
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

export type AllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRecipesQuery = (
  { __typename?: 'Query' }
  & { recipes: Array<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'title' | 'body'>
  )> }
);


export const AllRecipesDocument = gql`
    query allRecipes {
  recipes {
    id
    title
    body
  }
}
    `;

export function useAllRecipesQuery(options: Omit<Urql.UseQueryArgs<AllRecipesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllRecipesQuery>({ query: AllRecipesDocument, ...options });
};