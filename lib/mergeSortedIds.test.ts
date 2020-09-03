import mergeSortedIds from './mergeSortedIds';

test('merges with empty arrays', () => {
	expect(mergeSortedIds([], [])).toEqual([]);
});
