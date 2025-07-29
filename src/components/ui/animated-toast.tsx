"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const toastVariants = {
  initial: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    rotateY: 45
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    rotateY: 0
  },
  exit: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    rotateY: -45
  }
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0
  }
};

const progressVariants = {
  initial: { scaleX: 1 },
  animate: (duration: number) => ({
    scaleX: 0
  })
};

export function AnimatedToast({ 
  id, 
  title, 
  description, 
  type = "info", 
  duration = 5000, 
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950";
      case "error":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950";
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950";
      default:
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950";
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className={cn(
            "relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm",
            getColorClasses()
          )}
          whileHover={{ scale: 1.02, y: -2 }}
          layout
        >
          <div className="flex items-start space-x-3">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.2
              }}
              className="flex-shrink-0"
            >
              {getIcon()}
            </motion.div>
            <div className="flex-1 min-w-0">
              {title && (
                <motion.p 
                  className="text-sm font-semibold text-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {title}
                </motion.p>
              )}
              {description && (
                <motion.p 
                  className="text-sm text-muted-foreground mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {description}
                </motion.p>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 hover:bg-background/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className={cn("absolute bottom-0 left-0 h-1 origin-left", getProgressColor())}
              variants={progressVariants}
              initial="initial"
              animate="animate"
              custom={duration}
              transition={{
                duration: duration / 1000,
                ease: "linear"
              }}
            />
          )}
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <AnimatedToast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}