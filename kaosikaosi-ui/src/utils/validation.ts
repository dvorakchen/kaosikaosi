export function validatePhoneNumber(phoneNumber: string): boolean {
  var pattern = /^1[3456789]\d{9}$/;
  return pattern.test(phoneNumber);
}

export function validateEmail(email: string) {
  return RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(email);
}