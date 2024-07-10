import React from 'react';

const MapComponent = () => {
  return (
    <div className="map-container flex-1 h-full border-primary border-spacing-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224567.72022943624!2d76.82493495275085!3d28.42316029376398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1720524286619!5m2!1sen!2sin"
        // width="600"
        // height="450"
        className='h-full w-full'
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapComponent;