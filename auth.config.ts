import GitHub from '@auth/core/providers/github'

export default {
  providers: [
    // @ts-ignore
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET,
    }),
  ],
  trustHost: true,
}
