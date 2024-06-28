import {
	Box,
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	HStack,
	Image,
	Input,
	Stack,
	Text,
	chakra,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();
	const toast = useToast();

	const onSubmit = async (data) => {
		try {
			await sendPasswordResetEmail(auth, data.email);
			toast({
				title: "Success",
				description: "Reset link has been sent to your email",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
		} catch (error) {
			console.log(error.message);
			toast({
				title: "Error",
				description: `${error?.message.replace("Firebase: ", "")}`,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
		}
	};

	return (
		<Box
			minH={"100vh"}
			bgSize={"cover"}
			bgImage={"/images/login-bg.png"}
			pt={20}
		>
			<Box
				maxW={{ base: "95%", sm: "90%", xl: "1200px" }}
				minH={"70vh"}
				mx={"auto"}
				display={"flex"}
			>
				<Box
					bg={"brand.blue"}
					flex={0.4}
					borderRadius={"1.5rem 0 0 1.5rem"}
					display={{ base: "none", md: "block" }}
				>
					<Stack
						color={"white"}
						width={"max-content"}
						mx={"auto"}
						mt={40}
						p={2}
					>
						<Text fontSize={"40px"} fontWeight={"bold"}>
							Forgot Password?
						</Text>
						<Text>
							Don't worry we can help <br /> Reset your password!!
						</Text>
					</Stack>
				</Box>
				<Box
					bg={"#fff"}
					flex={{ base: "1", md: 0.6 }}
					borderRadius={{ base: "3xl", md: "0 1.5rem 1.5rem 0" }}
				>
					<Box w="max-content" mx={"auto"} mt={"5rem"}>
						<Image src="/images/ugsd.png" alt="sports" w="150px" />
					</Box>
					<chakra.form
						onSubmit={handleSubmit(onSubmit)}
						m={12}
						maxW={"500px"}
						mx={"auto"}
						px={4}
					>
						<chakra.div
							w="50px"
							h={"50px"}
							border={"1px solid #B08B57"}
							borderRadius={"full"}
							display={"grid"}
							mx={"auto"}
							placeItems={"center"}
							bg={"gray.200"}
							mb={10}
						>
							<Image src="/key.svg" alt="key" w={"25px"} />
						</chakra.div>
						<Text
							as={"h3"}
							textAlign={"center"}
							fontWeight={"medium"}
							mb={4}
						>
							Kindly input your email for reset instructions
						</Text>
						<FormControl isInvalid={errors.email} mb={4}>
							<FormLabel color={"brand.gold"}>Email</FormLabel>
							<Input
								type="text"
								placeholder="email"
								border="1px solid rgba(0,0,0,0.2)"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message:
											"Provide a valid email address",
									},
								})}
								h={"60px"}
							/>
							{errors.email && (
								<FormErrorMessage>
									<FormErrorIcon /> {errors.email.message}
								</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent={"space-between"} mt={14}>
							<Link
								to="/login"
								style={{ color: "#B08B57", fontSize: "14px" }}
							>
								Back to login
							</Link>
							<Button
								bg={"brand.blue"}
								type="submit"
								color={"white"}
								_hover={{ opacity: 0.7 }}
								isLoading={isSubmitting}
							>
								Request
							</Button>
						</HStack>
					</chakra.form>
				</Box>
			</Box>
		</Box>
	);
}

export default ResetPassword;
