import Header from "../components/Header"

const RootLayout = ({children}) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default RootLayout
