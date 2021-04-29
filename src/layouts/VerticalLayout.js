import React, { PureComponent } from "react";
import { connect } from "react-redux";

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
    return (
      <div>
        <div>
          <div className="content-wrapper">{this.props.children}</div>
        </div>
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
