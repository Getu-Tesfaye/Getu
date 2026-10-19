import { AuthProvider } from './auth/useAuth';
import { Header } from './components/Header';
import { FoodMenu } from './components/FoodMenu';
import { Checkout } from './Checkout';

export default function App() {
  return (
    <AuthProvider>
      <div className='App-layout'>
        <Header />
        <div className='content-container'>
          <main className='menu-section'>
            <FoodMenu />
            <aside className='sidebar-section'>
              <Checkout />
            </aside>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}