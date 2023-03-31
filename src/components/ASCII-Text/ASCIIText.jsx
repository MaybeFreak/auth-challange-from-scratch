import { useEffect, useState } from "react";
import figlet from "figlet";
import TextFader from "./fader";

const ASCIIText = ({
  message = "REPLACE ME",
  font = "Standard",
  colors = "ff0000",
  fadeType = "vertical",
}) => {
  const [output, setOutput] = useState("");
  const [final, setFinal] = useState("");
  const [loadedFont, setLoadedFont] = useState(null);

  useEffect(() => {
    loadFont();
  }, []);

  const loadFont = async () => {
    await import(`../../../node_modules/figlet/importable-fonts/${font}.js`)
      .then((res) => res.default)
      .then((flt) => setLoadedFont(flt));
  };

  useEffect(() => {
    if (loadedFont) {
      figlet.parseFont("Standard", loadedFont);
      figlet.text(message, { font: "Standard" }, (err, data) => {
        if (err) {
          console.log("Oh no");
        }
        setOutput(data);
      });
    }
  }, [loadedFont]);

  useEffect(() => {
    const config = {
      colors: colors,
      txt: output,
      type: fadeType,
      output: "html-font",
    };
    setFinal(TextFader.fade(config));
  }, [output]);

  return (
    <div className="ascii" dangerouslySetInnerHTML={{ __html: final }}></div>
  );
};

export default ASCIIText;
