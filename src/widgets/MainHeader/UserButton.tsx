import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import { getSession } from "@/features/auth/actions/get-session";
import SignoutButton from "@/features/auth/components/SignoutButton";
import TriggerSigninDialogButton from "@/features/auth/components/TriggerSigninDialogButton";
import TriggerSignupDialogButton from "@/features/auth/components/TriggerSignupDialogButton";

const UserButton = async () => {
	const session = await getSession();

	if (!session) {
		return (
			<div className="flex flex-wrap gap-x-3">
				<TriggerSigninDialogButton>
					<span>Signin</span>
				</TriggerSigninDialogButton>
				<TriggerSignupDialogButton>
					<span>SignUp</span>
				</TriggerSignupDialogButton>
			</div>
		);
	}

	const fallBackName = getFallBackName(session.user.name);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="w-fit p-0 rounded-full">
					<Avatar>
						<AvatarImage src={session.user.image} alt={session.user.image} />
						<AvatarFallback className="uppercase">{fallBackName}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className="flex items-center gap-x-2">
							<Avatar>
								<AvatarImage src={session.user.image} alt={session.user.name} />
								<AvatarFallback>{fallBackName}</AvatarFallback>
							</Avatar>
							<div>
								<span>{session.user.name}</span>
							</div>
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<SignoutButton className="w-full" />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;

export const UserButtonSkeleton = () => {
	return (
		<div className="animate-pulse">
			<div className="w-8 h-8 dark:bg-gray-600 bg-gray-200 rounded-full"></div>
		</div>
	);
};

function getFallBackName(name: string) {
	const nameArr = name.split(" ");

	const nameLength = nameArr.length;
	let firstAndLast: string[] = [];

	if (nameLength <= 2) {
		firstAndLast = nameArr;
	} else {
		firstAndLast = [...nameArr.slice(0, 1), ...nameArr.slice(nameLength - 2, nameLength - 1)];
	}

	return firstAndLast.map((char) => char.charAt(0)).join("");
}
