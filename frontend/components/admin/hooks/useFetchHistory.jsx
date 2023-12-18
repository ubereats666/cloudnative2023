const useFetchHistory = async ({ date, parking_space_id }) => {
  let responseData = null;

  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}get_space_history?date=${date}&parking_space_id=${parking_space_id}`;

    const res = await fetch(requestUrl);

    responseData = await res.json();
  } catch (error) {
    console.error(error.message);
  }

  return responseData;
};

export default useFetchHistory;