export const graphqlSchema = `
schema
  @link(url: "https://specs.apollo.dev/link/v1.0")
  @link(url: "https://specs.apollo.dev/join/v0.4", for: EXECUTION)
{
  query: Query
}

directive @join__directive(graphs: [join__Graph!], name: String!, args: join__DirectiveArguments) repeatable on SCHEMA | OBJECT | INTERFACE | FIELD_DEFINITION

directive @join__enumValue(graph: join__Graph!) repeatable on ENUM_VALUE

directive @join__field(graph: join__Graph, requires: join__FieldSet, provides: join__FieldSet, type: String, external: Boolean, override: String, usedOverridden: Boolean, overrideLabel: String) repeatable on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

directive @join__graph(name: String!, url: String!) on ENUM_VALUE

directive @join__implements(graph: join__Graph!, interface: String!) repeatable on OBJECT | INTERFACE

directive @join__type(graph: join__Graph!, key: join__FieldSet, extension: Boolean! = false, resolvable: Boolean! = true, isInterfaceObject: Boolean! = false) repeatable on OBJECT | INTERFACE | UNION | ENUM | INPUT_OBJECT | SCALAR

directive @join__unionMember(graph: join__Graph!, member: String!) repeatable on UNION

directive @link(url: String, as: String, for: link__Purpose, import: [link__Import]) repeatable on SCHEMA

"""
Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number
"""
scalar AccountNumber
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

type Address implements Node
  @join__implements(graph: CUSTOMER, interface: "Node")
  @join__implements(graph: NODE, interface: "Node")
  @join__type(graph: CUSTOMER, key: "id")
  @join__type(graph: NODE, key: "id")
{
  id: ID!
  postalCode: String! @join__field(graph: CUSTOMER)
  prefecture: String! @join__field(graph: CUSTOMER)
  city: String! @join__field(graph: CUSTOMER)
  street: String! @join__field(graph: CUSTOMER)
  building: String @join__field(graph: CUSTOMER)
}

"""
The \`BigInt\` scalar type represents non-fractional signed whole numeric values.
"""
scalar BigInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""The \`Byte\` scalar type represents byte value as a Buffer"""
scalar Byte
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""A country code as defined by ISO 3166-1 alpha-2"""
scalar CountryCode
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""A country name (short name) as defined by ISO 3166-1"""
scalar CountryName
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down
"""
scalar Cuid
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://github.com/ericelliott/cuid#broken-down")

"""
A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217.
"""
scalar Currency
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://en.wikipedia.org/wiki/ISO_4217")

type Customer implements Node
  @join__implements(graph: CUSTOMER, interface: "Node")
  @join__implements(graph: NODE, interface: "Node")
  @join__type(graph: CUSTOMER, key: "id")
  @join__type(graph: NODE, key: "id")
  @join__type(graph: PURCHASE, key: "id")
{
  id: ID! @join__field(graph: CUSTOMER) @join__field(graph: NODE) @join__field(graph: PURCHASE, external: true)
  name: String! @join__field(graph: CUSTOMER)
  email: String! @join__field(graph: CUSTOMER)
  addresses: [Address!]! @join__field(graph: CUSTOMER)
  purchases: [Purchase!]! @join__field(graph: PURCHASE)
}

"""
A date string, such as 2007-12-03, compliant with the \`full-date\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar Date
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the \`date-time\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar DateTime
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the \`date-time\` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format.
"""
scalar DateTimeISO
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

type Delivery implements Node
  @join__implements(graph: DELIVERY, interface: "Node")
  @join__implements(graph: NODE, interface: "Node")
  @join__type(graph: CUSTOMER, key: "id")
  @join__type(graph: DELIVERY, key: "id")
  @join__type(graph: NODE, key: "id")
{
  id: ID! @join__field(graph: CUSTOMER, external: true) @join__field(graph: DELIVERY) @join__field(graph: NODE)
  address: Address! @join__field(graph: CUSTOMER)
  deliveryDate: String! @join__field(graph: DELIVERY)
}

"""
A field whose value conforms to the standard DeweyDecimal format as specified by the OCLC https://www.oclc.org/content/dam/oclc/dewey/resources/summaries/deweysummaries.pdf
"""
scalar DeweyDecimal
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://www.oclc.org/content/dam/oclc/dewey/resources/summaries/deweysummaries.pdf")

"""
A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/.
"""
scalar DID
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://www.w3.org/TR/did-core/")

"""
A string representing a duration conforming to the ISO8601 standard,
such as: P1W1DT13H23M34S
P is the duration designator (for period) placed at the start of the duration representation.
Y is the year designator that follows the value for the number of years.
M is the month designator that follows the value for the number of months.
W is the week designator that follows the value for the number of weeks.
D is the day designator that follows the value for the number of days.
T is the time designator that precedes the time components of the representation.
H is the hour designator that follows the value for the number of hours.
M is the minute designator that follows the value for the number of minutes.
S is the second designator that follows the value for the number of seconds.

Note the time designator, T, that precedes the time value.

Matches moment.js, Luxon and DateFns implementations
,/. is valid for decimal places and +/- is a valid prefix
"""
scalar Duration
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address.
"""
scalar EmailAddress
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address")

"""
A GeoJSON object as defined by RFC 7946: https://datatracker.ietf.org/doc/html/rfc7946
"""
scalar GeoJSON
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.
"""
scalar GUID
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal.
"""
scalar Hexadecimal
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors.
"""
scalar HexColorCode
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://en.wikipedia.org/wiki/Web_colors")

"""
A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla().
"""
scalar HSL
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla()")

"""
A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla().
"""
scalar HSLA
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number.
"""
scalar IBAN
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is either an IPv4 or IPv6 address: https://en.wikipedia.org/wiki/IP_address.
"""
scalar IP
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is an IPC Class Symbol within the International Patent Classification System: https://www.wipo.int/classifications/ipc/en/
"""
scalar IPCPatent
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://www.wipo.int/classifications/ipc/en/")

"""
A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4.
"""
scalar IPv4
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6.
"""
scalar IPv6
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number.
"""
scalar ISBN
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A string representing a duration conforming to the ISO8601 standard,
such as: P1W1DT13H23M34S
P is the duration designator (for period) placed at the start of the duration representation.
Y is the year designator that follows the value for the number of years.
M is the month designator that follows the value for the number of months.
W is the week designator that follows the value for the number of weeks.
D is the day designator that follows the value for the number of days.
T is the time designator that precedes the time components of the representation.
H is the hour designator that follows the value for the number of hours.
M is the minute designator that follows the value for the number of minutes.
S is the second designator that follows the value for the number of seconds.

Note the time designator, T, that precedes the time value.

Matches moment.js, Luxon and DateFns implementations
,/. is valid for decimal places and +/- is a valid prefix
"""
scalar ISO8601Duration
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

scalar join__DirectiveArguments

scalar join__FieldSet

enum join__Graph {
  CUSTOMER @join__graph(name: "customer", url: "http://customer")
  DELIVERY @join__graph(name: "delivery", url: "http://delivery")
  NODE @join__graph(name: "node", url: "http://node")
  PRODUCT @join__graph(name: "product", url: "http://product")
  PURCHASE @join__graph(name: "purchase", url: "http://purchase")
  STORE @join__graph(name: "store", url: "http://store")
}

"""
The \`JSON\` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
"""
scalar JSON
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf")

"""
The \`JSONObject\` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
"""
scalar JSONObject
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf")

"""
A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction.
"""
scalar JWT
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude
"""
scalar Latitude
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the Library of Congress Subclass Format ttps://www.loc.gov/catdir/cpso/lcco/
"""
scalar LCCSubclass
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://www.loc.gov/catdir/cpso/lcco/")

scalar link__Import

enum link__Purpose {
  """
  \`SECURITY\` features provide metadata necessary to securely resolve fields.
  """
  SECURITY

  """
  \`EXECUTION\` features provide metadata necessary for operation execution.
  """
  EXECUTION
}

"""
A local date string (i.e., with no associated timezone) in \`YYYY-MM-DD\` format, e.g. \`2020-01-01\`.
"""
scalar LocalDate
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A local date-time string (i.e., with no associated timezone) in \`YYYY-MM-DDTHH:mm:ss\` format, e.g. \`2020-01-01T00:00:00\`.
"""
scalar LocalDateTime
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""The locale in the format of a BCP 47 (RFC 5646) standard string"""
scalar Locale
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A local time string (i.e., with no associated timezone) in 24-hr \`HH:mm[:ss[.SSS]]\` format, e.g. \`14:25\` or \`14:25:06\` or \`14:25:06.123\`.  This scalar is very similar to the \`LocalTime\`, with the only difference being that \`LocalEndTime\` also allows \`24:00\` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block.
"""
scalar LocalEndTime
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A local time string (i.e., with no associated timezone) in 24-hr \`HH:mm[:ss[.SSS]]\` format, e.g. \`14:25\` or \`14:25:06\` or \`14:25:06.123\`.
"""
scalar LocalTime
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
The \`BigInt\` scalar type represents non-fractional signed whole numeric values.
"""
scalar Long
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude
"""
scalar Longitude
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address.
"""
scalar MAC
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Floats that will have a value less than 0."""
scalar NegativeFloat
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Integers that will have a value less than 0."""
scalar NegativeInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

interface Node
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
{
  id: ID!
}

"""A string that cannot be passed as an empty value"""
scalar NonEmptyString
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Floats that will have a value of 0 or more."""
scalar NonNegativeFloat
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Integers that will have a value of 0 or more."""
scalar NonNegativeInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Floats that will have a value of 0 or less."""
scalar NonPositiveFloat
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Integers that will have a value of 0 or less."""
scalar NonPositiveInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c
"""
scalar ObjectID
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.
"""
scalar PhoneNumber
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports
"""
scalar Port
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Floats that will have a value greater than 0."""
scalar PositiveFloat
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Integers that will have a value greater than 0."""
scalar PositiveInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg.
"""
scalar PostalCode
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

type Product implements Node
  @join__implements(graph: NODE, interface: "Node")
  @join__implements(graph: PRODUCT, interface: "Node")
  @join__type(graph: NODE, key: "id")
  @join__type(graph: PRODUCT, key: "id")
{
  id: ID!
  name: String! @join__field(graph: PRODUCT)
  price: Int! @join__field(graph: PRODUCT)
  stock: Int! @join__field(graph: PRODUCT)
}

type Purchase implements Node
  @join__implements(graph: NODE, interface: "Node")
  @join__implements(graph: PURCHASE, interface: "Node")
  @join__type(graph: DELIVERY, key: "id")
  @join__type(graph: NODE, key: "id")
  @join__type(graph: PRODUCT, key: "id")
  @join__type(graph: PURCHASE, key: "id")
  @join__type(graph: STORE, key: "id")
{
  id: ID! @join__field(graph: DELIVERY, external: true) @join__field(graph: NODE) @join__field(graph: PRODUCT, external: true) @join__field(graph: PURCHASE) @join__field(graph: STORE, external: true)
  delivery: Delivery @join__field(graph: DELIVERY)
  products: [Product!]! @join__field(graph: PRODUCT)
  purchaseDate: String! @join__field(graph: PURCHASE)
  totalPrice: Int! @join__field(graph: PURCHASE)
  store: Store! @join__field(graph: STORE)
}

type Query
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
{
  viewer: Customer @join__field(graph: CUSTOMER)
  node(id: ID): Node @join__field(graph: NODE)
}

"""
A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba().
"""
scalar RGB
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba().
"""
scalar RGBA
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
In the US, an ABA routing transit number (\`ABA RTN\`) is a nine-digit code to identify the financial institution.
"""
scalar RoutingNumber
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://en.wikipedia.org/wiki/ABA_routing_transit_number")

"""
The \`SafeInt\` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification.
"""
scalar SafeInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)
  @specifiedBy(url: "https://www.ecma-international.org/ecma-262/#sec-number.issafeinteger")

"""A field whose value is a Semantic Version: https://semver.org"""
scalar SemVer
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard personal number (personnummer) formats for Sweden
"""
scalar SESSN
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

type Store implements Node
  @join__implements(graph: NODE, interface: "Node")
  @join__implements(graph: STORE, interface: "Node")
  @join__type(graph: NODE, key: "id")
  @join__type(graph: PURCHASE, key: "id")
  @join__type(graph: STORE, key: "id")
{
  id: ID! @join__field(graph: NODE) @join__field(graph: PURCHASE, external: true) @join__field(graph: STORE)
  purchases: [Purchase!]! @join__field(graph: PURCHASE)
  name: String! @join__field(graph: STORE)
}

"""
A time string at UTC, such as 10:15:30Z, compliant with the \`full-time\` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar Time
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
The javascript \`Date\` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch.
"""
scalar Timestamp
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones
"""
scalar TimeZone
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Floats that will have a value of 0 or more."""
scalar UnsignedFloat
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Integers that will have a value of 0 or more."""
scalar UnsignedInt
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
"""
scalar URL
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""A currency string, such as $21.25"""
scalar USCurrency
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
"""
scalar UtcOffset
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""
A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.
"""
scalar UUID
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)

"""Represents NULL values"""
scalar Void
  @join__type(graph: CUSTOMER)
  @join__type(graph: DELIVERY)
  @join__type(graph: NODE)
  @join__type(graph: PRODUCT)
  @join__type(graph: PURCHASE)
  @join__type(graph: STORE)    
`
