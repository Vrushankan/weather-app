import React, { Suspense, lazy } from "react"
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { IntlProviderWrapper } from "./utility/IntlProviderWrapper"
import { Layout } from "./utility/Layout"
import { store } from "./redux/Store"
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LazyApp = lazy(() => import("./App"))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<p>Loading</p>}>
        <Layout>
          <IntlProviderWrapper>
            <LazyApp />
          </IntlProviderWrapper>
        </Layout>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
