import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "../history";
import { connect } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";

// Route-based code splitting
const analyticsDashboard = lazy(() =>
	import("../containers/DashBoard")
);
const error404 = lazy(() => import("../pages/PageNotFound"));

const mapStateToProps = (state) => {
	return {
		user: {name:'Vrushankan'},
	};
};

class AppRouter extends React.Component {
	render() {
		const user = this.props.user;
		return (
			// Set the directory path if you are deploying in sub-folder
			<>
				<Router history={history}>
					<Switch>
						<PrivateRoute
							exact
							path="/"
							component={analyticsDashboard}
							user={user}
						/>
						<PrivateRoute component={error404} fullLayout />
					</Switch>
				</Router>
			</>
		);
	}
}

export default connect(mapStateToProps)(AppRouter);
