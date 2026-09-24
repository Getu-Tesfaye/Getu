function Home() {
    return (
        <div className="home">
            <video
                className="home-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/images/fruits.mp4" type="video/mp4" />
            </video>

            <div className="home-content">
                <h1>Welcome to Addis Eats</h1>
                
            </div>
        </div>
    );
}

export default Home;