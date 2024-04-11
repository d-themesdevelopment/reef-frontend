import { v4 as uuidv4 } from "uuid";
import type UserType from "../../../interfaces/UserType";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

const { string } = z;

import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

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

Modal.setAppElement("body");

const ServiceRegistration = ({
  data = [],
  user,
  apiUrl,
  reafToken,
  services,
  currentService,
}: any) => {
  const [step, setStep] = useState<number>(0);
  const [serviceData, setServiceData] = useState<UserType>();
  const [category, setCategory] = useState<string>(
    currentService?.category?.data?.attributes?.value
  );

  const saudiMobileSchema = z.object({
    mobileNumber: string().refine((value) => /^(\+966|05)\d{9}$/.test(value), {
      message:
        "Please enter a valid Saudi mobile number (+966XXXXXXXXX or 05XXXXXXXX).",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleScrollTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleService = (value: any) => {
    setServiceData(value);
    handleScrollTop();
    setStep(1);
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    isChecked && setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSelectChange = (e: any) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked status
  };

  const handleRequestService = async (e: any) => {
    e.preventDefault();

    createNewServiceToStrapi();
  };

  const createNewServiceToStrapi = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/service-orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${reafToken}`,
        },
        body: JSON.stringify({
          data: {
            serviceID: uuidv4(),
            serviceName: serviceData?.serviceName,
            personalInformation: {
              firstName: serviceData?.firstNameEn,
              lastName: serviceData?.lastNameEn,
              fatherName: serviceData?.fatherNameEn,
              grandFatherName: serviceData?.grandFatherNameEn,
              email: serviceData?.email,
              address: serviceData?.address,
              idNumber: serviceData?.idNumber,
              mobileNumber: serviceData?.mobileNumber
            },
            requestInformation: {
              serviceName: serviceData?.serviceName,
              applicantCategory: category,
              specialty: serviceData?.specialty,
              qualificationType: serviceData?.qualificationType,
              professionalStatus: serviceData?.professtionalStatus,
              qualificationDesc: serviceData?.qualification,
            },
            user: user,
            confirm: false,
          },
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create new Service");
      }

      openModal();
      console.log("New Service created:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating new Service:", error);
      throw new Error("Failed to create new Service");
    }
  };

  const handleKeyPress = (event: any) => {
    const pattern = /^[\u0600-\u06FF\s]+$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  const handleEnKeyPress = (event: any) => {
    const pattern = /^[a-zA-Z\s]+$/; // Regular expression pattern for English letters and spaces
    const inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <section className="section hero v9">
        <div className="container-default w-container">
          <div data-w-id="77c7669f-a103-d027-e3e4-947d37f3ea3d">
            <div className="inner-container _680px center">
              <div className="text-center mg-bottom-32px">
                <img
                  src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a65e4b8ece87037ed1beec_Untitled%20design%20(40).png"
                  alt=""
                  className="subtitle-icon"
                />
                <h1 className="display-1 mg-bottom-12px">
                  Service Registration
                </h1>
                <p className="mg-bottom-0">
                  We are delighted that you are interested in our services.
                  Please complete the registration form below to initiate the
                  service registration process.
                </p>
              </div>
            </div>

            <div className="join-form-block w-form" style={{ minHeight: 500 }}>
              <div
                id="wf-form-Become-Professional-Form"
                data-name="Become Professional Form"
                className="grid-1-column gap-row-32px"
                data-wf-page-id="65b16c08a54d3202cc2bea00"
                data-wf-element-id="f3ab2e7e-c67d-76f9-84e1-783e60990123"
                aria-label="Become Professional Form"
              >
                <div
                  className="f-form-steps-item-inner"
                  style={{ minHeight: 500 }}
                >
                  <div className="f-steps-wrapper is--2">
                    <div className="f-progress-list">
                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 0 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>1</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 0 ? "form-step" : ""
                          }`}
                        >
                          Personal and request information
                          <em>
                            <br />
                          </em>
                        </div>
                      </div>
                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 1 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>2</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 1 ? "form-step" : ""
                          }`}
                        >
                          Summary
                        </div>
                      </div>
                      '
                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 2 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>3</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 2 ? "form-step" : ""
                          }`}
                        >
                          Terms &amp;&nbsp;Conditions
                        </div>
                      </div>
                    </div>

                    {step === 0 && (
                      <form
                        action="#"
                        onSubmit={handleSubmit(handleService)}
                        className="grid-1-column gap-row-32px"
                      >
                        <div
                          data-clone-wrapper="contact"
                          className="f-steps-info-wrapper"
                        >
                          <div
                            data-clone="contact"
                            className="f-steps-info-clone"
                          >
                            <div className="f-steps-info-text-header is---2">
                              <div className="f-copy-element is--form-2">
                                <div className="f-steps-txt">
                                  Steps{" "}
                                  <span
                                    data-text="current-step"
                                    className="f-current-step"
                                  >
                                    1
                                  </span>{" "}
                                  /{" "}
                                  <span
                                    data-text="total-steps"
                                    className="f-total-steps"
                                  >
                                    3
                                  </span>
                                </div>
                              </div>

                              <div className="flex-horizontal start flex-wrap---gap-16px">
                                <img
                                  alt="Icon Personal Information - Localfinder X Webflow Template"
                                  src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a12e04c59a1723c86ea1f7_icon-personal-information-localfinder-x-webflow-template.svg"
                                  className="card-image size-40px"
                                />
                                <h2 className="display-4 mg-bottom-0">
                                  1. Personal information
                                </h2>
                              </div>
                            </div>

                            <div className="f-steps-info-grid">
                              <div className="f-input-block">
                                <label
                                  htmlFor="name-2"
                                  className="f-input-label w-clearfix"
                                >
                                  First Name (Arabic)
                                </label>
                                <input
                                  {...register("firstNameAr", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  placeholder="مثال : خالد "
                                  onKeyPress={handleKeyPress}
                                  type="text"
                                />
                                {errors.firstNameAr && (
                                  <p className="error">
                                    FirstName(Arabic) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-3"
                                  className="f-input-label w-clearfix"
                                >
                                  First Name (English)
                                </label>
                                <input
                                  {...register("firstNameEn", {
                                    required: true,
                                  })}
                                  defaultValue={user?.username?.split(" ")[0]}
                                  className="input w-input"
                                  placeholder="Ex: Khalid"
                                  onKeyPress={handleEnKeyPress}
                                  type="text"
                                />
                                {errors.firstNameEn && (
                                  <p className="error">
                                    FirstName(English) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-4"
                                  className="f-input-label w-clearfix"
                                >
                                  Father Name (Arabic)
                                </label>

                                <input
                                  {...register("fatherNameAr", {
                                    required: true,
                                  })}
                                  onKeyPress={handleKeyPress}
                                  className="input w-input"
                                  placeholder="مثال : عبدالله "
                                  type="text"
                                />
                                {errors.fatherNameAr && (
                                  <p className="error">
                                    FatherName(Arabic) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-5"
                                  className="f-input-label w-clearfix"
                                >
                                  Father Name (English)
                                </label>
                                <input
                                  {...register("fatherNameEn", {
                                    required: true,
                                  })}
                                  onKeyPress={handleEnKeyPress}
                                  className="input w-input"
                                  placeholder="Ex: Abdullah"
                                  type="text"
                                />
                                {errors.fatherNameEn && (
                                  <p className="error">
                                    FatherName(English) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-7"
                                  className="f-input-label w-clearfix"
                                >
                                  Grand Father Name (Arabic)
                                </label>
                                <input
                                  {...register("grandFatherNameAr", {
                                    required: true,
                                  })}
                                  onKeyPress={handleKeyPress}
                                  className="input w-input"
                                  placeholder="مثال : محمد"
                                  type="text"
                                />
                                {errors.grandFatherNameAr && (
                                  <p className="error">
                                    GrandFatherName(Arabic) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-6"
                                  className="f-input-label w-clearfix"
                                >
                                  Grand Father Name (English)
                                </label>

                                <input
                                  {...register("grandFatherNameEn", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  onKeyPress={handleEnKeyPress}
                                  placeholder="Ex: Mohamed"
                                  type="text"
                                />
                                {errors.grandFatherNameEn && (
                                  <p className="error">
                                    GrandFatherName(English) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-8"
                                  className="f-input-label w-clearfix"
                                >
                                  Last Name (Arabic)
                                </label>
                                <input
                                  {...register("lastNameAr", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  onKeyPress={handleKeyPress}
                                  placeholder="مثال : الراقي "
                                  type="text"
                                />
                                {errors.lastNameAr && (
                                  <p className="error">
                                    LastName(Arabic) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-9"
                                  className="f-input-label w-clearfix"
                                >
                                  Last Name (English)
                                </label>
                                <input
                                  {...register("lastNameEn", {
                                    required: true,
                                  })}
                                  defaultValue={user?.username?.split(" ")[1]}
                                  onKeyPress={handleEnKeyPress}
                                  className="input w-input"
                                  placeholder="Ex: Alraqe"
                                  type="text"
                                />

                                {errors.lastNameEn && (
                                  <p className="error">
                                    LastName(English) is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="email-2"
                                  className="f-input-label"
                                >
                                  Email Address
                                </label>
                                <div className="ms-input-wrap">
                                  <input
                                    {...register("email", {
                                      required: true,
                                    })}
                                    defaultValue={user?.email}
                                    className="input w-input"
                                    placeholder="example@email.com"
                                    type="email"
                                  />
                                </div>
                                {errors.email && (
                                  <p className="error">Email is required.</p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="email-2"
                                  className="f-input-label"
                                >
                                  Address
                                </label>
                                <div className="ms-input-wrap">
                                  <input
                                    {...register("address", {
                                      required: true,
                                    })}
                                    defaultValue={user?.address}
                                    className="input w-input"
                                    placeholder="Ex: street Vitruka, building 32"
                                    type="text"
                                  />
                                </div>
                                {errors.email && (
                                  <p className="error">Address is required.</p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="phone-2"
                                  className="f-input-label"
                                >
                                  ID Number
                                </label>
                                <input
                                  {...register("idNumber", {
                                    required: true,
                                  })}
                                  defaultValue={user?.idNumber}
                                  className="input w-input"
                                  placeholder="Ex: 1100000000"
                                  type="number"
                                />
                                {errors.idNumber && (
                                  <p className="error">
                                    ID Number is required.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="phone-3"
                                  className="f-input-label"
                                >
                                  Mobile Number
                                </label>

                                <input
                                  type="tel"
                                  id="mobileNumber"
                                  {...register("mobileNumber", {
                                    required: true,
                                    validate: (value) =>
                                      saudiMobileSchema.safeParse({
                                        mobileNumber: value,
                                      }).success,
                                  })}
                                  defaultValue={user?.mobileNumber}
                                  className="input w-input"
                                  placeholder="e.g.+966XXXXXXXXX or 05XXXXXXXX"
                                />

                                {errors.mobileNumber && (
                                  <p className="error">
                                    Please enter a valid Saudi mobile
                                    number(+966XXXXXXXXX or 05XXXXXXXX)
                                  </p>
                                )}
                              </div>

                              <div
                                id="w-node-_802cfdac-c6a7-4894-2e49-abb498c5c682-4ea0ea95"
                                className="f-input-block"
                              >
                                <div className="flex-horizontal start flex-wrap---gap-16px">
                                  <img
                                    alt="Icon Blog - Localfinder X Webflow Template"
                                    src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a12e04c59a1723c86ea1fa_icon-blog-localfinder-x-webflow-template.svg"
                                    className="card-image size-40px"
                                  />
                                  <h2 className="display-4 mg-bottom-0">
                                    2. <strong>Request information</strong>
                                  </h2>
                                </div>

                                <label
                                  htmlFor="email-3"
                                  className="f-input-label w-clearfix"
                                >
                                  Service Name
                                </label>

                                <div className="ms-input-wrap"></div>

                                <div className="ms-input-wrap">
                                  <div className="ms-input-outer">
                                    <select
                                      {...register("serviceName", {
                                        required: true,
                                      })}
                                      defaultValue={currentService?.slug}
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {services?.map(
                                        (service: any, index: number) => (
                                          <option
                                            key={index}
                                            value={service?.attributes?.slug}
                                          >
                                            {service?.attributes?.title}
                                          </option>
                                        )
                                      )}
                                    </select>

                                    {errors.serviceName && (
                                      <p>Service Name is required.</p>
                                    )}

                                    <label
                                      htmlFor="email-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      Applicant Category
                                    </label>

                                    <select
                                      {...register("applicantCategory", {
                                        required: true,
                                      })}
                                      onChange={handleSelectChange}
                                      value={category}
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {data?.map((item: any, index: number) => (
                                        <option
                                          value={item?.attributes?.value}
                                          key={index}
                                        >
                                          {item?.attributes?.title}
                                        </option>
                                      ))}
                                    </select>

                                    {errors.applicantCategory && (
                                      <p>Applicant Category is required.</p>
                                    )}

                                    <label
                                      htmlFor="Specialty-of-the-applicant"
                                      className="f-input-label w-clearfix"
                                    >
                                      Specialty of the applicant
                                    </label>

                                    <select
                                      {...register("specialty", {
                                        required: true,
                                      })}
                                      defaultValue={
                                        data?.find(
                                          (item: any) =>
                                            item?.attributes?.value === category
                                        )?.attributes?.specialties?.data[0]
                                          ?.attributes?.value
                                      }
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {data
                                        ?.find(
                                          (item: any) =>
                                            item?.attributes?.value === category
                                        )
                                        ?.attributes?.specialties?.data?.map(
                                          (sub: any, subIndex: number) => (
                                            <option
                                              value={sub?.attributes?.value}
                                              key={subIndex}
                                            >
                                              {sub?.attributes?.title}
                                            </option>
                                          )
                                        )}
                                    </select>

                                    {errors.specialty && (
                                      <p>Specialty is required.</p>
                                    )}

                                    <label
                                      htmlFor="Type-of-qualification"
                                      className="f-input-label w-clearfix"
                                    >
                                      Type of qualification
                                    </label>

                                    <select
                                      {...register("qualificationType", {
                                        required: true,
                                      })}
                                      id="Type-of-qualification"
                                      name="Type-of-qualification"
                                      data-name="Type Of Qualification"
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      <option value="Extension technician qualification">
                                        Extension technician qualification
                                      </option>
                                      <option value="Qualification of project management technician">
                                        Qualification of project management
                                        technician
                                      </option>
                                    </select>

                                    {errors.qualificationType && (
                                      <p>Qualification Type is required.</p>
                                    )}

                                    <label
                                      htmlFor="message-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      Required qualification
                                    </label>

                                    <textarea
                                      {...register("qualification", {
                                        required: true,
                                      })}
                                      placeholder="Describe your qualifications"
                                      className="text-area small mg-bottom-0 w-input"
                                    ></textarea>

                                    {errors.qualification && (
                                      <p
                                        className="error"
                                        style={{ width: "100%" }}
                                      >
                                        Qualification is required.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="email-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      Professional status of the applicant
                                    </label>

                                    <div className="ms-input-middle-row">
                                      <select
                                        {...register("professtionalStatus", {
                                          required: true,
                                        })}
                                        id="Professional-status-of-the-applicant"
                                        name="Professional-status-of-the-applicant"
                                        data-name="Professional Status Of The Applicant"
                                        className="f-input-2 is-middle is-right w-select"
                                      >
                                        <option value="New practitioner">
                                          Current practitioner
                                        </option>
                                        <option value="New practitioner">
                                          New practitioner
                                        </option>
                                      </select>

                                      {errors.professtionalStatus && (
                                        <p>Professional status is required.</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <button
                            type="submit"
                            data-form="next-btn"
                            className="f-form-button next w-button"
                          >
                            Next Step
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 1 && (
                      <>
                        <div
                          data-display-wrapper="contact"
                          className="f-steps-info-details-wrapper"
                        >
                          <div
                            data-display="contact"
                            className="f-steps-info-details-item"
                          >
                            <div className="f-steps-info-details-wrap">
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Service name
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.serviceName}
                                    <br />
                                  </div>
                                </div>
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      ID Number
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.idNumber}
                                    <br />
                                  </div>
                                </div>
                              </div>
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    First Name (Arabic)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.firstNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    First Name (English)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.firstNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Father Name (Arabic)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.fatherNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Father Name (English)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.fatherNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Grand Father Name (Arabic)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.grandFatherNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Grand Father Name (English)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.grandFatherNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Last name (Arabic)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.lastNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Last name (English)
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.lastNameEn}
                                    <br />
                                  </div>
                                </div>
                              </div>
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    Email
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="email"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.email}
                                    <br />
                                  </div>
                                </div>
                                <div className="f-input-display-item">
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      Mobile Number
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="relationship"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.mobileNumber}
                                    <br />
                                  </div>
                                </div>
                                <div id="w-node-fa84bdca-1099-417e-a5df-211bc4d5dab4-c98c163b">
                                  <div className="f-steps-info-details-heading">
                                    Address
                                    <br />
                                  </div>

                                  <div
                                    data-input-field="relationship"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.address}
                                    <br />
                                  </div>

                                  {/* {user?.address && (
                                    <Markdown
                                      value={md?.render(user?.address)}
                                    />
                                  )} */}
                                </div>
                              </div>

                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      Applicant Category
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.applicantCategory}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      Specialty of the applicant
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.specialty}
                                    <br />
                                  </div>
                                </div>
                              </div>

                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      Type of qualification
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.qualificationType}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      Professional status of the applicant
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.professtionalStatus}
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <a
                            data-add-new="contact"
                            data-form="back-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setStep(0);
                              handleScrollTop();
                            }}
                            className="f-form-button back w-button"
                          >
                            Back
                          </a>
                          <a
                            data-form="next-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setStep(2);
                              handleScrollTop();
                            }}
                            className="f-form-button next w-button"
                          >
                            Continue
                          </a>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="f-steps-info-details-wrapper">
                          <div
                            id="w-node-_87c542fa-6619-a495-7111-d5dfe242e1cf-76852cd0"
                            className="f-steps-terms-contain"
                          >
                            <label className="w-checkbox f-checkbox-field">
                              <input
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                data-name="Checkbox"
                                className="w-checkbox-input f-checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                              <span className="f-checkbox-label w-form-label ml-2">
                                By checking this little box, you agree to abide
                                by Reef Foundation's terms and conditions.
                                Please review our terms [
                                <a href="/terms-policy">here</a>].
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <a
                            data-form="back-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleScrollTop();
                              setStep(1);
                            }}
                            className="f-form-button back w-button"
                          >
                            Back
                          </a>
                          <a
                            data-form="next-btn"
                            href="#"
                            onClick={(e) => handleRequestService(e)}
                            className={`f-form-button next w-button ${
                              isChecked ? "" : "btn-disabled"
                            }`}
                          >
                            Submit
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={"overlay"}
      >
        <div className="mb-0" style={{ textAlign: "center" }}>
          <div className="line-rounded-icon success-message-check large"></div>
          <div className="heading-h3-size mg-bottom-8px">Thank you</div>
          <div>
            Your message has been submitted.
            <br />
            We will get back to you within 24-48 hours.
          </div>

          <a
            href="/profile"
            className="f-form-button next w-button inline-block mt-7"
            style={{ display: "inline-flex" }}
          >
            Go to profile
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ServiceRegistration;
