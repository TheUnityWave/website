// App.js

import React from 'react';
import './app.css';

const Header = () => (
  <div className="header">
    <h1>About Us</h1>
    <p className="tagline">Doing Things Differently</p>
  </div>
);

const AboutUs = () => (
  <div className="about-us">
    <h2>About Us</h2>
    <p>Founded in 2023, we are an integrated facility management company committed to ensuring safety, comfort, and progress in the spaces we manage. Through our dedicated staff, efficient technology, and sustainable methods, we provide a stable foundation for growth.</p>
    <p>We believe that growth thrives on security and stability. By maintaining safe, comfortable, and functional spaces, we empower our clients to focus on value creation and growth without risk or inefficiency.</p>
    <p>Our journey began with a vision to revolutionize facility management by integrating comprehensive services under one roof. Our team of over 10,000 skilled professionals is equipped to manage all aspects of facility management. From keeping offices clean and well-maintained to optimizing technical services such as electrical systems, air conditioning, and heavy equipment, we enhance productivity and improve the brand experience for both customers and employees.</p>
  </div>
);

const Vision = () => (
  <div className="content vision">
    <h2>Discover Our Vision</h2>
    <p>To be the leading provider of integrated facility management services, ensuring safety, comfort, and sustainability in every space we manage.</p>
    <img src="https://img.freepik.com/free-vector/vision-statement-concept-illustration_114360-7576.jpg" alt="Our Vision" />
  </div>
);

const Mission = () => (
  <div className="content mission">
    <h2>Explore Our Mission</h2>
    <p>Our mission is to deliver exceptional facility management services that enhance the efficiency and productivity of our clients, ensuring their success and satisfaction.</p>
    <img src="https://media.licdn.com/dms/image/D5612AQGF-nIfg1t2Rw/article-cover_image-shrink_600_2000/0/1682961964037?e=2147483647&v=beta&t=q_XFEcdnCRHqNB9aAT4ckKynlVXwSDW1755MM5bjzJI" alt="Our Mission" />
  </div>
);

const Values = () => (
  <div className="content values">
    <h2>Our Values</h2>
    <div className="background">
      <p>At the core of our company are the values that drive us forward. We are dedicated to creating safe and comfortable environments, embracing sustainability, fostering innovation, and upholding the highest standards of integrity. These values guide our actions and decisions, ensuring that we provide the best service to our clients while maintaining a positive impact on the community and the environment.</p>
    </div>
    <img src="https://www.cultureworkshr.com/wp-content/uploads/2022/09/iStock-1134456412-1030x687.jpg" alt="Our Values" />
  </div>
);

const Objectives = () => (
  <div className="content objectives">
    <h2>Our Objectives</h2>
    <div className="background">
      <p>Our primary objectives are to provide high-quality, reliable facility management services, continuously innovate and adopt sustainable practices, enhance the safety and comfort of the spaces we manage, and support the growth and success of our clients through efficient and effective solutions.</p>
    </div>
    <img src="https://img.freepik.com/free-photo/business-strategy-success-target-goals_1421-33.jpg" alt="Our Objectives" />
  </div>
);

const PanIndiaPresence = () => (
  <div className="content pan-india-presence">
    <h2>Pan-India Presence</h2>
    <div className="background">
      <p>With a strong presence across India, we serve a diverse range of industries and clients, from corporate offices to manufacturing facilities. Our nationwide network enables us to deliver consistent, high-quality services tailored to meet the unique needs of each client and location.</p>
    </div>
    <img src="https://e7.pngegg.com/pngimages/630/798/png-clipart-textile-industry-in-india-map-business-north-indian-food-service-india-thumbnail.png" alt="Pan-India Presence" />
  </div>
);

const Contact = () => (
  <div className="content contact">
    <h2>Contact Us</h2>
    <p>For more information about our services or to discuss your facility management needs, please contact us at <strong>Rahul Arora</strong> or visit our website.</p>
    <p>Phone: +91-7351087669</p>
    <p>Email: arora.rahul1118@gmail.com</p>
    <p>Location: C-201,Mahima Paronama,VIT Road,Japgatpura,Jaipur,Rajasthan,302017</p>
  </div>
);

const Footer = () => (
  <footer>
    <p>Doing Things Differently</p>
    <p> Designed and developed by our Team </p>
  </footer>
);

function App() {
  return (
    <div className="container">
      <Header />
      <AboutUs />
      <Vision />
      <Mission />
      <Values />
      <Objectives />
      <PanIndiaPresence />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;