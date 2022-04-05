import React,{useContext} from "react";
import AdminContext from "../../../store/Admin/AdminContext";
import ContentContainer from "../../UI/ContentContainer";
import Candidates from "./Candidates";



function Admincandidates(props) {
  const Context=useContext(AdminContext);  
  return (
    <ContentContainer >
      { Context.getCandidates() }
      { Context.candidates.map((item, index) => 
        <Candidates
          key={index}
          item={item}
          Id={item.id}
          name={item.name}
          address={item.address}
          phone_number={item.phone}
          yearOfExperience={item.experience}
          email={item.email}
          id={`adminsCandidatesGrid${props.id}`}
          jobId={item.jobId}
          
        />
      ) }
    </ContentContainer>
  );
}

export default Admincandidates;
