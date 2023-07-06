import { Outlet } from "react-router-dom";
import Layout from "../Layout.jsx";

const SharedLayout=()=>{

    return(
        <>
            <Layout>
                <Outlet/>
            </Layout>
        </>
    )
}

export default SharedLayout;