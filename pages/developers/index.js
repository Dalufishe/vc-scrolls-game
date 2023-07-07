import React, { useEffect } from "react";
import firebase from "firebase";

export default function index() {
  useEffect(() => {
    const ref = firebase.storage().ref("/scrolls");
    ref.put("");
  }, []);

  return <div>index</div>;
}
