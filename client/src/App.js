import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calm from "./pages/Calm";
import Study from "./pages/Study";
import Energize from "./pages/Energize";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
 <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/create" component={Create} /> 
        <Route path="/favorites" component={Favorites} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/calm" component={Calm} />
        <Route path="/study" component={Study} />
        <Route path="/energize" component={Energize} />
      </Switch>
      <Footer />
   </>
  </Router>
  </ApolloProvider>
  );
}

export default App;
