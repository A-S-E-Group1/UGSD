import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Stack,
	Textarea,
	chakra,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
	discipline,
	residence,
	gender,
	level,
} from "../../constants/constants";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { UpdateAthleteById } from "../../library";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const EditAthleteForm = ({ athlete }) => {
	const [sport, setSport] = useState([]);
	const { sports } = useGlobalContext();
	const sortedSports = sports?.[0]?.sports?.sort((a, b) =>
		a.toLowerCase().localeCompare(b.toLowerCase())
	);

	const toast = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (values, id) => {
		if (!sport) {
			toast({
				title: "Error",
				description: "Sport is required",
				duration: 3000,
				status: "error",
				position: "top",
			});
			return;
		}

		const newValues = {
			...values,
			sport,
		};

		const response = await UpdateAthleteById(id, newValues);

		if (response?.error) {
			toast({
				title: "Error",
				description: `${response?.message}`,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		toast({
			title: "Great",
			description: `Athlete updated successfully`,
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top",
		});

		navigate("/");
	};

	useEffect(() => {
		setValue("full_name", athlete?.full_name);
		setValue("date_of_birth", athlete?.date_of_birth);
		setValue("index", athlete?.index);
		setValue("admission_date", athlete?.admission_date);
		setValue("residence", athlete?.residence);
		setValue("gender", athlete?.gender);
		setValue("level", athlete?.level);
		setValue("course", athlete?.course);
		setValue("notes", athlete?.notes);

		//   return () => {
		// 	second
		//   }
	}, [setValue, athlete]);

	useEffect(() => {
		if (athlete?.sport) {
			setSport(athlete.sport);
		}
	}, [athlete?.sport]);

	return (
		<chakra.form
			border={"1px solid #B08B57"}
			borderRadius={"12px"}
			p={{ base: 4, md: 10, lg: 4, xl: 10 }}
			onSubmit={handleSubmit((data) => onSubmit(data, athlete.id))}
		>
			<FormControl isInvalid={errors.full_name} mb={4} isRequired>
				<Stack direction={{ base: "column", md: "row" }} gap={0}>
					<FormLabel
						minW={"100px"}
						fontSize={"14px"}
						fontWeight={"semibold"}
						alignSelf={{ base: "auto", md: "center" }}
					>
						Full Name
					</FormLabel>
					<Input
						type="text"
						placeholder="Full name"
						border="1px solid rgba(0,0,0,0.2)"
						{...register("full_name", {
							required: "Full Name is required",
						})}
						maxW={"100%"}
					/>
				</Stack>

				{errors.full_name && (
					<FormErrorMessage>
						<FormErrorIcon /> {errors.full_name.message}
					</FormErrorMessage>
				)}
			</FormControl>
			<Stack
				direction={{ base: "column", md: "row" }}
				gap={{ base: 0, md: 8 }}
			>
				<FormControl isInvalid={errors.date_of_birth} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Date of Birth
						</FormLabel>
						<Input
							type="date"
							border="1px solid rgba(0,0,0,0.2)"
							{...register("date_of_birth", {
								required: "Date of Birth is required",
							})}
							maxW={"100%"}
						/>
					</Stack>

					{errors.date_of_birth && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.date_of_birth.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={errors.index} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Index Number
						</FormLabel>
						<Input
							type="text"
							border="1px solid rgba(0,0,0,0.2)"
							placeholder="Enter index number"
							{...register("index", {
								required: "Index number is required",
							})}
							maxW={"100%"}
						/>
					</Stack>

					{errors.index && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.index.message}
						</FormErrorMessage>
					)}
				</FormControl>
			</Stack>
			<Stack
				direction={{ base: "column", md: "row" }}
				gap={{ base: 0, md: 8 }}
			>
				<FormControl
					isInvalid={errors.admission_date}
					mb={4}
					isRequired
				>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Admission Date
						</FormLabel>
						<Input
							type="date"
							border="1px solid rgba(0,0,0,0.2)"
							{...register("admission_date", {
								required: "Admission date is required",
							})}
							maxW={"100%"}
						/>
					</Stack>

					{errors.admission_date && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.admission_date.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={errors.residence} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Residence
						</FormLabel>
						<Select
							variant="flushed"
							placeholder="Choose residence"
							border="1px solid rgba(0,0,0,0.2)"
							borderRadius={"8px"}
							maxW={"100%"}
							{...register("residence", {
								required: "Residence is required",
							})}
							style={{ padding: ".2rem" }}
						>
							{Object.entries(residence).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</Select>
					</Stack>

					{errors.residence && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.residence.message}
						</FormErrorMessage>
					)}
				</FormControl>
			</Stack>
			<Stack
				direction={{ base: "column", md: "row" }}
				gap={{ base: 0, md: 8 }}
			>
				<FormControl isInvalid={errors.gender} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Gender
						</FormLabel>
						<Select
							variant="flushed"
							placeholder="Choose Gender"
							border="1px solid rgba(0,0,0,0.2)"
							borderRadius={"8px"}
							maxW={"100%"}
							{...register("gender", {
								required: "Gender is required",
							})}
							style={{ padding: ".2rem" }}
						>
							{Object.entries(gender).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</Select>
					</Stack>

					{errors.gender && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.gender.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<Stack
					direction={{ base: "column", md: "row" }}
					gap={0}
					flex={1}
				>
					<FormLabel
						minW={"100px"}
						fontSize={"14px"}
						fontWeight={"semibold"}
						alignSelf={{ base: "auto", md: "center" }}
					>
						Sport
					</FormLabel>
					<Multiselect
						isObject={false}
						options={sortedSports}
						onSelect={(value) => setSport(value)}
						onRemove={(value) => setSport(value)}
						selectedValues={athlete?.sport}
						placeholder="Select Sports"
						avoidHighlightFirstOption={true}
						showArrow
						style={{
							multiselectContainer: {
								width: "100%",
							},
						}}
					/>
				</Stack>
			</Stack>
			<Stack
				direction={{ base: "column", md: "row" }}
				gap={{ base: 0, md: 8 }}
			>
				<FormControl isInvalid={errors.level} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Level
						</FormLabel>
						<Select
							variant="flushed"
							placeholder="Choose level"
							border="1px solid rgba(0,0,0,0.2)"
							borderRadius={"8px"}
							maxW={"100%"}
							{...register("level", {
								required: "Level is required",
							})}
							style={{ padding: ".2rem" }}
						>
							{level.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</Select>
					</Stack>

					{errors.level && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.level.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={errors.course} mb={4} isRequired>
					<Stack direction={{ base: "column", md: "row" }} gap={0}>
						<FormLabel
							minW={"100px"}
							fontSize={"14px"}
							fontWeight={"semibold"}
							alignSelf={{ base: "auto", md: "center" }}
						>
							Course
						</FormLabel>
						<Input
							type="text"
							border="1px solid rgba(0,0,0,0.2)"
							placeholder="Enter course of study"
							{...register("course", {
								required: "Course is required",
							})}
							maxW={"100%"}
						/>
					</Stack>

					{errors.course && (
						<FormErrorMessage>
							<FormErrorIcon /> {errors.course.message}
						</FormErrorMessage>
					)}
				</FormControl>
			</Stack>
			<FormControl isInvalid={errors.notes} mb={4}>
				<Stack direction={{ base: "column", md: "row" }} gap={0}>
					<FormLabel
						minW={"100px"}
						fontSize={"14px"}
						fontWeight={"semibold"}
						alignSelf={{ base: "auto", md: "center" }}
					>
						Notes
					</FormLabel>
					<Textarea
						placeholder="Enter few notes here"
						border="1px solid rgba(0,0,0,0.2)"
						{...register("notes")}
						maxW={"100%"}
					/>
				</Stack>

				{errors.notes && (
					<FormErrorMessage>
						<FormErrorIcon /> {errors.notes.message}
					</FormErrorMessage>
				)}
			</FormControl>
			<Button
				bg={"brand.blue"}
				display={"flex"}
				alignSelf={"flex-end"}
				type="submit"
				color={"white"}
				_hover={{ opacity: 0.7 }}
				isLoading={isSubmitting}
			>
				Update Records
			</Button>
		</chakra.form>
	);
};

export default EditAthleteForm;
