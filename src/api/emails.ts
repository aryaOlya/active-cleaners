export const getEmails = async (
  userFilter: number,
  topicFilter: number,
  currentPage: number,
  status: string
) => {
  try {
    const response = await fetch(
      `http://localhost:4000/emails?status=${status}${
        userFilter === 0 ? "" : `&userId=${userFilter}`
      }${
        topicFilter === 0 ? "" : `&topicId=${topicFilter}`
      }&_page=${currentPage}`
    );
    const emailData = await response.json();
    return { response, emailData };
  } catch (error) {
    console.error("Error fetching emails", error);
    throw error;
  }
};

export const getEmail = async (emailId: number) => {
  const emailResponse = await fetch(`http://localhost:4000/emails/${emailId}`);
  const emailData = await emailResponse.json()
  return {emailData,emailResponse}
};

export const deleteEmail = async (emailId:number) => {
    try {
        const response = await fetch(`http://localhost:4000/emails/${emailId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response
    } catch (error) {
        console.log(`error during delteing email :${error}`)
        throw error
    }
}

export const createEmail = async (body: object) => {
  try {
    const emailResponse = await fetch("http://localhost:4000/emails", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return emailResponse;
  } catch (error) {
    console.log(`error during send email: ${error}`);
    throw error;
  }
};
