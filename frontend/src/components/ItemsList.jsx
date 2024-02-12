import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

import axios from 'axios'
import { toast } from 'react-toastify'
import ItemsTrendingChart from './ItemsTrendingChart'

export default function ItemsList({
  storeId,
  storeName,
  storeItems,
  storeTags,
  storePytrends,
  accessToken,
}) {
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  const router = useRouter()

  const handleCreateItem = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/item`,
        { store_id: storeId, name: newItemName, price: newItemPrice },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      toast.success('Item added!')
      router.replace(router.asPath) // Reload the current page
    } catch (error) {
      toast.error(
        error.response &&
          (error.response.data.description ||
            error.response.data.error ||
            error.response.data.message ||
            error.response.data.status)
      )
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      toast.warning('Item deleted!')
      router.replace(router.asPath) // Reload the current page
    } catch (error) {
      toast.error(
        error.response &&
          (error.response.data.description ||
            error.response.data.error ||
            error.response.data.message ||
            error.response.data.status)
      )
    }
  }

  const items =
    storeItems &&
    storeItems.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        tags: storeTags[index] || [],
      }
    })

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:mb-0">
            Store Items:
          </h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter name"
              className="mr-4 w-40 rounded border-gray-300 py-2 px-3"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter price"
              className="mr-4 w-40 rounded border-gray-300 py-2 px-3"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
            />
            <button
              className="rounded bg-cyan-500 py-2 px-4 font-bold text-white hover:bg-cyan-700"
              onClick={handleCreateItem}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 pb-8 lg:px-8 xl:grid-cols-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {storeName}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"></p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3"
        >
          {items &&
            items.map((item) => (
              <li key={item.name}>
                <div className="relative flex items-center gap-x-6 rounded-lg border p-2 shadow-md">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-cyan-500">
                      {item.price}$
                    </p>
                    <div className="mt-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2 rounded-full bg-red-500 py-1 px-2 font-bold text-white hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent click event from propagating to the parent li
                      handleDeleteItem(item.id)
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <ItemsTrendingChart data={storePytrends} />
    </div>
  )
}
