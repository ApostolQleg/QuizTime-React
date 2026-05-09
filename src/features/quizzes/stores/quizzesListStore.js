import { create } from "zustand";

const initialState = {
	items: [],
	loading: false,
	page: 1,
	hasMore: true,
};

export const useQuizzesListStore = create((set) => ({
	...initialState,
	setItems: (items) => set({ items }),
	appendItems: (items) => set((state) => ({ items: [...state.items, ...items] })),
	clear: () => set({ ...initialState }),
	setLoading: (loading) => set({ loading }),
	setPage: (page) => set({ page }),
	setHasMore: (hasMore) => set({ hasMore }),
}));

export default useQuizzesListStore;
