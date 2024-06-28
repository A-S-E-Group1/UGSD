import React from "react";
import { Box, Divider, Image, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const PublicDrawerBody = ({ onClose }) => {
	return (
		<>
			<Box mt={"3rem"}>
				<Stack>
					<Divider />
					<NavLink
						to={`/`}
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
						to={`/activities`}
						className={({ isActive }) =>
							isActive
								? "p-2 text-center block capitalize text-lg bg-[#0A2E65] text-white"
								: "p-2 text-center block capitalize text-lg"
						}
						onClick={onClose}
					>
						activities
					</NavLink>
					<Divider />
				</Stack>
			</Box>
			<Box w={"max-content"} mx={"auto"}>
				<Image src="/images/sport.png" alt="sports" mt={4} />
			</Box>
		</>
	);
};

export default PublicDrawerBody;
