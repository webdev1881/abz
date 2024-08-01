export function validateName(name: string): {rules: boolean; error: () => string | undefined} {
  const minLength = name.trim().length > 2;
  const maxLength = name.trim().length < 60;
  const hasNumber = /\d/.test(name);
  return {
    rules: minLength && maxLength && !hasNumber,
    error: () => {
      if (!name) { return "Please enter your Name" }
      if (hasNumber) { return "Should contain only letters" }
      if (!minLength || !maxLength) { return "Name should contain 2-60 characters" }
    },
  };
}

export function validateEmail(email: string): {rules: boolean; error: () => string | undefined} {
  const minLength = email.trim().length > 2;
  const maxLength = email.trim().length < 100;
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const pattern = re.test(email)
  return {
    rules: minLength && maxLength && pattern,
    error: () => {
      if (!email) { return "Please enter your Email" }
      if (!pattern) { return "Email is not valid" }
      if (!minLength || !maxLength) { return "Email should contain 2-100 characters" }
    },
  }
}

export function validatePhone(phone: string): {rules: boolean; error: () => string | undefined} {
  const re = /^\+380\d{9}$/;
  const pattern = re.test(phone)
  return {
    rules: pattern,
    error: () => {
      if (!phone) { return "Please enter your Phone" }
      if (!pattern) { return "Phone is not valid" }
    },
  }
}

export async function validateFile(file: File) {
  if (!file) return false;
  const minWidth = 70;
  const minHeight = 70;
  const validTypes = ['image/jpeg', 'image/jpg'].includes(file.type)
  const maxSize = file.size < 5 * 1024 * 1024 ; // 5 MB
  const validImgDimention = await new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      if (img.width < 70 || img.height < 70) {
        resolve(false);
      } else {
        resolve(true);
      }
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src = URL.createObjectURL(file);
  });

  return {
    rules: validTypes && maxSize && validImgDimention,
    error: function() {
      if (!validTypes) { return "Invalid file type" }
      if (!maxSize) { return "File size exceeds the maximum limit 5Mb" }
      if (!validImgDimention) { return "Image dimensions are too small" }
    },
  }
}

