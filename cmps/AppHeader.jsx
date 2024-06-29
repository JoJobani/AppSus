const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="../assets/img/logo.png" alt="AppSus" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book">Book</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
