import React, { useEffect, useRef } from 'react'
import Head from 'next/head'

import axios from 'axios'
import { toast } from 'react-toastify'

import StoresList from '@/components/StoresList'

export default function Stores({ error, ...props }) {
  const lastErrorLogTimeRef = useRef(null)

  useEffect(() => {
    // ! For some reasons, getServerSideProps is getting called twice,
    // prevent the error display if one was already displayed less than 500ms earlier
    if (error) {
      const currentTime = Date.now()
      if (
        !lastErrorLogTimeRef.current ||
        currentTime - lastErrorLogTimeRef.current > 500
      ) {
        toast.error(error)
        lastErrorLogTimeRef.current = currentTime
      }
    }
  }, [error])

  return (
    <>
      <Head>
        <title>Stores - Retail Radar Trends</title>
      </Head>
      <StoresList stores={props.stores} accessToken={props.accessToken} />
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  const accessToken = req.cookies.access_token

  try {
    const response = await axios.get(`${process.env.API_URL}/store`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const stores = response.data

    return {
      props: {
        stores,
        accessToken,
      },
    }
  } catch (error) {
    return {
      props: {
        error: error.response.data.error
          ? error.response.data.error
          : error.response.data.code,
        message: error.response.data.message
          ? error.response.data.message
          : error.response.data.status,
      },
    }
  }
}
