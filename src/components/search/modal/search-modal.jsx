import React from "react";
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
} from "@chakra-ui/react";
import { useGlobalContext } from "../../../context/context";
import { isAdminPath } from "../../../library/utility";
import { useLocation, useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
	const { isSearching, setInputValue, inputValue, search } = useGlobalContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Search for Athlete</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Input
						placeholder="Search with index #"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</ModalBody>

				<ModalFooter gap={4}>
					<Button
						variant="solid"
						backgroundColor={"red.400"}
						color={"white"}
						onClick={onClose}
					>
						Close
					</Button>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={() => {
							search();
							if (isAdminPath(pathname)) {
								navigate("/admin/search");
							} else {
								navigate("/");
							}
							onClose();
						}}
						isLoading={isSearching}
					>
						Search
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SearchModal;
