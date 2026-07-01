"use client";
import type React from "react";
import { Dialog, DialogContent } from "@/components/base/dialog";
import { useAppStore } from "@/stores/app-store/AppStoreProvider";
import {
	selectActiveModal,
	selectAuthOnCloseModal,
	selectAuthOnShowModal,
} from "../store/auth.selectors";
import { SignupForm } from "./SignupForm";

type SignupDialogProps = {
	className?: string;
};

const SignupDialog: React.FC<SignupDialogProps> = () => {
	const activeModal = useAppStore(selectActiveModal);
	const openDialog = useAppStore(selectAuthOnShowModal);
	const closeDialog = useAppStore(selectAuthOnCloseModal);

	const handleOpenChange = (open: boolean) => {
		open ? openDialog("signup") : closeDialog();
	};

	const handleOpenSignInModal = () => {
		openDialog("signin");
	};
	const isShowModal = activeModal === "signup";

	return (
		<Dialog defaultOpen={isShowModal} open={isShowModal} onOpenChange={handleOpenChange}>
			<DialogContent className="p-6">
				<SignupForm onClickSignIn={handleOpenSignInModal} onCreateSuccess={closeDialog} />
			</DialogContent>
		</Dialog>
	);
};

export default SignupDialog;
