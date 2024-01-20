export const getForeignKies = async () => {
  try {
    const [usersResponse, topicsResponse] = await Promise.all([
      fetch("http://localhost:4000/users"),
      fetch("http://localhost:4000/topics"),
    ]);

    const [usersData, topicsData] = await Promise.all([
      usersResponse.json(),
      topicsResponse.json(),
    ]);

    return { usersData, topicsData };
  } catch (error) {
    console.log(`error during fetching users and topics: ${error}`);
    throw error;
  }
};

export const getForeignKey = async (userId:number,topicId:number) => {
    try {
        const [userResponse, topicResponse] = await Promise.all([
            fetch(`http://localhost:4000/users/${userId}`).then((res) =>
              res.json()
            ),
            fetch(`http://localhost:4000/topics/${topicId}`).then((res) =>
              res.json()
            ),
          ]);

          return {userResponse,topicResponse}

    } catch (error) {
        console.log(`error during fetching a topic and a key ${error}`)
        throw error
    }
}

export const createUser = async (body:object) => {
    try {
        const userResponse = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return userResponse

    } catch (error) {
        console.log(`error during creating user`)
        throw error
    }
}
