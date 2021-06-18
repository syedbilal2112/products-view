import { environment } from '../../environments/environment';
import { getHtmlTagDefinition } from '@angular/compiler';

// Local storage keys
export const STORAGE_ACCOUNT_TOKEN = 'tablet-account';
export const STORAGE_CLOUD_TOKEN = 'cloud-token'
export const STORAGE_USER_DETAILS = 'tablet-user-details';
export const STORAGE_SECURITY_TOKEN = 'tabletApp-security';
// Common http root api
export const BACKEND_API_ROOT_URL: string = environment.cloudUrl;

export class UrlMatcher {
  public static matches(url: string): boolean {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  }
}
