import React from 'react'

import messages from './messages'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import LocaleToggle from 'containers/LocaleToggle'

const Footer = () =>
  <footer className={styles.footer}>
    <section>
      <p>
        <FormattedMessage {...messages.licenseMessage} />
      </p>
    </section>
    <section>
      <LocaleToggle />
    </section>
    <section>
      <p>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: 'dJuspin',
          }}
        />
      </p>
    </section>
  </footer>

export default Footer
