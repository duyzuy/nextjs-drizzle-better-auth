import { useState } from "react";
import { signInAction } from "../dal/actions";

// import { authRepository } from "@/infrastructure/repositories/auth/auth.repository";

type UseSignInReturn = {
	isLoading: boolean;
	error?: string;
	onSignIn: (formData: FormData) => void;
};
type UseSignInOptions = {
	onSuccess?: (data: { id: string; name: string }) => void;
	onError?: (error: string) => void;
};
type UseSignIn<T> = (options?: UseSignInOptions) => T;

const useSignin: UseSignIn<UseSignInReturn> = (options) => {
	const [data, setData] = useState<{ id: string; name: string }>();
	const [error, setError] = useState<Record<string, string | string[] | undefined | null>>();
	const [isLoading, setIsLoading] = useState(false);

	const onSignIn: UseSignInReturn["onSignIn"] = async (form) => {
		setIsLoading(true);
		try {
			const data = await signInAction({ status: "idle" }, form);

			if (data.status === "success") {
				setData(data.data);
			}

			if (data.status === "error" && data.fields) {
				setError(data.fields);
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return { onSignIn, isLoading, error, data };
};
export default useSignin;
