"use client";
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
import SignoutButton from "@/features/auth/components/SignoutButton";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function AccountInformationDropdown() {
	const { user } = useAuth();

	const fallbackName = user?.name
		.split(" ")
		.map((char) => char.charAt(0))
		.join("")
		.toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="w-fit p-0 rounded-full">
					<Avatar>
						<AvatarImage src={user?.avatar} alt={user?.name} />
						<AvatarFallback>{fallbackName}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<div className="flex items-center gap-x-2">
							<Avatar>
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback>{fallbackName}</AvatarFallback>
							</Avatar>
							<div>
								<span>{user?.name}</span>
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
}
