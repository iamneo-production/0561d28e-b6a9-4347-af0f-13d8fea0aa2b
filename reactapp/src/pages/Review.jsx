import { useState ,useRef} from "react";
import { FaStar } from "react-icons/fa";


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};
function Review() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [isValid,setisValid]=useState();
  const stars = Array(5).fill(0)
  const comment=useRef();

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
const submitReview=(e)=>{
    e.preventDefault();
    setisValid(true);
    let data={rate:currentValue,
    comment:comment.current.value}
    if(!(data.rate && data.comment))
    {
    setisValid(false);   
    return;
    }
    console.log(data);
}

  return (
   
        <div style={styles.container}>
      <h2> CookHiring Ratings </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        ref={comment}
        style={styles.textarea}
      />
      {isValid === false && <p style={{color:'red'}}>Enter review</p>}

      <button
        style={styles.button}
        className='btn'
        onClick={submitReview}
      >
        Submit
      </button>
      <div>
          <h5>Avarage rating for this site</h5>
          
      </div>
      </div>
   
  );
};


const styles = {
  container: {
    padding:'20px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:'white',
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};




export default Review;
 