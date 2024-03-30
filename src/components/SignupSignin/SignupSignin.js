// import React from "react";
// import "./SignupSignin.css";
// import Input from "../Input/Input";
// import { useState } from "react";
// import Button from "../Button/Button";
// import { toast } from "react-toastify";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// function SignupSignin({ login, handleToggle }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const provider = new GoogleAuthProvider();

//   function signupWithEmail() {
//     setLoading(true); // Button will be enabled

//     console.log(name);
//     console.log(email);
//     console.log(password);
//     console.log(confirmPassword);

//     // Authenticate the user , or basically signup using email and password
//     if (name != "" && email != "" && password != "" && confirmPassword != "") {
//       if (password === confirmPassword) {
//         createUserWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             console.log("User>>>", user);
//             toast.success("User signed in successfuly");
//             // ...

//             setLoading(false); // Button will be disabled

//             setName(""); // clearing the input box after user is created
//             setEmail("");
//             setPassword("");
//             setConfirmPassword("");

//             navigate("/dashboard"); // after signup navigating to dashboard page

//             createDoc(user);
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             toast.error(errorMessage);

//             setLoading(false); // Button will be disabled
//             // ..
//           });
//       } else {
//         toast.error("Password and Confirm Password do not match.");
//         setLoading(false); // Button will be disabled
//       }
//     } else {
//       toast.warn("All fields are mandatory");
//       setLoading(false); // Button will be disabled
//     }
//   }
//   function authenticateWithGoogle() {
//     setLoading(true); // Button will be enabled
//     try {
//       signInWithPopup(auth, provider)
//         .then((result) => {
//           // This gives you a Google Access Token. You can use it to access the Google API.
//           const credential = GoogleAuthProvider.credentialFromResult(result);
//           const token = credential.accessToken;
//           // The signed-in user info.
//           const user = result.user;
//           console.log(user);
//           createDoc(user);
//           toast.success("User signed in successfuly");
//           // IdP data available using getAdditionalUserInfo(result)
//           // ...
//           setLoading(false); // Button will be disabled
//           navigate("/dashboard"); // after login navigating to dashboard page
//         })
//         .catch((error) => {
//           // Handle Errors here.
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           toast.error(errorMessage);
//           setLoading(false); // Button will be disabled
//         });
//     } catch (e) {
//       toast.error(e.message);
//       setLoading(false); // Button will be disabled
//     }
//   }

//   async function createDoc(user) {
//     // Make sure that the doc with the uid dosen't exitst
//     // Create a doc
//     console.log("inside createDoc!");

//     if (!user) return;

//     const userRef = doc(db, "users", user.uid);
//     const userData = await getDoc(userRef);

//     if (!userData.exists()) {
//       // Checking id user already exists
//       try {
//         await setDoc(doc(db, "users", user.uid), {
//           // creating new DOC for the user if not existed
//           name: user.displayName ? user.displayName : name,
//           email: user.email,
//           photoURL: user.photoURL ? user.photoURL : "",
//           createdAt: new Date(),
//         });
//         toast.success("User DOC created successfuly!");
//       } catch (e) {
//         toast.error(e.message);
//       }
//     } else {
//       toast.error("User DOC already exists!");
//     }
//   }

//   return (
//     <div className="signup-wrapper">
//       <h2 className="title">
//         Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
//       </h2>
//       <form>
//         <Input
//           type={"text"}
//           label={"Full Name"}
//           state={name}
//           setState={setName}
//           placeholder={"Tony Stark"}
//         />
//         <Input
//           type={"email"}
//           label={"Email"}
//           state={email}
//           setState={setEmail}
//           placeholder={"TonyStark@gmail.com"}
//         />
//         <Input
//           type={"password"}
//           label={"Password"}
//           state={password}
//           setState={setPassword}
//           placeholder={"Example@123"}
//         />
//         <Input
//           type={"password"}
//           label={"Confirm Password"}
//           state={confirmPassword}
//           setState={setConfirmPassword}
//           placeholder={"Example@123"}
//         />
//         <Button
//           disabled={loading}
//           text={loading ? "Loading..." : "Signup Using Email & Password"}
//           onClick={signupWithEmail}
//         />
//         <p style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 400 }}>
//           or
//         </p>
//         <Button
//           disabled={loading}
//           text={loading ? "Loading..." : "Signup Using Google"}
//           blue={true}
//           onClick={authenticateWithGoogle}
//         />
//         <p style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 400 }}>
//           Or Have An Account Already?{" "}
//           <span
//             style={{ color: "var(--theme)", cursor: "pointer" }}
//             onClick={() => {
//               if (!login) {
//                 handleToggle(true);
//               }
//             }}
//           >
//             Click Here
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignupSignin;

import { useState } from "react";
import "./SignupSignin.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmPassword);
    //Authenticate the user,or basically create a new account using email and password

    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  function loginUsingEmail() {
    console.log("Email", email);
    console.log("password", password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged in", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);

    console.log("inside createDoc!");

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", "user.uid"), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("User DOC created successfuly!");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("User DOC already exists!");
      setLoading(false);
    }
  }
  function googleAuth() {
    setLoading(true); // Button will be enabled
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>", user);
          toast.success("User signed in successfuly");

          setLoading(false); // Button will be disabled
          navigate("/dashboard"); // after login navigating to dashboard page
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false); // Button will be disabled
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false); // Button will be disabled
    }
  }

  return (
    <>
      {loginForm ? (
        //   <></>
        // ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account ? Click Here
            </p>
          </form>
        </div>
      ) : (
        // )}
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />

            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already ? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
