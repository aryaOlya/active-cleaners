import { useState, useEffect } from "react";
import { EmailType, UserType, TopicType } from "../../types/types";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import FilterResult from "../FilterResult";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getForeignKies } from "../../api/foreignKies";
import { getEmails } from "../../api/emails";
import Loading from "../Loading";

const EmailList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [userFilter, setUserFilter] = useState<number>(0);
  const [topicFilter, setTopicFilter] = useState<number>(0);
  

  useEffect(() => {
    const fetchData = async () => {
      const { usersData, topicsData } = await getForeignKies();

      setUsers(usersData);
      setTopics(topicsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      const { response, emailData } = await getEmails(
        userFilter,
        topicFilter,
        currentPage,
        "sent"
      );

      setEmails(emailData);
      setTotalPages(
        Math.ceil(
          parseInt(response.headers.get("X-Total-Count") ?? "0", 10) / 10
        )
      );
    };

    fetchEmails();
  }, [currentPage, topicFilter, userFilter]);

  if (users.length === 0 || topics.length ===0) {
    return <Loading/>
  }

  return (
    <>
      <FilterResult
        users={users}
        topics={topics}
        onChangeTopic={setTopicFilter}
        onChangeUser={setUserFilter}
        onChangeCurrentPage={setCurrentPage}
      />

      <TableContainer sx={{ padding: "40px" }}>
        <Table sx={{ minWidth: "700px" }}>
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell>topic</TableCell>
              <TableCell>to</TableCell>
              <TableCell>email</TableCell>
              <TableCell>description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <>
                <TableRow>
                  <TableCell>{email.title}</TableCell>
                  <TableCell>
                    {topics.find((topic) => topic.id === email.topicId)?.name}
                  </TableCell>
                  <TableCell>
                    {users.find((user) => user.id === email.userId)?.name}
                  </TableCell>
                  <TableCell>
                    {users.find((user) => user.id === email.userId)?.email}
                  </TableCell>
                  <TableCell>
                    <Link to={`/email/${email.id}`}>continue reading...</Link>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default EmailList;
