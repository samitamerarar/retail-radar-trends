import axios from 'axios'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '')

    const access_token = cookies.access_token || false

    if (!access_token) {
      return res.status(401).json({ error: 'Login first!' })
    }

    try {
      const response = await axios.get(`${process.env.API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      if (response.data) {
        return res.status(200).json({
          user: response.data,
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
