import {
  AWAY,
  BUSY,
  FREE,
  OPEN,
  AWAY_DEEP,
  BUSY_DEEP,
  FREE_DEEP,
  OPEN_DEEP,
  AWAY_LIGHT,
  BUSY_LIGHT,
  FREE_LIGHT,
  OPEN_LIGHT,
} from '~/constants/Colors';

export default [AWAY, BUSY, FREE, OPEN];

export const statusColorsDeep = [AWAY_DEEP, BUSY_DEEP, FREE_DEEP, OPEN_DEEP];
export const statusColorsLight = [
  AWAY_LIGHT,
  BUSY_LIGHT,
  FREE_LIGHT,
  OPEN_LIGHT,
];

console.log({ statusColorsDeep });
