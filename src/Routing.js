import React from "react"
import {
    Router,
    BrowserRouter,
    browserHistory,
    Route
} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import fb from"./firebase/firebase"


function Routing(){

    const [userData , setUser] = React.useState(null)

    const authListener = () => {
        fb.auth().onAuthStateChanged(user=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
        })
    }

    React.useEffect(()=>{
        authListener()
    },[])

    return(
        <div>
            {
                userData ? <Dashboard/> 
                : <Login/>
            }
        </div>
        // <BrowserRouter >
        //     <Route exact path={'/'} render={(props) => <Dashboard {...props} auth={userData} />} />
        //     <Route exact path={'/login'}  component={Login} />
        // </BrowserRouter>
    )

} 
export default Routing