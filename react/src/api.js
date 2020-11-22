import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";

export const API_SERVER =
  process.env.REACT_APP_API_SERVER || "http://192.168.200.238:8000";

export const API_MEDIA = `${API_SERVER}/media/`;

export const DASHBOARD_HOST = process.env.REACT_APP_DASHBOARD_HOST || "";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_SERVER}/graphql/`
});

export const client = new ApolloClient({
  cache,
  link
});
