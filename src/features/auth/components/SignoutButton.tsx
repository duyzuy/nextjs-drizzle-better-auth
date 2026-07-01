"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/button";
import { cn } from "@/lib/utils";
import { useSignOut } from "../hooks/useSignOut";

interface SignoutButtonProps {
	className?: string;
}
function SignoutButton({ className }: SignoutButtonProps) {
	const router = useRouter();

	const { mutate: signout, isPending } = useSignOut();

	const handleSignout = () => {
		signout(undefined, {
			onSuccess(data, variables, onMutateResult, context) {
				router.refresh();
			},
		});
	};
	return (
		<Button disabled={isPending} onClick={handleSignout} className={cn(className)}>
			Logout
		</Button>
	);
}

export default SignoutButton;
