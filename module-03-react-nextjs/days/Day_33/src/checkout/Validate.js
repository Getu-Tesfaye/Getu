export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your TeleBirr phone number.";
  } else if (!/^09\d{8}$/.test(form.phone.trim())) {
    errors.phone = "Use an Ethiopian phone number like 0912345678.";
  }

  if (!form.area.trim()) {
    errors.area = "Please enter your delivery area.";
  }

  return errors;
}