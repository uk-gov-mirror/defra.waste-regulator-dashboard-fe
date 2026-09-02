import Boom from '@hapi/boom'
import { config } from '../../config/config.js'
import { isRegulator } from '../auth/regulator-access.js'
import { loadAccountDetails } from '../common/helpers/load-account-details.js'

export const homeController = {
  async handler(request, h) {
    const { user, accountDetails, accountDetailsError } =
      await loadAccountDetails(request)

    if (!user) {
      return h.redirect('/signin-oidc')
    }

    // Fail closed: a valid login only reaches the dashboard when the Account
    // backend confirms a regulator service role. An unresolved account (no
    // enrolment, or a lookup failure) is not a regulator and is denied.
    if (!isRegulator(accountDetails)) {
      return Boom.forbidden('User does not hold a regulator service role')
    }

    return h.view('home/index', {
      pageTitle: "pEPR: Regulators' Service  - GOV.UK",
      heading: "pEPR: Regulators' Service",
      user,
      accountDetails,
      accountDetailsError,
      azureBaseUrl: config.get('services.regulatorAzure.baseUrl'),
      certificateOfComplianceBaseUrl: config.get(
        'services.certificateOfCompliance.baseUrl'
      )
    })
  }
}
