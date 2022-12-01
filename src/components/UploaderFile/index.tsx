import { useState } from "react";

import * as Style from "./style";

export const UploaderFile = () => {
  const [urlImage, setUrlImage] = useState("");
  
  const handleImage = (e) => {
    setUrlImage(e.target.value);
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
      <span id="file-name">{urlImage}</span>
    </Style.Container>
  );
};
