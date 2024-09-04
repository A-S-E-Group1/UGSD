import { Box, Button, Skeleton, Stack, Text, chakra } from "@chakra-ui/react";
import { useGlobalContext } from "../context/context";
import Nav from "../components/nav/nav";
import ViewAthleteTable from "../components/view-athelete/table";
import { useNavigate,useLocation } from 'react-router-dom';

const SearchPage = () => {
	const { user, searchResults, isSearching, setSearchResults, setInputValue } =
		useGlobalContext();
	console.log(searchResults);
	const navigate = useNavigate();
	const location = useLocation();

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
							{searchResults.length > 0 && (
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
		  bgColor={"color !important"}
          type="submit"
          color={"white"}
          _hover={{ opacity: 0.7 }}
          onClick={() => {
            setSearchResults([]);
            setInputValue("");
			if (location.pathname.includes('/admin')) {
				navigate('/admin');
			} else {
				navigate('/');
			}
          }}
        >
          Clear Results
        </Button>
      </Stack>
    )}
    <ViewAthleteTable data={searchResults} user={user} />
  </>
)}
				</Box>
			</Box>
		</chakra.div>
	);
};

export default SearchPage;
