import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidGoogleMeetLink = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return /^(https:\/\/)?(meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}|www\.google\.com\/url\?q=https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3})/.test(
      url.href,
    );
  } catch {
    return false;
  }
};
