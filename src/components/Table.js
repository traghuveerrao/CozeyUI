import React, { useState, useEffect, useRef } from 'react';
import tables from '../Tables.json';
import './Table.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Table() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Coffee Tables');
  const [activeSection, setActiveSection] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleAnchorClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  
    const sectionElement = document.getElementById(item);
    if (sectionElement) {
      const sectionOffset = sectionElement.offsetTop;
      const offset = sectionOffset - 60;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = tables.type.map((el) => ({
        id: el.title,
        offset: document.getElementById(el.title).offsetTop,
      }));

      const scrollY = window.scrollY + window.innerHeight / 2;

      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollY >= sectionOffsets[i].offset) {
          setActiveSection(sectionOffsets[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="containerBox">
      <div className="heading">
        <div className="headingBox">
          <div className="headingBoxContainer">
            <h1>{tables.title}</h1>
            <p>{tables.description}</p>
          </div>
        </div>
      </div>
      <div className="navigation">
        <div className="navigationHeader">
          <div className="navigationBar">
            {tables.type.map((el) => (
              <a
                key={el.id}
                className={`tableNavigationLinks ${el.title === activeSection ? 'active' : ''}`}
                href={`#${el.title}`}
                onClick={() => handleAnchorClick(el.title)}
              >
                {el.title}
              </a>
            ))}
          </div>
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropbtn" onClick={handleDropdownClick}>
              {selectedItem}{' '}
              <span
                className={`caret ${isDropdownOpen ? 'caret-up' : 'caret-down'}`}
              ></span>
            </button>
            <div
              className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}
              style={{ display: isDropdownOpen ? 'block' : 'none' }}
            >
              {tables.type.map((el) => (
                <a
                  key={el.id}
                  href={`#${el.title}`}
                  onClick={() => {
                    handleAnchorClick(el.title);
                    setDropdownOpen(false);
                  }}
                >
                  {el.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tables">
        {tables.type.map((el) => (
          <div key={el.id} id={el.title}>
            <div className="tableTypeContainer">
              <div className="tableType">{el.title}</div>
            </div>
            <div className="cardHolder">
              {el.variants.map((variant) => (
                <div key={variant.id} className="variants">
                  <div className="imageCard">
                    <img
                      src={variant.image}
                      alt={variant.title}
                      className="imgs"
                    />
                  </div>
                  <div className="cardDescription">
                    <p className="variantTitle">{variant.title}</p>
                    <div className="price">
                      <p className="pricing">{variant.price}</p>
                      <p className="verticalBar">|</p>
                      <p className="description">
                        {variant.Customize}
                        <div className="arrowCard">
                          <svg
                            className="arrow"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 32 32"
                            width="1em"
                            height="1em"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.5 6L17.07 7.393L24.65 15H4.5V17H24.65L17.07 24.573L18.5 26L28.5 16L18.5 6Z"
                              fill="#19142B"
                            ></path>
                          </svg>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
