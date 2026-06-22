import type { AuthSlice } from "./auth-store";

export const selectActiveModal = (state: AuthSlice) => state.auth.activeModal;

export const selectAuthOnCloseModal = (state: AuthSlice) => state.auth.closeModal;
export const selectAuthOnShowModal = (state: AuthSlice) => state.auth.showModal;
