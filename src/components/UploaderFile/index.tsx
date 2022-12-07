import { useState, ChangeEvent } from "react";
import { UploaderProps } from "../../types";

import * as Style from "./style";

export const UploaderFile = ({ onChange, value }: UploaderProps) => {
  const [urlImage, setUrlImage] = useState<string>("");

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlImage(event.target.value);
    onChange(event.target.files)
  };

  return (
    <Style.Container>
      <Style.Label htmlFor="input-file">Select a image</Style.Label>
      <Style.Input
        id="input-file"
        type="file"
        value={urlImage}
        onChange={handleImage}
        accept="image/png, image/jpeg"
      />
      <span id="file-name">{value.name}</span>
    </Style.Container>
  );
};
