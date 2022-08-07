export function ComparePassword(password1, password2) {
  if (!password1 || !password2) {
    return "Password can't be empty.";
  }
  if (password1 !== password2) {
    return 'Password not valid please try again';
  }
  return ''
}

export default function passwordValidator(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return 'Password must be at least 5 characters long.';
  return '';
}
