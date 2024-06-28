import { Box, chakra } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import PublicSidebar from "../../components/sidebar/public-sidebar";

const PublicHome = () => {
	return (
		<Box display={"flex"} maxH={"100vh"}>
			<chakra.div
				backgroundColor={"red"}
				w={{ base: 0, lg: "300px" }}
				height={"100vh"}
				overflow={"auto"}
			>
				<PublicSidebar />
			</chakra.div>

			<Box h="100%" w={"100%"} overflow={"auto"}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default PublicHome;
