import { Provider } from "react-redux";
import "../assets/app.css";
import { AppRoutes } from "./routes";
import { store } from "./slice";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
};
export default App;
/***
 *  <Provider store={store}>
      <AppRoutes />
    </Provider>
 */
