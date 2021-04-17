import React from "react";
import axios from "axios";
import { UserStoreContext } from "../context/UserContext";

const MemberPage = () => {
  const userStore = React.useContext(UserStoreContext);

  const [version, setVersion] = React.useState("");

  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version");
    setVersion(resp.data.data.version);
  };
  React.useEffect(() => {
    // async function getData() {
    //     const resp = await axios.get('https://api.codingthailand.com/api/version');
    //     setVersion(resp.data.data.version)
    // }
    getData();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>สำหรับสมาชิก</h2>
          {userStore.profile ? (
            <p>
              welcome {userStore.profile.name} email : {userStore.profile.email}
            </p>
          ) : null}

          {version && <p>Backend API VERSION : {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
