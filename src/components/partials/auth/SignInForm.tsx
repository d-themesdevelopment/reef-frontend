import { useStore } from "@nanostores/react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import qs from "qs";
import { useState } from "react";
import LoadingTwo from "../../../components/features/LoadingTwo";

interface Props {
  apiUrl: string;
  apiToken: string;
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

const SignInForm = ({ apiUrl, apiToken }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<number>();

  const handleLogin = async (data: any) => {
    setLoading(true);

    const identifier = data.email;
    const password = data.password;

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
          setIdentifier(identifier);

          // Request Verification
          await fetch(`${apiUrl}/api/auth/request-verification`, {
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
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  const handleVerification = async () => {
    setLoading(true);

    try {
      await fetch(`${apiUrl}/api/auth/send-verification`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${apiToken}`,
        },
        body: JSON.stringify({
          identifier,
          verificationCode,
        }),
      });

      // Handle successful login, e.g., store token in local storage
      Cookies.set("reef_token", token);

      console.log("Login successful");

      toast.success("👌 Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      closeModal();

      setTimeout(() => {
        setLoading(false);
        location.href = "/profile";
      }, 1500);
    } catch (error) {
      console.error("Error occurred during verify:", error);
    }
  };

  return (
    <>
      {loading && <LoadingTwo />}

      <form
        action="#"
        onSubmit={handleSubmit(handleLogin)}
        className="grid-1-column gap-row-24px"
      >
        <div id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1d6-72fbc747">
          <label htmlFor="email">Email</label>

          <input
            {...register("email", { required: true })}
            className="input-2 icon-left email w-input"
            placeholder="Enter your email address"
            type="email"
          />

          {errors.email && <p className="error">Email is required.</p>}
        </div>

        <div id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1da-72fbc747">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            className="input-2 icon-left password w-input"
            placeholder="Enter your password"
            type="password"
          />

          {errors.password && <p className="error">Password is required.</p>}
        </div>

        <div
          id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1de-72fbc747"
          className="flex-horizontal-2 space-between align-center children-wrap"
        >
          <div className="mg-right-24px">
            <label className="w-checkbox checkbox-field-wrapper mg-bottom-0">
              <div className="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>

              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                data-name="Checkbox"
                style={{ display: "none" }}
              />
              <span className="text-408 color-neutral-600 w-form-label">
                Remember me
              </span>
            </label>
          </div>

          <a href="#" className="text-decoration-none">
            Forgot password?
          </a>
        </div>

        <div
          id="w-node-c4efb870-0447-4e1d-dd16-c798f678d1e6-72fbc747"
          className="btn-primary-3 btn-form-arrow"
        >
          <input
            type="submit"
            data-wait="Please wait..."
            className="btn-primary-3 btn-form-arrow-inside w-button"
            value="Sign in"
          />
          <div className="line-rounded-icon link-icon-right"></div>
        </div>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={"overlay"}
      >
        <div className="mb-0" style={{ textAlign: "center" }}>
          <label htmlFor="password">Verfication Code</label>
          <input
            value={verificationCode}
            className="input-2 w-input"
            placeholder="Enter your verfication code"
            onChange={(e: any) => {
              setVerificationCode(e.target.value);
            }}
            type="number"
          />

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleVerification();
            }}
            className="f-form-button next w-button inline-block mt-7"
            style={{ display: "inline-flex" }}
          >
            Verify
          </a>
        </div>
      </Modal>
    </>
  );
};

export default SignInForm;
