import { useEffect, useState } from "react";
import { GetAllAthletes, GetAthleteByID } from "../library";

export const useFetchAthlete = (id) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAthlete = async () => {
			try {
				setLoading(true);
				const athleteData = await GetAthleteByID(id);
				setData(athleteData);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		if (id) {
			fetchAthlete();
		}

		return () => {
			// Cleanup function
		};
	}, [id]);

	return { data, loading, error };
};

export const useFetchAllAthltes = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleOrdersUpdate = (updatedOrders) => {
			setData(updatedOrders);
			setLoading(false);
		};

		const unsubscribe = GetAllAthletes(handleOrdersUpdate);

		return () => {
			// Cleanup function to stop listening when the component unmounts
			// unsubscribe();
		};
	}, []);

	return { data, loading, error };
};
