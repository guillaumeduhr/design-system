import "@axa-fr/design-system-apollo-css/dist/Form/FileUpload/FileUploadApollo.scss";
import type { ComponentProps } from "react";
import { Button } from "../../Button/ButtonApollo";
import { FileUpload as FileUploadCommon } from "./FileUploadCommon";
import { ItemMessage } from "../ItemMessage/ItemMessageApollo";
import { Spinner } from "../../Spinner/SpinnerApollo";

export const FileUpload = (
  props: Omit<
    ComponentProps<typeof FileUploadCommon>,
    "ButtonComponent" | "SpinnerComponent" | "ItemMessageComponent"
  >,
) => (
  <FileUploadCommon
    {...props}
    ButtonComponent={Button}
    SpinnerComponent={Spinner}
    ItemMessageComponent={ItemMessage}
  />
);
