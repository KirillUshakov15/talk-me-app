import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const app = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
)

app.render(
    <App/>
)