import type { Response } from "express";

export const handleValidationError = (
  error: any,
  res: Response,
  fallbackMsg: string
) => {
  if (error.name === "ValidationError") {
    const errorObject = JSON.parse(JSON.stringify(error));
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: errorObject.errors,
      },
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      success: false,
      error: {
        name: error.name,
        path: error.path,
        value: error.value,
        kind: error.kind,
      },
    });
  }

  return res.status(500).json({
    message: fallbackMsg,
    success: false,
    error: error.message || "Internal server error",
  });
};
