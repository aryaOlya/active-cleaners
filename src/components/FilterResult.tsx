import React from "react";
import { UserType, TopicType } from "../types/types";
import Grid from '@mui/material/Unstable_Grid2'
import {
    Button,
    Select,
    MenuItem,
  } from "@mui/material";

interface FilterResultProps {
  onChangeUser: (userId: number) => void;
  onChangeTopic: (topicId: number) => void;
  onChangeCurrentPage: (currentPage: number) => void;
  users: UserType[];
  topics: TopicType[];
}

const FilterResult: React.FC<FilterResultProps> = ({
  onChangeUser,
  onChangeTopic,
  onChangeCurrentPage,
  users,
  topics
}) => {

    const handleUserFilter = (event:any) => {
        onChangeCurrentPage(1)
        onChangeUser(event.target.value)
    }

    const handleTopicFilter = (event:any)=>{
        onChangeCurrentPage(1)
        onChangeTopic(event.target.value)
    }

    const handleReset = ()=> {
        onChangeTopic(0)
        onChangeUser(0)
        onChangeCurrentPage(1)
    }

  return (
    <>
        <Grid container spacing={5} className="p-10">
            <Grid xs={5}>
            <Select defaultValue={1} fullWidth onChange={handleTopicFilter}>
              {topics.map((topic) => (
                <MenuItem value={topic.id} key={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid xs={5}>
            <Select defaultValue={1} fullWidth onChange={handleUserFilter}>
              {users.map((user) => (
                <MenuItem value={user.id} key={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid xs={2}>
                <Button onClick={handleReset} variant="contained" color="info">reset</Button>
            </Grid>
        </Grid>
    </>
  );
};

export default FilterResult;
