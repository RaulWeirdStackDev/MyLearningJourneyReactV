const Navbar = () => {
  return (
    <>
      <nav className="menuNav">
        <ul>
          <a href="#">
            <li>Home</li>
          </a>
          <a href="./index.html">
            <li>New Journal Entry</li>
          </a>
          <a href="#">
            <li>Statistics</li>
          </a>
          <a href="#">
            <li>FAQs</li>
          </a>
          <a href="#">
            <li>Profile</li>
          </a>
        </ul>
        <div id="hamburger" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
