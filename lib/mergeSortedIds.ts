interface Idable {
	id: number;
}

export default function mergeSortedIds<T extends Idable>(a: T[], b: T[]) {
	if (!a && !b) {
		return [];
	}
	if (!a || a.length === 0) {
		return b;
	}
	if (!b || b.length === 0) {
		return a;
	}

	const res = [];
	let i = 0;
	let j = 0;

	while (a[i] && b[j]) {
		// prefer the element from b in the case of an id appearing in both
		if (b[j].id === a[i].id) {
			res.push(b[j]);
			i++;
			j++;
			continue;
		}

		if (b[j].id > a[i].id) {
			res.push(b[j]);
			j++;
			continue;
		}

		res.push(a[i]);
		i++;
	}

	if (!a[i]) {
		return res.concat(b.slice(j));
	}

	return res.concat(a.slice(i));
}
