"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/button";
import useSignout from "../hooks/useSignout";

function SignoutButton() {
	const { mutate: onSignout, isPending } = useSignout();
	const router = useRouter();
	const handleSignout = () => {
		onSignout(undefined, {
			onSuccess: () => {
				router.refresh();
			},
		});
	};
	return (
		<Button disabled={isPending} onClick={handleSignout}>
			Logout
		</Button>
	);
}

export default SignoutButton;
