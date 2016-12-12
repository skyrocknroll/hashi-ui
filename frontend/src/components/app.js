import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { red500, green800, green900 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar';
import AppTopbar from './AppTopbar/AppTopbar'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#4b9a7d',
    primary2Color: green800,
    primary3Color: green900
  },
  appBar: {
    height: 50
  }
})

class App extends PureComponent {

  render () {
    let uncaughtExceptionBar = undefined;

    if (this.props.route.uncaughtException) {
      uncaughtExceptionBar = <AppBar
        showMenuIconButton={ false }
        style={{ backgroundColor: red500 }}
        title={ `Error: ${this.props.route.uncaughtException}` }
      />
    }

    if (Object.keys(this.props.appError).length > 0) {
      const title = this.props.appError.error.reason
        || this.props.appError.reason
        || 'Unhandled application error, please check console'

      uncaughtExceptionBar = <AppBar
        showMenuIconButton={ false }
        style={{ backgroundColor: red500 }}
        title={ title }
      />
    }

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          { uncaughtExceptionBar }
          <AppTopbar { ...this.props } />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps ({ appError }) {
  return { appError }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  uncaughtException: PropTypes.object,
  appError: PropTypes.object,
  route: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(App)
