import {
	Box,
	Button,
	HStack,
	Icon,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	useDisclosure,
	Menu,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MobileDrawer from "./mobile-drawer";
import AddSportsModal from "../sports-discipline/modal";
import { useLocation } from "react-router-dom";
import { isAdminPath } from "../../library/utility";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import SearchModal from "../search/modal/search-modal";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase"; 

const Nav = () => {
	const { isSearching, setInputValue, search, inputValue } = useGlobalContext();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		isOpen: isOpenAddSport,
		onOpen: onOpenAddSport,
		onClose: onCloseAddSport,
	} = useDisclosure();
	const {
		isOpen: isOpenSearchModal,
		onOpen: onOpenSearchModal,
		onClose: onCloseSearchModal,
	} = useDisclosure();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [athletes, setAthletes] = useState([]);
	const [filteredAthletes, setFilteredAthletes] = useState([]);

	
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

	
	useEffect(() => {
		if (inputValue) {
			const filtered = athletes.filter((athlete) => {
				const nameParts = athlete.toLowerCase().split(" ");
				return nameParts.some((part) => part.includes(inputValue.toLowerCase()));
			});
			setFilteredAthletes(filtered);
		} else {
			setFilteredAthletes([]);
		}
	}, [inputValue, athletes]);

	return (
		<>
			<MobileDrawer isOpen={isOpen} onClose={onClose} />
			<AddSportsModal isOpen={isOpenAddSport} onClose={onCloseAddSport} />
			<SearchModal isOpen={isOpenSearchModal} onClose={onCloseSearchModal} />
			<Box as="section" p={4} bg={"#fff"}>
				<Box bg="bg.accent.default">
					<HStack justifyContent={"space-between"}>
						<HStack>
							<Image
								src="/images/ugsd.png"
								alt="university of ghana sports directorate"
								width={"150px"}
							/>
						</HStack>

						<Box position="relative" width="lg">
							<InputGroup
								maxW={"lg"}
								display={{ base: "none", md: "inline-flex" }}
								borderRadius={8}
								border={"1px solid #B08B57"}
							>
								<InputLeftElement>
									<Icon as={FiSearch} color="fg.accent.muted" fontSize="lg" />
								</InputLeftElement>
								<Input
									placeholder="Search for athlete"
									onChange={(e) => setInputValue(e.target.value)}
									variant="filled.accent"
									value={inputValue}
								/>
								<Button
									bg={"gray.200 !important"}
									onClick={() => {
										search();
										if (isAdminPath(pathname)) {
											navigate("/admin/search");
										} else {
											navigate("/");
										}
									}}
									isLoading={isSearching}
								>
									Search
								</Button>
							</InputGroup>

							{filteredAthletes.length > 0 && (
								<Box position="absolute" width="100%" top="100%" mt={2} zIndex={10}>
									<Menu isOpen>
										<MenuList>
											{filteredAthletes.map((athlete, index) => (
												<MenuItem
													key={index}
													onClick={() => {
														setInputValue(athlete);
														setFilteredAthletes([]); 
													}}
												>
													{athlete}
												</MenuItem>
											))}
										</MenuList>
									</Menu>
								</Box>
							)}
						</Box>

						<HStack>
							{isAdminPath(pathname) && (
								<Button
									bg={"gray.200 !important"}
									size={{ base: "xs", sm: "sm", md: "md" }}
									onClick={onOpenAddSport}
								>
									Add Sports Discipline
								</Button>
							)}

							<HStack display={{ base: "flex", lg: "none" }} gap={2}>
								<Icon
									as={FiSearch}
									color="fg.accent.muted"
									fontSize="2xl"
									display={{ base: "flex", md: "none" }}
									cursor={"pointer"}
									onClick={onOpenSearchModal}
								/>
								<Icon
									as={HiOutlineMenuAlt1}
									color="fg.accent.muted"
									fontSize="2xl"
									onClick={onOpen}
									cursor={"pointer"}
								/>
							</HStack>
						</HStack>
					</HStack>
				</Box>
			</Box>
		</>
	);
};

export default Nav;
