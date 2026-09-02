/**
 * Regulator authorisation. A valid Azure AD B2C login is not enough to use the
 * service: the signed-in user must hold a regulator service role in the Account
 * backend. Service-role ids are the Account backend's ServiceRole constants
 * (Regulator.Admin = 4, Regulator.Basic = 5); everything else (producer,
 * reprocessor/exporter, or a login with no account) is not a regulator.
 */

const REGULATOR_ADMIN_SERVICE_ROLE_ID = 4
const REGULATOR_BASIC_SERVICE_ROLE_ID = 5

export function isRegulator(accountDetails) {
  const serviceRoleId = accountDetails?.serviceRoleId
  return (
    serviceRoleId === REGULATOR_ADMIN_SERVICE_ROLE_ID ||
    serviceRoleId === REGULATOR_BASIC_SERVICE_ROLE_ID
  )
}
