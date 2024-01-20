// EmailItem.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmailType, UserType, TopicType } from "../../types/types";
import FormLayout from "../../layouts/FormLayout";
import { Box, Button } from "@mui/material";

const EmailItem = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const emailId = id ? parseInt(id) : undefined;

  const [email, setEmail] = useState<EmailType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [topic, setTopic] = useState<TopicType | null>(null);

  const deleteEmail = async () => {
    try {
      const response = await fetch(`http://localhost:4000/emails/${emailId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      console.log(`deleting email error ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailResponse = await fetch(
          `http://localhost:4000/emails/${emailId}`
        ).then((res) => res.json());

        setEmail(emailResponse);

        const { userId, topicId } = emailResponse;

        const [userResponse, topicResponse] = await Promise.all([
          fetch(`http://localhost:4000/users/${userId}`).then((res) =>
            res.json()
          ),
          fetch(`http://localhost:4000/topics/${topicId}`).then((res) =>
            res.json()
          ),
        ]);

        setUser(userResponse);
        setTopic(topicResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [emailId]);

  if (!email || !user || !topic) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <FormLayout title={email.title}>
        <div className="flex justify-between mb-10">
          <div>
            <strong>{email.status === 'sent' ? 'To' : 'From'}:</strong> {user.name}
          </div>
          <div>
            <strong>Topic:</strong> {topic.name}
          </div>
          <div>
            <strong>Date:</strong> {email.date}
          </div>
        </div>

        <p>
          {email.body}
        </p>

        <Box
          position="absolute"
          bottom={5}
          left={0}
          right={0}
          textAlign="center"
        >
          <Button onClick={deleteEmail} variant="contained" color="error">
            delete
          </Button>
        </Box>
      </FormLayout>
    </>
  );
};

export default EmailItem;
