import { Route, Routes } from "react-router-dom"
import { Layout } from "../../UI/Components/Global/layout.component"
import { ProtectedRoute } from "./protectedRoute"
import { PublicRoute } from "./publicRoute"
import { NotFoundPage } from "../../Pages/notFound.page"
import { AuthorPage } from "../../Pages/Author/author.page"

export const AppRouter = () => {

    return (
        <Routes>

            <Route element={<PublicRoute />}>
                <Route path='/login' element={<p>login</p>} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />} >
                    <Route path="/" element={<p>adsdsa</p>} />
                    {/* <Route path="/book" element={<BookPage/>} /> */}
                    <Route path="/author" element={<AuthorPage/>} />
                </Route>
            </Route>

            <Route path="*"  element={<NotFoundPage/>}/>
        </Routes>


    )


} 