import React from "react"
import VerticalLayout from "../layouts/VerticalLayout"
const layouts = {
  vertical: VerticalLayout,
}
const themeConfig = {
    layout: "vertical", // options[String]: "vertical"(default), "horizontal"
    direction: "ltr", // options[String] : ltr / rtl
  };
  
const ContextLayout = React.createContext()

class Layout extends React.Component {
  state = {
    activeLayout: themeConfig.layout,
    width: window.innerWidth,
    direction: themeConfig.direction
  }

  updateWidth = () => {
    this.setState({
      width: window.innerWidth
    })
  }



  componentDidUpdate() {
    this.handleDirUpdate()
  }



  render() {
    const { children } = this.props
    return (
      <ContextLayout.Provider
        value={{
          state: this.state,
          VerticalLayout: layouts["vertical"],
        }}
      >
        {children}
      </ContextLayout.Provider>
    )
  }
}

export { Layout, ContextLayout }
