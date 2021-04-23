import React, { PureComponent } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: this.props?.app?.customizer.sidebarCollapsed,
    layout: this.props?.app?.customizer.theme,
    collapsedContent: this.props?.app?.customizer.sidebarCollapsed,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props?.location.pathname,
  };
  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
    }
  };

  handleCustomizer = (bool) => {
    this.setState({
      customizer: bool,
    });
  };

  componentDidMount() { 
  }

  
  componentWillUnmount() {
    this.mounted = false;
  }

 
  render() {
    let appProps = this.props.app?.customizer;
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark",
    ];
    return (
      <div>
        {/* <Sidebar {...sidebarProps} /> */}
        <div>
          {/* <Navbar {...navbarProps} /> */}
          <div className="content-wrapper">{this.props.children}</div>
        </div>

        {/* <Footer /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    app: state.customizer,
    gridData: state.gridData,
  };
};
export default connect(mapStateToProps)(VerticalLayout);
