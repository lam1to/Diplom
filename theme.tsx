import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          backgroundColor: "#1C1C1F",
          borderRadius: "10px",
          border: "1px solid white",
          height: "100%",
          label: {
            // paddingLeft: '20px',
            margin: "0px",
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },

          "& input": {
            fontSize: "14px",
            // py: "10.5px",
            backgroundColor: "#1C1C1F",
            cursor: "pointer",
            height: "100%",
            borderRadius: "10px",
            // border: "none",/
            // border: "1px solid white",
            color: "white",
            boxSizing: "border-box",
          },
          "& fieldset": {
            border: "none",
            borderRadius: "10px",
          },
          // '&:hover fieldset': {
          //   borderColor: '#0F23FB !important',
          // },
          "& .MuiInputLabel-shrink": {
            margin: "0 auto",
            position: "absolute",
            display: "none",
            right: "0",
            left: "0",
            top: "-3px",
            width: "150px", // Need to give it a width so the positioning will work
            background: "white", // Add a white background as below we remove the legend that had the background so text is not meshing with the border
            // display: "none" //if you want to hide it completly
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& legend ": {
              display: "none",
            },
          },
          textarea: {
            color: "white",
          },
          //   "$ .MuiFormHelperText-root": {
          //     marginTop: "20px",
          //   },
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          label: {
            // paddingLeft: '20px',
            margin: "0px",
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },
          "& .MuiAutocomplete-endAdornment svg": {
            fill: "white",
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          label: {
            // paddingLeft: '20px',
            margin: "0px",
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },
        }),
      },
    },
  },
});
