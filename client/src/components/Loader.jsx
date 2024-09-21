import React, { CSSProperties, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader(props) {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading text-center text-danger m-5">
      <HashLoader
        loading={loading}
        style={{color: 'red'}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
