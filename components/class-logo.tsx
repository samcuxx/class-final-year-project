import React from "react";

interface ClassLogoProps {
  size?: "sm" | "md" | "lg";
  textColor?: string;
}

export default function ClassLogo({ 
  size = "md", 
  textColor = "text-primary" 
}: ClassLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`font-bold ${textColor} ${sizeClasses[size]}`}>
          Class
        </div>
        <div className="absolute -bottom-1 w-full h-1 bg-accent rounded-full"></div>
      </div>
    </div>
  );
} 