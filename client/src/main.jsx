import { createRoot } from "react-dom/client";
import "./app/App.css";
import "remixicon/fonts/remixicon.css";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/app.store";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1c1c1c",
            color: "#f0ede8",
            border: "1px solid #3a3a3a",
            padding: "14px 18px",
            letterSpacing: "0.08em",
            fontSize: "12px",
          },
        }}
      />

      <App />
    </>
  </Provider>,
);
