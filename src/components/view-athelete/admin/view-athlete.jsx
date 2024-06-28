import { Box, Text } from "@chakra-ui/react";
import ViewAthleteTable from "../table";
import { useGlobalContext } from "../../../context/context";

const AdminViewAthlete = ({ athletes, loading }) => {
	const { user } = useGlobalContext();

	return (
		<Box>
			<Box
				bg="white"
				height="100%"
				minH={"500px"}
				m={{ base: 2, lg: 6 }}
				borderRadius={"lg"}
				p={4}
				px={{ base: "2", md: 8 }}
			>
				<Text
					as={"h2"}
					fontSize={{ base: "xl", sm: "2xl" }}
					textAlign={{ base: "center", sm: "left" }}
					fontWeight={"semibold"}
				>
					{" "}
					Athlete Records
				</Text>
				{loading ? (
					<Text fontSize={"2xl"} align={"center"} mt={10}>
						Loading Data...
					</Text>
				) : (
					<ViewAthleteTable data={athletes} user={user} />
				)}
			</Box>
		</Box>
	);
};

export default AdminViewAthlete;
