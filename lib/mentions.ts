type Selection = {
	start: number;
	end: number;
};

const BEFORE_REGEX = /@\w*$/;
const AFTER_REGEX = /^\w+/;

export function matchBefore(text: string) {
	return text.match(BEFORE_REGEX)?.[0];
}

export function matchAfter(text: string) {
	return text.match(AFTER_REGEX)?.[0];
}

export function getMentionSelectionText(text: string, selection: Selection) {
	if (selection.start !== selection.end) {
		return null;
	}
	if (text === '') {
		return null;
	}

	const before = text.slice(0, selection.start);

	const beforeMatch = matchBefore(before);

	if (!beforeMatch) {
		return null;
	}

	const after = text.slice(selection.start);
	const afterMatch = matchAfter(after) || '';

	return {
		match: `${beforeMatch.slice(1)}${afterMatch}`.toLowerCase(),
		start: selection.start - beforeMatch.length,
		end: selection.start + afterMatch.length,
	};
}
