import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations";
import LanguageDetector from "i18next-browser-languagedetector";
import { SessionProvider } from "./lib/session-context";
import { BrowserRouter } from "react-router-dom";
import { Connection, ConnectionProvider } from "./lib/connection";
import { JoinGroupProvider } from "./join-group-context";
import { createTheme, ThemeProvider } from "@mui/material";
import * as colors from "@mui/material/colors";

i18next.use(LanguageDetector).use(initReactI18next).init(translations);

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: colors.green,
		background: {
			default: "#2f2f2f",
		},
	},
});

const connection = new Connection();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<ConnectionProvider connection={connection}>
				<BrowserRouter>
					<SessionProvider>
						<JoinGroupProvider>
							<App />
						</JoinGroupProvider>
					</SessionProvider>
				</BrowserRouter>
			</ConnectionProvider>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
