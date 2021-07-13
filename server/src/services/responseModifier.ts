/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Sanjay Sarkar
 * @since   2020
 */

/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

const success = (message: string, results: any, statusCode: number) => {
    return {
        message,
        error: false,
        code: statusCode,
        results,
    };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */

const error = (message: string, statusCode: number) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true,
    };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */

const validation = (errors: any) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors,
    };
};

export { validation, error, success }
