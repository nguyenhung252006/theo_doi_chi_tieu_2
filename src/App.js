import { Fragment } from "react";
import { DefaultLayout } from "./layouts";

//routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PublicRoutes } from "./routes/routes";
import { Login, Create } from './Login_Create/index'


//import hook
import { LoginHook } from "./hook/index";


function App() {
    return (
        <Router>
            <LoginHook />
            <div>
                <Routes>
                    {/* login */}
                    <Route element={<Login />} path="/login" />
                    <Route element={<Create />} path="/create" />
                    {PublicRoutes.map((route, index) => {
                        let Layout = DefaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        }
                        else if (route.layout === null) {
                            Layout = Fragment
                        }
                        const Page = route.component
                        return <Route
                            key={index}
                            path={route.path}
                            element={<Layout><Page /></Layout>}
                        />
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;