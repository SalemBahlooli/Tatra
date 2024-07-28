"use client"
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ImageContextType {
  capturedImages: Record<string, string>;
  setCapturedImage: (participantId: string, image: string) => void;
  triggerCapture: (participantId: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [capturedImages, setCapturedImages] = useState<Record<string, string>>({});

  const setCapturedImage = useCallback((participantId: string, image: string) => {
    setCapturedImages((prev) => ({ ...prev, [participantId]: image }));
  }, []);

  const triggerCapture = useCallback((participantId: string) => {
    document.dispatchEvent(new CustomEvent("capture-image", { detail: { participantId } }));
  }, []);

  return (
    <ImageContext.Provider value={{ capturedImages, setCapturedImage, triggerCapture }}>
      {children}
    </ImageContext.Provider>
  );
};