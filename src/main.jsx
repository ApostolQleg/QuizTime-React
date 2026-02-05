import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles.css";

const GOOGLE_CLIENT_ID = "502110853036-sij6b99fsaemdbbsjrueavqvsavftevu.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</GoogleOAuthProvider>
	</StrictMode>,
);
