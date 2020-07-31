import * as t from './actionTypes';

const initialState = {
	currentCard: 'welcome',
	didAction: {
		away: false,
		busy: false,
		free: false,
		opem: false,
		notifications: false,
		setStatus: false,
		editStatus: false,
		setProfilePic: false,
	},
};

const nextCard = {
	welcome: 'away',
	away: 'busy',
	busy: 'free',
	free: 'open',
	open: 'notifications',
	notifications: 'setStatus',
	setStatus: 'editStatus',
	editStatus: 'setProfilePic',
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case t.DID:
			return action.id === state.currentCard
				? {
						...state,
						didAction: {
							...state.didAction,
							[action.id]: true,
						},
				  }
				: state;
		case t.EXIT:
			return action.id === state.currentCard
				? {
						...state,
						currentCard: nextCard[action.id],
				  }
				: state;
		default:
			return state;
	}
}
