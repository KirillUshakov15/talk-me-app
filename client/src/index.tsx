import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "@/store";

const store = setupStore()

const app = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
)

app.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>

)