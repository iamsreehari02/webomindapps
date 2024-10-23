import React from "react";
import CommonButton from "@/components/commonButton/CommonButton";
import { BUTTON_LABELS, LIGHT_BLUE, SECTION_THREE, WHITE } from "@/constants";
import styles from "./SectionThree.module.css";
import Footer from "@/components/footer/Footer";

const SectionThree = () => {
  return (
    <div
      className={`${styles.sectionThreeContainer} flex flex-col items-center justify-center min-h-screen text-center px-4`}
    >
      <div className="w-[60%] mx-auto flex flex-col justify-center">
        <h1>{SECTION_THREE.HEADING}</h1>
        <p className="my-6">{SECTION_THREE.PARA}</p>
        <div className="mx-auto">
          <CommonButton
            label={BUTTON_LABELS.LETS_TALK}
            backgroundColor={WHITE}
            fontColor="#003DB8"
            arrowColor={LIGHT_BLUE}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SectionThree;
