"use client";

import { Toaster } from "react-hot-toast";

const TOAST_STYLES = {
  darkBg: "#0f1419",
  border: "#2f3542",
  success: "#3cd278",
  error: "#CF3127",
  warning: "#F7931A",
  text: "#e8eaed",
  textMuted: "#9ca3af",
};

const ToasterContext = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="!z-[99999]"
      toastOptions={{
        duration: 4000,
        style: {
          background: TOAST_STYLES.darkBg,
          color: TOAST_STYLES.text,
          border: `1px solid ${TOAST_STYLES.border}`,
          borderRadius: "12px",
          padding: "14px 18px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        },
        success: {
          iconTheme: { primary: TOAST_STYLES.success, secondary: TOAST_STYLES.darkBg },
          style: {
            borderLeft: `4px solid ${TOAST_STYLES.success}`,
          },
        },
        error: {
          iconTheme: { primary: TOAST_STYLES.error, secondary: TOAST_STYLES.darkBg },
          style: {
            borderLeft: `4px solid ${TOAST_STYLES.error}`,
          },
        },
        loading: {
          iconTheme: { primary: TOAST_STYLES.text, secondary: TOAST_STYLES.border },
        },
        custom: {
          style: {
            borderLeft: `4px solid ${TOAST_STYLES.warning}`,
          },
        },
      }}
    />
  );
};

export default ToasterContext;
