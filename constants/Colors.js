// https://www.nordtheme.com/docs/colors-and-palettes
// Polar Night series, darkest to lightest
export const nord0 = '#2E3440';
export const nord1 = '#3B4252';
export const nord2 = '#434C5E';
export const nord3 = '#4C566A';
// Snow storm series, darkest to lightest
export const nord4 = '#D8DEE9';
export const nord5 = '#E5E9F0';
export const nord6 = '#ECEFF4';
// Frost series
export const nord7 = '#8FBCBB';
export const nord8 = '#88C0D0';
export const nord9 = '#81A1C1';
export const nord10 = '#5E81AC'; // blue
// Aurora series
export const nord11 = '#BF616A'; //red
export const nord12 = '#D08770'; //orange
export const nord13 = '#EBCB8B'; //yellow
export const nord14 = '#A3BE8C'; //green
export const nord15 = '#B48EAD'; //purple

export const neutrals = [
  '#102A43',
  '#243B53',
  '#334E68',
  '#486581',
  '#627D98',
  '#829AB1',
  '#9FB3C8',
  '#BCCCDC',
  '#D9E2EC',
  '#F0F4F8',
];
export const lightThemeForegrounds = [
  neutrals[0],
  neutrals[2],
  neutrals[4],
  neutrals[6],
  neutrals[8],
];
export const lightThemeBackgrounds = [
  neutrals[9],
  neutrals[7],
  neutrals[5],
  neutrals[3],
  neutrals[1],
];
export const darkThemeForegrounds = lightThemeBackgrounds;
export const darkThemeBackgrounds = lightThemeForegrounds;

export const textPrimary = nord0;
export const textSecondary = nord1;
export const textTertiary = neutrals[6];

export const red = nord11;
export const orange = nord12;
export const yellow = nord13;
export const green = nord14;
export const purple = nord15;

export const tintColor = nord9;

export const accentColor = nord8;
export const disabledColor = nord4;
export const tabIconDefault = nord3;
export const tabIconSelected = nord9;
export const tabBar = '#fefefe';

export const AWAY = red;
export const BUSY = yellow;
export const FREE = green;
export const OPEN = nord10;
