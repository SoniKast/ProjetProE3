import { useEffect, useRef } from "react";
import { TempusDominus } from "@eonasdan/tempus-dominus";

export function Datepicker({ value, onChange, id="datepicker", label="Choisir une date"}) {
    const inputRef = useRef(null);
    const pickerRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            pickerRef.current = new TempusDominus(inputRef.current, {
                defaultDate: value ? new Date(value) : undefined,
                display: {
                    components: {
                        calendar: true,
                        clock: false,
                    },
                },
                localization: {
                    locale: "fr",
                },
            });

            inputRef.current.addEventListener("change.td", () => {
                const newDate = pickerRef.current.dates.lastPicked?.toDate();
                if (onChange && newDate) {
                    onChange(newDate);
                }
            });
        }
    }, []);

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <div className="input-group" ref={inputRef}>
                <input type="text" className="form-control" id={id} />
                <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
            </div>
        </div>
    );
}
