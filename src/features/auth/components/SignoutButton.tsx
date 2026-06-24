"use client";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/base/button";
import { cn } from "@/lib/utils";
import { signoutSafeAction } from "../actions/signout.action";

interface SignoutButtonProps {
	className?: string;
}
function SignoutButton({ className }: SignoutButtonProps) {
	const router = useRouter();

	const { execute, isPending } = useAction(signoutSafeAction, {
		onSuccess: ({ data }) => {
			if (data.status === "success") {
				router.refresh();
			}
		},
	});
	const handleSignout = () => {
		execute();
	};
	return (
		<Button disabled={isPending} onClick={handleSignout} className={cn(className)}>
			Logout
		</Button>
	);
}

export default SignoutButton;
