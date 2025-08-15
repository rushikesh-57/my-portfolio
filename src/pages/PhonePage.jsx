// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import { useNavigate } from "react-router-dom";

// export default function PhonePage() {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) navigate("/login");
//     };
//     checkUser();
//   }, [navigate]);

//   const savePhone = async () => {
//     setLoading(true);

//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     const { error } = await supabase.auth.updateUser({
//       data: { phone } // saved in user_metadata.phone
//     });

//     setLoading(false);

//     if (error) {
//       console.error(error);
//     } else {
//       navigate("/"); // Go home or dashboard
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Enter Your Phone Number</h2>
//       <input
//         type="tel"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         placeholder="Enter phone number"
//       />
//       <button onClick={savePhone} disabled={loading}>
//         {loading ? "Saving..." : "Save"}
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebaseConfig";
import { supabase } from "../lib/supabase"; // Your existing Supabase client

const PhonePage = ({ userId }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enter-phone"); // enter-phone | enter-otp
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // Setup reCAPTCHA verifier when component mounts
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved", response);
        }
      }
    );
  }, []);

  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter a valid phone number");
    setLoading(true);

    try {
      const fullPhone = "+" + phone; // react-phone-input-2 gives without "+"
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep("enter-otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter the OTP");
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      console.log("Firebase verification result:", result);

      // Save phone to Supabase users table metadata
      const { error } = await supabase.auth.updateUser({
        data: { phone }
      });
      if (error) throw error;

      alert("Phone number verified & saved!");
    } catch (error) {
      console.error("OTP verification error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f9f9f9" }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          {step === "enter-phone" ? "Verify Your Phone" : "Enter OTP"}
        </Typography>

        {step === "enter-phone" && (
          <>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              inputStyle={{ width: "100%" }}
              specialLabel=""
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
            </Button>
          </>
        )}

        {step === "enter-otp" && (
          <>
            <TextField
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
            </Button>
          </>
        )}

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </Paper>
    </Box>
  );
};

export default PhonePage;
