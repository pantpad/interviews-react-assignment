import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ProductSkeleton() {
  return (
    <Box overflow="scroll" height="100%">
      <Grid container spacing={2} p={2} position={"relative"}>
        {new Array(10).fill(0).map((_, i) => (
          <Grid item xs={4}>
            <Card style={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="150"
                style={{
                  opacity: "0.5",
                  backgroundColor: "lightgray",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  ....
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ....
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="h6" component="div">
                  $$$
                </Typography>
                <Box flexGrow={1} />
                <Box
                  position="relative"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Box
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    textAlign="center"
                  ></Box>
                  <IconButton disabled aria-label="delete" size="small">
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" component="div" mx={1}>
                    ...
                  </Typography>
                  <IconButton disabled aria-label="add" size="small">
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
