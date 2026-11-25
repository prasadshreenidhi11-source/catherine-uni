import { useTranslation } from '../context/useTranslation'
import './Acknowledgement.css'

function Acknowledgement() {
  const { translate } = useTranslation()

  return (
    <section className="acknowledgement-section">

      <div className="acknowledgement-content">

        {/* GOLD DECORATION */}
        <div className="acknowledgement-decoration">
          <span className="acknowledgement-line" />

          <div className="acknowledgement-symbol">
            <span />
          </div>

          <span className="acknowledgement-line" />
        </div>

        {/* HEADING */}
        <h2>
          {translate('Acknowledgement of Country')}
        </h2>

        {/* CONTENT */}
        <p>
          {translate('Catherine McAuley School, Craigmore acknowledges the')}
          {' '}
          <strong>{translate('Kaurna People')}</strong>
          {' '}
          {translate('as the traditional custodians of the land on which we work.')}
          <br />
          {translate('We pay our respects to')}
          {' '}
          <strong>
            {translate('Elders past, present and future.')}
          </strong>
        </p>

      </div>

    </section>
  )
}

export default Acknowledgement