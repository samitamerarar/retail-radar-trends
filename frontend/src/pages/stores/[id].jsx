import React, { useEffect } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

import ItemsList from '@/components/ItemsList'

export default function StoreDetails({ error, ...props }) {
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <>
      <ItemsList
        accessToken={props.accessToken}
        storeId={props.storeId}
        storeName={props.storeName}
        storeItems={props.storeItems}
        storeTags={props.storeTags}
        storePytrends={props.pytrends}
      />
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  const accessToken = req.cookies.access_token

  try {
    const response = await axios.get(
      `${process.env.API_URL}/store/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const storeId = response.data.id
    const storeName = response.data.name
    const storeItems = response.data.items
    const storeTags = response.data.tags
    const pytrends = response.data.pytrends
      ? JSON.parse(response.data.pytrends)
      : JSON.parse('[]')

    return {
      props: {
        storeId,
        storeName,
        storeItems,
        storeTags,
        pytrends,
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
