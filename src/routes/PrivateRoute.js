import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { ContextLayout } from "../utility/Layout";

export const PrivateRoute = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =context.VerticalLayout;

            return (
              <>
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<p>Loading</p>}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              </>
            );
          }}
        </ContextLayout.Consumer>
    }
  />
);
