import { create } from "zustand";

const initialState = {
	items: [],
	loading: false,
	page: 1,
	hasMore: true,
};

const getPrimaryId = (quiz) => quiz?._id ?? quiz?.id ?? quiz?.quizId ?? null;

const isMatchingQuiz = (item, targetId) => {
	if (!targetId || !item) return false;
	const target = String(targetId);
	return (
		String(item._id) === target || String(item.id) === target || String(item.quizId) === target
	);
};

const dedupeItems = (items) => {
	const seenIds = new Set();
	return items.filter((item) => {
		const id = getPrimaryId(item);
		if (id === null) return true;
		if (seenIds.has(id)) return false;
		seenIds.add(id);
		return true;
	});
};

export const useQuizzesListStore = create((set) => ({
	...initialState,

	setItems: (items) => set({ items: dedupeItems(items) }),

	appendItems: (items) =>
		set((state) => ({
			items: dedupeItems([...state.items, ...items]),
		})),

	upsertItem: (quiz) =>
		set((state) => {
			const targetId1 = quiz?._id;
			const targetId2 = quiz?.id;

			if (!targetId1 && !targetId2) {
				return { items: [quiz, ...state.items] };
			}

			const nextItems = state.items.filter((item) => {
				const match1 = targetId1 ? isMatchingQuiz(item, targetId1) : false;
				const match2 = targetId2 ? isMatchingQuiz(item, targetId2) : false;
				return !match1 && !match2;
			});

			return { items: dedupeItems([quiz, ...nextItems]) };
		}),

	removeItem: (quizId) =>
		set((state) => ({
			items: state.items.filter((item) => !isMatchingQuiz(item, quizId)),
		})),

	clear: () => set({ ...initialState }),
	setLoading: (loading) => set({ loading }),
	setPage: (page) => set({ page }),
	setHasMore: (hasMore) => set({ hasMore }),
}));

export default useQuizzesListStore;
