import React from 'react'

const ShopIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={color}
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
      />
    </svg>
  )
}

export default function StoresList({ stores }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My Stores
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {stores &&
            stores.map((store) => (
              <div key={store.id} className="group relative">
                <a href={`/stores/${store.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border-2 shadow-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <ShopIcon color={'#0284c7'} />
                  </div>
                </a>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{store.name}</h3>
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
      </div>
    </div>
  )
}
