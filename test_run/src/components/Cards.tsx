
const Cards = () => {
    const MovieNames = ['SpiderMan','Cars', 'Rush','SpiderMan','Cars', 'Rush','SpiderMan','Cars', 'Rush','SpiderMan','Cars', 'Rush']


  return (
    <>
      <div className="wrapper">
        {MovieNames.map((MovieName) => (
            <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{MovieName}</h5>
              <p className="card-text">Gwens Betrayal and cool graphics!</p>
              <a href="#" className="btn btn-primary">
                More on
              </a>
            </div>
          </div>
        ))}
                
      </div>
    </>
  );
};

export default Cards;
