import axios from 'axios'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body

    try {
      const response = await axios.post(
        `${process.env.API_URL}/login`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        res.setHeader('Set-Cookie', [
          cookie.serialize('access_token', response.data.access_token, {
            httpOnly: true, // Ensures the cookie is only accessible through HTTP(S) requests, not JavaScript
            secure: process.env.NODE_ENV !== 'development', // Only send the cookie over HTTPS in production
            maxAge: 60 * 60 * 24 * 15, // Cookie expires in 15 days
            sameSite: 'Lax', // Protects against cross-site request forgery attacks
            path: '/', // Cookie is accessible from all paths on the domain
          }),

          // not a good idea but its a demo app so...
          cookie.serialize('refresh_token', response.data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 15,
            sameSite: 'Lax',
            path: '/',
          }),
        ])

        return res.status(response.status).json({
          success: true,
        })
      }
    } catch (error) {
      res.status(error.response.status).json({
        message: error.response.data.message,
        status: error.response.data.status,
      })
    }
  }
}
