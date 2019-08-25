export const API_URL = process.env.API_URL || 'http://127.0.0.1:8082'; // eslint-disable-line

export const UTILS = {
  min_password_lenght: 6,
};

export const MESSAGES = {
  verify_account: 'Verify your account! A confirmation email has been sent to your inbox',
  resend_verify_email: 'Letter sent successfully',
  email_must_be_valid: 'Must be valid e-mail',
  email_required: 'E-mail is required',
  password_required: 'Password is required',
  password_min_lenght: `Password must be at least ${UTILS.min_password_lenght} characters`,
  password_do_not_match: 'Passwords do not match';
};
