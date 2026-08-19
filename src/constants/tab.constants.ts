export const ACTIVE_TAB = {
  ALL: 'all',
  FAVORITE: 'favorite',
};
export type ActiveTab = (typeof ACTIVE_TAB)[keyof typeof ACTIVE_TAB];
