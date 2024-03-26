import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 180;

const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

type CategoryProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

export const Categories = ({ category, onCategoryChange }: CategoryProps) => {
  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        {categories.map((text) => (
          <ListItem
            key={text}
            disablePadding
            style={{
              backgroundColor: category === text ? "lightgrey" : "white",
            }}
          >
            <ListItemButton
              onClick={() => {
                onCategoryChange(text);
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
