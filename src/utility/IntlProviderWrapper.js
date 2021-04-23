import React from "react"
import { IntlProvider } from "react-intl"

const Context = React.createContext()

class IntlProviderWrapper extends React.Component {
  state = {
    locale: "en",
  }

  render() {
    const { children } = this.props
    const { locale } = this.state
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: language => {
            this.setState({
              locale: language,
            })
          }
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    )
  }
}

export { IntlProviderWrapper, Context as IntlContext }
