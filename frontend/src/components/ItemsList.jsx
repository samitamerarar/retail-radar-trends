import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function ItemsList({ storeName, storeItems, storeTags }) {
  const items =
    storeItems &&
    storeItems.map((item, index) => {
      return {
        name: item.name,
        price: item.price,
        tags: storeTags[index] || [],
      }
    })

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Store Items:
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">{storeName}</p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3"
        >
          {items &&
            items.map((item) => (
              <li key={item.name}>
                <div className="flex items-center gap-x-6 rounded-lg border p-2 shadow-md">
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
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
