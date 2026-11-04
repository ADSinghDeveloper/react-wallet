// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import { AppLayout } from "./components/app-layout";
import './App.css'
import { ThemeProvider } from './components/theme-provider'
// import { LoginForm } from './components/login-form'
import { AppLayout } from './components/app-layout'
// import { SignupForm } from './components/signup-form'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {/* <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
        //<SignupForm />}
      </div>
    </div> */}
    <AppLayout>
       {/* Standard structural slots utilizing Tailwind utility grids */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <div className="rounded-xl border bg-card p-6 shadow-sm">Card 1</div>
         <div className="rounded-xl border bg-card p-6 shadow-sm">Card 2</div>
         <div className="rounded-xl border bg-card p-6 shadow-sm">Card 3</div>
         <div className="rounded-xl border bg-card p-6 shadow-sm">Card 4</div>
       </div>
       <div className="h-200 rounded-xl border bg-card p-6 shadow-sm">
         Main Visual Component Area (Charts, Lists, Tables)
       </div>
     </AppLayout>
    </ThemeProvider>
  )
}

export default App
