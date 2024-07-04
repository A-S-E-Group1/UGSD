import {
	Badge,
	Container,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
	// useToast,
} from "@chakra-ui/react";
import { FiEdit2, FiEye, FiMoreVertical } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import Delete from "./modal/delete";
import ViewMore from "./modal/view-more";
import { useLocation, useNavigate } from "react-router-dom";
import { residence } from "../../constants/constants";
import { useState } from "react";
import { GetAthleteByID } from "../../library";
import { isAdminPath } from "../../library/utility";

const TableColumns = [
	{ name: "name" },
	{ name: "index #" },
	{ name: "date of birth" },
	{ name: "gender" },
	{ name: "program" },
	{ name: "year of admission" },
	{ name: "hall of residence" },
	{ name: "sport" },
	{ name: "medals won" },
	{ name: "note" },
	{ name: "option" },
];

const ViewAthleteTable = ({ data }) => {
	const [postId, setPostId] = useState("");
	const [athlete, setAtlete] = useState({});
	const navigate = useNavigate();
	const { pathname } = useLocation();
	// const toast = useToast();

	const fetchSingleAthlete = async (id) => {
		const data = await GetAthleteByID(id);
		setAtlete(data);
	};

	// Open delete modal states
	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure();

	// Open View More modal states
	const {
		isOpen: isOpenViewMore,
		onOpen: onOpenViewMore,
		onClose: onCloseViewMore,
	} = useDisclosure();

	return (
		<>
			<Delete
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				postId={postId}
				setPostId={setPostId}
			/>
			<ViewMore
				isOpen={isOpenViewMore}
				onClose={onCloseViewMore}
				athlete={athlete}
			/>
			<Container maxW={"100%"} overflow={"auto"} mt={8} maxH={"70vh"}>
				{data.length > 0 ? (
					<Table variant="striped" size="sm">
						<Thead>
							<Tr>
								{TableColumns.map((column, index) => (
									<Th
										key={`column-${index}`}
										textTransform={"capitalize"}
										fontSize="1rem"
										fontWeight={"semibold"}
									>
										{column.name}
									</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{data?.map((athlete, index) => {
								return (
									<Tr key={index}>
										<Td>
											<Text whiteSpace={"nowrap"}>
												{athlete.full_name}
											</Text>
										</Td>
										<Td>
											<Text>{athlete.index}</Text>
										</Td>
										<Td>
											<Text>{athlete.date_of_birth}</Text>
										</Td>
										<Td>
											<Text textTransform={"capitalize"}>
												{athlete.gender}
											</Text>
										</Td>
										<Td>
											<Text>{athlete.course}</Text>
										</Td>
										<Td>
											<Text>{athlete.admission_date}</Text>
										</Td>
										<Td>
											<Text>{residence[athlete.residence]}</Text>
										</Td>
										<Td>
											<Stack>
												{athlete?.sport.map((s, i) => (
													<Badge key={i} colorScheme="purple">
														{s}
													</Badge>
												))}
											</Stack>
										</Td>
										<Td>
											<Text>2</Text>
										</Td>
										<Td>
											<Text>{athlete.notes}.</Text>
										</Td>
										<Td>
											<Menu>
												<MenuButton
													as={IconButton}
													aria-label="Options"
													icon={<FiMoreVertical />}
													variant="outline"
												/>
												<MenuList>
													{isAdminPath(pathname) && (
														<MenuItem
															icon={<FiEdit2 />}
															onClick={() =>
																navigate(
																	`/admin/edit/${athlete.id}`
																)
															}
														>
															Edit
														</MenuItem>
													)}

													<MenuItem
														icon={<FiEye />}
														onClick={() => {
															onOpenViewMore();
															fetchSingleAthlete(
																athlete.id
															);
														}}
													>
														View More
													</MenuItem>
													{isAdminPath(pathname) && (
														<MenuItem
															color={"red.400"}
															icon={<IoTrashBin />}
															onClick={() => {
																onOpenDelete();
																setPostId(athlete.id);
															}}
														>
															Delete
														</MenuItem>
													)}
												</MenuList>
											</Menu>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				) : (
					<>
						<Text fontSize={"2xl"} align={"center"} mt={10}>
							No record found😓
						</Text>
						<Text>
							Please try again.
						</Text>
						
					</>
				)}
			</Container>
		</>
	);
};

export default ViewAthleteTable;
