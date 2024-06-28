import { Box, Text, chakra } from "@chakra-ui/react";
import AthleteForm from "../components/add-athlete/form";
import Nav from "../components/nav/nav";


const AddAthlete = () => {
	return (
		<chakra.div
			w="full"
			h={"100vh"}
			bgColor="red.300"
			bgImage={"/images/bg-2.jpeg"}
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
					height="70vh"
					minH={"500px"}
					borderRadius={"lg"}
					p={4}
					px={{ base: "2", md: 12 }}
					overflowY={"auto"}
				>
					<Text
						as={"h2"}
						fontSize={{ base: "xl", sm: "2xl" }}
						textAlign={{ base: "center", sm: "left" }}
						fontWeight={"semibold"}
					>
						{" "}
						Add Athlete
					</Text>
					<AthleteForm />
				</Box>
			</Box>
		</chakra.div>
	);
};

export default AddAthlete;
