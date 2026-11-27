// Whole-page translation using Google's free website translator.
// The chosen language is stored in the "googtrans" cookie that the widget reads.

const SCRIPT_ID = 'google-translate-script'

// Google swaps text nodes for its own elements. Without this guard React can
// throw when it later removes or inserts next to a node that has been moved.
function guardReactAgainstTranslator() {
  const { removeChild, insertBefore } = Node.prototype

  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child
    return removeChild.call(this, child)
  }

  Node.prototype.insertBefore = function (node, reference) {
    if (reference && reference.parentNode !== this) {
      return insertBefore.call(this, node, null)
    }
    return insertBefore.call(this, node, reference)
  }
}

export function saveTranslateCookie(language) {
  const value =
    language === 'en'
      ? 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      : `googtrans=/en/${language}`
  const host = window.location.hostname
  const parent = host.split('.').slice(-2).join('.')

  document.cookie = `${value}; path=/`

  // The widget may also set the cookie on the domain, so keep those in step
  if (host.includes('.')) {
    document.cookie = `${value}; path=/; domain=.${host}`
    document.cookie = `${value}; path=/; domain=.${parent}`
  }
}

export function loadGoogleTranslate(languages) {
  if (document.getElementById(SCRIPT_ID)) return

  guardReactAgainstTranslator()

  const holder = document.createElement('div')
  holder.id = 'google_translate_element'
  holder.hidden = true
  document.body.appendChild(holder)

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: languages.join(','),
        autoDisplay: false,
      },
      holder.id
    )
  }

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  document.body.appendChild(script)
}
