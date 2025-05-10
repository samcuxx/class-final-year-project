import React from "react";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: "student" | "lecturer";
  onRoleChange: (role: "student" | "lecturer") => void;
}

export default function RoleSelector({
  selectedRole,
  onRoleChange,
}: RoleSelectorProps) {
  return (
    <div className="flex w-full rounded-2xl overflow-hidden border border-input mb-6">
      <button
        type="button"
        onClick={() => onRoleChange("student")}
        className={cn(
          "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ease-in-out",
          selectedRole === "student"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-background hover:bg-secondary"
        )}
      >
        I'm a Student
      </button>
      <button
        type="button"
        onClick={() => onRoleChange("lecturer")}
        className={cn(
          "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ease-in-out",
          selectedRole === "lecturer"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-background hover:bg-secondary"
        )}
      >
        I'm a Lecturer
      </button>
    </div>
  );
} 