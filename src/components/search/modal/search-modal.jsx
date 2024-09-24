import React, { useState, useEffect, useRef } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	Menu,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { useGlobalContext } from "../../../context/context";
import { isAdminPath } from "../../../library/utility";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; // Firebase
import { db } from "../../../services/firebase"; // Adjust the path to your firebase config

const SearchModal = ({ isOpen, onClose }) => {
	const { isSearching, setInputValue, inputValue, search } = useGlobalContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const inputRef = useRef(null);

	// States for handling athletes and filtered results
	const [athletes, setAthletes] = useState([]);
	const [filteredAthletes, setFilteredAthletes] = useState([]);

	// Fetch athletes from Firestore
	useEffect(() => {
		const fetchAthletes = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "Athlete Data"));
				const athleteList = querySnapshot.docs.map(doc => doc.data().full_name); // Assuming 'full_name' is the field
				setAthletes(athleteList);
			} catch (error) {
				console.error("Error fetching athletes: ", error);
			}
		};
		fetchAthletes();
	}, []);

	// Filter athletes based on input value
	useEffect(() => {
		if (inputValue) {
			const filtered = athletes.filter((athlete) => {
				const nameParts = athlete.toLowerCase().split(" ");
				return nameParts.some((part) =>
					part.includes(inputValue.toLowerCase())
				);
			});
			setFilteredAthletes(filtered);
		} else {
			setFilteredAthletes([]);
		}
	}, [inputValue, athletes]);

	
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Search for Athlete</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						ref={inputRef} 
						autoFocus 
						placeholder="Search for athlete with name"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>

					{/* Dropdown for filtered athlete list */}
					{filteredAthletes.length > 0 && (
						<Menu isOpen>
							<MenuList>
								{filteredAthletes.map((athlete, index) => (
									<MenuItem
										key={index}
										onClick={() => {
											setInputValue(athlete); // Set input value to selected name
											setFilteredAthletes([]); // Hide dropdown after selection
										}}
									>
										{athlete}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					)}
				</ModalBody>

				<ModalFooter gap={4}>
					<Button
						variant="solid"
						backgroundColor={"red.400"}
						color={"white"}
						onClick={onClose}
					>
						Close
					</Button>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={() => {
							search();
							if (isAdminPath(pathname)) {
								navigate("/admin/search");
							} else {
								navigate("/");
							}
							onClose();
						}}
						isLoading={isSearching}
					>
						Search
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SearchModal;
