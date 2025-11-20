// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        },
    });
};

// 404 handler for undefined routes
export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

