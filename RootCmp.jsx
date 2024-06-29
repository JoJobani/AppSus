const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { AboutGoal } from './cmps/AboutGoal.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./apps/book/pages/BookIndex.jsx"
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
// import { Dashboard } from './apps/book/pages/Dashboard.jsx'
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from './cmps/UserMsg.jsx'
import { NotFound } from "./cmps/NotFound.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} >
                    <Route path="/about/team" element={<AboutTeam />} />
                    <Route path="/about/goal" element={<AboutGoal />} />
                </Route>
                <Route path="/books" element={<BookIndex />} />
                <Route path="books/:bookId" element={<BookDetails />} />
                <Route path="/books/edit" element={<BookEdit />} />
                <Route path="/books/edit/:bookId" element={<BookEdit />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/note" element={<NoteIndex />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    </Router>
}
