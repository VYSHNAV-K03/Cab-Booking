import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signinUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import logvideo from "../assets/vecteezy_male-custom-service-worker-checking.mp4";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
   display: flex;
  /* align-items: center; */
  justify-content: flex-end;
  min-height: 100vh;
  position: relative;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  padding: 5px 800px; /* Adds space from window border */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay for readability */
    z-index: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const AuthFormSection = styled.div`
position: relative;
  z-index: 2;
  padding: 1em;
  width: 100%;
  max-width: 400px;
  color: white;
  border-radius: 10px; /* Slight rounding for a softer look */
  margin: 20px auto; /* Centers and moves it away from edges */

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 15px auto; /* Adjust margin for smaller screens */
  }
`;


const AuthForm = styled.div`
  max-width: 400px;
  width: 100%;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

const FormInput = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.875rem;
    color: #374151;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const PasswordInput = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 4px;

    &:hover {
      color: #6366f1;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #4f46e5;
  }

  &:disabled {
    background: #e0e7ff;
    cursor: not-allowed;
  }
`;

const AuthLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;

  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #fef2f2;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ion-icon {
    font-size: 1.2rem;
  }
`;

const SuccessMessage = styled(ErrorMessage)`
  color: #22c55e;
  background: #f0fdf4;
`;



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { msg, err } = useSelector((state) => state.authReducer);

  const isValid = email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    dispatch(signinUser({ email, password }));
  };

  useEffect(() => {
    if (msg) {
      setMessage({ type: "success", content: msg });
      
    } else if (err) {
      setMessage({ type: "error", content: err });
    }
  }, [msg, err]);

  return (
    <LoginContainer>
      <BackgroundVideo autoPlay loop muted>
        <source src={logvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <AuthFormSection>
        <AuthForm>
          <FormHeader>
            <h1 style={{ width: "300px"  }}>Welcome Back</h1>
            <p style={{ width: "300px"  }}>Sign in to continue your journey with us</p>
          </FormHeader>

          {message && (
            message.type === "error" ? (
              <ErrorMessage>
                <ion-icon name="alert-circle-outline"></ion-icon>
                {message.content}
              </ErrorMessage>
            ) : (
              <SuccessMessage>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                {message.content}
              </SuccessMessage>
            )
          )}

          <form style={{ width: "300px"  }} onSubmit={handleSubmit}>
            <FormInput>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormInput>

            <FormInput>
              <label>Password</label>
              <PasswordInput>
                <input
                
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  <ion-icon
                    name={showPass ? "eye-off-outline" : "eye-outline"}
                  ></ion-icon>
                </button>
              </PasswordInput>
            </FormInput>

            <SubmitButton type="submit" disabled={!isValid}>
              Sign In
            </SubmitButton>
          </form>

          <AuthLink style={{ width: "300px"  }}>
            Don't have an account?{" "}
            <Link to="/register">Create account</Link>
          </AuthLink>
          <AuthLink style={{ width: "300px"  }}>
            Login as driver{" "}
            <Link to="/logindrive">Login</Link>
          </AuthLink>

        </AuthForm>
      </AuthFormSection>

    
    </LoginContainer>
  );
}