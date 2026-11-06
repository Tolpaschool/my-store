import "./Hero.css";

function Hero({ title, subtitle, buttonText }) {
  return (
    <section className="hero">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <button className="hero-btn">{buttonText}</button>
    </section>
  );
}

export default Hero;