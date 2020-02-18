import { StackNavigationProp } from '@react-navigation/stack'

export type AccountStackParamList = {
  Account: undefined
  Login: undefined
  Register: undefined
}

export type AccountStackNavigationProp = StackNavigationProp<
  AccountStackParamList,
  'Account'
>

export type RestaurantStackParamList = {
  Restaurants: undefined
}

export type RestaurantStackNavigationProp = StackNavigationProp<
  RestaurantStackParamList,
  'Restaurants'
>

export type SearchStackParamList = {
  Search: undefined
}

export type SearchStackNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>

export type RankingStackParamList = {
  Ranking: undefined
}

export type RankingStackNavigationProp = StackNavigationProp<
  RankingStackParamList,
  'Ranking'
>

export type BottomTabsParamList = {
  Restaurants: undefined
  Ranking: undefined
  Search: undefined
  Account: undefined
}
