import { Box, chakra } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
	return (
		<Box display={"flex"} maxH={"100vh"}>
			<chakra.div
				backgroundColor={"red"}
				w={{ base: 0, lg: "300px" }}
				height={"100vh"}
				overflow={"auto"}
			>
				<Sidebar />
			</chakra.div>

			<Box h="100%" w={"100%"} overflow={"auto"}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Home;
