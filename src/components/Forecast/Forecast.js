import moment from "moment";
import React from "react";
import style from "./Forecast.module.css";
import {
  Accordion,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemPanel,
} from "react-accessible-accordion";

function Forecast({ forecast }) {
  let currentWeekDay = moment().day();
  let arrWeekFirst = forecast.data.slice(0, currentWeekDay);
  let arrWeekSecond = forecast.data.slice(currentWeekDay + 1);
  const arrWeek = [...arrWeekSecond, ...arrWeekFirst];
  {
    arrWeek.map((data, index) => {
      data.map((item, index) => {
        console.log(item);
      });
    });
  }
  return (
    <div>
      <Accordion allowZeroExpanded>
        {arrWeek.map((data, index) => (
          <AccordionItem key={index} className={style.accordionItem}>
            <AccordionItemHeading key={index}>
              <AccordionItemButton key={index}>
                {data.map((item, index) => (
                  <div className={style.accordionItemBtn} key={index}>
                    <p>{item.name}</p>
                  </div>
                ))}
              </AccordionItemButton>
            </AccordionItemHeading>
            {data.map((item, index) => (
              <AccordionItemPanel key={index}>
                {item.weather && (
                  <div className={style.accordionItemPanel}>
                    <p className={style.accordionItemPanelTime}>
                      {moment(item.dt_txt).format("HH:mm")}
                    </p>
                    <div className={style.accordionItemPanelWeather}>
                    <img
                      className={style.accordionItemPanelIcon}
                      src={`icons/${item.weather[0].icon}.svg`}
                    />
                    <p>{item.weather[0].description}</p>
                    </div>
                    <p className={style.accordionItemPanelTemp}>
                      {Math.round(item.main.temp)}°C
                    </p>
                    <div className={style.accordionItemPanelMinmaxTemp}>
                      <img src = 'icons/cold.png' />
                      <p className={style.accordionItemPanelTemp_min}>
                        {Math.round(item.main.temp_min)}°C
                      </p>
                    </div>
                    <div className={style.accordionItemPanelMinmaxTemp}>
                      <img src = 'icons/hot.png' />
                      <p className={style.accordionItemPanelTemp_max}>
                        {Math.round(item.main.temp_max)}°C
                      </p>
                    </div>
                  </div>
                )}
              </AccordionItemPanel>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Forecast;
