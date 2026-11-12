import "./Hero.css";

function Hero({ title, subtitle, buttonText }) {
  return (
    <section className="hero">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <a className="hero-btn" href="#products">
        {buttonText}
      </a>
    </section>
  );
}

export default Hero;
