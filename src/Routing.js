import React from "react"
import {
    Router,
    BrowserRouter,
    browserHistory,
    Route
} from "react-router-dom"
import App from "./components/App"
import Dashboard from "./components/Dashboard"


const Routing = () => {

    return(
        <BrowserRouter >
            <Route exact path={'/'}  component={ Dashboard } />
            <Route exact path={'/HOME'}  component={App} />
        </BrowserRouter>
    )

} 
export default Routing