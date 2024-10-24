"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { imageSectionData } from "@/utils/data";
import CommonButton from "@/components/commonButton/CommonButton";
import styles from "./ImageSection.module.css";
import { HEADING, POWER3_INOUT, WHEEL } from "@/constants";

export default function Component() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef([]);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const selectedImageContainerRef = useRef(null);

  useEffect(() => {
    gsap.set(imageRefs.current, {
      position: "absolute",
      top: 0,
      left: 0,
      x: (i) => i * 50,
      y: (i) => i * 50,
      scale: 1,
      opacity: 1,
      rotationY: (i) => i * 10 - 20,
      zIndex: (i) => imageSectionData.length - i,
      transformOrigin: "right center",
    });

    gsap.from(imageRefs.current, {
      x: (i) => i * 90,
      y: (i) => i * 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: POWER3_INOUT,
    });
  }, []);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setActiveIndex(index);
    const selectedImageRef = imageRefs.current[index];
    const containerRect = containerRef.current.getBoundingClientRect();

    imageRefs.current.forEach((ref, idx) => {
      if (idx !== index) {
        gsap.to(ref, {
          y: containerRect.height / 2,
          x: -containerRect.width / 3,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: POWER3_INOUT,
        });
      }
    });

    gsap.to(selectedImageRef, {
      y: 0,
      x: -containerRect.width / 4,
      rotationY: 0,
      scale: 1.2,
      duration: 0.5,
      ease: POWER3_INOUT,
      onComplete: () => {
        gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
      },
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setActiveIndex(0);

    gsap.to(imageRefs.current, {
      x: (i) => i * 50,
      y: (i) => i * 50,
      scale: 1,
      opacity: 1,
      rotationY: (i) => i * 10 - 20,
      duration: 0.5,
      stagger: 0.1,
      ease: POWER3_INOUT,
    });
    gsap.to(contentRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleScrollOnImage = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const newIndex =
      delta > 0
        ? (activeIndex + 1) % imageSectionData.length
        : (activeIndex - 1 + imageSectionData.length) % imageSectionData.length;

    setActiveIndex(newIndex);
    const newSelectedImageRef = imageRefs.current[newIndex];

    gsap.to(newSelectedImageRef, {
      y: 0,
      x: -containerRef.current.getBoundingClientRect().width / 4,
      rotationY: 0,
      scale: 1.2,
      duration: 0.5,
      ease: POWER3_INOUT,
    });

    const previousSelectedImageRef = imageRefs.current[activeIndex];
    gsap.to(previousSelectedImageRef, {
      y: containerRef.current.getBoundingClientRect().height / 2,
      x: -containerRef.current.getBoundingClientRect().width / 3,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: POWER3_INOUT,
    });

    setSelectedImage(imageSectionData[newIndex]);

    // Update the content with a fade effect
    gsap.to(contentRef.current, { opacity: 0, duration: 0.2 }).then(() => {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    });
  };

  useEffect(() => {
    if (selectedImage) {
      const selectedContainer = selectedImageContainerRef.current;
      selectedContainer.addEventListener(WHEEL, handleScrollOnImage, {
        passive: false,
      });
    }

    return () => {
      if (selectedImageContainerRef.current) {
        selectedImageContainerRef.current.removeEventListener(
          WHEEL,
          handleScrollOnImage
        );
      }
    };
  }, [selectedImage, activeIndex]);

  return (
    <div
      className="relative h-screen w-screen bg-white overflow-hidden max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      ref={containerRef}
      style={{ perspective: "1000px", minHeight: "1000px" }}
    >
      <h1 className="text-right max-w-[80%] ml-auto">
        {HEADING.MAIN} <span className="font_red">{HEADING.SPAN}</span>
      </h1>

      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div
          ref={selectedImageContainerRef}
          className="relative h-[300px] w-[400px] flex items-center justify-center"
        >
          {imageSectionData.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => (imageRefs.current[index] = el)}
              onClick={() => handleImageClick(image, index)}
              className={`absolute cursor-pointer transition-shadow hover:shadow-lg ${
                activeIndex === index ? "opacity-1" : "opacity-0"
              }`}
              style={{
                zIndex: imageSectionData.length - index,
                top: `${index * 20}px`,
                left: `${index * 20}px`,
              }}
            >
              <Image
                src={
                  activeIndex === index && selectedImage
                    ? selectedImage.selectedSrc
                    : image.src
                }
                alt={image.alt}
                width={400}
                height={300}
                className="rounded-lg object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`${styles.contentContainer} absolute right-0 top-1/2 w-1/3 -translate-y-1/2 space-y-4 rounded-lg p-8 opacity-0`}
      >
        {selectedImage && (
          <>
            <h2 className="text-3xl font-bold">
              {selectedImage.heading}{" "}
              <span className="font_red">{selectedImage.fontRed}</span>
            </h2>
            <p className="text-lg">{selectedImage.para}</p>
            <div className="ml-auto">
              <CommonButton
                onClick={handleReset}
                label={selectedImage.buttonLabel}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
