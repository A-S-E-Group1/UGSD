import { Box, Button, Skeleton, Stack, Text, chakra } from "@chakra-ui/react";
import { useGlobalContext } from "../context/context";
import Nav from "../components/nav/nav";
import ViewAthleteTable from "../components/view-athelete/table";

const SearchPage = () => {
	const { user, searchResults, isSearching, setSearchResults, setInputValue } =
		useGlobalContext();
	console.log(searchResults);
	return (
		<chakra.div
			w="full"
			h={"100vh"}
			bgColor="red.300"
			bgImage={"/images/bg1.jpeg"}
			backgroundPosition={"center"}
			backgroundSize={"cover"}
			bgRepeat={"no-repeat"}
		>
			<chakra.nav>
				<Nav />
			</chakra.nav>
			<Box>
				<Box
					bg="#fff"
					height="100%"
					minH={"500px"}
					m={{ base: 2, lg: 6 }}
					borderRadius={"lg"}
					p={4}
					px={{ base: "2", md: 8 }}
				>
					{isSearching ? (
						<Stack>
							<Skeleton noOfLines={3} height={"30px"} />
							<Skeleton noOfLines={3} height={"30px"} />
							<Skeleton noOfLines={3} height={"30px"} />
						</Stack>
					) : (
						<>
							<Stack justifyContent={"space-between"} flexDirection={"row"}>
								<Text
									as={"h2"}
									fontSize={{ base: "lg", sm: "2xl" }}
									// textAlign={{ base: "center", sm: "left" }}
									fontWeight={"semibold"}
								>
									{" "}
									Athlete Records
								</Text>
								<Button
									bg={"brand.blue"}
									type="submit"
									color={"white"}
									_hover={{ opacity: 0.7 }}
									display={
										searchResults.length > 0 ? "inline-flex" : "none"
									}
									onClick={() => {
										setSearchResults([]);
										setInputValue("");
									}}
								>
									Clear Results
								</Button>
							</Stack>
							<ViewAthleteTable data={searchResults} user={user} />
						</>
					)}
				</Box>
			</Box>
		</chakra.div>
	);
};

export default SearchPage;
