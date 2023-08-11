import Link from 'next/link'
import UserAttributesList from './list'

interface User {
  name: string
  id: string
}

interface PageInfo {
  currentPage: number
  perPage: number
}

export default function UserAttributeIndex() {
  // action 可以独立成 action.ts 文件单独处理
  async function loadMore(pageInfo: PageInfo): Promise<{
    data: Array<User>
    pageInfo: PageInfo
  }> {
    'use server'

    return Promise.resolve({
      data: [
        {
          id: `user-${pageInfo.currentPage * pageInfo.perPage + 1}`,
          name: `${Math.random()}`,
        },
      ],
      pageInfo: pageInfo,
    })
  }

  return (
    <>
      <h1>User Attributes</h1>
      <Link href="/">Home Page</Link>
      <UserAttributesList loadMore={loadMore} />
    </>
  )
}
