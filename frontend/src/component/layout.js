import { Outlet } from "react-router-dom"
import Footer from "./footer"
import Header from "./header"
import SidebarPage from "./sidebar"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <SidebarPage />
      <main className="main">{children}</main>
      <Footer />
      {/* <Header />
      <Outlet />
      <Footer /> */}
    </>
  )
}
export default Layout
