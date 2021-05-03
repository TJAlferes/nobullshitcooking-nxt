export const actionTypes = {
  THEME_DARK_TRIGGER: 'THEME_DARK_TRIGGER',
  THEME_LIGHT_TRIGGER: 'THEME_LIGHT_TRIGGER'
} as const;

/*

State

*/

export interface IThemeState {
  theme: string;
  headerTheme: string
  mainTheme: string
  footerTheme: string
  dropDownMenuTheme: string
  navGridATheme: string
  oneColumnATheme: string
  twoColumnATheme: string
  twoColumnBTheme: string
  tableATheme: string
  breadCrumbsTheme: string
  leftNavTheme: string
  suggestionsTheme: string
  feedTheme: string
}

/*

Actions

*/

export type ThemeActions = IThemeDarkTrigger | IThemeLightTrigger;

interface IThemeDarkTrigger {
  type: typeof actionTypes.THEME_DARK_TRIGGER
}

interface IThemeLightTrigger {
  type: typeof actionTypes.THEME_LIGHT_TRIGGER
}