const componentExists = require('../utils/componentExists');


const es6Class = 'ES6 Class';
const funcType = 'Stateless Function';

const type = 'type';

/*
todo consider adding a component that is only allowed to dispatch. in this case, connect()(Component)

 let AddTodo = ({dispatch}) => {return (<a onClick={dispatch(someAction())} />)}
 AddTodo = connect()(AddTodo)
 // same as above
 // AddTodo = connect(stateToProps => ({}), dispatch => ({dispatch}) )
 export default AddTodo
*/

module.exports = {
  description: 'No state. Can dispatch but only when there is no case for reuse.',
  prompts: [{
    name: type,
    type: 'list',
    message: 'Type? [ES6 Class to override React.Component methods, functions for simplicity]',
    default: funcType,
    choices: () => [es6Class, funcType],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: value => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: true,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantMessages',
    default: true,
    message: 'Do you want i18n messages (i.e. will this component use text)?',
  }],
  actions: prompt => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../app/components/{{properCase name}}/index.js',
      templateFile: prompt[type] === es6Class ? './component/es6.js.hbs' : './component/stateless.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/components/{{properCase name}}/tests/index.test.js',
      templateFile: './component/index.test.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (prompt.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/styles.css',
        templateFile: './component/styles.css.hbs',
        abortOnFail: true,
      });
    }

    // If they want a i18n messages file
    if (prompt.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
