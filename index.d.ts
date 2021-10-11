// Allow import images
declare module '*.jpg';
declare module '*.png';

declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const API_SECRET: string;
}
