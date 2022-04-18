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
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;
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

export default {}