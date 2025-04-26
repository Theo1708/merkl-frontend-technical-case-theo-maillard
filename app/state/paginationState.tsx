import { create } from "zustand";

export type Pagination = {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

type PaginationState = {
    pagination: Pagination;
    previousPage: () => void;
    nextPage: () => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    setTotalItems: (totalItems: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
    pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10,
        totalItems: 0,
    },
    previousPage: () => set((state) => ({
        pagination: {
            ...state.pagination,
            currentPage: Math.max(state.pagination.currentPage - 1, 1),
        }
    })),
    nextPage: () => set((state) => ({
        pagination: {
            ...state.pagination,
            currentPage: Math.min(state.pagination.currentPage + 1, state.pagination.totalPages),
        }
    })),
    setItemsPerPage: (newItemsPerPage: number) => set((state) => {
        const { currentPage, itemsPerPage } = state.pagination;
        const firstDisplayedItemIndex = (currentPage - 1) * itemsPerPage;
        const newCurrentPage = Math.floor(firstDisplayedItemIndex / newItemsPerPage) + 1;

        return {
            pagination: {
                ...state.pagination,
                itemsPerPage: newItemsPerPage,
                currentPage: newCurrentPage,
                totalPages: Math.ceil(state.pagination.totalItems / newItemsPerPage) || 1,
            }
        };
    }),
    setTotalItems: (totalItems: number) => set((state) => ({
        pagination: {
            ...state.pagination,
            totalItems,
            totalPages: Math.ceil(totalItems / state.pagination.itemsPerPage) || 1,
        }
    }))
}));