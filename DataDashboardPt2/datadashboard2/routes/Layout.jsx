import React from "react";
import {Outlet, Link} from 'react-router-dom'

const Layout = () => {
    return(
        <div>
            <nav>
                <ul>
                    <li className="home-link" key='home-buttom'>
                        <Link style={{color: "white"}} to='/'>Home</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout