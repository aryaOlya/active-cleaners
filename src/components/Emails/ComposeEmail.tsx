import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { UserType, TopicType } from "../../types/types";
import Loading from "../Loading";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { idGenerator, setUserName, timeGenerator } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { getForeignKies,createUser } from "../../api/foreignKies";
import { createEmail } from "../../api/emails";

function ComposeEmail() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [sendTo, setSendTo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [topic, setTopic] = useState<number | null>(1);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const filteredUser = users.filter((user) => user.email === sendTo);
    console.log(`dfggrrrrr43${filteredUser[0].id}`)
    const userId =
      filteredUser.length === 0 ? idGenerator() : filteredUser[0].id;
    const userName = setUserName(sendTo);

    
      const userResponse = await createUser({ id: userId, name: userName, email: sendTo })

      

      const emailId = idGenerator();
      const date = timeGenerator();

      const emailResponse = await createEmail({
        id: emailId,
        title: title,
        body: body,
        topicId: topic,
        userId: userId,
        status: "sent",
        date: date,
      })

      if (emailResponse.status === 201) {
        return navigate("/outbox");
      }
    
  };

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleBody = (event: any) => {
    setBody(event.target.value);
  };

  const handleTopic = (event: any) => {
    setTopic(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { usersData, topicsData } = await getForeignKies();

      setUsers(usersData);
      setTopics(topicsData);
    };

    fetchData();
  }, []);

  if (users.length === 0 || topics.length ===0) {
    return <Loading/>
  }

  return (
    <>
      <FormLayout title="new Email">
        <Grid container spacing={4} sx={{ marginBottom: "80px" }}>
          <Grid xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="title"
              variant="outlined"
              onChange={handleTitle}
            />
          </Grid>
          <Grid xs={3}>
            <Select defaultValue={1} fullWidth onChange={handleTopic}>
              {topics.map((topic) => (
                <MenuItem value={topic.id} key={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid xs={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users.map((user) => user.email)}
              renderInput={(params) => (
                <TextField {...params} label="to" fullWidth />
              )}
              onInputChange={(event, value) => setSendTo(value)}
              freeSolo
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              multiline
              id="outlined-basic"
              label="description"
              variant="outlined"
              rows={10}
              onChange={handleBody}
            />
          </Grid>
        </Grid>
        <Box
          sx={{ textAlign: "center" }}
          position="absolute"
          bottom={5}
          left={0}
          right={0}
          textAlign="center"
        >
          <Button onClick={handleSubmit} variant="contained" color="success">
            send
          </Button>
        </Box>
      </FormLayout>
    </>
  );
}

export default ComposeEmail;
