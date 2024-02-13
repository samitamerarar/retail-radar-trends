import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import axios from 'axios'
import { toast } from 'react-toastify'

import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

const ShopIcon = () => {
  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      enable-background="new 0 0 48 48"
    >
      <rect x="5" y="19" fill="#CFD8DC" width="38" height="19" />
      <rect x="5" y="38" fill="#B0BEC5" width="38" height="4" />
      <rect x="27" y="24" fill="#455A64" width="12" height="18" />
      <rect x="9" y="24" fill="#E3F2FD" width="14" height="11" />
      <rect x="10" y="25" fill="#1E88E5" width="12" height="9" />
      <path
        fill="#90A4AE"
        d="M36.5,33.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S37,36.3,37,36v-2C37,33.7,36.8,33.5,36.5,33.5z"
      />
      <g fill="#558B2F">
        <circle cx="24" cy="19" r="3" />
        <circle cx="36" cy="19" r="3" />
        <circle cx="12" cy="19" r="3" />
      </g>
      <path
        fill="#7CB342"
        d="M40,6H8C6.9,6,6,6.9,6,8v3h36V8C42,6.9,41.1,6,40,6z"
      />
      <rect x="21" y="11" fill="#7CB342" width="6" height="8" />
      <polygon fill="#7CB342" points="37,11 32,11 33,19 39,19" />
      <polygon fill="#7CB342" points="11,11 16,11 15,19 9,19" />
      <g fill="#FFA000">
        <circle cx="30" cy="19" r="3" />
        <path d="M45,19c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3L45,19z" />
        <circle cx="18" cy="19" r="3" />
        <path d="M3,19c0,1.7,1.3,3,3,3s3-1.3,3-3s-1.3-3-3-3L3,19z" />
      </g>
      <g fill="#FFC107">
        <polygon points="32,11 27,11 27,19 33,19" />
        <polygon points="42,11 37,11 39,19 45,19" />
        <polygon points="16,11 21,11 21,19 15,19" />
        <polygon points="6,11 11,11 9,19 3,19" />
      </g>
    </svg>
  )
}

export default function StoresList({ stores, accessToken }) {
  const [newStore, setNewStore] = useState('')

  const { isAuthenticated } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/')
  }, [isAuthenticated])

  const handleCreateStore = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/store`,
        { name: newStore },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      toast.success('Store added!')
      router.replace(router.asPath) // Reload the current page
    } catch (error) {
      toast.error(
        error.response &&
          error.response.data &&
          (error.response.data.description ||
            error.response.data.error ||
            error.response.data.message ||
            error.response.data.status)
      )
    }
  }

  const handleDeleteStore = async (storeId) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/store/${storeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      toast.warning('Store deleted!')
      router.replace(router.asPath) // Reload the current page
    } catch (error) {
      toast.error(
        error.response &&
          error.response.data &&
          (error.response.data.description ||
            error.response.data.error ||
            error.response.data.message ||
            error.response.data.status)
      )
    }
  }

  return (
    <>
      <Head>
        <title>Stores - App Name</title>
      </Head>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:mb-0">
              My Stores
            </h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter store name"
                className="mr-4 rounded border-gray-300 py-2 px-3"
                value={newStore}
                onChange={(e) => setNewStore(e.target.value)}
              />
              <button
                className="rounded bg-cyan-500 py-2 px-4 font-bold text-white hover:bg-cyan-700"
                onClick={handleCreateStore}
              >
                Create Store
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {stores &&
              stores.map((store) => (
                <div key={store.id} className="group relative">
                  <a href={`/stores/${store.id}`}>
                    <div className="lg:h-50 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border-2 shadow-md group-hover:opacity-75 lg:aspect-none">
                      <ShopIcon />
                    </div>
                  </a>
                  <button
                    className="absolute top-2 right-2 rounded-full bg-red-500 py-1 px-2 font-bold text-white hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteStore(store.id)
                    }}
                  >
                    X
                  </button>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-cyan-600">
                        {store.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        tags:{' '}
                        <div className="flex flex-wrap">
                          {store.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Items: {store.items.length}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {stores && stores.length == 0 && (
            <p className="mt-12 text-center text-lg text-yellow-500">
              No Stores added!
            </p>
          )}
        </div>
      </div>
    </>
  )
}
