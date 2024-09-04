import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	useToast,
} from "@chakra-ui/react";
import { AddSportsDiscipline } from "../../library";

const AddSportsModal = ({ isOpen, onClose }) => {
	const [sports, setSports] = useState("");
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();

	const submitSport = async () => {
		setLoading(true);

		try {
			await AddSportsDiscipline(sports);
			toast({
				title: "Success",
				description: `Sports added successfully`,
				status: "success",
				duration: 4000,
				isClosable: true,
				position: "top",
			});
			onClose();
			setSports("");
		} catch (error) {
			toast({
				title: "Error",
				description: `Something went wrong`,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Sport Discipline</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						placeholder="Enter Sports Discipline"
						value={sports}
						onChange={(e) => setSports(e.target.value)}
					/>
				</ModalBody>

				<ModalFooter gap={4}>
					<Button
					bg={"red.400 !important"}
						variant="solid"
						
						color={"white"}
						onClick={onClose}
					>
						Close
					</Button>
					<Button
						bg={"blue.600 !important"}
						color={"white"}
						mr={3}
						onClick={submitSport}
						isLoading={isLoading}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddSportsModal;
