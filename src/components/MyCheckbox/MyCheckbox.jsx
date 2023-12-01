// import React, {useEffect, useRef, useState} from 'react';
// import './MyCheckbox.css';
//
// const MyCheckbox = () => {
//     const [isOpened, setIsOpened] = useState(false);
//     const [selectedValue, setSelectedValue] = useState("Послуга"); // Начальное значение кнопки
//     const [selectedColor, setSelectedColor] = useState(""); // Цвет для выбранного значения
//     const containerRef = useRef(null);
//
//     const handleButtonClick = () => {
//         setIsOpened(!isOpened);
//     };
//
//     const handleListOptionClick = (value, color) => {
//         setSelectedValue(value);
//         setSelectedColor(color);
//         setIsOpened(false);
//     };
//
//     const handleClickOutside = (event) => {
//         if (containerRef.current && !containerRef.current.contains(event.target)) {
//             setIsOpened(false);
//         }
//     };
//
//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);
//
//     return (
//         <fieldset>
//             <div className="button-checkbox" ref={containerRef}>
//                 <button
//                     className={`custom-button ${isOpened ? 'checked' : ''} ${selectedColor}`}
//                     onClick={handleButtonClick}
//                     type="button"
//                 >
//                     <label>
//                         {selectedValue}
//                         <img alt="icon" src="/arrow_down.svg"/>
//                     </label>
//                 </button>
//                 <div className={`hidden-list ${isOpened ? 'active' : ''}`}>
//                     <div className="position-list">
//                         <label onClick={() => handleListOptionClick('Редагування', "color")}>Редагування</label>
//                         <label onClick={() => handleListOptionClick('Переклад', "color")}>Переклад</label>
//                     </div>
//                 </div>
//             </div>
//         </fieldset>
//     );
// };
//
// export default MyCheckbox;
//
