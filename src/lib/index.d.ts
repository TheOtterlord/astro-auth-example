import { AuthConfig, Session } from '@auth/core/types';

interface AstroAuthConfig extends AuthConfig {
    /**
     * Defines the base path for the auth routes.
     * @default '/api/auth'
     */
    prefix?: string;
}
declare function AstroAuth(config: AstroAuthConfig): {
    get(event: any): Promise<Response>;
    post(event: any): Promise<Response>;
};
declare function getSession(req: Request, options: AstroAuthConfig): Promise<Session | null>;

export { AstroAuth, AstroAuthConfig, getSession };
