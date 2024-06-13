import { useStore } from "@nanostores/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import LoadingTwo from "../../../components/features/LoadingTwo";

interface Props {
  locale: any;
  apiUrl: string;
  apiToken: string;
  data: any;
}

Modal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 50px",
    borderRadius: "20px",
  },
};

const customStylesTwo = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 50px",
    borderRadius: "20px",
    maxWidth: "500px",
    width: "100%"
  },
};


const SignInForm = ({ locale, apiUrl, apiToken, data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verifiedCode, setVerifiedCode] = useState<any>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const input1Ref = useRef<any>(null);
  const input2Ref = useRef<any>(null);
  const input3Ref = useRef<any>(null);
  const input4Ref = useRef<any>(null);

  const handleKeyUp = (index: number, e:any) => {
    if (e.key) {
      switch (index) {
        case 0:
          input2Ref?.current.focus();
          break;
        case 1:
          input3Ref?.current.focus();
          break;
        case 2:
          input4Ref?.current.focus();
          break;
        default:
          break;
      }
    }
  };
  const handleLogin = async (data: any) => {
    setLoading(true);

    const identifier = data.email;
    const password = data.password;

    setIdentifier(identifier);

    const urlParamsObject = {
      populate: {
        avatar: {
          populate: "*",
        },
        background: {
          populate: "*",
        },
        brand: {
          populate: "*",
        },
        services: {
          populate: "*",
        },
      },
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${apiUrl}/api/auth/local?${queryString}`;

    try {
      const response = await fetch(`${requestUrl}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${apiToken}`,
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.jwt) {
          setToken(data.jwt);

          // Request Verification
          const res = await fetch(`${apiUrl}/api/auth/request-verification`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${apiToken}`,
            },
            body: JSON.stringify({
              identifier,
            }),
          });

          const resData = await res.json();

          setVerifiedCode(resData?.verifiedCode);
          setLoading(false);
          setIsOpen(true);
        }
      } else {
        // Handle login error
        console.error("Login failed");

        toast.error("😢 Login failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const requestUrl = `${apiUrl}/api/users?populate=*`;

    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (modalIsOpen) {
      setTimeout(() => {
        setIsOpen(false);
        setVerifiedCode(0);
        setLoading(false);
        setVerificationCode("");

        toast.warn("Session timeout!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }, 120000);
    }
  }, [modalIsOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  const handleVerification = async () => {
    setLoading(true);

    if (verificationCode === verifiedCode) {
      Cookies.set("reef_token", token, { expires: 30 });
      closeModal();

      console.log("Login successful");

      toast.success("👌 Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        setLoading(false);
        location.href = "/profile";
      }, 1500);
    } else {
      toast.error("Verification Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        setLoading(false);
        setVerificationCode("");
        setIsOpen(false);
      }, 1500);
    }
  };

  const handleForgetPassword = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setForgotPassword(false);
    const email = e.target.email.value;

    if(users?.find((user:any) => user?.email === email )) {
      const user:any = users?.find((user:any) => user?.email === email );
      localStorage.setItem("userID", user?.id);
    } else {
      toast.error("Not registered user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        setLoading(false);
      }, 1500);

      return;
    }

    try {
      const identifier = email;

      const req = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${apiToken}`,
        },
        body: JSON.stringify({
          identifier,
        }),
      });

      if(req?.ok) {
        const res = await req.json();
        Cookies.set("resetPasswordToken", res?.resetPasswordToken, {expires: 10/1440})

        toast.success("Sent the request to the email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
        console.error(error);
    } 
  }

  return (
    <>
      {loading && <LoadingTwo />}

      <form
        action="#"
        onSubmit={handleSubmit(handleLogin)}
        className="grid-1-column gap-row-24px"
      >
        <div id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1d6-72fbc747">
          <label htmlFor="email">{data?.emailTitle}</label>

          <input
            {...register("email", { required: true })}
            className="input-2 icon-left email w-input"
            placeholder={data?.emailPlaceholder}
            type="email"
          />

          {errors.email && (
            <p className="error">
              {data?.emailTitle} {data?.required}
            </p>
          )}
        </div>

        <div id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1da-72fbc747">
          <label htmlFor="password">{data?.passwordTitle}</label>
          <input
            {...register("password", { required: true })}
            className="input-2 icon-left password w-input"
            placeholder={data?.passwordPlaceholder}
            type="password"
          />

          {errors.password && (
            <p className="error">
              {data?.passwordTitle} {data?.required}.
            </p>
          )}
        </div>

        <div
          id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1de-72fbc747"
          className="flex-horizontal-2 space-between align-center children-wrap"
        >
          <div className="">
            <label className="w-checkbox checkbox-field-wrapper mg-bottom-0">
              <div className="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2 ml-en-space"></div>

              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                data-name="Checkbox"
                style={{ display: "none" }}
              />
              <span className="text-408 color-neutral-600 w-form-label ml-2">
                {data?.rememberMeTitle}
              </span>
            </label>
          </div>

          <a href="#" className="text-decoration-none" onClick={(e) => {e.preventDefault(); setForgotPassword(true)}}>
            {data?.forgetPasswordTitle}
          </a>
        </div>

        <div
          id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1e6-72fbc747"
          className="btn-primary-3 btn-form-arrow"
        >
          <div className="line-rounded-icon link-icon-right"></div>

          <input
            type="submit"
            data-wait="Please wait..."
            className="btn-primary-3 btn-form-arrow-inside w-button"
            value={data?.siginInTitle}
          />
        </div>
      </form>

      <Modal
        isOpen={forgotPassword}
        onRequestClose={() => setForgotPassword(false)}
        style={customStylesTwo}
        contentLabel="Example Modal"
        overlayClassName={"overlay"}
      >
        <div className="mb-0" style={{ textAlign: "center" }}>
          <h4 className="text-3xl font-bold mb-4">
            {
              locale === "ar" ? "هل نسيت كلمة السر" : "Forgot Password"
            }
          </h4>

          <form action="#" onSubmit={handleForgetPassword}>
            <input
              name="email"
              className="input-2 w-input w-full"
              type="email"
              placeholder={`${locale === "ar" ? "رجاءا أدخل بريدك الإلكتروني" : "Please enter your email"}`}
              required
            />

            <button
              type="submit"
              className="f-form-button next w-button inline-block mt-7"
              style={{ display: "inline-flex" }}
            >
              
              {
                locale === "ar" ? "إرسال إعادة تعيين البريد الإلكتروني":"Send Reset Email"
              }
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={"overlay"}
      >
        <div className="mb-0" style={{ textAlign: "center" }}>
          <label>{data?.verificationCodeTitle}</label>

          <div className="verification-form">
            <input
              className="input-2 w-input"
              onChange={(e: any) => {
                setVerificationCode(verificationCode.concat(e.target.value));
              }}
              maxLength={1}
              ref={input1Ref}
              onKeyUp={(e) => handleKeyUp(0, e)}
              type="text"
            />

            <input
              className="input-2 w-input"
              onChange={(e: any) => {
                setVerificationCode(verificationCode.concat(e.target.value));
              }}
              maxLength={1}
              ref={input2Ref}
              onKeyUp={(e) => handleKeyUp(1, e)}
              type="text"
            />

            <input
              className="input-2 w-input"
              onChange={(e: any) => {
                setVerificationCode(verificationCode.concat(e.target.value));
              }}
              maxLength={1}
              ref={input3Ref}
              onKeyUp={(e) => handleKeyUp(2, e)}
              type="text"
            />

            <input
              className="input-2 w-input"
              onChange={(e: any) => {
                setVerificationCode(verificationCode.concat(e.target.value));
              }}
              maxLength={1}
              ref={input4Ref}
              onKeyUp={(e) => handleKeyUp(3, e)}
              type="text"
            />
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleVerification();
            }}
            className="f-form-button next w-button inline-block mt-7"
            style={{ display: "inline-flex" }}
          >
            {data?.verifyTitle}
          </a>
        </div>
      </Modal>
    </>
  );
};

export default SignInForm;
