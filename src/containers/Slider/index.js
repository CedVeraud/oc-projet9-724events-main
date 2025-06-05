import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // inversion des conditions -1 : 1 pour obtenir l'ordre décroissant des dates
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  // création de la variable slidesLenght pour stocker la totalité du tableau
  const slidesLength = data?.focus.length
  const nextCard = () => {
    setTimeout(
      // tant que l'on n'atteint pas la longueur du tableau -1 on affiche la slide suivante
      // sinon on affiche l'objet 0
      () => setIndex(index < slidesLength - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
            >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))} 
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // champ de formulaire sans gestionnaire « onChange ». Ceci affichera un champ en lecture seule. 
              // Si le champ doit être modifiable, utilisez « defaultChecked ». Sinon, définissez « onChange » ou « readOnly »
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;