import { Outlet, Link } from "react-router-dom";
import './layout.css'

const Layout = () => {
    return(
        <div>
            <nav>
                <ul className="layout-list">
                    <li key='home' className="nav-link-list">
                        <Link to='/' className="nav-link">
                            Home Page
                        </Link>
                        <Link to='/create' className="nav-link">
                            Creation Page
                        </Link>
                        <Link to='/gallery' className="nav-link">
                            Crewmate Gallery
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout