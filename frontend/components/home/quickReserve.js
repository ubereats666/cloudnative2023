const quickReserve = async ({ userId }) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let responseData = null;

  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}create_record`;

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user_id: userId })
    });

    responseData = await res.json();

  } catch (error) {
    console.error(error.message);
  }

  return responseData;
}

export default quickReserve;