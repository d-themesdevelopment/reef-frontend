import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingTwo from "../../../components/features/LoadingTwo";

const ForgetPasswordContent = ({
  token,
  resetPasswordToken,
  apiUrl,
  apiToken
}: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    () => {
      console.log(resetPasswordToken, token, "tokentokentoken");

      if (token !== resetPasswordToken) {
        toast.warn("Invalid User", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });

        location.href = "/";
      }
    },
    [resetPasswordToken, token]
  );

  const handleResetPassword = async (values: any) => {
    setLoading(true);

    const data = {password: values.newPassword};
    const userID = localStorage.getItem("userID");

    try {
      const res = await fetch(`${apiUrl}/api/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if(res.ok) {
        toast.success("Reset the passwored successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });

        setTimeout(() => {
          location.href = "/sign-in"
          setLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <>
    {loading && <LoadingTwo />}
    <div className="max-w-[500px] w-full p-10 border rounded-2xl shadow">
      <h2 className="font-bold text-center text-4xl mb-4 pb-2">
        Forget Password
      </h2>

      <form action="#" onSubmit={handleSubmit(handleResetPassword)}>
        <div className="mb-10">
          <input
            {...register("newPassword", { required: true })}
            className="w-full h-[55px] border rounded-lg px-3"
            placeholder={"New Password"}
            style={{ height: "55px" }}
            type="password"
          />

          {errors.newPassword &&
            <p className="error text-red">Pleaes endter your new password.</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white px-5 py-4 rounded-lg"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ForgetPasswordContent;
