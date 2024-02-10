import { NextResponse } from 'next/server'

const allowedParams = [
  '', // params & in url allowed
]

export async function middleware(req) {
  const url = req.nextUrl
  let changed = false

  url.searchParams.forEach((param, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key)
      changed = true
    }
  })

  if (changed) {
    // dont do it for now, but keyword can be filtered like that
    // return NextResponse.redirect(url)
  }
}
