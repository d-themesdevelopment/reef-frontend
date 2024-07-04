import { useRef, useState } from "react";
import pkg from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import LoadingTwo from "../../../components/features/LoadingTwo";
import qs from "qs";

const { CopyToClipboard } = pkg;

const ProfilePageContent = ({
  user,
  profilePageData,
  locale,
  apiUrl,
  apiToken,
}: any) => {
  const downloadRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  console.log(user, "useruser");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleImageUpload = async (elementRef: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("files", elementRef?.current.files[0]);

    const res = await fetch(`${apiUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const uploadedImage = await res.json();

    try {
      const data: any = { avatar: uploadedImage };

      const res = await fetch(`${apiUrl}/api/users/${user?.id}`, {
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

      if (res.ok) {
        toast.success("👌 Successfully Updated!", {
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
      }
    } catch (error) {
      console.log(error);

      toast.error("Server Error!", {
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
    }
  };

  const avatarRef = useRef<any>(null);

  const handleUploadImage = () => {
    if (avatarRef.current.files && avatarRef.current.files[0]) {
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          let src: any = reader.result;
          setAvatarUrl(src);
          handleImageUpload(avatarRef);
        },
        false
      );

      reader.readAsDataURL(avatarRef.current.files[0]);
    }
  };

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/users/${user?.id}`, {
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

      if (res.ok) {
        toast.success("👌 Successfully Updated!", {
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
      }
    } catch (error) {
      console.error(error);

      toast.error("👌 Failed Update", {
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
    }
  };

  const handleUpdatePersonalInfo = (event: any) => {
    event.preventDefault();

    handleUpdateProfile({
      username: `${event?.target?.firstName?.value} ${event?.target?.lastName?.value}`,
      mobileNumber: event?.target?.mobileNumber?.value,
      address: event?.target?.address?.value,
    });
  };

  const handleUpdateEmail = (event: any) => {
    event.preventDefault();

    handleUpdateProfile({
      email: event?.target?.email?.value,
    });
  };

  const [currentPassword, setCurrentNewPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleUpdatePassword = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    event.preventDefault();

    const identifier = user?.email;
    const password = event?.target?.currentPassword?.value;

    const urlParamsObject = {
      populate: "*",
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
          await handleUpdateProfile({
            password: event?.target?.newPassword?.value,
          });

          toast.success("👌 Updated your password successfully", {
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
            setLoading(false);
            setConfirmation(false);
          }, 1500);
        }
      } else {
        toast.error("Current password not correct!", {
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
          setConfirmation(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);

      toast.error("Server Error!", {
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

    // setConfirmation(true);
    // setNewPassword(event?.target?.newPassword?.value);
    // setCurrentNewPassword(event?.target?.currentPassword?.value);
  };

  const identifyUser = async (event: any) => {
  
  };

  return (
    <>
      {loading && <LoadingTwo />}

      <div>
        <div className="profile_form-header">
          <div className="text-block-5">{profilePageData?.pageTitle}</div>
        </div>

        {user?.serviceOrderRequestIDs &&
          user?.serviceOrderRequestIDs.length > 0 && (
            <div className="container-default-55 w-container">
              <div className="profile_section-head">
                {profilePageData?.ordertitle}
              </div>
              <div className="inner-container _600px---tablet center">
                <div className="inner-container _500px---mbl center">
                  <div
                    data-w-id="f9301249-6962-7da1-5c6f-65715877eafa"
                    data-current=""
                    data-easing="ease"
                    data-duration-in="300"
                    data-duration-out="100"
                    className="tabs-menu-left-wrapper w-tabs"
                  >
                    <div
                      className="tabs-menu-left newt2 w-tab-menu"
                      role="tablist"
                    >
                      {user?.serviceOrderRequestIDs
                        ?.sort((a: any, b: any) => b.id - a.id)
                        .map((service: any, index: number) => (
                          <div
                            data-w-tab={`Tab ${index + 1}`}
                            className="tab-menu-left-link first w-inline-block w-tab-link"
                            key={index}
                          >
                            <div className="tab-menu-left-link-icon">
                              <div className="inner-container _48px"></div>
                            </div>
                            <div className="tab-menu-left-link-content">
                              <div className="tab-menu-left-link-content-top">
                                <div
                                  className={
                                    locale === "ar" ? "text-right" : ""
                                  }
                                >
                                  <h3
                                    className="heading-h4-size-3 mg-bottom-0"
                                    title={`Service ID: ${service?.serviceID.slice(-10)}`}
                                  >
                                    <strong className="bold-text-5">
                                      {service?.serviceName}
                                    </strong>{" "}
                                  </h3>

                                  <h3
                                    style={{ fontSize: "16px", color: "#999" }}
                                  >
                                    #{service?.serviceID.slice(-10)}
                                    <CopyToClipboard text={service?.serviceID.slice(-10)}>
                                      <button>
                                        <img
                                          src="./images/icons/copy-icon.svg"
                                          width={24}
                                          height={24}
                                          alt="ICON"
                                          style={{
                                            marginLeft: 4,
                                            marginRight: 4,
                                            marginBottom: 2,
                                          }}
                                        />
                                      </button>
                                    </CopyToClipboard>
                                  </h3>
                                </div>
                                <div className="line-rounded-icon tab-menu-left-link-arrow">
                                  
                                </div>
                              </div>
                              <div className="tab-menu-link-content">
                                <div className="profile_section">
                                  <div className="profile_section-head">
                                    {locale === "ar"
                                      ? "  تفاصيل الطلب"
                                      : "Order details"}
                                  </div>
                                  <div className="job_labels-wrap">
                                    <div className="job_label-card">
                                      <div className="job_label-flex">
                                        <p className="paragraph-4">
                                          <strong className="bold-text-7">
                                            {locale === "ar"
                                              ? " اسم الخدمة "
                                              : "Service name"}
                                          </strong>
                                        </p>
                                      </div>
                                      <div className="spacer-10"></div>
                                      <p
                                        className={`h6 ${
                                          locale === "ar" ? "text-right" : ""
                                        }`}
                                      >
                                        {service?.serviceName}
                                      </p>
                                    </div>
                                    <div className="job_label-card">
                                      <div className="job_label-flex">
                                        <p className="paragraph-4">
                                          <strong className="bold-text-6">
                                            {locale === "ar"
                                              ? "تاريخ التقديم"
                                              : "Submission date"}
                                          </strong>
                                        </p>
                                      </div>
                                      <div className="spacer-10"></div>
                                      <p
                                        className={`h6 ${
                                          locale === "ar" ? "text-right" : ""
                                        }`}
                                      >
                                        {service?.createdAt.slice(0, 10)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="box-padding">
                                    <div className="job_label-card">
                                      <div className="job_label-flex">
                                        <p className="paragraph-4">
                                          <strong className="bold-text-8">
                                            {locale === "ar"
                                              ? "حالة الطلب "
                                              : "Order status"}
                                          </strong>
                                        </p>
                                      </div>
                                      <div className="spacer-10 newspacer-10"></div>
                                    </div>
                                    <div className="progress-wrapper">
                                      <div className="progress-text-row">
                                        <div className="progress-text-column">
                                          <div className="progress-icon">
                                            <div>1</div>
                                          </div>
                                          <div className="text-block-8">
                                            {locale === "ar"
                                              ? " قيد الانتظار"
                                              : "Pending"}
                                          </div>
                                        </div>
                                        <div className="progress-text-column">
                                          <div className="progress-icon">
                                            <div>2</div>
                                          </div>
                                          <div className="text-block-6">
                                            {locale === "ar"
                                              ? "قيد التنفيذ"
                                              : "Underway"}
                                          </div>
                                        </div>
                                        <div className="progress-text-column">
                                          <div className="progress-icon">
                                            <div>3</div>
                                          </div>
                                          <div className="text-block-7">
                                            {locale === "ar"
                                              ? "تم الانتهاء"
                                              : "Completed"}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="progress-bar-wrap">
                                        {locale === "ar" ? (
                                          <>
                                            <div
                                              className="progress-bar"
                                              style={{
                                                width: `${
                                                  service?.confirmation ||
                                                  service?.rejected
                                                    ? "100%"
                                                    : "50%"
                                                }`,
                                                backgroundImage: `linear-gradient(274deg, var(--reef2), ${
                                                  service?.rejected
                                                    ? "red"
                                                    : "var(--reefgreen)"
                                                })`,
                                              }}
                                            ></div>
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              className="progress-bar"
                                              style={{
                                                width: `${
                                                  service?.confirmation ||
                                                  service?.rejected
                                                    ? "100%"
                                                    : "50%"
                                                }`,
                                                backgroundImage: `linear-gradient(274deg, ${
                                                  service?.rejected
                                                    ? "red"
                                                    : "var(--reefgreen)"
                                                }, var(--reef2))`,
                                              }}
                                            ></div>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    {service?.rejected ? (
                                      <div className="agreement">
                                        <h3
                                          className="title"
                                          style={{ fontSize: 28 }}
                                        >
                                          {locale === "ar"
                                            ? "لقد رفضنا طلب الخدمة الخاص بك"
                                            : "We have rejected your service request"}
                                        </h3>
                                        <p>{service?.message}</p>
                                        {/* <a
                                      href={`${service?.attachedFile?.url}`}
                                      onClick={() => {
                                        downloadRef.current.click();
                                      }}
                                      target="_blank"
                                      style={{
                                        color: "black",
                                        display: "flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                      }}
                                    >
                                      <span>
                                        {service?.attachedFile?.name}
                                      </span>

                                      <img
                                        src="/images/icons/download-icon.png"
                                        width={24}
                                        height={24}
                                        alt="Upload Icon"
                                        style={{
                                          marginTop: 3,
                                          marginLeft: 7,
                                          marginRight: 7,
                                        }}
                                      />
                                    </a> */}
                                      </div>
                                    ) : (
                                      <div className="agreement">
                                        <h3
                                          className="title"
                                          style={{ fontSize: 28 }}
                                        >
                                          {locale === "ar"
                                            ? "لقد قبلنا طلب الخدمة الخاص بك"
                                            : "We have accepted your service request"}
                                        </h3>
                                        <p>{service?.message}</p>
                                        <a
                                          href={`${service?.attachedFile?.url}`}
                                          onClick={() => {
                                            downloadRef.current.click();
                                          }}
                                          target="_blank"
                                          style={{
                                            color: "black",
                                            display: "flex",
                                            alignItems: "center",
                                            textDecoration: "none",
                                          }}
                                        >
                                          <span>
                                            {service?.attachedFile?.name}
                                          </span>

                                          <img
                                            src="/images/icons/download-icon.png"
                                            width={24}
                                            height={24}
                                            alt="Upload Icon"
                                            style={{
                                              marginTop: 3,
                                              marginLeft: 7,
                                              marginRight: 7,
                                            }}
                                          />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        <a
          ref={downloadRef}
          href="https://res.cloudinary.com/dzmc6x1bk/image/upload/v1714915402/Desktop_1_9e77272304.pdf"
          target="_blank"
          style={{ display: "none" }}
        >
          <span>Desktop - 1.pdf</span>
          <img
            src="/images/icons/download-icon.png"
            width="24"
            height="24"
            alt="Upload Icon"
          />
        </a>

        <div className="profile_section">
          <div className="profile_section-head">
            {profilePageData?.profilePictureTitle}
          </div>
          <div className="profile_flex">
            <div className="profile_column !w-full">
              <div className="ms-profile-image-row flex flex-col lg:flex-row">
                <img
                  className="mb-4 w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 object-cover rounded-full"
                  src={`${
                    avatarUrl
                      ? avatarUrl
                      : user?.avatar
                      ? user?.avatar?.url
                      : "https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65e19ade79342d008f74804b_white-profile-empty%20(1).svg"
                  }`}
                  alt="Jese picture"
                />

                <label className="cursor-pointer ms-profile-upload w-inline-block whitespace-nowrap">
                  <img
                    className="mt-2"
                    src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65e19ade79342d008f74804a_file_upload_black_24dp%20(1).svg"
                    loading="lazy"
                    width="16"
                    alt=""
                  />

                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleUploadImage}
                    ref={avatarRef}
                  />

                  <div>{profilePageData?.editProfilePicture}</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="profile_section">
          <div className="profile_section-head">
            {profilePageData?.profileInformation}
          </div>
          <div className="profile_flex">
            <div className="w-form">
              <form
                action="#"
                id="email-form"
                name="email-form"
                className="profile_flex"
                onSubmit={handleUpdatePersonalInfo}
              >
                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.firstName?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="firstName"
                    placeholder={profilePageData?.firstName?.value}
                    defaultValue={user?.username?.split(" ")[0]}
                    type="text"
                  />
                </div>

                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.lastName?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="lastName"
                    placeholder={profilePageData?.lastName?.value}
                    defaultValue={user?.username?.split(" ")[1]}
                    type="text"
                  />
                </div>
                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.phoneNumber?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="mobileNumber"
                    placeholder={profilePageData?.phoneNumber?.value}
                    type="text"
                    defaultValue={user?.mobileNumber}
                  />
                </div>
                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.title?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="address"
                    placeholder={profilePageData?.title?.value}
                    defaultValue={user?.address}
                    type="text"
                  />
                </div>
                <a
                  data-w-id="314d141b-6d00-a113-c285-2e7aa44a3362"
                  href="#"
                  className="edit-profile w-inline-block"
                >
                  <div>{profilePageData?.editInfoTitle}</div>
                </a>
                <input
                  type="submit"
                  data-wait="Please wait..."
                  data-w-id="314d141b-6d00-a113-c285-2e7aa44a3365"
                  className="save-button w-button"
                  value="Save changes"
                />
                <div className="block-inputs"></div>
              </form>

              <div
                className="w-form-done"
                role="region"
                aria-label="Email Form success"
              >
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div
                className="w-form-fail"
                role="region"
                aria-label="Email Form failure"
              >
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile_section">
          <div className="profile_section-head">
            {profilePageData?.emailAddress}
          </div>
          <div className="profile_flex">
            <div className="w-form">
              <form
                action="#"
                id="email-form"
                name="email-form"
                className="profile_flex"
                onSubmit={handleUpdateEmail}
              >
                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.email?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="email"
                    placeholder={profilePageData?.email?.value}
                    type="email"
                    defaultValue={user?.email}
                  />
                </div>
                <div className="profile_column"></div>
                <a
                  data-w-id="314d141b-6d00-a113-c285-2e7aa44a3378"
                  href="#"
                  className="edit-profile w-inline-block"
                >
                  <div>{profilePageData?.editEmailTitle}</div>
                </a>
                <input
                  type="submit"
                  data-wait="Please wait..."
                  className="save-button w-button"
                  value="Save changes"
                />
                <div className="block-inputs"></div>
              </form>
              <div
                className="w-form-done"
                role="region"
                aria-label="Email Form success"
              >
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div
                className="w-form-fail"
                role="region"
                aria-label="Email Form failure"
              >
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile_section">
          <div className="profile_section-head">
            {profilePageData?.Password}
          </div>

          <div className="profile_flex">
            <div className="w-form">
              <form
                action="#"
                className="profile_flex"
                onSubmit={handleUpdatePassword}
              >
                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.currentPassword?.title}
                  </div>
                  <input
                    className="input-preview w-input"
                    name="currentPassword"
                    placeholder={profilePageData?.currentPassword?.value}
                    type="password"
                  />
                </div>

                <div className="profile_column">
                  <div className="input-label">
                    {profilePageData?.newPassword?.title}
                  </div>

                  <input
                    className="input-preview w-input"
                    name="newPassword"
                    placeholder={profilePageData?.newPassword?.value}
                    type="password"
                  />
                </div>

                <a
                  data-w-id="314d141b-6d00-a113-c285-2e7aa44a3391"
                  href="#"
                  className="edit-profile w-inline-block"
                >
                  <div>{profilePageData?.changePasswordTitle}</div>
                </a>
                <input
                  type="submit"
                  data-wait="Please wait..."
                  className="save-button w-button"
                  value="Save changes"
                />
                <div className="block-inputs"></div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {confirmation && (
        <div className="fixed left-0 right-0 bottom-0 top-0 z-10 flex items-center justify-center">
          <div
            className="bg-black/50 absolute left-0 right-0 top-0 bottom-0"
            onClick={() => setConfirmation(false)}
          ></div>

          <div className="bg-white rounded-3xl white max-w-[500px] w-full p-10 relative">
            <h2>Confirmation</h2>

            <form action="#" className="space-y-4" onSubmit={identifyUser}>
              <input
                type="email"
                className="h-14 border w-full rounded-lg px-5"
                placeholder="Please enter your email"
                value={user?.email}
                required
              />
              <input
                className="h-14 border w-full rounded-lg px-5"
                placeholder="Please enter your current password"
                value={currentPassword}
                type="password"
                required
              />

              <button
                type="submit"
                className="bg-primary w-full text-white pt-3 pb-4 rounded-lg hover:bg-primary/90"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePageContent;
