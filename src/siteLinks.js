const SCHOOL_EMAIL = 'info@cms.catholic.edu.au'

// For enquiries that do not have a page of their own yet
export const emailSchool = (subject) =>
  `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(subject)}`

// No origin, so Google Maps starts from wherever the visitor is
export const MAP_DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Catherine McAuley School, 210 Adams Rd, Craigmore SA 5114')
