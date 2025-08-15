import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Container, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: {
          queryParams: {
            prompt: "select_account" // Forces account chooser
          },
          redirectTo: `${window.location.origin}/phone`
        }
      });
    if (error) setError(error.message);
  };

  return (
    <Container sx={{ py: 8, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleLogin}>Log In</Button>
        <Button variant="outlined" onClick={handleGoogleLogin}>Log In with Google</Button>
        <Typography>Don’t have an account? <Button component={RouterLink} to="/signup">Sign up</Button></Typography>
      </Stack>
    </Container>
  );
}
