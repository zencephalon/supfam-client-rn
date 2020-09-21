import { getMentionSelectionText, matchBefore, matchAfter } from './mentions';

test('matchBefore', () => {
	expect(matchBefore('goodbye @hello')).toEqual('@hello');
	expect(matchBefore('goodbye hello')).toEqual(undefined);
});

test('matchAfter', () => {
	expect(matchAfter('goodbye hello')).toEqual('goodbye');
	expect(matchAfter(' goodbye hello')).toEqual(undefined);
});

test('returns nothing with empty text', () => {
	expect(getMentionSelectionText('', { start: 0, end: 0 })).toEqual(null);
});

test('returns nothing with mismatched start and end', () => {
	expect(
		getMentionSelectionText('hello @hello', { start: 10, end: 11 })
	).toEqual(null);
});

test('returns matches', () => {
	expect(getMentionSelectionText('@hello', { start: 1, end: 1 })).toEqual({
		match: 'hello',
		start: 0,
		end: 6,
	});

	expect(
		getMentionSelectionText('hey @hello goodbye', { start: 5, end: 5 })
	).toEqual({
		match: 'hello',
		start: 4,
		end: 10,
	});

	expect(
		getMentionSelectionText('hey hello goodbye', { start: 5, end: 5 })
	).toEqual(null);

	expect(
		getMentionSelectionText('hey @hello goodbye', { start: 6, end: 6 })
	).toEqual({
		match: 'hello',
		start: 4,
		end: 10,
	});

	expect(
		getMentionSelectionText('goodbye @hello', { start: 14, end: 14 })
	).toEqual({
		match: 'hello',
		start: 8,
		end: 14,
	});
});
