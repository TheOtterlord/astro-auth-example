import { LiteralUnion, SignInAuthorizationParams, SignInOptions, SignOutParams } from 'next-auth/react';
import { RedirectableProviderType, BuiltInProviderType } from '@auth/core/providers';

interface AstroSignInOptions extends SignInOptions {
    /** The base path for authentication (default: /api/auth) */
    prefix?: string;
}
interface AstroSignOutParams extends SignOutParams {
    /** The base path for authentication (default: /api/auth) */
    prefix?: string;
}
/**
 * Client-side method to initiate a signin flow
 * or send the user to the signin page listing all possible providers.
 * Automatically adds the CSRF token to the request.
 *
 * [Documentation](https://authjs.dev/reference/utilities/#signin)
 */
declare function signIn<P extends RedirectableProviderType | undefined = undefined>(providerId?: LiteralUnion<P extends RedirectableProviderType ? P | BuiltInProviderType : BuiltInProviderType>, options?: AstroSignInOptions, authorizationParams?: SignInAuthorizationParams): Promise<Response>;
/**
 * Signs the user out, by removing the session cookie.
 * Automatically adds the CSRF token to the request.
 *
 * [Documentation](https://authjs.dev/reference/utilities/#signout)
 */
declare function signOut(options?: AstroSignOutParams): Promise<void>;

export { signIn, signOut };
