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

						<InputGroup
							maxW={"sm"}
							display={{ base: "none", md: "inline-flex" }}
							borderRadius={8}
							border={"1px solid #B08B57"}
						>
							<InputLeftElement>
								<Icon
									as={FiSearch}
									color="fg.accent.muted"
									fontSize="lg"
								/>
							</InputLeftElement>
							<Input
								placeholder="Search with index #"
								onChange={(e) => setInputValue(e.target.value)}
								variant="filled.accent"
								value={inputValue}
							/>
							<Button
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
						<HStack>
							{isAdminPath(pathname) && (
								<Button
									// display={{ base: "none", lg: "block" }}
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
