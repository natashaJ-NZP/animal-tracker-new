declare module 'next-auth/client';   
export interface PageProps<T = Record<string, unknown>> {
    additionalContent: T
}
  