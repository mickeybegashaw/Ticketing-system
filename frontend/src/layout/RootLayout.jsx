import Footer from "../components/Footer"
import Header from "../components/Header"

const RootLayout = ({children}) => {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}

export default RootLayout
