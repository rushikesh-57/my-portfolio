import { Container, Typography, Box, Stack, Avatar, Chip } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export default function About() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>About Me</Typography>
      
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
        <Avatar
          alt="Profile"
          src="/profile.jpg" // Add your photo in public folder or update link
          sx={{ width: 160, height: 160, boxShadow: 3 }}
        />
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hi! I’m <strong>Rushi Babar</strong> — a Python automation developer 
            currently working in <strong>Strategic Risk Management</strong> at UBS.  
            I have a passion for building efficient automation tools, web apps, and 
            solving complex problems with clean, maintainable code.  
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Alongside my corporate work, I love creating impactful projects — from 
            AI chatbots with custom PDF knowledge to interactive data dashboards.  
            I’m also an educator, teaching Mathematics to 4th-grade students, and 
            I enjoy making learning simple and fun.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip icon={<CodeIcon />} label="Python Automation" />
            <Chip icon={<CodeIcon />} label="React + MUI" />
            <Chip icon={<CodeIcon />} label="Pandas & Data Analysis" />
            <Chip icon={<WorkOutlineIcon />} label="Risk Analytics" />
            <Chip icon={<SchoolIcon />} label="Math Educator" />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
