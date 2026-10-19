
import Link from "next/link";

function FoodCard({ name, price, image, description }) {
  return (
    <article className="home-food-card">
      <img
        src={image || "/images/placeholder.jpg"}
        alt={name}
        className="home-food-image"
      />

      <div className="home-food-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <strong>ETB {Number(price).toFixed(2)}</strong>

        <Link href="/menu" className="home-food-button">
          View Menu
        </Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-icon">✦</span>
          <span>
            <span className="brand-name">
              Addis <span>Eats</span>
            </span>
            <small>ETHIOPIAN CUISINE</small>
          </span>
        </Link>

        {/* <nav className="main-nav">
          <Link className="active" href="/">Home</Link>
          <Link href="/menu">Our Menu</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/customer-login">Sign In</Link>
          <Link className="order-button" href="/menu">
            Order Online <span>→</span>
          </Link>
        </nav> */}
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">AUTHENTIC ETHIOPIAN FLAVORS</p>

          <h1>
            A little <span>Ethiopia.</span>
            <br />
            A lot of heart.
          </h1>

          <p className="hero-description">
            Gather around fresh injera, rich stews and
            <br className="desktop-break" /> the warmth of Ethiopian hospitality.
          </p>

          <Link href="/menu" className="explore-button">
            Explore the Menu <span>→</span>
          </Link>

          <p className="location">
            <span>●</span> Addis Ababa, Ethiopia
          </p>
        </div>

        
        

        <div className="hero-image-card">
          <img
            src="/images/genfo.jpg"
            alt="Delicious Ethiopian food"
          />
        </div>

        

      </section>


      {/* SECTION 2: TODAY'S SPECIALS */}
      <section className="home-food-section">
        <h2>⭐ Today's Specials</h2>
        <p>Enjoy our delicious dishes of the day.</p>
        <div className="home-food-grid">
          <FoodCard
            name="Doro Wat"
            price={350}
            image="/images/doro wat.jpg"
            description="Traditional Ethiopian chicken stew."
          />

          <FoodCard
            name="Tibs"
            price={320}
            image="/images/genfo.jpg"
            description="Delicious Ethiopian-style tibs."
          />

          <FoodCard
            name="Shiro Wat"
            price={180}
            image="/images/misir.jpg"
            description="A flavorful Ethiopian chickpea stew."
          />
        </div>
        <Link href="/menu?category=special" className="home-view-all">

          view all
        </Link>
      </section>

      {/* SECTION 3: SPICY FOODS */}
      <section className="home-food-section">
        <h2>🌶️ Spicy </h2>
        <p>Discover flavorful Ethiopian dishes with a spicy kick.</p>
        <div className="home-food-grid">

          <FoodCard
            name="Doro Wat"
            price={350}
            image="/images/special chechebsa.jpg"
            description="A rich, spicy Ethiopian chicken stew."
          />

          <FoodCard
            name="Tibs"
            price={320}
            image="/images/landing.jpg"
            description="Seasoned Ethiopian meat with spices."
          />

          <FoodCard
            name="Kitfo"
            price={400}
            image="/images/home.jpg"
            description="A traditional Ethiopian specialty."
          />

        </div>
        <Link href="/menu?category=spicy" className="home-view-all">
          Explore Spicy  →
        </Link>
      </section>


      <section className="home-food-section">
        <h2>🌱 Vegan </h2>
        <p>Enjoy delicious plant-based Ethiopian meals.</p>
        <div className="home-food-grid">

          <FoodCard
            name="Shiro Wat"
            price={180}
            image="/images/kitfo.jpg"
            description="A delicious plant-based Ethiopian stew."
          />

          <FoodCard
            name="Misir Wat"
            price={160}
            image="/images/doro.jpg"
            description="A flavorful lentil dish."
          />

          <FoodCard
            name="Vegetable Firfir"
            price={150}
            image="/images/ayib.jpg"
            description="A tasty plant-based Ethiopian meal."
          />

        </div>
        <Link href="/menu?category=vegan" className="home-view-all">
          Explore Vegan →
        </Link>
      </section>

    </main>
  );
}
