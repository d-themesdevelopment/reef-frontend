const ProfilePageContent = (props: any) => {
  const { user, profilePageData, locale } = props;

  console.log(user, "useruser");

  return (
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
                        <a
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
                                className={locale === "ar" ? "text-right" : ""}
                              >
                                <h3
                                  className="heading-h4-size-3 mg-bottom-0"
                                  title={`Service ID: ${service?.serviceID}`}
                                >
                                  <strong className="bold-text-5">
                                    {service?.serviceName}
                                  </strong>{" "}
                                </h3>

                                <h3 style={{ fontSize: "16px", color: "#999" }}>
                                  #{service?.serviceID}
                                  <a href="#">
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
                                  </a>
                                </h3>
                              </div>
                              <div className="line-rounded-icon tab-menu-left-link-arrow">
                                
                              </div>
                            </div>
                            <div className="tab-menu-link-content">
                              <div className="profile_section">
                                <div className="profile_section-head">
                                  تفاصيل الطلب
                                </div>
                                <div className="job_labels-wrap">
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-7">
                                          اسم الخدمة :
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="spacer-10"></div>
                                    <p className={`h6 ${locale === "ar" ? "text-right" : ""}`}>{service?.serviceName}</p>
                                  </div>
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-6">
                                          تاريخ التقديم :
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="spacer-10"></div>
                                    <p className={`h6 ${locale === "ar" ? "text-right" : ""}`}>{service?.createdAt.slice(0, 10)}</p>
                                  </div>
                                </div>
                                <div className="box-padding">
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-8">
                                          حالة الطلب :
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
                                          قيد الانتظار
                                        </div>
                                      </div>
                                      <div className="progress-text-column">
                                        <div className="progress-icon">
                                          <div>2</div>
                                        </div>
                                        <div className="text-block-6">
                                          قيد التنفيذ
                                        </div>
                                      </div>
                                      <div className="progress-text-column">
                                        <div className="progress-icon">
                                          <div>3</div>
                                        </div>
                                        <div className="text-block-7">
                                          تم الانتهاء
                                        </div>
                                      </div>
                                    </div>
                                    <div className="progress-bar-wrap">
                                      <div className="progress-bar"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="profile_section">
        <div className="profile_section-head">
          {profilePageData?.profilePictureTitle}
        </div>
        <div className="profile_flex">
          <div className="profile_column">
            <div className="ms-profile-image-row">
              <img
                src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65e19ade79342d008f74804b_white-profile-empty%20(1).svg"
                alt=""
                data-ms-member="profile-image"
                className="ms-profile-image-preview"
              />
              <a
                data-ms-action="profile-image"
                href="#"
                className="ms-profile-upload w-inline-block"
              >
                <img
                  src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65e19ade79342d008f74804a_file_upload_black_24dp%20(1).svg"
                  loading="lazy"
                  width="16"
                  alt=""
                />
                <div>{profilePageData?.editProfilePicture}</div>
              </a>
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
              data-name="Email Form"
              method="get"
              data-ms-form="profile"
              className="profile_flex"
              data-wf-page-id="65e19ad8e04ea1d6dc7a1b21"
              data-wf-element-id="314d141b-6d00-a113-c285-2e7aa44a3351"
              aria-label="Email Form"
            >
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.firstName?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="First-name-2"
                  data-name="First Name 2"
                  placeholder={profilePageData?.firstName?.value}
                  type="text"
                  defaultValue={user?.username.split(" ")[0]}
                  id="First-name-2"
                  data-ms-member="first-name"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.lastName?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="Last-name-2"
                  data-name="Last Name 2"
                  placeholder={profilePageData?.lastName?.value}
                  type="text"
                  defaultValue={user?.username.split(" ")[1]}
                  id="Last-name-2"
                  data-ms-member="last-name"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.phoneNumber?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="Phone-2"
                  data-name="Phone 2"
                  placeholder={profilePageData?.phoneNumber?.value}
                  type="tel"
                  defaultValue={user?.mobileNumber}
                  id="Phone-2"
                  data-ms-member="phone-number"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.title?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="Title-2"
                  data-name="Title 2"
                  placeholder={profilePageData?.title?.value}
                  type="text"
                  id="Title-2"
                  data-ms-member="title"
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
              data-name="Email Form"
              method="get"
              data-ms-form="email"
              className="profile_flex"
              data-wf-page-id="65e19ad8e04ea1d6dc7a1b21"
              data-wf-element-id="314d141b-6d00-a113-c285-2e7aa44a3372"
              aria-label="Email Form"
            >
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.email?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="Email-2"
                  data-name="Email 2"
                  placeholder={profilePageData?.email?.value}
                  type="email"
                  id="Email-2"
                  defaultValue={user?.email}
                  data-ms-member="email"
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
        <div className="profile_section-head">{profilePageData?.password}</div>
        <div className="profile_flex">
          <div className="w-form">
            <form
              action="#"
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              data-ms-form="password"
              className="profile_flex"
              data-wf-page-id="65e19ad8e04ea1d6dc7a1b21"
              data-wf-element-id="314d141b-6d00-a113-c285-2e7aa44a3388"
              aria-label="Email Form"
            >
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.currentPassword?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="Current-Password-2"
                  data-name="Current Password 2"
                  placeholder={profilePageData?.currentPassword?.value}
                  type="password"
                  id="Current-Password-2"
                  data-ms-member="current-password"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">
                  {profilePageData?.newPassword?.title}
                </div>
                <input
                  className="input-preview w-input"
                  name="New-Password-2"
                  data-name="New Password 2"
                  placeholder={profilePageData?.newPassword?.value}
                  type="password"
                  id="New-Password-2"
                  data-ms-member="new-password"
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
    </div>
  );
};

export default ProfilePageContent;
