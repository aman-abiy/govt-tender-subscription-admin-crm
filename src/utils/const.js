export const AXIOS_TIMEOUT = 30000

export const AUTH_ALLOWED_ROLES = ['root', 'admin', 'sales-coordinator', 'encoder', 'editor']

export const USER_SUBSCRIPTION_ACTIVE = 'ACTIVE'
export const USER_SUBSCRIPTION_PENDING = 'PENDING'
export const USER_SUBSCRIPTION_EXPIRED = 'EXPIRED'

export const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
export const DATETIME_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export const DEFAULT_TENDERS_LIMIT = 20

export const TOAST_GLOBAL_CONFIG = { position: 'bottom-right', dismissible: true }

export const DEFAULT_TENDER_MINIMAL_FILEDS = { title: 1, tenderSources: 1, publicationDate: 1, views: 1, isActive: 1, isPublished: 1, isFeatured: 1, lastUpdatedAt: 1, createdAt: 1 }
export const DEFAULT_USER_MINIMAL_FILEDS = { fname: 1, lname: 1, email: 1, mobile: 1, roles: 1, hasActiveSubscription: 1, lastActiveSubscription: 1, 'mobileDeviceInfo.buildInfo': 1, isActive: 1, createdAt: 1 }

export const SERVER_ERR_MSG = 'Server Error!'

export const ROLES = ['root', 'admin', 'sales-coordinator', 'encoder', 'editor', 'user']
export const ADMIN_AND_SALES_COORDINATOR_ROLES = ['root', 'admin', 'sales-coordinator']

export const CATEGORY_SELECTION_SINGLE = 'selectSingleCategory'
export const CATEGORY_SELECTION_MULTIPLE = 'selectMultipleCategories'

export const ALERT_SETTING_SUCCESSFUL_MSG = 'Alert Setting updated'
export const ALERT_SETTING_UNSUCCESSFUL_MSG = 'Could not update Alert Setting'

export const START_DATE = 'startDate'
export const END_DATE = 'endDate'

export const SETTING_TYPE_STATUS = 'status'
export const SETTING_TYPE_REGIONS = 'regions'
export const SETTING_TYPE_CATEGORIES = 'categories'

export const SERVER_URL = 'https://api.alphatenders.com'
export const SERVER_INVOICE_DIR = 'invoice'

// out of 100
export const COMMISSIONS_PERCENTAGE = 10