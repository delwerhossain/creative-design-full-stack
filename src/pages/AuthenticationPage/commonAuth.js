import Swal from "sweetalert2";

export const userInsert = (name, email, img) => {
  const saveUser = { name: name, email: email, img: img, role: 'student' };
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(saveUser),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        //  reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (data.message == "user already exists") {
        //  reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome back.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};
