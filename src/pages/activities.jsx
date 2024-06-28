import { Box, Text, chakra } from "@chakra-ui/react";
import Calendar from "../components/calendar/calendar";
import Nav from "../components/nav/nav";

const Activities = () => {
	return (
		<chakra.div
			w="full"
			h={"100vh"}
			bgColor="red.300"
			bgImage={"/images/bg-3.jpeg"}
			backgroundPosition={"center"}
			backgroundSize={"cover"}
			bgRepeat={"no-repeat"}
		>
			<chakra.nav>
				<Nav />
			</chakra.nav>
			<Box px={{ base: 2, md: 4, lg: 6, xl: 10 }} py={10}>
				<Box
					bg="white"
					height="200px"
					minH={"600px"}
					borderRadius={"lg"}
					p={4}
					px={{ base: "2", md: 8 }}
					overflowY={"auto"}
					display={"flex"}
					justifyContent={"space-between"}
					flexDir={{ base: "column", md: "row", lg: "column", xl: "row" }}
					gap={8}
				>
					<Box flex={1}>
						<Text
							as={"h2"}
							fontSize={{ base: "xl", sm: "4xl" }}
							textAlign={{ base: "center", sm: "left" }}
							fontWeight={"semibold"}
						>
							{" "}
							Upcoming Sports Events
						</Text>
						<Calendar />
					</Box>
					
				</Box>
			</Box>
		</chakra.div>
	);
};

export default Activities;
