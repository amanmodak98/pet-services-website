import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import TeamPage from './pages/TeamPage'
import BookPage from './pages/BookPage'
import ContactPage from './pages/ContactPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'book', element: <BookPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
