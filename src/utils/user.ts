import qs from "qs";

export const getCurrentUser = async (reef_token: string) => {
  const urlParamsObject = {
    populate: {
      avatar: {
        populate: "*",
      },
      background: {
        populate: "*",
      },
      brand: {
        populate: "*",
      },
      serviceOrderRequestIDs: {
        populate: {
          agreement: {
            populate: "*",
          },
          personalInformation: {
            populate: "*",
          },
          requestInformation: {
            populate: "*",
          },
        },
      },
    },
  };

  const queryString = qs.stringify(urlParamsObject);

  const requestUrl = `${
    import.meta.env.STRAPI_URL
  }/api/users/me?${queryString}`;

  const userData = await fetch(`${requestUrl}`, {
    headers: {
      Authorization: `bearer ${reef_token}`,
    },
  });

  const data = await userData.json();

  return data;
};
