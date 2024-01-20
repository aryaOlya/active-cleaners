import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { UserType, TopicType } from "../../types/types";
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
    const userId =filteredUser.length === 0 ? idGenerator() : filteredUser[0].id;
    const userName = setUserName(sendTo)


    try {
      const userResponse = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { Accept: "Application/json","Content-Type":'application/json' },
        body:JSON.stringify({id:userId,name:userName,email:sendTo})
      });

      if (userResponse.status !== 201) {
        throw new Error("error during creating user")
      }

      const emailId = idGenerator()
      const date = timeGenerator()

      const emailResponse = await fetch("http://localhost:4000/emails",{
        method: "POST",
        headers: { Accept: "Application/json"   ,"Content-Type":'application/json'},
        body:JSON.stringify({id:emailId,title:title,body:body,topicId:topic,userId:userId,status:"sent",date:date})
      })

      if (emailResponse.status === 201) {
        return navigate("/emails")
      }


    } catch (error) {
      console.log(`error during send email...`);
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
      try {
        const [usersResponse, topicsResponse] = await Promise.all([
          fetch("http://localhost:4000/users"),
          fetch("http://localhost:4000/topics"),
        ]);

        const [usersData, topicsData] = await Promise.all([
          usersResponse.json(),
          topicsResponse.json(),
        ]);

        setUsers(usersData);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching users and topics", error);
      }
    };

    fetchData();
  }, []);


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
