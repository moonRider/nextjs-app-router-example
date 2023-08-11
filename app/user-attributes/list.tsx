'use client'
/**
 * 基于 Server Actions 实现的分页或无限加载的案例
 */

import { useState, useTransition } from 'react'

interface User {
  name: string
  id: string
}

interface PageInfo {
  currentPage: number
  perPage: number
}

export default function UserAttributesList({
  loadMore,
}: {
  loadMore: (
    pageInfo: PageInfo
  ) => Promise<{ data: Array<User>; pageInfo: PageInfo }>
}) {
  const [attributes, setAttributes] = useState<Array<User>>([])
  let [isPending, startTransition] = useTransition()

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    perPage: 40,
  })

  async function fetchAttrbutes() {
    loadMore({
      currentPage: pageInfo.currentPage + 1,
      perPage: pageInfo.perPage,
    }).then(({ data, pageInfo: pageInfoRes }) => {
      setAttributes([...attributes, ...data])
      setPageInfo(pageInfoRes)
    })
  }

  return (
    <>
      <ul>
        {attributes.map((item) => {
          return (
            <li key={item.id}>
              {item.id}: {item.name}
            </li>
          )
        })}
      </ul>
      <button onClick={() => startTransition(() => fetchAttrbutes())}>
        {isPending ? 'loading' : 'load more'}
      </button>
    </>
  )
}
