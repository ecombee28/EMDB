import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div>
      <footer className={footerStyles.footer}>
        <p className={footerStyles.copy_right}>CombeeCreations</p>
      </footer>
    </div>
  );
};

export default Footer;
