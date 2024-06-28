import { chakra } from "@chakra-ui/react";
import Nav from "../components/nav/nav";
import { useFetchAllAthltes } from "../hooks/athletes";
import AdminViewAthlete from "../components/view-athelete/admin/view-athlete";

const ViewAthlete = () => {
	const { data: athletes, loading } = useFetchAllAthltes();

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
			<AdminViewAthlete athletes={athletes} loading={loading} />
		</chakra.div>
	);
};

export default ViewAthlete;
