import moment from "moment";
import React from "react";
import style from "./Forecast.module.css";
import ItemsCarousel from "react-items-carousel";
import {
  Accordion,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useState } from "react";

function Forecast({ forecast }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  let currentWeekDay = moment().day();
  let arrWeekFirst = forecast.data.slice(0, currentWeekDay);
  let arrWeekSecond = forecast.data.slice(currentWeekDay + 1);
  const arrWeek = [...arrWeekSecond, ...arrWeekFirst];
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
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={3}
              gutter={20}
              leftChevron={<button className={style.carouselBtn}>{"<"}</button>}
              rightChevron={
                <button className={style.carouselBtn}>{">"}</button>
              }
              outsideChevron
              chevronWidth={40}
              infiniteLoop={true}
            >
              {data.slice(1).map((item, index) => (
                <AccordionItemPanel key={index}>
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
                  </div>
                </AccordionItemPanel>
              ))}
            </ItemsCarousel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Forecast;
