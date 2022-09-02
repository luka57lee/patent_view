import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Header from '../components/Header';

const organizations = [
  "TESLA, INC.",
  "RIVIAN IP HOLDINGS, LLC",
  "GENERAL MOTORS LLC",
  "NISSAN MOTOR CO., LTD.",
];

const Home = () => {
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
          <Autocomplete
            disablePortal
            id="company-combo"
            options={organizations}
            size="small"
            sx={{ width: 350 }}
            renderInput={(params) => <TextField size="small" {...params} label="Company" />}
          />
          
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
