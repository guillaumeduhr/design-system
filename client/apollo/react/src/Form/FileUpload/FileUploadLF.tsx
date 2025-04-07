import "@axa-fr/design-system-apollo-css/dist/Form/FileUpload/FileUploadLF.scss";
import type { ComponentProps } from "react";
import { Button } from "../../Button/ButtonLF";
import { FileUpload as FileUploadCommon } from "./FileUploadCommon";
import { ItemMessage } from "../ItemMessage/ItemMessageLF";
import { Spinner } from "../../Spinner/SpinnerLF";

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
