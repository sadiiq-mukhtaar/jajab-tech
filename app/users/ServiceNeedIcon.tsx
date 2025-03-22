import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

const ServiceNeedIcon = ({ serviceNeed }: { serviceNeed: string }) => {
  return (
    <div>
      {serviceNeed === "Mobile App" && (
        <div>
          <FaMobileAlt className="inline mr-2" /> {serviceNeed}
        </div>
      )}
      {serviceNeed === "Web App" && (
        <div>
          <CgWebsite className="inline mr-2" /> {serviceNeed}
        </div>
      )}
    </div>
  );
};

export default ServiceNeedIcon;
