import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { lightTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RecoilRoot>
			<ThemeProvider theme={lightTheme}>
				<App />
			</ThemeProvider>
		</RecoilRoot>
	</React.StrictMode>
);
