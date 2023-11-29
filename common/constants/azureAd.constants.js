const {
  env: { TenantId, WebappUIAuthApplicationID },
} = process;
export const AZURE_AD_CONSTANTS = {
  JWKS_URI: `https://login.microsoftonline.com/${TenantId}/discovery/keys?appid=${WebappUIAuthApplicationID}`,
};
