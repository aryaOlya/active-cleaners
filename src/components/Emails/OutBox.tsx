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

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/emails?status=sent${
            userFilter === 0 ? "" : `&userId=${userFilter}`
          }${
            topicFilter === 0 ? "" : `&topicId=${topicFilter}`
          }&_page=${currentPage}`
        );
        const emailData = await response.json();

        setEmails(emailData);
        setTotalPages(Math.ceil(emailData.length / 10));
      } catch (error) {
        console.error("Error fetching emails", error);
      }
    };

    fetchEmails();
  }, [currentPage,topicFilter,userFilter]);

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
