const ProfilePageContent = (props: any) => {
  const { user } = props;

  console.log(user, "useruser");

  return (
    <div>
      <div className="profile_form-header">
        <div className="text-block-5">My Profile</div>
      </div>

      {user?.serviceOrderRequestIDs &&
        user?.serviceOrderRequestIDs.length > 0 && (
          <div className="container-default-55 w-container">
            <div className="profile_section-head">Service Requests</div>

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
                          className={`tab-menu-left-link w-inline-block w-tab-link ${
                            index === 0 ? "first" : ""
                          }`}
                          key={index}
                        >
                          <div className="tab-menu-left-link-icon">
                            <div className="inner-container _48px"></div>
                          </div>
                          <div className="tab-menu-left-link-content">
                            <div className="tab-menu-left-link-content-top">
                              <h3 className="heading-h4-size-3 mg-bottom-0">
                                <strong className="bold-text-5">
                                  {service?.serviceName}
                                </strong>{" "}
                                <span style={{ color: "#999" }}>
                                  (#{service?.serviceID})
                                </span>
                                <a
                                  href="#"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <img
                                    className="ml-3"
                                    src="/images/icon-copy.png"
                                    width={20}
                                    height={25}
                                    alt="copy"
                                  />
                                </a>
                              </h3>
                              <div className="line-rounded-icon tab-menu-left-link-arrow">
                                
                              </div>
                            </div>

                            <div className="tab-menu-link-content">
                              <div className="profile_section">
                                <div className="profile_section-head">
                                  Service Details
                                </div>
                                <div className="job_labels-wrap">
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-7">
                                          Service Name
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="spacer-10"></div>
                                    <p className="h6">{service?.serviceName}</p>
                                  </div>
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-6">
                                          Date Submitted
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="spacer-10"></div>
                                    <p className="h6">{service?.createdAt}</p>
                                  </div>
                                </div>
                                <div className="box-padding">
                                  <div className="job_label-card">
                                    <div className="job_label-flex">
                                      <p className="paragraph-4">
                                        <strong className="bold-text-8">
                                          Status
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="spacer-10"></div>
                                  </div>
                                  <div className="progress-wrapper">
                                    <div className="progress-text-row">
                                      <div className="progress-text-column">
                                        <div className="progress-icon">
                                          <div>1</div>
                                        </div>
                                        <div className="text-block-8">
                                          Pending
                                        </div>
                                      </div>
                                      <div className="progress-text-column">
                                        <div className="progress-icon">
                                          <div>2</div>
                                        </div>
                                        <div className="text-block-6">
                                          In Progress
                                        </div>
                                      </div>
                                      <div className="progress-text-column">
                                        <div className="progress-icon">
                                          <div>3</div>
                                        </div>
                                        <div className="text-block-7">
                                          Completed
                                        </div>
                                      </div>
                                    </div>
                                    <div className="progress-bar-wrap">
                                      <div
                                        className="progress-bar"
                                        style={{
                                          width: service?.confirm
                                            ? "100%"
                                            : "50%",
                                        }}
                                      ></div>
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
        <div className="profile_section-head">Profile Picture</div>
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
                <div>Upload New</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="profile_section">
        <div className="profile_section-head">Personal Information</div>
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
                <div className="input-label">First Name</div>
                <input
                  className="input-preview w-input"
                  name="First-name-2"
                  data-name="First Name 2"
                  placeholder="Add a first name"
                  type="text"
                  defaultValue={user?.username.split(" ")[0]}
                  id="First-name-2"
                  data-ms-member="first-name"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">Last Name</div>
                <input
                  className="input-preview w-input"
                  name="Last-name-2"
                  data-name="Last Name 2"
                  placeholder="Add a last name"
                  type="text"
                  defaultValue={user?.username.split(" ")[1]}
                  id="Last-name-2"
                  data-ms-member="last-name"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">Phone Number</div>
                <input
                  className="input-preview w-input"
                  name="Phone-2"
                  data-name="Phone 2"
                  placeholder="Add a phone number"
                  type="tel"
                  defaultValue={user?.mobileNumber}
                  id="Phone-2"
                  data-ms-member="phone-number"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">Title</div>
                <input
                  className="input-preview w-input"
                  name="Title-2"
                  data-name="Title 2"
                  placeholder="Add a title"
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
                <div>Edit info</div>
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
        <div className="profile_section-head">Email address</div>
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
                <div className="input-label">Email</div>
                <input
                  className="input-preview w-input"
                  name="Email-2"
                  data-name="Email 2"
                  placeholder="Add an email"
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
                <div>Edit email</div>
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
        <div className="profile_section-head">Password</div>
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
                <div className="input-label">Current Password</div>
                <input
                  className="input-preview w-input"
                  name="Current-Password-2"
                  data-name="Current Password 2"
                  placeholder="Current password"
                  type="password"
                  id="Current-Password-2"
                  data-ms-member="current-password"
                />
              </div>
              <div className="profile_column">
                <div className="input-label">New Password</div>
                <input
                  className="input-preview w-input"
                  name="New-Password-2"
                  data-name="New Password 2"
                  placeholder="New Password"
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
                <div>Change password</div>
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
