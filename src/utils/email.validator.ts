export default function isValidEmail(email: string): boolean {
    // regex pattern to match email address format
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // check if the email matches the pattern
    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }