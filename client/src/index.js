import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import client from './apollo';

import store from './redux';

// import Items from './pages/Items';
// -------------------------------
import ViewerProvider from './context/ViewerProvider';

import './index.css';
import Layout from './routes/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ViewerProvider>
        <ReduxProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Layout />
            </Router>
          </MuiThemeProvider>
        </ReduxProvider>
      </ViewerProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
