import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Input,
} from "@chakra-ui/react";

const MedalTable = ({
	isEditingMedal,
	medals,
	setMedals,
	competition,
	athlete,
}) => {
	return (
		<TableContainer mb={4}>
			<Table variant="simple" size={"sm"}>
				<TableCaption>
					Medals won for {athlete?.full_name?.split(" ")?.[0]} in{" "}
					{competition} competitions
				</TableCaption>
				<Thead>
					<Tr>
						<Th>Medal</Th>
						<Th>Number</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Gold</Td>
						<Td>
							{!isEditingMedal ? (
								athlete?.medals?.[competition]?.gold ? (
									athlete?.medals?.[competition]?.gold
								) : (
									"0"
								)
							) : (
								<Input
									type="text"
									defaultValue={
										athlete?.medals?.[competition]?.gold
											? athlete?.medals?.[competition]
													?.gold
											: "0"
									}
									w={"50px"}
									px={"8px"}
									disabled={!isEditingMedal}
									_disabled={{
										color: "#222",
										cursor: "not-allowed",
									}}
									onChange={(e) =>
										setMedals({
											...medals,
											[competition]: {
												...medals[competition],
												gold: e.target.value,
											},
										})
									}
								/>
							)}
						</Td>
					</Tr>
					<Tr>
						<Td>Silver</Td>
						<Td>
							{!isEditingMedal ? (
								athlete?.medals?.[competition]?.silver ? (
									athlete?.medals?.[competition]?.silver
								) : (
									"0"
								)
							) : (
								<Input
									type="text"
									defaultValue={
										athlete?.medals?.[competition]?.silver
											? athlete?.medals?.[competition]
													?.silver
											: "0"
									}
									w={"50px"}
									px={"8px"}
									disabled={!isEditingMedal}
									_disabled={{
										color: "#222",
										cursor: "not-allowed",
									}}
									onChange={(e) =>
										setMedals({
											...medals,
											[competition]: {
												...medals[competition],
												silver: e.target.value,
											},
										})
									}
								/>
							)}
						</Td>
					</Tr>
					<Tr>
						<Td>Bronze</Td>
						<Td>
							{!isEditingMedal ? (
								athlete?.medals?.[competition]?.bronze ? (
									athlete?.medals?.[competition]?.bronze
								) : (
									"0"
								)
							) : (
								<Input
									type="text"
									defaultValue={
										athlete?.medals?.[competition]?.bronze
											? athlete?.medals?.[competition]
													?.bronze
											: "0"
									}
									w={"50px"}
									px={"8px"}
									disabled={!isEditingMedal}
									_disabled={{
										color: "#222",
										cursor: "not-allowed",
									}}
									onChange={(e) =>
										setMedals({
											...medals,
											[competition]: {
												...medals[competition],
												bronze: e.target.value,
											},
										})
									}
								/>
							)}
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default MedalTable;
