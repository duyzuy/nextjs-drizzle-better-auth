"use client";

import { GalleryVerticalEndIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/base/card";
import { FieldDescription } from "@/components/base/field";
import SigninForm from "@/features/auth/components/SigninForm";
import { cn } from "@/utils/shadcn";

export default function LoginPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-4xl">
				<div className={cn("flex flex-col gap-6")}>
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<SigninForm className="p-6 md:p-8" />
							<div className="relative hidden bg-muted md:block">
								<Image
									src="/assets/images/forest.jpg"
									width={900}
									height={900}
									alt="Image"
									className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
								/>
							</div>
						</CardContent>
					</Card>
					<FieldDescription className="px-6 text-center">
						By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
						<a href="#">Privacy Policy</a>.
					</FieldDescription>
				</div>
			</div>
		</div>
	);
}
