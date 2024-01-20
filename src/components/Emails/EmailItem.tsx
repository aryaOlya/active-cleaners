// EmailItem.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmailType, UserType, TopicType } from "../../types/types";
import FormLayout from "../../layouts/FormLayout";
import { Box, Button } from "@mui/material";
import { getForeignKey } from "../../api/foreignKies";
import { getEmail, deleteEmail } from "../../api/emails";
import Loading from "../Loading";

const EmailItem = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const emailId = id ? parseInt(id) : undefined;

  const [email, setEmail] = useState<EmailType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [topic, setTopic] = useState<TopicType | null>(null);

  const handleDeleteEmail = async () => {
    const response = await deleteEmail(
      typeof emailId !== "undefined" ? emailId : 0
    );

    if (response.status === 200) {
      return navigate("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const emailData = await getEmail(
        typeof emailId !== "undefined" ? emailId : 0
      );
      setEmail(emailData);

      setEmail(emailData);

      const { userId, topicId } = emailData;

      const { userResponse, topicResponse } = await getForeignKey(
        userId,
        topicId
      );

      setUser(userResponse);
      setTopic(topicResponse);
    };

    fetchData();
  }, [emailId]);

  if (!email || !user || !topic) {
    return <Loading/> ;
  }

  return (
    <>
      <FormLayout title={email.title}>
        <div className="flex justify-between mb-10">
          <div>
            <strong>{email.status === "sent" ? "To" : "From"}:</strong>{" "}
            {user.name}
          </div>
          <div>
            <strong>Topic:</strong> {topic.name}
          </div>
          <div>
            <strong>Date:</strong> {email.date}
          </div>
        </div>

        <p>{email.body}</p>

        <Box
          position="absolute"
          bottom={5}
          left={0}
          right={0}
          textAlign="center"
        >
          <Button onClick={handleDeleteEmail} variant="contained" color="error">
            delete
          </Button>
        </Box>
      </FormLayout>
    </>
  );
};

export default EmailItem;
