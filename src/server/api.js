const baseUrl = "http://115.159.43.44:82";

export const hotelList = body => {
  console.log(body);

  return fetch(`${baseUrl}/api/hotel/hotelListAll.json`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};
