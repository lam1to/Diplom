import React, { useRef, useState } from "react";
import Container from "../components/Container/Container";
import styles from "../styles/Create.module.css";
import { Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import {
  Controller,
  FormProvider,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { Error, Label } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../components/store/hooks";
import { selectMyNfts, setMyNft } from "../components/store/NFT/nftSlice";
import axios from "axios";
import CreateImage from "../components/createComponents/CrateImage";

const Create = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedImgName, setSelectedImgName] = useState<string>("");
  const form = useForm({
    defaultValues: {
      nameNFT: "",
      description: "",
      price: 0,
      file: "",
      prompt: "",
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();
  const myNft = useAppSelector(selectMyNfts);
  const submit = () => {
    form.handleSubmit((data) => {
      console.log("data = ", data);
      dispatch(setMyNft(data));
      form.reset({
        nameNFT: "",
        price: 0,
        file: "",
        description: "",
      });
      setSelectedImg("");
    })();
  };
  console.log("errors = ", form.formState.errors);
  return (
    <FormProvider {...form}>
      <Container maxWidth="lg">
        <h1>Create your own NFT</h1>
        <div className={styles.create_container}>
          <div className={styles.create_block_preview}>
            <CreateImage
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
              selectedImgName={selectedImgName}
              setSelectedImgName={setSelectedImgName}
            />
          </div>
          <div className={styles.block_form}>
            <div className={styles.create_form}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  width: "100%",
                }}
              >
                <Typography fontFamily="inherit" variant="h5">
                  Create your own
                </Typography>
              </div>

              <div style={{ width: "100%", marginTop: "20px" }}>
                <Typography fontFamily="inherit" variant="h6">
                  Name
                </Typography>
                <TextFieldElement
                  //@ts-ignore
                  // sx={styleInput(true)}
                  fullWidth
                  sx={{ height: "45px" }}
                  placeholder="Name for you NFT"
                  name="nameNFT"
                  validation={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  }}
                />
              </div>
              <div style={{ width: "100%", marginTop: "20px" }}>
                <Typography fontFamily="inherit" variant="h6">
                  Description
                </Typography>
                <TextFieldElement
                  rows={5}
                  multiline
                  //@ts-ignore
                  // sx={styleInput(false)}
                  fullWidth
                  placeholder="Description for you NFT"
                  name="description"
                  validation={{
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  }}
                />
              </div>
              <div style={{ width: "100%", marginTop: "20px" }}>
                <Typography fontFamily="inherit" variant="h6">
                  Price
                </Typography>
                <TextFieldElement
                  //@ts-ignore
                  // sx={styleInput(true)}
                  fullWidth
                  placeholder="$"
                  name="price"
                  type="number"
                  validation={{
                    required: {
                      value: true,
                      message: "Price is required",
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles.form_button}>
              <Button
                sx={{ borderRadius: "14px", padding: "10px 20px" }}
                variant="contained"
                // type="onSubmit"
                onClick={submit}
              >
                Create nft
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </FormProvider>
  );
};
export default Create;
