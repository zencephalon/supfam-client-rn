export const API_URL =
	process.env.API_URL || 'https://supfam-api.herokuapp.com/';

export const CABLE_URL =
	(API_URL === 'https://supfam-api.herokuapp.com/'
		? 'wss://supfam-anycable.herokuapp.com/'
		: API_URL) + 'cable';

console.log({ API_URL, CABLE_URL });
