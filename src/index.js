import React from "react";
import ReactDOM from "react-dom/client";
import "./output.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/context";

const colors = {
	brand: {
		blue: "#0A2E65",
		gold: "#B08B57",
		// blue: "#0A2E65",
	},
};

const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<AppProvider>
				<Router>
					<App />
				</Router>
			</AppProvider>
		</ChakraProvider>
	</React.StrictMode>
);
