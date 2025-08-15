import { Container, Typography, TextField, Button, Stack, Box, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Contact() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Contact</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Whether you have a question, want to collaborate on a project, or just want to say hi — my inbox is always open.
      </Typography>

      <Stack spacing={2} sx={{ maxWidth: 500 }}>
        <TextField label="Your Name" fullWidth variant="outlined" />
        <TextField label="Your Email" fullWidth variant="outlined" />
        <TextField label="Message" multiline rows={4} fullWidth variant="outlined" />
        <Button variant="contained" size="large">Send Message</Button>
      </Stack>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom>Find me online</Typography>
        <Stack direction="row" spacing={3}>
          <Link href="mailto:rushibabar@example.com"><EmailIcon fontSize="large" /></Link>
          <Link href="https://linkedin.com/in/rushi-babar" target="_blank"><LinkedInIcon fontSize="large" /></Link>
          <Link href="https://github.com/rushi-babar" target="_blank"><GitHubIcon fontSize="large" /></Link>
        </Stack>
      </Box>
    </Container>
  );
}
