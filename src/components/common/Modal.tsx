import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  showCloseButton?: boolean;
}

const maxWidthMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  maxWidth = "md",
  showCloseButton = true,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(maxWidthMap[maxWidth], "w-[95%] p-0 gap-0 border border-slate-200 shadow-xl rounded-2xl overflow-hidden", className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 bg-white">
          <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500 mt-1">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {footer !== undefined && (
          <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-gray-50/50 gap-3">
            {footer || (
              <>
                <Button variant="outline" onClick={onClose} className="rounded-xl font-semibold">
                  Tutup
                </Button>
                <Button onClick={onClose} className="rounded-xl font-semibold bg-[#0A46D2] hover:bg-blue-700">
                  Selesai
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
