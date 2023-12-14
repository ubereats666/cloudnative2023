const updatePreference = async ({ userId: user_id, plate, floor }) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let responseData = null;

  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}update_user_preference`;

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user_id, plate, floor })
    });

    responseData = await res.json();

  } catch (error) {
    console.error(error.message);
  }

  return responseData
};

export default updatePreference;