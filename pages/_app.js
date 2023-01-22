import '../styles/globals.css'
import { Urbanist } from '@next/font/google'
const weatherfont = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function App({ Component, pageProps }) {
  return (
    <main className={weatherfont.className}>
      <Component {...pageProps} />
    </main>
  )
}
