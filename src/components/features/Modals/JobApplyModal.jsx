import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingTwo from "../LoadingTwo";

const JobApplyModal = ({
  singleJobPost,
  locale,
  jobModal,
  apiUrl,
  apiToken,
  open,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(jobModal, "jobModal?.fullName?.title");

  const handleJobApply = async (data) => {
    setLoading(true);

    const username = data.fullName;
    const email = data.email;
    const phone = data.phone;
    const coverLetter = data?.coverLetter;
    const portfolioLink = data?.portfolioLink;

    const reqOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${apiToken}`,
      },
      body: JSON.stringify({
        data: {
          jobRequestID: uuidv4(),
          jobTitle: singleJobPost?.title,
          fullName: {
            title: jobModal?.attributes?.fullName?.title,
            value: username,
          },
          email: {
            title: jobModal?.attributes?.email?.title,
            value: email,
          },
          phone: {
            title: jobModal?.attributes?.phoneNumber?.title,
            value: phone,
          },
          coverLetter: {
            title: jobModal?.attributes?.coverLetter?.title,
            value: coverLetter,
          },
          portfolioLink: {
            title: jobModal?.attributes?.portfolioLink?.title,
            value: portfolioLink,
          },
        },
      }),
    };

    const req = await fetch(`${apiUrl}/api/job-order-request-ids`, reqOptions);
    const res = await req.json();

    if (res.error) {
      console.log(res.error.message, true);
      console.error("❗️Error with the Response" + res.error);

      setTimeout(() => {
        setLoading(false);
      }, 1500);

      toast.warn("Failed Job Apply!", {
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
    } else {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1500);

      toast.success("👌 Successfull applied!", {
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

    // console.log(res, "resres");
  };

  return (
    <>
      {loading && <LoadingTwo />}

      {open && (
        <div
          className="overlay !fixed left-0 right-0 top-0 bottom-0 bg-black/20 z-[100]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {open && (
        <div className="Modal bg-white fixed max-w-[680px] p-10 left-1/2 right-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl">
          <h2 className="text-3xl">{jobModal?.attributes?.title}</h2>

          <div className="h-[2px] bg-primary mb-1"></div>
          <p>{jobModal?.attributes?.desc}</p>

          <form action="#" onSubmit={handleSubmit(handleJobApply)}>
            <div className="grid grid-flex-row grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <div className="form-wrap">
                  <label htmlFor="fullName">
                    {jobModal?.attributes?.fullName?.title}
                  </label>

                  <input
                    {...register("fullName", { required: true })}
                    className="border w-full rounded-lg h-[45px] px-3 pb-2"
                    placeholder={jobModal?.attributes?.fullName?.value}
                    type="text"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="form-wrap">
                  <label htmlFor="email">
                    {jobModal?.attributes?.email?.title}
                  </label>

                  <input
                    {...register("email", { required: true })}
                    className="border w-full rounded-lg h-[45px] px-3 pb-2"
                    placeholder={jobModal?.attributes?.email?.value}
                    type="email"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="form-wrap">
                  <label htmlFor="phone">
                    {jobModal?.attributes?.phoneNumber?.title}
                  </label>

                  <input
                    {...register("phone", { required: true })}
                    className="border w-full rounded-lg h-[45px] px-3 pb-2"
                    placeholder={jobModal?.attributes?.phoneNumber?.value}
                    type="text"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="form-wrap">
                  <label htmlFor="portfolioLink">
                    {jobModal?.attributes?.portfolioLink?.title}
                  </label>

                  <input
                    {...register("portfolioLink", { required: true })}
                    className="border w-full rounded-lg h-[45px] px-3 pb-2"
                    placeholder={jobModal?.attributes?.portfolioLink?.value}
                    type="text"
                  />
                </div>
              </div>

              <div className="col-span-12">
                <div className="form-wrap">
                  <label htmlFor="coverLetter">
                    {jobModal?.attributes?.coverLetter?.title}
                  </label>

                  <textarea
                    {...register("coverLetter", { required: true })}
                    className="border w-full rounded-lg px-3 pb-2"
                    placeholder={jobModal?.attributes?.coverLetter?.value}
                    type="email"
                  />
                </div>
              </div>

              <div className="col-span-12">
                <div className="h-[2px] bg-primary mb-1"></div>
              </div>

              <div className="col-span-12">
                <button
                  type="submit"
                  className="button-3 in-form w-button ml-0"
                >
                  {locale === "ar" ? "يُقدِّم" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default JobApplyModal;
