import axios from "axios";
import styles from "../../styles/Create.module.css";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Image from "next/image";
import {
  Controller,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";

interface ICreateImage {
  selectedImg: string | null;
  selectedImgName: string | null;
  setSelectedImg: Dispatch<SetStateAction<string | null>>;
  setSelectedImgName: Dispatch<SetStateAction<string>>;
}

const CreateImage = ({
  selectedImgName,
  selectedImg,
  setSelectedImg,
  setSelectedImgName,
}: ICreateImage) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGenerateImage, setIsGenerateImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const { control, watch } = useFormContext();
  const prompt = watch("prompt");
  const onClickUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    setSelectedImgName(input.files[0].name);

    setSelectedImg(URL.createObjectURL(file));
    try {
      if (!input.files[0]) return;
      const formData = new FormData();
      formData.append("myImage", input.files[0]);
      const { data } = await axios.post("/api/image", formData);
      console.log("data = ", data);
      return data.name;
    } catch (e: any) {
      console.log(e.response?.data);
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const res = await axios.post(
        "api/generateAi",
        JSON.stringify({ imagePrompt: prompt }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsGenerating(false);
      if (!res) throw new Error("Failed to generate image");
      const { data } = res;
      const generatedImageUrl = data.data[0].url;
      setIsGenerateImage(false);
      setSelectedImg(generatedImageUrl);
      setSelectedImgName(`generated image ${prompt}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.create_block_img}>
      {isGenerateImage ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography
            onClick={() => {
              setIsGenerateImage(false);
            }}
            sx={{
              fontSize: "14px",
              position: "absolute",
              cursor: "pointer",
              ":hover": {
                opacity: "0.9",
              },
              top: "10px",
              left: "10px",
            }}
          >
            back
          </Typography>
          {generatedImage ? (
            <MediaRenderer
              src={generatedImage}
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "300px",
                height: "300px",
                border: "1px dashed white",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isGenerating ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                <Typography>Enter a prompt to generate an image</Typography>
              )}
            </Box>
          )}
          <TextFieldElement
            sx={{
              width: "300px",
              marginTop: "20px",
              label: { color: "white" },
              "label.Mui-focused": { color: "white" },
            }}
            name="prompt"
            multiline
            rows={4}
            label="prompt"
          />
          <Button
            disabled={!prompt || isGenerating}
            sx={{ marginTop: "10px" }}
            onClick={handleGenerate}
          >
            Generate image
          </Button>
        </Box>
      ) : (
        <>
          {selectedImg ? (
            <div className={styles.block_selected_img}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={selectedImg}
                alt="selected_img"
              />
              <p>Selected img: {selectedImgName}</p>
            </div>
          ) : (
            <div className={styles.create_block_img_content}>
              <Image
                alt="upload_img"
                width={48}
                height={48}
                src="/upload_img.svg"
              />
              <div>
                <h4>Select img</h4>
                <p>
                  Supported types: JPG, PNG, SVG, GIF, WEBP and MP4
                  <br></br>
                  Maximum size: 15 MB <br></br> Maximum resolution: 4000x4000px
                </p>
              </div>
              <Stack direction={"row"} spacing={1}>
                <div
                  onClick={onClickUpload}
                  className={styles.button_upload_img}
                >
                  Upload
                </div>
                <div
                  onClick={() => setIsGenerateImage(true)}
                  className={styles.button_upload_img}
                >
                  Generate with ai
                </div>
              </Stack>

              <Controller
                control={control}
                name="file"
                rules={{
                  required: {
                    value: true,
                    message: "Image is required",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    onChange={async (
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const input = event.target;
                      if (!input.files?.length) {
                        return;
                      }
                      const name = await uploadFile(event);
                      field.onChange(name);
                    }}
                    type="file"
                    ref={inputRef}
                    style={{ display: "none", width: "0px" }}
                  />
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default CreateImage;
