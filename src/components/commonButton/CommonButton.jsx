import { DEFAULT, IMG_ALT } from "@/constants";
import React from "react";
import styles from "./CommonButton.module.css";
import ArrowIcon from "../arrowIcon/ArrowIcon";

const CommonButton = ({
  label,
  backgroundColor = DEFAULT.BACKGROUND_COLOR,
  fontColor = DEFAULT.FONT_COLOR,
  arrowColor,
  onClick,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color: fontColor,
        borderRadius: DEFAULT.RADIUS,
      }}
      className={styles.buttonContainer}
      onClick={onClick}
    >
      {label}
      <ArrowIcon color={arrowColor} />
    </button>
  );
};

export default CommonButton;
