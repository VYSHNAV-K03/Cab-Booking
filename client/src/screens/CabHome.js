import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CabHome = () => {
  return (
    <div className="cab-home">

      {/* Section 3: Why Choose Us? */}
      <section id="why-us" className="why-choose-us">
        <div className="features">
          {[ 
            { text: "Safe & Secure Rides", img: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1925&auto=format&fit=crop" },
            { text: "Affordable Pricing", img: "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?q=80&w=2070&auto=format&fit=crop" },
           
          ].map((feature, index) => (
            <div className="feature" key={index} style={{ backgroundImage: `url(${feature.img})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <p className="feature-text">{feature.text}</p>
              {index === 0 && <button className="book-btn" style={{ marginTop: "10px" }} onClick={() => window.location.href = "/map"}>Book Now</button>}
            </div>
          ))}
        </div>
      </section>

 {/* Section 2: Popular Routes (Carousel) */}
 <section id="routes" className="popular-routes">
        
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          loop
        >
          {["Delhi ↔ Agra", "Mumbai ↔ Pune", "Bangalore ↔ Mysore", "Chennai ↔ Pondicherry"].map((route, index) => (
            <SwiperSlide key={index}>
              <div className="route-card">{route}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Footer */}
      

      {/* Styling */}
      <style jsx>{`
        .cab-home {
          font-family: 'Poppins', sans-serif;
          text-align: center;
          background: white;
          color: black;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5%;
          background: rgba(0, 0, 0, 0.7);
          position: sticky;
          top: 0;
          z-index: 1000;
          color: white;
        }

        .header h1 {
          color: #ffcc00;
        }

        .header nav a {
          color: white;
          margin: 0 15px;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .header nav a:hover {
          color: #ffcc00;
        }

        .book-btn {
          background: #ffcc00;
          padding: 16px 36px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 20px;
          transition: transform 0.3s, background 0.3s;
        }

        .book-btn:hover {
          background: #ff9900;
          transform: scale(1.08);
        }

        .route-card {
          background:rgb(0, 0, 0);
          color:rgb(255, 255, 255);
          padding: 24px;
          border-radius: 15px;
          font-size: 22px;
          font-weight: bold;
          transition: transform 0.3s;
        }

        .route-card:hover {
          transform: scale(1.1);
        }

        .feature {
          position: relative;
          background-size: cover;
          background-position: center;
          height: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

      .feature-text {
    align-items: left;
    justify-content: right;
    font-size: 12.5rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7); /* Dim white color */
    padding: 1px 30px;
    border-radius: 10px;
    text-align: left; /* Align text to the left */
}



        .footer {
          background: rgba(0, 0, 0, 0.7);
          padding: 20px;
          margin-top: 40px;
          color: white;
        }

        .footer nav a {
          color: white;
          margin: 0 15px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default CabHome;
