const apiPath = 'http://localhost:8080';

export const environment = {
  /* Customer */
  customer_crud: `${apiPath}/customer`,
  customer_get: `${apiPath}/customers`,

  /* Brand and Model */
  brands_get: `${apiPath}/brands`,
  brand_model_get: `${apiPath}/brand`,

  /* Vehicle */
  vehicle_crud: `${apiPath}/vehicle`,
  vehicles_get: `${apiPath}/vehicles`,

  /* Contract */
  contractOverview_get: `${apiPath}/contractoverviews`,
  contract_crud: `${apiPath}/contract`,
};
