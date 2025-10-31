import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editStaticData } from "../../reduxToolkit/Slices/StaticContent";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StaticContentEdit = () => {
  const state = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const data = state?.state || {};

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data.description) {
      setDescription(data.description);
    }
  }, [data]);

  const handleEdit = () => {
    const payload = {
      id: data._id,
      description,
    };

    dispatch(editStaticData(payload))
      .then(() => {
        setSnackbarMessage("Updated successfully !!");
        setSnackbarSeverity("success");
        navigate("/static-content");
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="Small-Wrapper">
            <div className="TitleBox">
              <h4 className="Title">Static Content</h4>
            </div>
            <div className="CommonForm">
              <h4>Update Content</h4>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-2">
                    <label>Description</label>
                  </div>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="editor"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="Button" onClick={handleEdit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StaticContentEdit;
