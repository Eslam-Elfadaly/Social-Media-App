import './App.css'
import AppRouter from './Routes/AppRouter'
import { ThemeProvider } from "@/components/Theming/theme-provider"
import { Toaster } from "@/components/ui/toast"

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppRouter/>
    <Toaster />
    </ThemeProvider>
    </>
  )
}

export default App
