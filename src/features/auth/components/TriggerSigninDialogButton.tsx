"use client";
import type React from "react";
import { Button } from "@/components/base/button";
import { useAppStore } from "@/stores/app-store/AppStoreProvider";
import {
	selectActiveModal,
	selectAuthOnCloseModal,
	selectAuthOnShowModal,
} from "../store/auth.selectors";

interface TriggerSigninDialogButtonProps {
	btnText?: string;
	children?: React.ReactNode;
}
function TriggerSigninDialogButton({ children, btnText }: TriggerSigninDialogButtonProps) {
	const activeModal = useAppStore(selectActiveModal);
	const closeModal = useAppStore(selectAuthOnCloseModal);
	const showModal = useAppStore(selectAuthOnShowModal);

	const toggleSignin = () => {
		activeModal ? closeModal() : showModal("signin");
	};

	return (
		<Button type="button" onClick={toggleSignin}>
			{children ? children : btnText}
		</Button>
	);
}

export default TriggerSigninDialogButton;
