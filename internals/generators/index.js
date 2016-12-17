const fs = require('fs');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const routeGenerator = require('./route/index.js');
const languageGenerator = require('./language/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('route', routeGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.setGenerator('help', {description:'\nContainer:\n' +
  'Calculates data from store.state, defines behavior (onClick) to dispatch actions. ' +
  '\n\t    - Passes action handlers/calculated data to children. ' +
  '\n\t    - Component children will have state/dispatch passed in through props. ' +
  '\n\t    -           If too many props are passed, consider refactoring it into a container. ' +
  '\n\t    - Container children will (probably?) not have anything to pass in through props. ' +
  '\n\t    - Simple presentation only, because it cannot be reused.' +
  '\nComponent:\n' +
  'Presentation only (no reading store.state, no/(some) dispatching actions). ' +
  '\n\t    - State and action handlers are passed in through props.' +
  '\n\t    - If too many props are passed, consider refactoring it into a container.' +
  '\n\t    - Can dispatch but only when there is no case for reuse.'})
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(`app/containers/${comp}`, fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
