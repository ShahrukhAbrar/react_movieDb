

function DescNav(props: any) {
  return (
    <>
      <nav className="navbar desc-nav">
        <div className="container-fluid">
          <h1 className="desc-text">{props.description}</h1>
        </div>
      </nav>
    </>
  );
}

export default DescNav;
