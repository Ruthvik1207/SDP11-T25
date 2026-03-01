import React from 'react';
import '../css/Contact.css';

function Contact() {

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  return (
    <div className="container-fluid contactus-container">
      <div className="row2">

        <div className="col-lg-12 heading">
          <h1 className="headi">Contact us</h1>

          <div className="ce">
            <span><strong>Contact Number :</strong></span>
            <a className="red" href="tel:+919998887777">
              <strong>+91 9998887777</strong>
            </a>

            <span><strong>Email :</strong></span>
            <a className="red" href="mailto:contact@VoteForChange.in">
              <strong>Contact@VoteForChange.in</strong>
            </a>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="section2">

            <div className="eng">
              <h1>Enquiry for Service</h1>
              <p className="contact-subtext">
                Have an issue or question? Fill out the form below to get in touch.
              </p>
            </div>

            <form
              autoComplete="off"
              className="row5 contact_form"
              action="https://formsubmit.co/praneethvarma144@gmail.com"
              method="POST"
            >
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="person_name">Name *</label>
                <input
                  type="text"
                  name="name"
                  id="person_name"
                  required
                  placeholder="Your Name"
                  maxLength="50"
                />
              </div>

              <div className="col-lg-6 col-sm-12">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Your Email Address"
                  maxLength="50"
                />
              </div>

              <div className="col-lg-12 col-sm-12">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  placeholder="What is this about?"
                  maxLength="160"
                />
              </div>

              <div className="col-lg-12 col-sm-12">
                <label htmlFor="message_txt">Message *</label>
                <textarea
                  name="message"
                  id="message_txt"
                  rows="5"
                  maxLength="5000"
                  required
                  placeholder="Please describe your issue..."
                ></textarea>
              </div>

              <input type="hidden" name="_next" value={currentUrl} />
              <input type="hidden" name="_captcha" value="false" />

              <div className="col-lg-12 text-center">
                <button type="submit" className="btn btn-themered">
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="col-lg-6 sectio1">
          <div className="xhighlightdiv">
            <span><strong>Contact Number :</strong></span>
            <a className="red" href="tel:+919998887777">
              <strong>+91 9998887777</strong>
            </a>

            <span><strong>Email :</strong></span>
            <a className="red" href="mailto:contact@VoteForChange.in">
              <strong>Contact@VoteForChange.in</strong>
            </a>
          </div>
        </div>

        <div className="col-lg-6 sectio1">
          <div className="xhighlightdiv">
            <span><strong>Address :</strong></span>
            <p>
              VoteForChange KL-tech
              <br /> KL University, Vaddeswaram, Guntur
              <br /> Andhra Pradesh - 522303
            </p>
          </div>
        </div>

        {/* Support Section */}
        <div className="col-lg-12 support-section">
          <div className="support-content">
            <h2>Our Support & Services</h2>
            <div className="support-grid">
              <div className="support-card">
                <h3>💬 Expert Support Team</h3>
                <p>Our dedicated team of voting platform experts is available 24/7 to answer your questions and provide technical assistance. Whether you need help setting up your election or troubleshooting, we're here for you with quick and reliable support.</p>
              </div>

              <div className="support-card">
                <h3>🔒 Secure Communication</h3>
                <p>All your inquiries and communications are handled with military-grade encryption and highest security standards. Your data is never shared with third parties and all conversations are logged securely for compliance and audit purposes.</p>
              </div>

              <div className="support-card">
                <h3>⚡ Lightning-Fast Response</h3>
                <p>We pride ourselves on fast response times. Most inquiries are answered within 1 hour during business hours, and within 24 hours maximum. We understand that elections are time-sensitive and your issues need immediate attention.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;