import { useState } from "react";

import * as Style from "./style";

export const UploaderFile = ({ onChange, value }) => {
  const [urlImage, setUrlImage] = useState("");

  const handleImage = (e) => {
    console.log(e.target.files[0].name);
    setUrlImage(e.target.value);
    onChange(e.target.files[0])
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
