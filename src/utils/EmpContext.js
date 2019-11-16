import React from "react";

const EmpContext = React.createContext ({
    users: [{}],
    order: "decend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ],
    handleSort : () => undefined,
    handleSearchChange : () => undefined
});

export default EmpContext;