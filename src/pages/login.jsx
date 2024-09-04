import {
	Box,
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	chakra,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setUser }) => {
	const { isOpen, onToggle } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			navigate("/admin");
			toast({
				title: "Success",
				description: `Welcome ${user?.user?.email}😊`,
				duration: 3000,
				status: "success",
				position: "top",
			});
		} catch (error) {
			console.log(error);
			toast({
				title: "Error",
				description: `${error.code}`,
				duration: 3000,
				status: "error",
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
					<Box w="max-content" mx={"auto"} mt={"5rem"}>
						<Image
							src="/images/sport.png"
							alt="sports"
							w={"250px"}
						/>
					</Box>
					<Stack
						color={"white"}
						width={"max-content"}
						mx={"auto"}
						mt={4}
						p={2}
					>
						<Text fontSize={"40px"} fontWeight={"bold"}>
							Welcome Back!!
						</Text>
						<Text>
							Kindly Log in <br /> to stay connected!!
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
					 bgColor={"color !important"}
						onSubmit={handleSubmit(onSubmit)}
						m={12}
						maxW={"500px"}
						mx={"auto"}
						px={4}
					>
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
						<FormControl isInvalid={errors.password}>
							<FormLabel htmlFor="password" color={"brand.gold"}>
								Password
							</FormLabel>
							<InputGroup display={"flex-"}>
								<InputRightElement>
									<IconButton
										variant="link"
										aria-label={
											isOpen
												? "Mask password"
												: "Reveal password"
										}
										icon={isOpen ? <HiEyeOff /> : <HiEye />}
										onClick={onToggle}
									/>
								</InputRightElement>
								<Input
									id="password"
									type={isOpen ? "text" : "password"}
									autoComplete="current-password"
									placeholder="*******"
									border="1px solid rgba(0,0,0,0.2)"
									{...register("password", {
										required: "Password is required",
									})}
									h={"60px"}
								/>
							</InputGroup>

							{errors.password && (
								<FormErrorMessage>
									<FormErrorIcon /> {errors.password.message}
								</FormErrorMessage>
							)}
						</FormControl>
						<HStack justifyContent={"space-between"} mt={14}>
							<Stack fontSize={"14px"} direction={"row"}>
								<Text>Forgot Password?</Text>
								<Link
									to={"/reset-password"}
									style={{ color: "#B08B57" }}
								>
									Reset
								</Link>
							</Stack>
							<Button
								bg={"brand.blue"}
								type="submit"
								color={"white"}
								_hover={{ opacity: 0.7 }}
								isLoading={isSubmitting}
							>
								Login
							</Button>
						</HStack>
					</chakra.form>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
