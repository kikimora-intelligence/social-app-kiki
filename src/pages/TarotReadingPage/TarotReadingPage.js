import React, { useRef, useState } from "react";

import styles from "./TarotReadingPage.module.css";

const TarotReadingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [readingType, setReadingType] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("profile");
  const [email, setEmail] = useState("");
  const textareaRef = useRef(null);

  const username = "Lilico"; //Example: dynamically insert from auth later

  const handleInput = () => {
    const text = textareaRef.current;
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  };

  return (
    <div className={styles.TarotPageLayout}>
      <div className={styles.TarotReadingServiceInput}>
        <label>You can now get a personal tarot reading by oracle Lilico</label>
        <textarea
          ref={textareaRef}
          placeholder="Question?"
          onInput={handleInput}
          className={styles.Textarea}
        />

        <button
          onClick={() => setShowModal(true)}
          className={styles.SendButton}
        >
          ?
        </button>
        <text>
          Your Tarot Reading will be provided to you by Lilico via a private
          message to your username's account or via e-mail. You get to decide
          where you'd like to receive it once you've written your question and
          clicked on "?".
        </text>
      </div>
      {showModal && (
        <div className={styles.ModalWrapper}>
          <div className={styles.ModalContent}>
            <h3>Choose your reading type</h3>

            <div className={styles.ReadingOptions}>
              <label className={styles.Option}>
                <input
                  type="radio"
                  name="reading"
                  value="standard"
                  checked={readingType === "standard"}
                  onChange={() => setReadingType("standard")}
                />
                <div>
                  <strong>
                    Standard-lenght Reading <br />
                    €10
                  </strong>
                  <p>(half a page minimum).</p>
                </div>
              </label>

              <label className={styles.Option}>
                <input
                  type="radio"
                  name="reading"
                  value="deep"
                  checked={readingType === "deep"}
                  onChange={() => setReadingType("deep")}
                />
                <div>
                  <strong>
                    Deep-Dive Reading <br />
                    €20
                  </strong>
                  <p>Comprehensive multi-card analysis (full page minimum).</p>
                </div>
              </label>
            </div>

            <h4>Where should your reading be sent?</h4>
            <div className={styles.DeliveryOptions}>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="profile"
                  checked={deliveryMethod === "profile"}
                  onChange={() => setDeliveryMethod("profile")}
                />
                As a message to your acc ({username})
              </label>

              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="email"
                  checked={deliveryMethod === "email"}
                  onChange={() => setDeliveryMethod("email")}
                />
                To email
              </label>

              {/* Smooth fade for the email field */}
              <div
                className={`${styles.EmailFieldWrapper} ${
                  deliveryMethod === "email" ? styles.Show : ""
                }`}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.EmailInput}
                />
              </div>
            </div>

            <p>Choose a payment method:</p>
            <div className={styles.PaymentButtons}>
              <button
                onClick={() =>
                  window.open("https://revolut.me/yourname", "_blank")
                }
              >
                Pay with Revolut
              </button>
              <button
                onClick={() =>
                  window.open("https://paypal.me/yourname", "_blank")
                }
              >
                Pay with PayPal
              </button>
            </div>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className={styles.RandomTarotIframeDiv}>
        <iframe
          src="https://randomtarotcard.com/"
          scrolling="no"
          width="100%"
          height="600vh"
          title="Random Tarot Card"
          overflow="hidden"
        ></iframe>
      </div>
    </div>
  );
};

export default TarotReadingPage;
