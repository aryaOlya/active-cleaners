import React, { ReactNode } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";

interface FormLayoutProps {
  children: ReactNode;
  title:string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children,title }) => {
  return (
    <>
      <Box className="mx-10 my-auto py-24">
        <Paper elevation={5} className="p-5" sx={{position:"relative",minHeight:"400px"}}>
          <Typography variant="h4" >
            {title}
          </Typography>
          <Box marginBottom={2}>
          <Divider />
          </Box>
          {children}
        </Paper>
      </Box>
    </>
  );
};

export default FormLayout;
