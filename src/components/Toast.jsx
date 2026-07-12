import { Toaster } from "sonner";

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      }}
      richColors
    />
  );
}