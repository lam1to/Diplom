import { Box, debounce, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  AutocompleteElement,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
// import { useDispatch, useSelector } from "react-redux";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getChains, selectChains } from "../store/Metadata/MetadataSlice";

const BuyHeader = () => {
  const dispatch = useAppDispatch();
  const chains = useAppSelector(selectChains);
  const { setValue } = useFormContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChangeDebounced = useCallback(
    debounce((value: string) => {
      setValue("searchNft", value);
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    handleSearchChangeDebounced(value);
  };

  useEffect(() => {
    if (chains.length !== 0) return;
    dispatch(getChains());
  }, []);
  return (
    <Box>
      <Stack gap={"20px"} direction={"row"}>
        <Box sx={{ flexGrow: 1 }}>
          <AutocompleteElement options={chains} label="Chain" name="chain" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            label="search by creator name"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Box>
      </Stack>
    </Box>
  );
};
export default BuyHeader;
