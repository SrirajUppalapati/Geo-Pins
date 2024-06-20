// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  const [lat, lng] = useURLPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [isLoadingGeo, setIsLoadingGeo] = useState(false);

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function cityName() {
        try {
          setIsLoadingGeo(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          setCityName(data.locality || data.city || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));

          if (!data.countryCode) {
            throw new Error(
              "Please select a place not somewhere in water please 🙏"
            );
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingGeo(false);
        }
      }
      cityName();
    },
    [lat, lng]
  );

  if (isLoadingGeo) return <Spinner />;

  if (!lat && !lng) return <Message message="Please click on the map" />;

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(newCity);
    navigate("/app");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(curr) => setDate(curr)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>

        <BackButton />
      </div>
    </form>
  );
}

export default Form;
