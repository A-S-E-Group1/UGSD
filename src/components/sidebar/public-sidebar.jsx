import {
	Avatar,
	Box,
	Divider,
	Image,
	Stack,
	
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const PublicSidebar = () => {
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

			<Box mt={"3rem"}>
				<Stack>
					<Divider />
					<NavLink
						to={`/`}
						className={({ isActive }) =>
							isActive
								? "p-3 text-center block capitalize text-[20px] bg-[rgba(255,255,255,.2)]"
								: "p-3 text-center block capitalize text-[20px]"
						}
					>
						view athlete
					</NavLink>

					<Divider />

					<NavLink
						to={`/activities`}
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
		</Box>
	);
};

export default PublicSidebar;
