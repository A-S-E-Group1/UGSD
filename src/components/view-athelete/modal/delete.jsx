import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { DeleteAthleteByID } from "../../../library";

const Delete = ({ isOpen, onClose, postId, setPostId }) => {
	const cancelRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const deleteAthlete = async () => {
		setLoading(true);

		const deleteInfo = await DeleteAthleteByID(postId);

		if (deleteInfo.message) {
			toast({
				title: "Error",
				description: deleteInfo.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			onClose();
			setPostId("");
			setLoading(false);
			return;
		}

		onClose();
		setPostId("");
		toast({
			title: "Success",
			description: "Record Deleted Successfully",
			status: "success",
			duration: 5000,
			isClosable: true,
			position: "top",
		});
		setLoading(false);
	};
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Delete Athlete
					</AlertDialogHeader>

					<AlertDialogBody>
						Are you sure? You cannot undo this action afterwards.
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button 
						bg={"blue.500 !important"}
						ref={cancelRef} 
						onClick={onClose}>
							Cancel
						</Button>
						<Button
							bg={"red.600 !important"}
							ml={3}
							onClick={deleteAthlete}
							isLoading={loading}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default Delete;
