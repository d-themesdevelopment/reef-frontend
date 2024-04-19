// import { addUser } from "../../../store/users";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingTwo from "../../../components/features/LoadingTwo";
import { useState } from "react";

interface Props {
  apiUrl: string;
  apiToken: string;
  data: any;
}

const SignUpForm = ({ apiUrl, apiToken, data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (data: any) => {
    if (data?.password !== data?.confirm) {
      toast.warn("The Passowrd not matched!", {
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
            <a href="/" className="header-logo-link-sign-up w-inline-block"></a>
          </div>

          <div
            data-w-id="73fdc906-b228-81b6-e02b-e3d306b9ce72"
            className="mg-bottom-42px"
          >
            <h1 className="display-6 mg-bottom-6px">
              {data?.signUpAccountTitle}
            </h1>
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
                <label htmlFor="name">{data?.nameTitle}</label>

                <input
                  {...register("name", { required: true })}
                  className="input-3 icon-left user w-input"
                  placeholder={data?.usernamePlaceholder}
                  type="text"
                />

                {errors.name && (
                  <p className="error">
                    {data?.nameTitle} {data?.required}
                  </p>
                )}
              </div>

              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce80-4ea0ea99">
                <label htmlFor="email">{data?.emailTitle}</label>

                <input
                  {...register("email", { required: true })}
                  className="input-3 icon-left email w-input"
                  placeholder={data?.emailPlaceholder}
                  type="email"
                />

                {errors.email && (
                  <p className="error">
                    {data?.emailTitle} {data?.required}
                  </p>
                )}
              </div>

              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce84-4ea0ea99">
                <label htmlFor="password">{data?.passwordTitle}</label>

                <input
                  {...register("password", { required: true })}
                  className="input-3 icon-left password w-input"
                  placeholder={data?.passwordPlaceholder}
                  type="password"
                />

                {errors.password && (
                  <p className="error">
                    {data?.passwordTitle} {data?.required}
                  </p>
                )}
              </div>

              <div id="w-node-_73fdc906-b228-81b6-e02b-e3d306b9ce84-4ea0ea99">
                <label htmlFor="password">{data?.confirmPasswordTitle}</label>

                <input
                  {...register("confirm", { required: true })}
                  className="input-3 icon-left password w-input"
                  placeholder={data?.confirmPasswordPlaceholder}
                  type="password"
                />
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
                  {data?.agreementText}
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
                <div className="line-rounded-icon link-icon-right"></div>

                <input
                  type="text"
                  data-wait="Please wait..."
                  className="btn-primary-4 btn-form-arrow-inside w-button"
                  value={data?.createAccountTitle}
                  style={{
                    border: "none !important",
                    outline: "none !important",
                  }}
                />
              </button>
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

        <div
          data-w-id="73fdc906-b228-81b6-e02b-e3d306b9cea1"
          className="card-options-divider-wrapper"
        >
          <div className="divider-2 _0px card-options-divider"></div>
          <div className="card-options-divider-text">{data?.hasAccountTitle}</div>
          <div className="divider-2 _0px card-options-divider"></div>
        </div>

        <div
          data-w-id="73fdc906-b228-81b6-e02b-e3d306b9cea6"
          className="buttons-row-2 sign-in-buttons"
        >
          <a
            href="/sign-in"
            className="btn-secondary-2 width-100 sign-in-button w-inline-block"
          >
            <div className="text-block-17">
              <strong className="bold-text-12">{data?.logInNowText}</strong>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
