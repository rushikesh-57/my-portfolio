import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from "@mui/material";

const projects = [
  {
    title: "Cap Round Advisor",
    desc: "A college counseling platform to help students check engineering CAP round cut-offs in Maharashtra with historical data comparison.",
    img: "/caproundadvisor.png", // Add screenshot in public/
    link: "https://caproundadvisor.onrender.com"
  },
  {
    title: "AI Chatbot with PDF Knowledge",
    desc: "Built a chatbot using Mistral AI that answers queries with up-to-date information from custom PDF datasets.",
    img: "/chatbot.png",
    link: "#"
  },
  {
    title: "Online Café Ordering System",
    desc: "React + Flask-based web app for a café, with real-time ordering, admin menu management, and Firebase authentication.",
    img: "/cafe.png",
    link: "#"
  }
];

export default function Projects() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Projects</Typography>
      <Grid container spacing={4}>
        {projects.map((proj, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {proj.img && (
                <CardMedia component="img" height="160" image={proj.img} alt={proj.title} />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5">{proj.title}</Typography>
                <Typography variant="body2" color="text.secondary">{proj.desc}</Typography>
              </CardContent>
              <CardActions sx={{ mt: "auto" }}>
                <Button size="small" href={proj.link} target="_blank">View Project</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
