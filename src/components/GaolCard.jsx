import { Box, Typography, LinearProgress, Button } from "@mui/material";
import { glass } from "../themeStyles";

export default function GoalCard() {
  return (
    <Box sx={{ ...glass, p: 3 }}>

      <Typography fontWeight="bold">
        Write Code Every Day
      </Typography>

      <Typography sx={{ opacity: 0.6, fontSize: 13 }}>
        Study • High
      </Typography>

      <Typography mt={1} fontSize={13}>
        11/60 Hours
      </Typography>

      <LinearProgress
        variant="determinate"
        value={18}
        sx={{
          mt: 1,
          height: 8,
          borderRadius: 5,
          background: "#1e293b"
        }}
      />

      <Typography mt={1} fontSize={12}>
        18% complete
      </Typography>

      {/* BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" size="small">
          Mark Progress
        </Button>
        <Button size="small">Edit</Button>
        <Button color="error" size="small">
          Delete
        </Button>
      </Box>

    </Box>
  );
}