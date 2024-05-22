import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Collection } from "../../interfaces/Collections";
import Image, { StaticImageData } from "next/image";
import placeholderImage from "../../public/images/emptyImage.png";
import { useState } from "react";

export interface OneCollection {
  collection: Collection;
}

const OneCollection = ({ collection }: OneCollection) => {
  return (
    <Box>
      <Box sx={{ maxHeight: "100px", width: "100%", overflow: "hidden" }}>
        <Image
          width={300}
          height={100}
          src={placeholderImage}
          alt={`oneCollectionImage-${collection.collection}-${collection.name}`}
        />
      </Box>

      <Stack
        mt={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography> {collection.name}</Typography>
        <Avatar src={collection.image_url}></Avatar>
      </Stack>
    </Box>
  );
};
export default OneCollection;
