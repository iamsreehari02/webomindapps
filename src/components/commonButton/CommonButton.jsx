import { DEFAULT, IMG_ALT } from "@/constants";
import React from "react";
import styles from "./CommonButton.module.css";
import ArrowIcon from "../../app/arrowIcon/ArrowIcon";

const CommonButton = ({
  label,
  backgroundColor = DEFAULT.BACKGROUND_COLOR,
  fontColor = DEFAULT.FONT_COLOR,
  arrowColor,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color: fontColor,
        borderRadius: DEFAULT.RADIUS,
      }}
      className={styles.buttonContainer}
    >
      {label}
      <ArrowIcon color={arrowColor} />
    </button>
  );
};

export default CommonButton;
