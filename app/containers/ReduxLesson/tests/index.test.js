// import ReduxLesson from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
// import React from 'react';

describe('<ReduxLesson />', () => {
  xit('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });

  xit('has its own access to the store values', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<LocaleToggle />)).toEqual(true);
  });


  xit('should render the default language messages', () => {
    const messages = defineMessages({
      someMessage: {
        id: 'some.id',
        defaultMessage: 'This is some default message',
      },
    });
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toEqual(true);
  });
});
