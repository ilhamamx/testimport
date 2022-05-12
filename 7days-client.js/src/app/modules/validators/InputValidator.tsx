export function phoneValidator(phoneNumber:string){
    //phone regex indonesia
    const phoneRegex = /^(^\+628|628|^08)\d{9,13}$/;
    let isValidPhone = phoneRegex.test(phoneNumber!);
    if (!isValidPhone) {
      return false;
    }
    return true;
}

export function emailValidator(email: string){
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let isValidEmail = emailRegex.test(email!);
    if (!isValidEmail) {
      return false;
    }
    return true;
}

export function emailOrPhoneValidator(emailOrPhone: string){
    let isValidEmail = emailValidator(emailOrPhone);
    let isValidPhone = phoneValidator(emailOrPhone);
    if (!isValidEmail && !isValidPhone) {
      return false;
    }
    return true;
}
