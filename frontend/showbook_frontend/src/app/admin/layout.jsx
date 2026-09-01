import React from 'react'
import { Toaster } from 'sonner'


function AdminLayout({children}) {
  return (
    <div>{children}
    <Toaster/>
    </div>
  )
}

export default AdminLayout