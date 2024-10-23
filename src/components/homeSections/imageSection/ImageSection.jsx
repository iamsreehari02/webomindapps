"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: "/images/IMG1.png",
    alt: "Image 1",
    data: "Data for Image 1",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Image 2",
    data: "Data for Image 2",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Image 3",
    data: "Data for Image 3",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Image 4",
    data: "Data for Image 4",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Image 5",
    data: "Data for Image 5",
  },
];

export default function Component() {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageRefs = useRef([]);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial stacked animation
    gsap.set(imageRefs.current, { y: (i) => i * 20, scale: 1, opacity: 1 });
    gsap.from(imageRefs.current, {
      y: (i) => i * 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  const handleImageClick = (image) => {
    if (selectedImage) return; // Prevent clicking while animating

    setSelectedImage(image);
    const selectedImageRef = imageRefs.current[image.id - 1];
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = selectedImageRef.getBoundingClientRect();

    // Calculate the target position (right side of the container)
    const targetX = containerRect.width / 2 - imageRect.width / 2;

    // Animate unselected images
    imageRefs.current.forEach((ref, index) => {
      if (index !== image.id - 1) {
        gsap.to(ref, {
          y: 0,
          x: -containerRect.width / 2 + imageRect.width / 2,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    });

    // Animate selected image
    gsap.to(selectedImageRef, {
      y: 0,
      x: targetX,
      scale: 1.5,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        // Show content
        gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
      },
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    gsap.to(imageRefs.current, {
      x: 0,
      y: (i) => i * 20,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });
    gsap.to(contentRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100"
      ref={containerRef}
    >
      <div className="relative h-[400px] w-[600px]">
        {/* Stacked Images */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => (imageRefs.current[index] = el)}
              onClick={() => handleImageClick(image)}
              className="absolute cursor-pointer transition-shadow hover:shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={200}
                className="rounded-lg object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="absolute right-0 top-1/2 w-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 opacity-0 shadow-xl"
        >
          {selectedImage && (
            <>
              <h2 className="text-2xl font-bold">{selectedImage.alt}</h2>
              <p>{selectedImage.data}</p>
              <button
                onClick={handleReset}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Back to Stack
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
