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

// 100 gives a nice green
const BASE_HUE = 210;

export const neutrals = [
  `hsla(${BASE_HUE}, 80%, 8%, 1)`,
  `hsla(${BASE_HUE}, 61%, 16%, 1)`,
  `hsla(${BASE_HUE}, 39%, 23%, 1)`,
  `hsla(${BASE_HUE}, 34%, 30%, 1)`,
  `hsla(${BASE_HUE}, 28%, 39%, 1)`,
  `hsla(${BASE_HUE}, 22%, 49%, 1)`,
  `hsla(${BASE_HUE}, 23%, 60%, 1)`,
  `hsla(${BASE_HUE}, 27%, 70%, 1)`,
  `hsla(${BASE_HUE}, 31%, 80%, 1)`,
  `hsla(${BASE_HUE}, 33%, 89%, 1)`,
  `hsla(${BASE_HUE}, 36%, 96%, 1)`,
];
export const lightThemeForegrounds = [...neutrals];
export const lightThemeBackgrounds = neutrals.reverse();

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

export const RGB_Linear_Shade = (p, c) => {
  var i = parseInt,
    r = Math.round,
    [a, b, c, d] = c.split(','),
    P = p < 0,
    t = P ? 0 : 255 * p,
    P = P ? 1 + p : 1 - p;
  return (
    'rgb' +
    (d ? 'a(' : '(') +
    r(i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P + t) +
    ',' +
    r(i(b) * P + t) +
    ',' +
    r(i(c) * P + t) +
    (d ? ',' + d : ')')
  );
};

export const AWAY = 'rgb(255,89,74)';
export const BUSY = 'rgb(255,199,82)';
export const FREE = 'rgb(102,217,143)';
export const OPEN = 'rgb(47,166,255)';

export const AWAY_DEEP = RGB_Linear_Shade(-0.6, AWAY);
export const BUSY_DEEP = RGB_Linear_Shade(-0.6, BUSY);
export const FREE_DEEP = RGB_Linear_Shade(-0.6, FREE);
export const OPEN_DEEP = RGB_Linear_Shade(-0.6, OPEN);

export const AWAY_LIGHT = RGB_Linear_Shade(-0.3, AWAY);
export const BUSY_LIGHT = RGB_Linear_Shade(-0.3, BUSY);
export const FREE_LIGHT = RGB_Linear_Shade(-0.3, FREE);
export const OPEN_LIGHT = RGB_Linear_Shade(-0.3, OPEN);

export const BRILLIANT_1 = 'rgb(27,194,255)';
export const BRILLIANT_2 = 'rgb(255,92,84)';
