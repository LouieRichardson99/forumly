import "../styles/globals.css";
import { UserProvider } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
