// ReCaptcha.js
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptcha = ({ onChange }) => {
  const recaptchaRef = React.createRef();

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey=""
        onChange={onChange}
      />
    </div>
  );
};

export default ReCaptcha;
