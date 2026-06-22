"use client";
import { useEffect, useState } from "react";

export default function useDebounce(value: string, ms = 600) {
	const [delayedValue, setDelayedValue] = useState(value);

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setDelayedValue(value);
			clearTimeout(timeOutId);
		}, ms);
		return () => {
			clearTimeout(timeOutId);
		};
	}, [value, ms]);

	return delayedValue;
}
