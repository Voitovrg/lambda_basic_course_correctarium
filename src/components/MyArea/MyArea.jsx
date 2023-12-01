// import './MyArea.css';
// import React, { useState, useEffect } from 'react';
// import { useText } from '../TextContext/TextContext';
//
// const MyArea = () => {
//     const { text, setTextValue } = useText();
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isInputActive, setInputActive] = useState(false);
//     const [charCount, setCharCount] = useState(0);
//     const [isCharCounterVisible, setCharCounterVisible] = useState(false);
//
//
//     const updateCharCount = (text) => {
//         // Убираем пробелы из текста перед подсчетом символов
//         const textWithoutSpaces = text.replace(/\s/g, '');
//         setCharCount(textWithoutSpaces.length);
//     };
//
//     const countTextChange = (event) => {
//         const newText = event.target.value;
//         setTextValue(newText);
//         updateCharCount(newText);
//
//         // Проверка, чтобы показать счетчик символов только после первого введенного символа
//         if (newText.length > 0) {
//             setCharCounterVisible(true);
//         } else {
//             setCharCounterVisible(false);
//         }
//     };
//
//     const handleTextChange = (event) => {
//         setTextValue(event.target.value);
//         if (event.target.value.length > 0) {
//             setInputActive(true);
//         } else {
//             setInputActive(false);
//         }
//     };
//
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedFile(file);
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const fileContent = event.target.result;
//                 setTextValue(fileContent);
//                 setInputActive(true);
//                 setCharCounterVisible(true); // Показать счетчик символов после загрузки файла
//             };
//             reader.readAsText(file);
//         } else {
//             setSelectedFile(null);
//             setTextValue('');
//             setInputActive(false);
//             setCharCounterVisible(false); // Скрыть счетчик символов при удалении файла
//         }
//     };
//
//     useEffect(() => {
//         // Подсчет символов сразу после загрузки файла
//         if (selectedFile) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const fileContent = event.target.result;
//                 updateCharCount(fileContent);
//             };
//             reader.readAsText(selectedFile);
//         }
//     }, [selectedFile]);
//
//     return (
//         <div className="area">
//             <textarea
//                 className="area-text"
//                 value={text}
//                 onChange={handleTextChange}
//                 onKeyUp={countTextChange}
//             ></textarea>
//             {isCharCounterVisible && (
//                 <div className="char-count">{charCount} символів</div>
//             )}
//             <div className="area-download">
//                 {isInputActive ? null : (
//                     <span className="placeholder">Введіть текст або </span>
//                 )}
//                 {isInputActive ? null : (
//                     <label className="area-label">
//                         завантажте файл
//                         <input
//                             className="area-input"
//                             type="file"
//                             onChange={handleFileChange}
//                             accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application.pdf, .rtf, .txt, .pdf, .zip"
//                         />
//                     </label>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default MyArea;
