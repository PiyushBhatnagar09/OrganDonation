import React, {useState} from "react";
import Top3 from "../Navbar/Top3"; // Assuming this is a top-level navbar
import Active_Donors from "./Active_Donors";
import Active_Recipients from "./Active_Recipients";
import Transplant_Matches from "./Transplant_Matches";

function TransactionList(props) {
  const [selectedTab, setSelectedTab] = useState("Active_Donors");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Top3 onTabClick={handleTabClick} activeTab={selectedTab}/>
      <div id="transactions">        
        {/* Conditionally render components based on selected tab */}
        {selectedTab === "Active_Donors" && <Active_Donors contract={props.contract}/>}
        {selectedTab === "Active_Recipients" && <Active_Recipients contract={props.contract}/>}
        {selectedTab === "Transplant_Matches" && <Transplant_Matches contract={props.contract}/>}
      </div>
    </>
  );
}

export default TransactionList;
