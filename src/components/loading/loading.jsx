import { Image } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
	return (
		<div className="w-screen h-screen bg-white z-50 fixed top-0 left-0 grid place-items-center">
			<div className="grid justify-items-center">
				<Image
					src="/images/ugsd.png"
					height={70}
					alt="dawurobo logo"
					className="loader"
				/>
				<div className="text-xl font-bold p-2">Loading...</div>
			</div>
		</div>
	);
};

export default Loading;
