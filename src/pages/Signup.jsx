import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Container, TextField, Button, Stack, Typography, Alert } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate("/");
  };

  return (
    <Container sx={{ py: 8, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        <Typography>Already have an account? <Button component={RouterLink} to="/login">Login</Button></Typography>
      </Stack>
    </Container>
  );
}
