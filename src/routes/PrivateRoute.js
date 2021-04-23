import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { ContextLayout } from "../utility/Layout";

export const PrivateRoute = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =context.VerticalLayout;

            return (
              <>
              {console.log(Component)}
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<text>Loading</text>}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              </>
            );
          }}
        </ContextLayout.Consumer>
      ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
    }
  />
);
