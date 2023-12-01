import "./styles/App.css";
import React, {useEffect, useRef, useState} from "react";
import {useText} from "./components/TextContext/TextContext";


let order = {
    language: 'Language',
    mimeType: 'doc',
    count: 0,
}

// Sum calculation:
const price = {
    languageUkrRus: {
        oneSymbol: 0.05,
        minPrice: 50,
    },
    languageEn: {
        oneSymbol: 0.12,
        minPriceEn: 120,
    }
}

// Calculating of working time:
const edit = {
    symbolPerHoursUkrRus: 1333, // symbols per hour
    symbolPerHoursEn: 333, // symbols per hour
    minWorkTime: 60, // minutes (1 hour)
    formulaWorkTime: 30, // + time depends on the task and the number of characters but no less than one hour (60 minutes)
}


const extension = ['none', 'doc', 'docx', 'rtf',] // < if the file is not price and operating time will increase by 20%
const workHoursStart = 10; // Start of the working day (10:00)
const workHoursEnd = 19;   // End of the working day (19:00)


function App() {
    function orderPrice(params) {
        const fileLanguage = params.language // Recognize the language
        const fileType = params.mimeType // Recognize the file type
        const fileCountSymbol = params.count // Count the number of characters

        const result = {}
        let overhead;
        let sumSymbol;
        let time;

        const editTimeEnPerMin = edit.symbolPerHoursEn / edit.minWorkTime // characters per minute
        const editTimeUrkRusPerMin = edit.symbolPerHoursUkrRus / edit.minWorkTime // characters per minute

        if (extension.includes(fileType.toLowerCase())) { // works out at the regular price
            overhead = 1
        } else { // We work at a price 20% more expensive.
            overhead = 1.2
        }

        if (fileLanguage.toLowerCase() === 'en') { // Language selection

            sumSymbol = (fileCountSymbol * price.languageEn.oneSymbol) * overhead

            // The sum of characters is greater than the minimum price
            if (sumSymbol >= price.languageEn.minPriceEn) {
                result.price = Number(sumSymbol).toFixed(2)

            } else { // The sum of characters is less than the minimum price
                result.price = Number(price.languageEn.minPriceEn).toFixed(2)
            }

        } else if (fileLanguage.toLowerCase() !== 'en') { // If the language is not English
            sumSymbol = (fileCountSymbol * price.languageUkrRus.oneSymbol) * overhead

            // The sum of characters is greater than the minimum price
            if (sumSymbol >= price.languageUkrRus.minPrice) {
                result.price = Number(sumSymbol).toFixed(2)

            } else { // The sum of characters is less than the minimum price
                result.price = Number(price.languageUkrRus.minPrice).toFixed(2)
            }
        }

        // find out how many minutes it takes to work and add 30 minutes.
        if (fileLanguage.toLowerCase() === 'en') {
            time = Number((order.count / editTimeEnPerMin + 30) * overhead).toFixed(2)
            result.time = Math.round(time / 60)

        } else if (fileLanguage.toLowerCase() !== 'en') {
            time = Number((order.count / editTimeUrkRusPerMin + 30) * overhead).toFixed(2)
            result.time = Math.round(time / 60)
        }


        if (labelService && labelLanguage && order.count > 0) {
            setCost(+result.price)

        } else {
            setCost(0)

        }
        return result
    }

// Data for operation of the first button responsible for service selection ( данные для работа первой кнопки которая отвечает за выбор услуги )
    const [colorService, setColorService] = useState(""); // Цвет для выбранного значения
    const [openedService, setOpenedService] = useState(false); // По умолчанию кнопка в отрицательном значении
    const [service, setService] = useState("Послуга"); // Начальное значение кнопки
    const [labelService, setLabelService] = useState('')
    const serviceRef = useRef(null);

    const [colorLanguage, setColorLanguage] = useState('')
    const [openedLanguage, setOpenedLanguage] = useState(false)
    const [language, setLanguage] = useState('Мова')
    const [labelLanguage, setLabelLanguage] = useState('')
    const languageRef = useRef(null);

    const [firstButtonSelected, setFirstButtonSelected] = useState(false);
    const [selectedServiceOption, setSelectedServiceOption] = useState('');


    const [email, setEmail] = useState('')
    const [labelEmail, setLabelEmail] = useState('')

    const [name, setName] = useState('')
    const [labelName, setLabelName] = useState('')

    const [comment, setComment] = useState('')
    const [labelComment, setLabelComment] = useState('')

    const [cost, setCost] = useState(0);
    const [time, setTime] = useState('');


    function addBusinessHours(hoursToAdd) {
        const result = new Date();

        while (hoursToAdd > 0) {
            result.setHours(result.getHours() + 1);

            if (result.getHours() >= workHoursStart && result.getHours() < workHoursEnd && result.getDay() >= 1 && result.getDay() <= 5) {
                hoursToAdd--;
            }
        }

        // Округление до ближайших 30 минут после окончания цикла
        const minutes = result.getMinutes();
        const remainder = minutes % 30;
        if (remainder >= 15) {
            result.setMinutes(minutes + 30 - remainder);
        } else {
            result.setMinutes(minutes - remainder);
        }

        // Если время округления выходит за пределы рабочего времени, то переносим его на следующий рабочий день
        if (result.getHours() >= workHoursEnd || result.getDay() === 6 || result.getDay() === 0) {
            result.setDate(result.getDate() + 1);
            result.setHours(workHoursStart);
            result.setMinutes(0);
        }

        return {
            workTimeHour: result.getHours().toString().padStart(2, '0'),
            workTimeMinutes: result.getMinutes().toString().padStart(2, '0'),
            workDayEnd: result.toLocaleDateString().toString().padStart(2, '0'),
        };
    }


    const handleInputEmail = (event) => {
        const inputEmail = event.target.value
        setEmail(inputEmail)

        if (inputEmail.length > 0) {
            setLabelEmail('Ваша електронна пошта')
        } else {
            setLabelEmail('')
        }
    };
    const handleInputName = (event) => {
        const inputName = event.target.value
        setName(inputName)

        if (inputName.length > 0) {
            setLabelName('Ваше ім’я')
        } else {
            setLabelName('')
        }
    };
    const handleInputComment = (event) => {
        const inputComment = event.target.value
        setComment(inputComment)

        if (inputComment.length > 0) {
            setLabelComment('Коментар або покликання')
        } else {
            setLabelComment('')
        }
    };


    const handleButtonClickService = () => { // Активация кнопки
        setOpenedService(!openedService);
    };

    const handleButtonClickLanguage = () => {
        if (firstButtonSelected) {
            setOpenedLanguage(!openedLanguage)
        }
    }

    const serviceClick = (value, color) => { // Смена параметров кнопки Услуги
        setService(value);
        setColorService(color);
        setOpenedService(false);
        setFirstButtonSelected(true)
        setLabelService('Послуга')
        setSelectedServiceOption(value)

        if (value === 'Переклад') {
            setLanguage('Мовна пара')
            setLabelLanguage('')
            setColorLanguage('')

        }
        if (value === 'Редагування') {
            setLanguage('Мова')
            setLabelLanguage('')
            setColorLanguage('')

        }
    };

    const languageClick = (value, color) => {
        setLanguage(value);
        setColorLanguage(color);
        setOpenedLanguage(false);

        if (service === 'Переклад') {
            setLabelLanguage('Мовна пара')
        }
        if (service === 'Редагування') {
            setLabelLanguage('Мова')
        }
        if (value === 'Українська' || value === 'Російська') {
            order.language = 'rus/urk'
            orderPrice(order)
        } else {
            order.language = 'en'
            orderPrice(order)
        }
    }

    const getLanguageOptions = () => {
        switch (selectedServiceOption) {
            case 'Редагування':
                return (
                    <div className="position-list">
                        <label onClick={() => languageClick('Українська', 'color')}>Українська</label>
                        <label onClick={() => languageClick('Російська', 'color')}>Російська</label>
                        <label onClick={() => languageClick('Англійська', 'color')}>Англійська</label>
                        <label onClick={() => languageClick('Англійська (носій)', 'color')}>Англійська (носій)</label>
                    </div>
                );
            case 'Переклад':
                return (
                    <div className="position-list">
                        <label onClick={() => languageClick('Українська', 'color')}>Українська/Російська -
                                                                                    Англійська</label>
                        <label onClick={() => languageClick('Англійська - Українська', 'color')}>Англійська -
                                                                                                 Українська</label>
                        <label onClick={() => languageClick('Англійська - Російська', 'color')}>Англійська -
                                                                                                Російська</label>
                        <label onClick={() => languageClick('Російська - Українська', 'color')}>Російська -
                                                                                                Українська</label>
                        <label onClick={() => languageClick('Українська - Російська', 'color')}>Українська -
                                                                                                Російська</label>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleClickOutside = (event) => { // Отслеживание где был произведен клик
        if (serviceRef.current && !serviceRef.current.contains(event.target)) {
            setOpenedService(false);
        }
        if (languageRef.current && !languageRef.current.contains(event.target)) {
            setOpenedLanguage(false);
        }

    };

    useEffect(() => { // Закрытие кнопки, при нажатии вне области объекта
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
// ------------------------------------------------------------------------------------------------------------------ //
    const {text, setTextValue} = useText();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isInputActive, setInputActive] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [isCharCounterVisible, setCharCounterVisible] = useState(false);


    const updateCharCount = (text) => {
        setCharCount(text.length);
        order.count = text.length
    };

    const countTextChange = (event) => {
        const newText = event.target.value;
        setTextValue(newText);
        updateCharCount(newText);

        orderPrice(order)

        let endTimeWork = addBusinessHours(orderPrice(order).time)

        if (labelService && labelLanguage && order.count > 0) {
            setTime(`${endTimeWork.workDayEnd} - ${endTimeWork.workTimeHour}:${endTimeWork.workTimeMinutes} `)
        } else {
            setTime('')
        }

        // Проверка, чтобы показать счетчик символов только после первого введенного символа
        if (newText.length > 0) {
            setCharCounterVisible(true);
        } else {
            setCharCounterVisible(false);
        }
    };

    const handleTextChange = (event) => {
        setTextValue(event.target.value);

        if (event.target.value.length > 0) {
            setInputActive(true)
        } else {
            setInputActive(false);
        }

    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            order.mimeType = file.type // Добавьте эту строку для печати MIME-типа файла
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                setTextValue(fileContent);
                setInputActive(true);
                setCharCounterVisible(true); // Показать счетчик символов после загрузки файла
            };
            reader.readAsText(file);
        } else {
            setSelectedFile(null);
            setTextValue('');
            setInputActive(false);
            setCharCounterVisible(false); // Скрыть счетчик символов при удалении файла
        }
    };


    useEffect(() => {
        // Подсчет символов сразу после загрузки файла
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                updateCharCount(fileContent);
            };
            reader.readAsText(selectedFile);
        }
    }, [selectedFile]);
// ------------------------------------------------------------------------------------------------------------------ //
    return (
        <main className="main_new">
            <form className="section_new makeOrder">
                <div className="makeOrder_item inputs">
                    <h3 className="medium_title">Замовити переклад або редагування</h3>
                    {/* First service selection button ( первая кнопка выбора услуги ) ------------------------------------------------- */}
                    <fieldset>
                        <legend className={`${openedService ? 'checked' : ''}`}>{labelService}</legend>
                        <div className="button-checkbox" ref={serviceRef}>
                            <button
                                className={`custom-button ${openedService ? 'checked' : ''} ${colorService}`}
                                onClick={handleButtonClickService}
                                type="button"
                            >
                                <label tabIndex='0'>
                                    {service}
                                    <img alt="icon" src="/arrow_down.svg"/>
                                </label>
                            </button>
                            <div className={`hidden-list ${openedService ? 'active' : ''}`}>
                                <div className="position-list">
                                    <label onClick={() => serviceClick('Редагування', "color")}>Редагування</label>
                                    <label onClick={() => serviceClick('Переклад', "color")}>Переклад</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    <div className="area">
                        <textarea className="area-text" value={text} onChange={handleTextChange} onKeyUp={countTextChange}></textarea>
                        {isCharCounterVisible && (
                            <div className="char-count">{charCount} символів</div>
                        )}
                        <div className="area-download">
                            {isInputActive ? null : (
                                <span className="placeholder">Введіть текст або </span>
                            )}
                            {isInputActive ? null : (
                                <label className="area-label">
                                    завантажте файл
                                    <input
                                        className="area-input"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application.pdf, .rtf, .txt, .pdf, .zip"
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    <fieldset className='text_field email' tabIndex="-1">
                        <legend>{labelEmail}</legend>
                        <input type="email" placeholder='Ваша електронна пошта' value={email} onChange={handleInputEmail} tabIndex='0'/>
                    </fieldset>
                    <fieldset className='text_field name' tabIndex="-1">
                        <legend>{labelName}</legend>
                        <input type="text" placeholder='Ваше ім’я' value={name} onChange={handleInputName}/>
                    </fieldset>
                    <fieldset className='text_field comment' tabIndex="-1">
                        <legend>{labelComment}</legend>
                        <input type="text" placeholder='Коментар або покликання' value={comment} onChange={handleInputComment}/>
                    </fieldset>
                    <fieldset>
                        <legend className={`${openedLanguage ? 'checked' : ''}`}>{labelLanguage}</legend>
                        <div className='button-checkbox' ref={languageRef}>
                            <button
                                className={`custom-button ${openedLanguage ? 'checked' : ''} ${colorLanguage} ${!firstButtonSelected ? 'disabled' : ''}`}
                                onClick={handleButtonClickLanguage}
                                type="button"
                                disabled={!firstButtonSelected}
                            >
                                <label>
                                    {language}
                                    <img alt="icon" src="/arrow_down.svg"/>
                                </label>
                            </button>
                            <div className={`hidden-list ${openedLanguage ? 'active' : ''}`}>
                                {getLanguageOptions()}
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="makeOrder_item">
                    <div className='submit'>
                        <div className='submit-content'>
                            <div className='content-price'>
                                <div className='number'>{cost}</div>
                                <div className='currency'>грн</div>
                            </div>
                            <div className='time'>{cost !== 0 ? 'Кінцевий термін: ':''}{time}</div>
                            <div className='button'>
                                <button className='correctarium_button' type='submit' disabled={cost === 0}>Зробити замовлення
                                </button>
                            </div>
                        </div>
                        <div className='close_button'></div>
                    </div>
                </div>
            </form>
            <footer className='footer'>
                <div className='section_new footer_container'>
                    <div className='rights'>
                        <a href='https://correctarium.com/terms'>Договір публічної оферти</a>
                        <p>© Correctarium</p>
                        <p>2015-{new Date().getFullYear()}</p>
                    </div>
                    <img src="/svg.png" alt="logo"/>
                    <div className='contactUs'>
                        <p>Надіслати текст на переклад:</p>
                        <a href="mailto:manager@correctarium.com">manager@correctarium.com</a>
                    </div>
                </div>
                {/*<TextCounter/>*/}
            </footer>
        </main>
    )
}

export default App;
