import React from "react";

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Goldis</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>Goldis</strong>, your ultimate destination for stylish, high-quality clothing online. 
        We are committed to bringing you the latest trends and timeless classics, 
        ensuring there's something for everyone in our collection.
      </p>
      <p style={styles.paragraph}>
        At Goldis, we believe that shopping for clothes should be easy, enjoyable, and affordable. 
        Our mission is to provide a seamless online shopping experience with a curated selection of 
        products designed to fit your unique style and needs.
      </p>
      <p style={styles.paragraph}>
        <strong>Why choose Goldis?</strong>
      </p>
      <ul style={styles.list}>
        <li>Extensive range of high-quality clothing for all occasions</li>
        <li>Simple, intuitive, and secure online shopping experience</li>
        <li>Fast and reliable shipping, so you get your favorites quickly</li>
        <li>Friendly customer support to assist you every step of the way</li>
      </ul>
      <p style={styles.paragraph}>
        Thank you for choosing Goldis for your fashion needs. Whether you're updating your wardrobe 
        or looking for the perfect gift, we've got you covered. Start exploring today and find your next favorite outfit!
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5em",
    marginBottom: "20px",
  },
  paragraph: {
    marginBottom: "15px",
    fontSize: "1.2em",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "1.1em",
  },
};

export default AboutPage;
