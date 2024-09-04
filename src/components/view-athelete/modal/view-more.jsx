import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Image,
	Text,
	Stack,
	chakra,
	ButtonGroup,
	Button,
	Select,
	Badge,
	useToast,
	Avatar,
	Input,
	HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import MedalTable from "../medal-table";
import { sports_comp } from "../../../constants/constants";
import {
	UpdateAthleteById,
	UpdateMedalById,
	uploadImage,
} from "../../../library/index.js";
import { FaUpload } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { isAdminPath } from "../../../library/utility.js";
import CustomSkeleton from "../../skeleton/custom-skeleton.jsx";

const ViewMore = ({ isOpen, onClose, athlete, setAthlete }) => {
	const [isEditingMedal, setIsEditingMedal] = useState(false);
	const [competition, setCompetition] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [imageDataUrl, setImageDataUrl] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const { pathname } = useLocation();

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImageFile(file);
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageDataUrl(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const upload = async (id) => {
		setIsUploading(true);
		const response = await uploadImage(imageFile);

		if (response) {
			const img = {
				imageUrl: response,
			};
			await UpdateAthleteById(id, img);
			toast({
				title: "Success",
				description: `Image uploaded successfully`,
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		} else {
			toast({
				title: "Error",
				description: `Something went wrong`,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}

		setIsUploading(false);
		setImageDataUrl(null);
		setImageFile(null);
		onClose();
	};

	const toast = useToast();
	const [medals, setMedals] = useState({
		GUSA: {
			gold: "",
			silver: "",
			bronze: "",
		},
		FISU: {
			gold: "",
			silver: "",
			bronze: "",
		},
		FASU: {
			gold: "",
			silver: "",
			bronze: "",
		},
		PAUDC: {
			gold: "",
			silver: "",
			bronze: "",
		},
	});

	const handleChange = (e) => {
		setCompetition(e.target.value);

		setMedals({
			GUSA: {
				gold: athlete?.medals?.GUSA?.gold || "",
				silver: athlete?.medals?.GUSA?.silver || "",
				bronze: athlete?.medals?.GUSA?.bronze || "",
			},
			FISU: {
				gold: athlete?.medals?.FISU?.gold || "",
				silver: athlete?.medals?.FISU?.silver || "",
				bronze: athlete?.medals?.FISU?.bronze || "",
			},
			FASU: {
				gold: athlete?.medals?.FASU?.gold || "",
				silver: athlete?.medals?.FASU?.silver || "",
				bronze: athlete?.medals?.FASU?.bronze || "",
			},
			PAUDC: {
				gold: athlete?.medals?.PAUDC?.gold || "",
				silver: athlete?.medals?.PAUDC?.silver || "",
				bronze: athlete?.medals?.PAUDC?.bronze || "",
			},
		});
	};

	const updateMedal = async (id) => {
		setIsLoading(true);
		const response = await UpdateMedalById(id, medals);

		if (response?.error) {
			toast({
				title: "Error",
				description: `${response?.message}`,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			setIsLoading(false);
			setIsEditingMedal(false);
			return;
		}

		toast({
			title: "Great",
			description: `Medals updated successfully`,
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top",
		});
		onClose();
		setIsLoading(false);
		setCompetition("");
		setIsEditingMedal(false);
	};

	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			size={"md"}
			placement="right"
			onCloseComplete={() => {
				setAthlete(null);
				setCompetition("");
			}}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				{!athlete ? (
					<DrawerBody>
						<CustomSkeleton />
					</DrawerBody>
				) : (
					<DrawerBody>
						<Text fontSize={"xl"} fontWeight={"bold"}>
							Athlete Details
						</Text>
						<Stack gap={8} mt={4} direction={{ base: "column", sm: "row" }}>
							{!imageDataUrl && (
								<Stack pos={"relative"}>
									{athlete?.imageUrl ? (
										<Avatar
											src={athlete?.imageUrl}
											w={{ base: "150px", md: "150px" }}
											h={"150px"}
										/>
									) : (
										<Avatar
											src={imageDataUrl}
											w={{ base: "100%", md: "150px" }}
											h={"150px"}
										/>
									)}
									{isAdminPath(pathname) && (
										<Box>
											<Button
												as="label"
												htmlFor="file"
												colorScheme="teal"
												cursor="pointer"
												leftIcon={<FaUpload />}
												size={"sm"}
												onChange={handleFileChange}
											>
												<Input
													type="file"
													id="file"
													accept="image/*"
													display="none"
												/>
												Change image
											</Button>
										</Box>
									)}
								</Stack>
							)}
							{imageDataUrl && (
								<Stack>
									<Image
										maxW={{ base: "100%", sm: "150px" }}
										maxH={"200px"}
										src={imageDataUrl}
										alt="athlete image"
										border={"5px solid #B08B57"}
									/>
									<HStack>
										<Button
											leftIcon={<FaUpload />}
											size={"sm"}
											colorScheme="blue"
											onClick={() => upload(athlete?.id)}
											isLoading={isUploading}
										>
											Proceed Upload
										</Button>
										<Button
											size={"sm"}
											onClick={() => {
												setImageDataUrl(null);
												setImageFile(null);
											}}
											colorScheme="red"
										>
											Clear Image
										</Button>
									</HStack>
								</Stack>
							)}
							<Box>
								<Text fontSize={"30px"}>{athlete?.full_name}</Text>
								<Text fontWeight={"bold"}>
									<chakra.span fontWeight={"normal"}>ID:</chakra.span>{" "}
									{athlete?.index}
								</Text>{" "}
								<Text fontWeight={"bold"}>
									<chakra.span fontWeight={"normal"}>
										Gender:
									</chakra.span>{" "}
									{athlete?.gender}
								</Text>{" "}
							</Box>
						</Stack>
						<Stack
							gap={4}
							borderRadius={"10px"}
							border={"1px solid #B08B57"}
							mt={8}
							p={4}
						>
							<Box>
								<Box fontWeight={"bold"}>
									{" "}
									<chakra.span fontSize={"13px"} fontWeight={"bold"}>
										Sport:
									</chakra.span>{" "}
									<Stack direction={"row"}>
										{athlete?.sport?.map((s, i) => (
											<Badge key={i} colorScheme="purple">
												{s}
											</Badge>
										))}
									</Stack>
								</Box>
							</Box>

							<Box>
								<Text fontWeight={"bold"}>Note</Text>
								<Text>{athlete?.notes ? athlete.notes : "N/A"}</Text>
							</Box>
						</Stack>
						<Box mt={8}>
							<Text fontWeight={"medium"} fontSize={"30px"}>
								Medals Won
							</Text>

							<Select
								variant="flushed"
								placeholder="Select competition to see medals won"
								border="1px solid rgba(0,0,0,0.2)"
								borderRadius={"8px"}
								maxW={"700%"}
								mt={2}
								mb={6}
								style={{ padding: ".2rem" }}
								disabled={isEditingMedal}
								onChange={(e) => handleChange(e)}
							>
								{Object.entries(sports_comp).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</Select>

							{competition && (
								<>
									<MedalTable
										isEditingMedal={isEditingMedal}
										medals={medals}
										setMedals={setMedals}
										competition={competition}
										athlete={athlete}
									/>
									<ButtonGroup mt={2} mb={8}>
										{isEditingMedal ? (
											<>
												<Button
													bg={"red.500"}
													variant="solid"
													color={"#fff"}
													_hover={{ opacity: 0.7 }}
													onClick={() =>
														setIsEditingMedal(false)
													}
												>
													Cancel
												</Button>
												<Button
													bgColor={"brand.blue !important"}
													variant="outline"
													color={"#fff"}
													_hover={{ opacity: 0.7 }}
													onClick={() =>
														updateMedal(athlete.id)
													}
													isLoading={isLoading}
												>
													Save
												</Button>
											</>
										) : (
											<Button
												bgColor={"brand.blue !important"}
												variant="solid"
												color={"#fff"}
												_hover={{ opacity: 0.7 }}
												onClick={() => setIsEditingMedal(true)}
												leftIcon={<MdEdit />}
												display={
													isAdminPath(pathname)
														? "flex"
														: "none"
												}
											>
												Edit
											</Button>
										)}
									</ButtonGroup>
								</>
							)}
						</Box>
					</DrawerBody>
				)}
			</DrawerContent>
		</Drawer>
	);
};

export default ViewMore;
