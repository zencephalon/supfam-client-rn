import mergeSortedIds from './mergeSortedIds';

const a = [{ id: 4 }, { id: 2 }, { id: 1 }];
const b = [{ id: 5 }, { id: 3 }, { id: 2 }];
const c = [{ id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }];

test('merges with empty arrays', () => {
	expect(mergeSortedIds([], [])).toEqual([]);
});

test('merges one empty arary', () => {
	expect(mergeSortedIds([], a)).toEqual(a);
	expect(mergeSortedIds(a, [])).toEqual(a);
});

test('merges two arrays', () => {
	expect(mergeSortedIds(a, b)).toEqual(c);
	expect(mergeSortedIds(b, a)).toEqual(c);
});
