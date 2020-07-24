import * as t from './actionTypes';

export const CACHE = (profileId, profileUpdater) => ({
	type: t.CACHE,
	profileId,
	profileUpdater,
});
