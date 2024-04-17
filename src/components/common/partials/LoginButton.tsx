import { useState } from "react";
import LoadingTwo from "../../../components/features/LoadingTwo";
import { user } from "../../../store/users";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Props {
  isLoggedIn: any;
  logoText: string;
  locale: any;
}

const LoginButton = ({locale, isLoggedIn, logoText }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = (e: any) => {
    e.preventDefault();
    setLoading(true)

    Cookies.remove("reef_token");
    user.set("");

    toast.error("🤔 Logout!", {
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
      setLoading(false)
      location.href = "/sign-in";
    }, 1500);
  };

  return (
    <>
     {loading && <LoadingTwo />}

      {isLoggedIn ? (
        <a
          data-w-id="5e544860-deda-5a4b-3d11-d9257b565e65"
          href="/profile"
          // className="btn-primary small header-btn-hidde-on-tablet w-button"
          className="btn-profile ml-4"
        >
          {/* Logout
          <span className="line-rounded-icon link-icon-right"></span> */}
          <img
            src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65e19ade79342d008f74804b_white-profile-empty%20(1).svg"
            alt=""
            width={50}
            height={50}
            data-ms-member="profile-image"
            className="ms-profile-image-preview"
          />

          <ul>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLogout(e)}>
                Sign Out
              </a>
            </li>
          </ul>
        </a>
      ) : (
        <a
          data-w-id="5e544860-deda-5a4b-3d11-d9257b565e65"
          href="/sign-in"
          className="btn-primary small header-btn-hidde-on-tablet w-button"
        >
          {logoText}
          <span className={`line-rounded-icon link-icon-right ${locale === "ar" ? "mr-2 rotate-180" : ""}`}></span>
        </a>
      )}
    </>
  );
};

export default LoginButton;
