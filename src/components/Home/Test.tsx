import * as React from "react";
import Link from "@material-ui/core/Link";

const Test: React.SFC = () => {
  return (
    <>
      <Link href="manage-working-days" variant="body2">
        <button type="button" className="btn btn-primary">
          Manage Working Days
        </button>
      </Link>
    </>
  );
};

export default Test;
