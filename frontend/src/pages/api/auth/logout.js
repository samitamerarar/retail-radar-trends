import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('access_token', '', {
        httpOnly: true, // Ensures the cookie is only accessible through HTTP(S) requests, not JavaScript
        secure: process.env.NODE_ENV !== 'development', // Only send the cookie over HTTPS in production
        maxAge: new Date(0),
        sameSite: 'Lax', // Protects against cross-site request forgery attacks
        path: '/', // Cookie is accessible from all paths on the domain
      }),
    ])

    return res.status(200).json({
      success: true,
    })
  }
}
