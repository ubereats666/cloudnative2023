const useFetchUsage = async ({ date }) => {
    let responseData = null;

    try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}get_space_usage_rate?date=${date}`;

        const res = await fetch(requestUrl);

        responseData = await res.json();
    } catch (error) {
        console.error(error.message);
    }

    return responseData;
};

export default useFetchUsage;