import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { EnthusiasmAction } from "./actions";
import Hello from "./containers/Hello";
import { enthusiasm } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import { IStoreState } from "./types";

const store = createStore<IStoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: "TypeScript"
});

/* document.getElementById('root') as HTMLElement is a type assertion
 * this can also be called a cast
 */

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
