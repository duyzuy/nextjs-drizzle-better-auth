"use client";
import type React from "react";
import { Button } from "@/components/base/button";
import { useAppStore } from "@/stores/app-store/AppStoreProvider";
import {
	selectActiveModal,
	selectAuthOnCloseModal,
	selectAuthOnShowModal,
} from "../store/auth.selectors";

interface TriggerSignupDialogButtonProps {
	btnText?: string;
	children?: React.ReactNode;
}
function TriggerSignupDialogButton({ children, btnText }: TriggerSignupDialogButtonProps) {
	const activeModal = useAppStore(selectActiveModal);
	const closeModal = useAppStore(selectAuthOnCloseModal);
	const showModal = useAppStore(selectAuthOnShowModal);

	const toggleShowModal = () => {
		activeModal ? closeModal() : showModal("signup");
	};

	return (
		<Button variant="outline" type="button" onClick={toggleShowModal}>
			{children ? children : btnText}
		</Button>
	);
}

export default TriggerSignupDialogButton;
