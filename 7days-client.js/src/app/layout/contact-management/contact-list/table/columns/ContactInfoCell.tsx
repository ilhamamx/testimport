/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../../../resources/helpers";
import { Contact } from "../../core/_models";

type Props = {
  contact: Contact;
};

const ContactInfoCell: FC<Props> = ({ contact }) => (
  
  <div className="d-flex align-items-center">
    {/* begin:: Avatar */}
    <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
      <Link
         to={
          "/contact/contact-detail/" +
          contact.firstName +
          "-" +
          contact.lastName
        }
        state={{
          id: contact.id,
          name: contact.firstName + " " + contact.lastName,
        }}
        
      >
        {contact.avatar ? (
          <div className="symbol-label">
            <img
              src={`${contact.avatar}`}
              alt={contact.firstName}
              className="w-100"
            />
          </div>
        ) : (
          <div
            className={clsx(
              "symbol-label fs-3",
              `bg-light-${contact.initials?.state}`,
              `text-${contact.initials?.state}`
            )}
          >
            {contact.initials?.label}
          </div>
        )}
      </Link>
    </div>
    <div className="d-flex flex-column">
      <Link
        to={
          "/contact/contact-detail/" +
          contact.firstName +
          "-" +
          contact.lastName
        }
        state={{
          id: contact.id,
          name: contact.firstName + " " + contact.lastName,
        }}
        className="text-gray-800 text-hover-primary mb-1"
      >
        {contact.firstName} {contact.lastName}
      </Link>
      {/* <span>{contact.email}</span> */}
    </div>
  </div>
);

export { ContactInfoCell };
