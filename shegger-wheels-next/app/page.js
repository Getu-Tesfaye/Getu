
export default function Home() {

  return (
    <main>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">YOUR JOURNEY, YOUR RIDE</span>

          <h1>
            Find Your Perfect Ride.
            <span> Start Your Journey.</span>
          </h1>

          <p>
            Discover the right car for your next adventure.
            Browse available vehicles and book your ride with ease.
          </p>

          <div className="hero-actions">
            <a href="/cars" className="hero-button">
              Explore Cars <span>→</span>
            </a>

            <a href="/signup" className="hero-secondary">
              Join Sheggar Wheels
            </a>
          </div>

          <div className="hero-trust">
            <div>
              <strong>Easy</strong>
              <small>Car discovery</small>
            </div>
            <div>
              <strong>Flexible</strong>
              <small>Booking requests</small>
            </div>
            <div>
              <strong>Your choice</strong>
              <small>Your journey</small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow"></div>
          <div className="hero-car-card">
            <div className="hero-car-icon">✦</div>
            <div className="hero-car-art"><div className="hero-car-art">
              <img src="/images/image23.jpg" alt="Car for your next adventure" />
            </div></div>
            <span className="hero-car-label">YOUR NEXT ADVENTURE</span>
            <h2>The road is yours.</h2>
            <p>Find a ride that fits your journey.</p>
          </div>
          <div className="floating-badge">Ready for your next trip?</div>
        </div>
      </section>

      <section className="featured-cars">
        <div className="section-heading">
          <span>EXPLORE OUR COLLECTION</span>
          <h2>Find a Ride for Every Journey</h2>
          <p>Discover your next ride, whether it's for the city or the open road.</p>
        </div>

        <div className="featured-grid">
          <article className="car-card">
            <div className="car-image car-image-one">
              <span>POPULAR CHOICE</span>
              <div className="car-placeholder"><img src="./images/image22.jpg"></img></div>
            </div>
            <div className="car-details">
              <p className="car-category">COMPACT</p>
              <h3>City Explorer</h3>
              <p className="car-description">A practical ride for everyday trips.</p>
              <div className="car-bottom">
                <p><strong>Price varies</strong><span> / day</span></p>
                <a href="/cars">View Cars →</a>
              </div>
            </div>
          </article>

          <article className="car-card">
            <div className="car-image car-image-two">
              <span>COMFORT PICK</span>
              <div className="car-placeholder"><img src="./images/images1.jpg"></img></div>
            </div>
            <div className="car-details">
              <p className="car-category">SUV</p>
              <h3>Adventure Seeker</h3>
              <p className="car-description">Extra space for your next adventure.</p>
              <div className="car-bottom">
                <p><strong>Price varies</strong><span> / day</span></p>
                <a href="/cars">View Cars →</a>
              </div>
            </div>
          </article>

          <article className="car-card">
            <div className="car-image car-image-three">
              <span>PREMIUM STYLE</span>
              <div className="car-placeholder"><img src="./images/images4.jpg"></img></div>
            </div>
            <div className="car-details">
              <p className="car-category">PREMIUM</p>
              <h3>Executive Drive</h3>
              <p className="car-description">A refined choice for special occasions.</p>
              <div className="car-bottom">
                <p><strong>Price varies</strong><span> / day</span></p>
                <a href="/cars">View Cars →</a>
              </div>
            </div>
          </article>
        </div>

        <div className="featured-action">
          <a href="/cars">Explore All Cars →</a>
        </div>
      </section>

    </main>

  );
}
