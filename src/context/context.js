import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { GetAllSportsDiscipline, searchAthlete } from "../library";
import { useToast } from "@chakra-ui/react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [sports, setSports] = useState([]);
	const [error, setError] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const toast = useToast();

	const fetchAllSports = async () => {
		setLoading(true);
		try {
			const athletesData = await GetAllSportsDiscipline();
			setSports(athletesData);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	async function search() {
		setIsSearching(true);
		if (inputValue === "") {
			toast({
				title: "Error",
				description: `Field is empty`,
				duration: 3000,
				status: "error",
				position: "top",
				isClosable: true,
			});

			setIsSearching(false);
			return;
		}

		const response = await searchAthlete(inputValue);
		setSearchResults(response);
		setIsSearching(false);
	}

	useEffect(() => {
		fetchAllSports();
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setIsLoading(false);
				// ...
			} else {
				// User is signed out
				setUser(null);
				setIsLoading(false);

				// ...
			}
		});
	});

	const defaultValues = {
		isLoading,
		setIsLoading,
		user,
		setUser,
		sports,
		searchResults,
		isSearching,
		setInputValue,
		search,
		inputValue,
		setSearchResults,
	};
	return <AppContext.Provider value={defaultValues}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
