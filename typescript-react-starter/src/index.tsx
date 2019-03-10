import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/Hello';
import registerServiceWorker from './registerServiceWorker';

/* document.getElementById('root') as HTMLElement is a type assertion
 * this can also be called a cast
 */

ReactDOM.render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
