import {
	Avatar,
	Box,
	Button,
	Divider,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useGlobalContext } from "../../context/context";

const Sidebar = () => {
	const { user } = useGlobalContext();

	const logOut = () => {
		try {
			signOut(auth);
			// navigate("/login");
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};
	return (
		<Box
			bg="brand.blue"
			display={{ base: "none", lg: "block" }}
			p={"8"}
			color={"white"}
			minH={"100%"}
		>
			<Box width={"max-content"} mx={"auto"}>
				<Avatar size={"xl"} />
			</Box>
			{user ? (
				<>
					<Text
						as={"h1"}
						fontWeight={"bold"}
						fontSize={"30px"}
						textAlign={"center"}
					>
						John Doe
					</Text>
					<Text as={"h3"} mt={4} textAlign={"center"}>
						Admin
					</Text>
				</>
			) : (
				<></>
			)}

			<Box mt={"3rem"}>
				<Stack>
					<Divider />
					<NavLink
						to={`/admin`}
						end
						className={({ isActive }) =>
							isActive
								? "p-3 text-center block capitalize text-[20px] bg-[rgba(255,255,255,.2)]"
								: "p-3 text-center block capitalize text-[20px]"
						}
					>
						view athlete
					</NavLink>
					{user && (
						<>
							<Divider />
							<NavLink
								to={`/admin/add`}
								className={({ isActive }) =>
									isActive
										? "p-3 text-center block capitalize text-[20px] bg-[rgba(255,255,255,.2)]"
										: "p-3 text-center block capitalize text-[20px]"
								}
							>
								add athlete
							</NavLink>
						</>
					)}
					<Divider />

					<NavLink
						to={`/admin/activities`}
						className={({ isActive }) =>
							isActive
								? "p-3 text-center block capitalize text-[20px] bg-[rgba(255,255,255,.2)]"
								: "p-3 text-center block capitalize text-[20px]"
						}
					>
						activities
					</NavLink>
					<Divider />
				</Stack>
			</Box>
			<Image src="/images/sport.png" alt="sports" mt={4} />
			{user && (
				<Button mx={"auto"} display={"flex"} mt={8} onClick={logOut}>
					Log out
				</Button>
			)}
		</Box>
	);
};

export default Sidebar;
