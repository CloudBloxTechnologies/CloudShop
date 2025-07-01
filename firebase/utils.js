export function emailToKey(email) {
  return email.replace(/\./g, "_").replace(/@/g, "_at_");
}
