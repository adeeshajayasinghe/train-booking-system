import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context'
import { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const { email, OTP} = useContext(AppContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const resendOTP = async () => {
    if (disable) return;
    try{
      await axios.post('https://stage-pilot-train-booking-system.onrender.com/login/sendOTP', {
        OTP,
        recipient_email: email,
      });
      setDisable(true);
      alert("A new OTP has succesfully been sent to your email.");
      setTimer(60);
    } catch(error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, [disable]);

  useEffect(() => {
    // Check if OTP is verified, and if so, navigate to the resetpassword page
    if (isOTPVerified) {
      navigate('/resetpassword');
    }
  }, [isOTPVerified, navigate]);

  const verfiyOTP = () => {
    if (OTPinput.join("") === OTP) {
        setIsOTPVerified(true);
    }else{
        alert("The code you have entered is not correct, try again or re-send the link");
        return;
    }
  }

  return (
    <section className="hero">
      <div className="hero-center">
        <article className="hero-info">
          <div className="review-search">
              <h2>Email Verification</h2>
              <p>We have sent a code to your email {email}</p>

          <div>
            <form>
                  <div className="otp-boxes">
                    <input
                      maxLength="1"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                    <input
                      maxLength="1"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                    <input
                      maxLength="1"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                    <input
                      maxLength="1"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>

                <div>
                  <div className='verify'>
                    <Link onClick={() => verfiyOTP()}>
                      <button className='btn'>
                        Verify Account
                      </button>
                    </Link>
                  </div>

                  <div>
                    <p className="code">Didn't recieve code?</p>{" "}
                    <Link onClick={() => resendOTP()}>
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </Link>
                  </div>
                </div>
            </form>
          </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ForgotPassword;
