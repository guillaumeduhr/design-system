import "@axa-fr/design-system-css/dist/Form/Checkbox/Client/Checkbox.scss";
import checkBoxIcon from "@material-design-icons/svg/outlined/check_box.svg";
import checkBoxOutlineBlankIcon from "@material-design-icons/svg/outlined/check_box_outline_blank.svg";
import errorOutline from "@material-design-icons/svg/outlined/error_outline.svg";
import React, { ReactNode, useId } from "react";
import { CheckboxSelect } from "./CheckboxSelect";
import { Svg } from "../../../Svg";

type CheckboxProps = {
  label: string | ReactNode;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, errorMessage, ...inputProps }: CheckboxProps) => {
  let inputId = useId();
  inputId = inputProps.id || inputId;

  return (
    <>
      <div className="af-checkbox">
        <label key={inputProps.name} htmlFor={inputId}>
          <input
            {...inputProps}
            type="checkbox"
            id={inputId}
            aria-invalid={!!errorMessage}
          />
          <div className="af-checkbox__icons">
            <Svg
              src={checkBoxOutlineBlankIcon}
              className="af-checkbox__unchecked"
            />
            <Svg src={checkBoxIcon} className="af-checkbox__checked" />
          </div>
          {label}
        </label>
      </div>
      {errorMessage && (
        <div className="af-checkbox__error" aria-live="assertive">
          <Svg src={errorOutline} />
          {errorMessage}
        </div>
      )}
    </>
  );
};

Checkbox.Select = CheckboxSelect;
export { Checkbox };
