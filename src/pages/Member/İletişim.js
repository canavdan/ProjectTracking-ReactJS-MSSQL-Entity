import React from "react";
import HeaderMember from "../../containers/content/templates/HeaderMember";

/* global $ */
class İletişim extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      width: "560px",
      height: "330px"
    };
    return (
      <div>
        <HeaderMember />

        <div className="container">
          <div className="row">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.506769552107!2d35.322789483764865!3d36.99770488681683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f38a79c7193%3A0xd61674d8580bea06!2sAdana%2C+Re%C5%9Fatbey+Mahallesi%2C+Seyhan%2FAdana!5e0!3m2!1str!2str!4v1518899160674"
                width="600"
                height="450"
                frameBorder="0"
                style={style}
                allowFullScreen
                />
            <div className="wpb_wrapper">
              <h4>
              <strong>Contact With Us</strong>
              </h4>
              <p>
              <strong>Adres:</strong> Cemalpaşa Mah. Seyhan/Adana
              </p>
              <p>
                <strong>Tel:</strong>{" "}
                <a href="tel:+90 322 000 000 000">+90 322 00 00 00</a>
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:info@a.com.tr">info@a.com.tr</a>
              </p>
              <p>
                <strong>Working Hours:</strong> Sunday – Frida &nbsp;09:00
                – 18:00
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default İletişim;
