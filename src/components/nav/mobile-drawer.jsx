import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Avatar,
	Box,
	Button,
	Divider,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../../services/firebase";
import PublicDrawerBody from "./public-mobile-drawer-body";
import { isAdminPath } from "../../library/utility";

const MobileDrawer = ({ isOpen, onClose }) => {
	const { pathname } = useLocation();

	const logOut = () => {
		try {
			signOut(auth);
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};
	return (
		<Drawer isOpen={isOpen} placement="left" size={"sm"} onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerBody>
					{isAdminPath(pathname) ? (
						<>
							<Box width={"max-content"} mx={"auto"}>
								<Avatar size={"lg"} />
							</Box>
							<Text
								as={"h1"}
								fontWeight={"bold"}
								fontSize={"30px"}
								textAlign={"center"}
							>
								
							</Text>
							<Text as={"h3"} textAlign={"center"}>
								Admin
							</Text>
							<Box mt={"3rem"}>
								<Stack>
									<Divider />
									<NavLink
										to={`/admin`}
										end
										className={({ isActive }) =>
											isActive
												? "p-2 text-center block capitalize text-lg bg-[#0A2E65] text-white"
												: "p-2 text-center block capitalize text-lg"
										}
										onClick={onClose}
									>
										view athlete
									</NavLink>
									<Divider />
									<NavLink
										to={`/admin/add`}
										className={({ isActive }) =>
											isActive
												? "p-2 text-center block capitalize text-lg bg-[#0A2E65] text-white"
												: "p-2 text-center block capitalize text-lg"
										}
										onClick={onClose}
									>
										add athlete
									</NavLink>
									<Divider />
									<NavLink
										to={`/admin/activities`}
										className={({ isActive }) =>
											isActive
												? "p-2 text-center block capitalize text-lg bg-[#0A2E65] text-white"
												: "p-2 text-center block capitalize text-lg"
										}
										onClick={onClose}
									>
										calendar
									</NavLink>
									<Divider />
								</Stack>
							</Box>
							<Box w={"max-content"} mx={"auto"}>
								<Image
									src="/images/sport.png"
									alt="sports"
									mt={4}
								/>
							</Box>
							<Button
								mx={"auto"}
								display={"flex"}
								mt={8}
								onClick={logOut}
							>
								Log Out
							</Button>
						</>
					) : (
						<PublicDrawerBody onClose={onClose} />
					)}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileDrawer;
