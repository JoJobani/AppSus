const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="../assets/img/logo.png" alt="AppSus" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/note">Notes</NavLink>
        </nav>
    </header>
}
