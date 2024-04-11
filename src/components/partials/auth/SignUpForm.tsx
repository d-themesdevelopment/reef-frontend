// import { addUser } from "../../../store/users";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingTwo from "../../../components/features/LoadingTwo";
import { useState } from "react";

interface Props {
  apiUrl: string;
  apiToken: string;
}

const SignUpForm = ({ apiUrl, apiToken }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (data: any) => {
    setLoading(true);

    const registerationEndpoint = `${apiUrl}/api/auth/local/register`;

    const username = data.name;
    const email = data.email;
    const password = data.password;

    const reqOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${apiToken}`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    };

    const req = await fetch(registerationEndpoint, reqOptions);
    const res = await req.json();

    if (res.error) {
      console.log(res.error.message, true);
      console.error("❗️Error with the Response" + res.error);

      setTimeout(() => {
        setLoading(false);
      }, 1500);

      toast.warn("Email or Username already exit!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }

    if (res.jwt && res.user) {
      console.log("Successfull registration");
      
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      toast.success("👌 Successfull registration!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        location.href = "/sign-in";
      }, 1500);
    }
  };

  return (
    <>
      {loading && <LoadingTwo />}

      <div
        id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce6d-4ea0ea99"
        className="inner-container _577px width-100 _100---tablet"
      >
        <div className="text-center-tablet">
          <div
            data-w-id="73fdc906-b228-81b6-e02b-e3d306b9ce6f"
            className="mg-bottom-48px-2"
          >
            <a
              href="index.html"
              className="header-logo-link-sign-up w-inline-block"
            >
              <img
                src="/images/reef_1reef.webp"
                alt=""
                sizes="(max-width: 479px) 63vw, (max-width: 767px) 33vw, (max-width: 1439px) 176px, 240px"
                srcSet="/images/reef_1-p-500.png 500w, images/reef_1-p-800.png 800w, images/reef_1-p-1080.png 1080w, images/reef_1reef.webp 1584w"
                className="header-logo-2"
              />
            </a>
          </div>

          <div
            data-w-id="73fdc906-b228-81b6-e02b-e3d306b9ce72"
            className="mg-bottom-42px"
          >
            <h1 className="display-6 mg-bottom-6px">Create your account</h1>
            <p className="mg-bottom-3">
              Please fill out the form below to create your account.
            </p>
          </div>
        </div>

        <div
          data-w-id="73fdc906-b228-81b6-e02b-e3d306b9ce79"
          className="card5 sign-up"
        >
          <div
            data-w-id="73fdc906-b228-81b6-e02b-e3d306b9ce7a"
            className="sign-up-form-block w-form"
          >
            <form
              action="#"
              className="sign-up-form"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce7c-4ea0ea99">
                <label htmlFor="name">Name</label>

                <input
                  {...register("name", { required: true })}
                  className="input-3 icon-left user w-input"
                  placeholder="Your name"
                  type="text"
                />

                {errors.name && <p className="error">Name is required.</p>}
              </div>

              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce80-4ea0ea99">
                <label htmlFor="email">Email</label>

                <input
                  {...register("email", { required: true })}
                  className="input-3 icon-left email w-input"
                  placeholder="Your email"
                  type="email"
                />

                {errors.email && <p className="error">Email is required.</p>}
              </div>

              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce84-4ea0ea99">
                <label htmlFor="password">Password</label>

                <input
                  {...register("password", { required: true })}
                  className="input-3 icon-left password w-input"
                  placeholder="Enter your password"
                  type="password"
                />

                {errors.password && (
                  <p className="error">Password is required.</p>
                )}
              </div>

              <label
                id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce88-4ea0ea99"
                className="w-checkbox checkbox-field-wrapper mg-bottom-0 checkbox-field-space-v1"
              >
                <div className="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>

                <input
                  {...register("termsAndPolicy", { required: true })}
                  type="checkbox"
                  style={{ display: "none" }}
                />

                <span className="text-409 color-neutral-600 w-form-label">
                  I have read and agree to the{" "}
                  <a href="#" className="text-decoration-none text-no-wrap">
                    Terms &amp; Conditions.
                  </a>
                </span>
              </label>

              {errors.termsAndPolicy && (
                <p className="error" style={{ marginTop: "-1.5rem" }}>
                  Terms and Condition is required.
                </p>
              )}

              <button
                type="submit"
                id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce8e-4ea0ea99"
                className="btn-primary-4 btn-form-arrow"
              >
                <input
                  type="text"
                  data-wait="Please wait..."
                  className="btn-primary-4 btn-form-arrow-inside w-button"
                  value="Create account"
                  style={{
                    border: "none !important",
                    outline: "none !important",
                  }}
                />

                <div className="line-rounded-icon link-icon-right"></div>
              </button>

              <div
                id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce92-4ea0ea99"
                className="mg-top-10px"
              >
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="text-decoration-none text-no-wrap"
                >
                  Sign in
                </a>
              </div>
            </form>

            <div
              className="success-message-2 w-form-done"
              role="region"
              aria-label="Email Form success"
            >
              <div>
                <div className="line-rounded-icon success-message-check large">
                  
                </div>

                <div>
                  Thanks for registering. <br />
                  You will be redirected in a second...
                </div>
              </div>
            </div>

            <div
              className="error-message-2 w-form-fail"
              role="region"
              aria-label="Email Form failure"
            >
              <div>Oops! Something went wrong.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
