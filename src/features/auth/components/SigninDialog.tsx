"use client";
import type React from "react";
import { Dialog, DialogContent } from "@/components/base/dialog";
import { useAppStore } from "@/stores/app-store";
import {
	selectActiveModal,
	selectAuthOnCloseModal,
	selectAuthOnShowModal,
} from "../store/auth.selectors";
import SigninForm from "./SigninForm";

type SigninDialogProps = {};

const SigninDialog: React.FC<SigninDialogProps> = () => {
	const activeModal = useAppStore(selectActiveModal);
	const openDialog = useAppStore(selectAuthOnShowModal);
	const closeDialog = useAppStore(selectAuthOnCloseModal);

	const handleOpenChange = (open: boolean) => {
		open ? openDialog("signin") : closeDialog();
	};

	const handleOpenSignupDialog = () => {
		openDialog("signup");
	};
	const isShowModal = activeModal === "signin";

	return (
		<Dialog defaultOpen={isShowModal} open={isShowModal} onOpenChange={handleOpenChange}>
			<DialogContent className="p-6">
				<SigninForm onClickSignup={handleOpenSignupDialog} />
			</DialogContent>
		</Dialog>
	);
};

export default SigninDialog;
