import "./ContactUs.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "evergreen-ui";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    reset();
  };

  return (
    <div className="contact-form-container">
      <div className="contact-messages">
        <h1 className="title-message">We'd Love to Hear From You</h1>
        <h4 className="subtitle">
          Whether you're curious about features, security, or even press --
          we're ready to answer any and all questions.
        </h4>
      </div>
      <div className="contactForm">
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="first-row">
            <div className="name-wrapper">
              <input
                type="text"
                name="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please use 30 characters or less",
                  },
                })}
                className="name-container"
                placeholder="Name"
              ></input>
              {errors.name && (
                <span className="errorMessage">{errors.name.message}</span>
              )}
            </div>
            <div className="email-wrapper">
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                className="email-container"
                placeholder="Email address"
              ></input>
              {errors.email && (
                <span className="errorMessage">
                  Please enter a valid email address
                </span>
              )}
            </div>
          </div>
          <div className="subject">
            <input
              type="text"
              name="subject"
              {...register("subject", {
                required: {
                  value: true,
                  message: "Please enter a subject",
                },
                maxLength: {
                  value: 75,
                  message: "Subject cannot exceed 75 characters",
                },
              })}
              className="subject-container"
              placeholder="Subject"
            ></input>
            {errors.subject && (
              <span className="errorMessage">{errors.subject.message}</span>
            )}
          </div>
          <div className="message-container">
            <input
              name="message"
              {...register("message", {
                required: true,
              })}
              className="msg-container"
              placeholder="Message"
            ></input>
            {errors.message && (
              <span className="errorMessage">Please enter a message</span>
            )}
          </div>

          <Button className="submit-btn" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
