import { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "../components/Header";
import Chart from "../components/Chart";

const organizations = [
  "TESLA, INC.",
  "RIVIAN IP HOLDINGS, LLC",
  "GENERAL MOTORS LLC",
  "NISSAN MOTOR CO., LTD.",
];

const Home = () => {
  const [organization, setOrganization] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ margin: "24px auto" }}>
        <Box>
          <Typography variant="h6" component="h6" sx={{ marginBottom: 1 }}>
            Select a company to see statistic
          </Typography>
          <Autocomplete
            disablePortal
            id="company-combo"
            options={organizations}
            size="small"
            value={organization}
            onChange={(event, option) => {
              setOrganization(option);
            }}
            sx={{ width: 350 }}
            renderInput={(params) => (
              <TextField size="small" {...params} label="Company" />
            )}
          />
        </Box>
        <Box sx={{ marginTop: 3, height: 450 }}>
          <Chart organization={organization} />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
