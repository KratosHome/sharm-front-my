/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from "react";
type MediaQueries = { [key: string]: string };

type MatchedMediaResult = { [key: string]: boolean };

export const mediaQueries: MediaQueries = {
	isMobile: "(max-width: 767px)",
	isTablet: "(min-width: 768px) and (max-width: 1023px)",
	isLaptop: "(min-width: 1024px) and (max-width: 1199px)",
	isDesktop: "(min-width: 1200px)",
}

function reactMatchMedia(mediaQueries: MediaQueries): MatchedMediaResult {
	const [values, setValues] = useState({});

	useLayoutEffect(() => {
		const updateValues = () => {
			const valuesObject = Object.keys(mediaQueries).reduce(
				(acc, key) => {
					acc[key] = window.matchMedia(mediaQueries[key]).matches;
					return acc;
				}, {} as MatchedMediaResult
			);

			if (Object.values(valuesObject).every((val) => val === false)) {
				valuesObject.isMobile = true;
			}

			setValues(valuesObject);
		};

		if (typeof window !== 'undefined') {
			updateValues();
			const queries = Object.values(mediaQueries).map((query) => window.matchMedia(query));
			queries.forEach((query) => query.addEventListener("change", updateValues));
			return () => queries.forEach((query) => query.removeEventListener("change", updateValues));
		};

	}, [mediaQueries]);

	return values;
};

export function useMatchMedia() {
	return reactMatchMedia(mediaQueries);
};